import { NOTIFICATION_FILTERS } from "../../data/notificationData";
import { notificationImages } from "../../assets/notificationImages";
import "./NotificationPopup.css";

const messageToneClass = {
  strong: "notification-item__message-strong",
  strongDark: "notification-item__message-strong-dark",
  brandStrong: "notification-item__message-brand",
};

function NotificationVisual({ item }) {
  if (item.avatar) {
    return (
      <span className="notification-item__visual notification-item__visual--pet">
        <img
          src={item.avatar}
          alt={item.avatarAlt ?? ""}
          className="notification-item__avatar"
          style={item.avatarCrop}
        />
      </span>
    );
  }

  return (
    <span
      className={`notification-item__visual ${
        item.type === "system"
          ? "notification-item__visual--system"
          : "notification-item__visual--appointment"
      }`}
    >
      <img
        src={item.icon}
        alt={item.iconAlt ?? ""}
        className={
          item.type === "system"
            ? "notification-item__icon--system"
            : "notification-item__icon--appointment"
        }
      />
    </span>
  );
}

function NotificationMessage({ parts }) {
  return (
    <p className="notification-item__message">
      {parts.map((part, index) => (
        <span key={`${part.text}-${index}`} className={messageToneClass[part.tone]}>
          {part.text}
        </span>
      ))}
    </p>
  );
}

function NotificationItem({ item, read, onRead }) {
  const isUnread = !read;
  const typeClass =
    item.id === "appointment-nau"
      ? "notification-item--appointment"
      : item.id === "grouped-luna"
        ? "notification-item--grouped"
        : item.type === "system"
          ? "notification-item--system"
          : "notification-item--pet";

  return (
    <button
      type="button"
      className={`notification-item ${typeClass} ${isUnread ? "notification-item--unread" : ""}`}
      onClick={() => onRead(item.id)}
      aria-label={`Thông báo: ${item.searchableText}`}
    >
      <NotificationVisual item={item} />
      <span className="notification-item__content">
        <NotificationMessage parts={item.messageParts} />
        <span className="notification-item__meta">
          <span>{item.relativeTime}</span>
          {item.dateTime ? <span>{item.dateTime}</span> : null}
        </span>
      </span>
    </button>
  );
}

function NotificationPopup({
  readIds,
  activeFilter,
  searchValue,
  filteredItems,
  unreadCount,
  onClose,
  onFilterChange,
  onSearchChange,
  onRead,
  onReadAll,
}) {
  return (
    <section
      className="notification-popover"
      data-node-id="3075:10754"
      data-name="thông báo"
      role="dialog"
      aria-modal="false"
      aria-label="Thông báo"
    >
      <div className="notification-popover__header" data-node-id="3075:10755">
        <div className="notification-popover__header-main" data-node-id="3075:12006">
          <h2 className="notification-popover__title" data-node-id="3075:10757">
            Thông báo
          </h2>
          <button
            type="button"
            className="notification-popover__read-all"
            onClick={onReadAll}
            disabled={unreadCount === 0}
            data-node-id="3075:10759"
          >
            Đánh dấu tất cả là đã đọc
          </button>
        </div>
        <button
          type="button"
          className="notification-popover__close"
          onClick={onClose}
          aria-label="Đóng thông báo"
          data-node-id="3075:12003"
        >
          <img src={notificationImages.iconClose} alt="" />
        </button>
      </div>

      <div className="notification-popover__toolbar" data-node-id="3075:10760">
        <label className="notification-popover__search" data-node-id="3075:10761">
          <img
            src={notificationImages.iconSearchPaw}
            alt=""
            className="notification-popover__search-icon"
            data-node-id="3075:10763"
          />
          <input
            className="notification-popover__search-input"
            value={searchValue}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Tìm tên thú cưng..."
            aria-label="Tìm tên thú cưng"
            data-node-id="3075:10768"
          />
        </label>

        <div className="notification-popover__filters" data-node-id="3075:10769">
          {NOTIFICATION_FILTERS.map((filter) => (
            <button
              key={filter.id}
              type="button"
              className={`notification-popover__filter ${
                activeFilter === filter.id ? "notification-popover__filter--active" : ""
              }`}
              onClick={() => onFilterChange(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      <div className="notification-popover__body" data-node-id="3075:10776">
        <div className="notification-popover__list">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <NotificationItem
                key={item.id}
                item={item}
                read={readIds.includes(item.id)}
                onRead={onRead}
              />
            ))
          ) : (
            <div className="notification-popover__empty">
              Không có thông báo phù hợp.
            </div>
          )}
        </div>
        <div className="notification-popover__scroll" aria-hidden="true" data-node-id="3075:10817">
          <div className="notification-popover__scroll-thumb" data-node-id="3075:10818" />
        </div>
      </div>
    </section>
  );
}

export default NotificationPopup;
