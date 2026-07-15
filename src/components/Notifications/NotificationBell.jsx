import { useCallback, useEffect, useRef, useState } from "react";
import { navbarImages } from "../../assets/navbarImages";
import { notificationImages } from "../../assets/notificationImages";
import { useNotifications } from "../../context/NotificationContext";
import NotificationPopup from "./NotificationPopup";
import { format, formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";

function mapNotificationToUI(item) {
  let icon = null;
  if (item.notification_type === "appointment") {
    icon = notificationImages.iconCalendar;
  } else if (item.notification_type === "system") {
    icon = notificationImages.iconNote;
  }

  return {
    id: item.notification_id,
    type: item.notification_type,
    unread: !item.is_read,
    avatar: item.pet?.profile_image_url || null,
    avatarAlt: item.pet?.pet_name || "",
    avatarCrop: {}, // Có thể bỏ qua hoặc thêm logic crop nếu cần
    icon: icon,
    iconAlt: "Icon",
    relativeTime: item.created_at ? formatDistanceToNow(new Date(item.created_at), { addSuffix: true, locale: vi }).toUpperCase() : "",
    dateTime: item.created_at ? format(new Date(item.created_at), "HH:mm dd/MM/yyyy", { locale: vi }) : "",
    searchableText: item.searchable_text || "",
    messageParts: item.message_parts ? (typeof item.message_parts === 'string' ? JSON.parse(item.message_parts) : item.message_parts) : [{ text: item.content || item.title }],
  };
}

function NotificationBell({
  className = "hidden sm:inline-flex",
  buttonClassName = "p-1",
  iconClassName = "h-[36px] w-[32px]",
  badgeClassName = "",
}) {
  const rootRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchValue, setSearchValue] = useState("");

  const { notifications, unreadCount, fetchNotifications, markAsRead, markAllAsRead } = useNotifications();

  useEffect(() => {
    fetchNotifications(activeFilter, searchValue);
  }, [activeFilter, searchValue, fetchNotifications]);

  const filteredItems = (notifications || []).map(mapNotificationToUI);
  const readIds = filteredItems.filter(item => !item.unread).map(item => item.id);

  const closeAfterViewing = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handlePointerDown = (event) => {
      if (rootRef.current && !rootRef.current.contains(event.target)) {
        closeAfterViewing();
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeAfterViewing();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeAfterViewing, isOpen]);

  return (
    <div className={`notification-bell shrink-0 ${className}`} ref={rootRef}>
      <button
        type="button"
        className={`notification-bell__button btn-icon ${buttonClassName}`}
        aria-label={`Thông báo${unreadCount > 0 ? `, ${unreadCount} chưa đọc` : ""}`}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        onClick={() => setIsOpen((current) => !current)}
      >
        <img
          src={navbarImages.notificationIcon}
          alt=""
          className={iconClassName}
        />
        {unreadCount > 0 ? (
          <span className={`notification-bell__badge ${badgeClassName}`} aria-hidden="true">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        ) : null}
      </button>

      {isOpen ? (
        <NotificationPopup
          readIds={readIds}
          activeFilter={activeFilter}
          searchValue={searchValue}
          filteredItems={filteredItems}
          unreadCount={unreadCount}
          onClose={closeAfterViewing}
          onFilterChange={setActiveFilter}
          onSearchChange={setSearchValue}
          onRead={(id) => markAsRead(id)}
          onReadAll={markAllAsRead}
        />
      ) : null}
    </div>
  );
}

export default NotificationBell;
