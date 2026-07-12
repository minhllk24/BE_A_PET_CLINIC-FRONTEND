import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { navbarImages } from "../../assets/navbarImages";
import { NOTIFICATION_ITEMS } from "../../data/notificationData";
import NotificationPopup from "./NotificationPopup";

function NotificationBell() {
  const rootRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchValue, setSearchValue] = useState("");
  const [readIds, setReadIds] = useState(
    NOTIFICATION_ITEMS.filter((item) => !item.unread).map((item) => item.id),
  );

  const unreadCount = useMemo(
    () => NOTIFICATION_ITEMS.filter((item) => !readIds.includes(item.id)).length,
    [readIds],
  );

  const filteredItems = useMemo(() => {
    const normalizedSearch = searchValue.trim().toLowerCase();

    return NOTIFICATION_ITEMS.filter((item) => {
      const read = readIds.includes(item.id);
      const matchesFilter =
        activeFilter === "all" ||
        (activeFilter === "unread" && !read) ||
        (activeFilter === "read" && read);
      const matchesSearch =
        normalizedSearch.length === 0 ||
        item.searchableText.toLowerCase().includes(normalizedSearch);

      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, readIds, searchValue]);

  const markAllRead = useCallback(() => {
    setReadIds(NOTIFICATION_ITEMS.map((item) => item.id));
  }, []);

  const closeAfterViewing = useCallback(() => {
    setIsOpen(false);
    markAllRead();
  }, [markAllRead]);

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
    <div className="notification-bell hidden shrink-0 sm:inline-flex" ref={rootRef}>
      <button
        type="button"
        className="notification-bell__button btn-icon p-1"
        aria-label={`Thông báo${unreadCount > 0 ? `, ${unreadCount} chưa đọc` : ""}`}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        onClick={() => setIsOpen((current) => !current)}
      >
        <img
          src={navbarImages.notificationIcon}
          alt=""
          className="h-[36px] w-[32px]"
        />
        {unreadCount > 0 ? (
          <span className="notification-bell__badge" aria-hidden="true">
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
          onRead={(id) => setReadIds((current) => [...new Set([...current, id])])}
          onReadAll={markAllRead}
        />
      ) : null}
    </div>
  );
}

export default NotificationBell;
