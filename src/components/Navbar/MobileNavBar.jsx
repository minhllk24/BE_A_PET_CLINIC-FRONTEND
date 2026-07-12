import { useMemo, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { mobileNavbarImages } from '../../assets/mobileNavbarImages'
import {
  NOTIFICATION_FILTERS,
  NOTIFICATION_ITEMS,
} from '../../data/notificationData'
import { mockSearchApi } from '../../data/searchResultsData'
import { useAuth } from '../../context/AuthContext'
import { useCart } from '../../context/CartContext'
import { formatVnd, getNumericPrice } from '../../utils/currency'
import { NAV_LINKS } from './navbarMenuLinks'

const DEFAULT_MOBILE_SEARCH_QUERY = 'tắm'

function Logo({ className = '' }) {
  return (
    <Link
      to="/"
      aria-label="Dr. Pet's House"
      className={`block h-[36px] w-[82px] ${className}`}
    >
      <img
        src={mobileNavbarImages.logoCompact}
        alt="Dr. Pet's House"
        className="h-[115.78%] w-full -translate-y-[7.89%] object-contain object-left"
      />
    </Link>
  )
}

function IconButton({ label, onClick, children, className = '' }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={`relative flex shrink-0 items-center justify-center transition duration-200 hover:brightness-110 active:scale-95 ${className}`}
    >
      {children}
    </button>
  )
}

function MobileHeader({
  isAuthenticated,
  avatarSrc,
  notificationCount,
  onSearch,
  onNotifications,
  onCart,
  onMenu,
}) {
  const { openAuth } = useAuth()

  return (
    <header className="fixed inset-x-0 top-0 z-[80] flex justify-center bg-white lg:hidden">
      <div className="flex h-[48px] w-full max-w-[360px] items-center justify-between border-b border-[#ECEFF1] bg-white pr-[10px]">
        <div
          className={
            isAuthenticated
              ? 'flex h-[48px] min-w-[120px] flex-1 items-center'
              : 'flex h-[48px] w-[100px] shrink-0 items-center'
          }
        >
          <Logo />
        </div>

        {isAuthenticated ? (
          <div className="flex min-w-[120px] max-w-[250px] flex-1 items-center justify-between pl-[35px]">
            <IconButton
              label="Tìm kiếm"
              onClick={onSearch}
              className="size-[18px]"
            >
              <img
                src={mobileNavbarImages.search}
                alt=""
                className="size-full"
              />
            </IconButton>
            <IconButton
              label="Thông báo"
              onClick={onNotifications}
              className="size-[22px]"
            >
              <img
                src={mobileNavbarImages.notification}
                alt=""
                className="size-full"
              />
              {notificationCount > 0 ? (
                <span className="absolute -bottom-[3px] -right-[5px] flex h-[12px] min-w-[12px] items-center justify-center rounded-full bg-[#F45757] px-[2px] text-[7px] font-bold leading-none text-white">
                  {notificationCount > 9 ? '9+' : notificationCount}
                </span>
              ) : null}
            </IconButton>
            <IconButton
              label="Giỏ hàng"
              onClick={onCart}
              className="size-[18px]"
            >
              <img src={mobileNavbarImages.cart} alt="" className="size-full" />
            </IconButton>
            <Link
              to="/profile"
              aria-label="Tài khoản"
              className="size-[18px] shrink-0 overflow-hidden rounded-full border-[0.5px] border-black"
            >
              <img
                src={avatarSrc || mobileNavbarImages.avatar}
                alt=""
                className="size-full rounded-full object-cover"
              />
            </Link>
            <IconButton
              label="Mở menu"
              onClick={onMenu}
              className="h-[18px] w-[21px]"
            >
              <img
                src={mobileNavbarImages.hamburger}
                alt=""
                className="h-full w-full"
              />
            </IconButton>
          </div>
        ) : (
          <div className="flex min-w-[120px] max-w-[250px] flex-1 items-center justify-end gap-[10.75px] pl-[35px]">
            <IconButton
              label="Tìm kiếm"
              onClick={onSearch}
              className="size-[18px]"
            >
              <img
                src={mobileNavbarImages.search}
                alt=""
                className="size-full"
              />
            </IconButton>
            <IconButton
              label="Giỏ hàng"
              onClick={onCart}
              className="size-[18px]"
            >
              <img src={mobileNavbarImages.cart} alt="" className="size-full" />
            </IconButton>
            <button
              type="button"
              onClick={() => openAuth('login')}
              className="flex h-[22px] w-[76px] shrink-0 items-center justify-center rounded bg-[#FDD835] px-[22px] py-[8px] shadow-elevation transition-colors hover:bg-[#0D47A1] hover:text-white active:scale-[0.98]"
            >
              <span className="whitespace-nowrap font-['Roboto'] text-[9px] font-bold leading-[1.66] tracking-[0.4px]">
                ĐĂNG NHẬP
              </span>
            </button>
            <IconButton
              label="Mở menu"
              onClick={onMenu}
              className="h-[18px] w-[21px]"
            >
              <img
                src={mobileNavbarImages.hamburger}
                alt=""
                className="h-full w-full"
              />
            </IconButton>
          </div>
        )}
      </div>
    </header>
  )
}

function OverlayShell({ children, className = '', height }) {
  return (
    <div className="fixed inset-x-0 top-0 z-[95] flex justify-center lg:hidden">
      <div
        className={`w-full max-w-[360px] overflow-hidden ${className}`}
        style={{
          height,
          animation: 'mobileNavSlideDown 260ms cubic-bezier(0.22,1,0.36,1)',
        }}
      >
        {children}
      </div>
    </div>
  )
}

function CloseHeader({ onClose }) {
  return (
    <div className="flex h-[48px] w-full items-center justify-between border-b border-[#ECEFF1] bg-white pr-[10px]">
      <div className="flex h-[48px] min-w-[120px] flex-1 items-center">
        <Logo />
      </div>
      <IconButton
        label="Đóng menu"
        onClick={onClose}
        className="h-[14px] w-[18px]"
      >
        <img
          src={mobileNavbarImages.closeBlue}
          alt=""
          className="h-full w-full"
        />
      </IconButton>
    </div>
  )
}

function MenuRow({
  children,
  to,
  active,
  onClick,
  onToggle,
  expanded = false,
  hasChildren = false,
}) {
  const labelClass = active
    ? "font-['Roboto'] text-[12px] font-bold leading-[1.5] tracking-[0.15px] text-[#0D47A1] underline decoration-[#FDD835] decoration-[10%]"
    : "font-['Roboto'] text-[12px] font-bold leading-[1.5] tracking-[0.15px] text-[#0D47A1]"

  if (hasChildren) {
    return (
      <div className="flex h-[35px] w-full items-center justify-between border-b-[0.5px] border-[#0D47A1] bg-[#FFFDE7]">
        <NavLink
          to={to}
          end={to === '/'}
          onClick={onClick}
          className="flex h-full min-w-0 flex-1 items-center"
        >
          <span className={labelClass}>{children}</span>
        </NavLink>
        <button
          type="button"
          onClick={onToggle}
          className="flex h-full w-[34px] shrink-0 items-center justify-end transition hover:brightness-110 active:scale-95"
          aria-label={`${expanded ? 'Thu gọn' : 'Mở'} ${children}`}
          aria-expanded={expanded}
        >
          <img
            src={mobileNavbarImages.arrowRight}
            alt=""
            className={`h-[5px] w-[10px] transition-transform duration-200 ${
              expanded ? 'rotate-90' : ''
            }`}
          />
        </button>
      </div>
    )
  }

  const content = (
    <span className={labelClass}>{children}</span>
  )

  if (to) {
    return (
      <NavLink
        to={to}
        end={to === '/'}
        onClick={onClick}
        className="flex h-[35px] w-full items-center border-b-[0.5px] border-[#0D47A1] bg-[#FFFDE7]"
      >
        {content}
      </NavLink>
    )
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-[35px] w-full items-center border-b-[0.5px] border-[#0D47A1] bg-[#FFFDE7] text-left"
    >
      {content}
    </button>
  )
}

function MobileMenuOverlay({ onClose }) {
  const location = useLocation()
  const [openMenus, setOpenMenus] = useState(() => {
    const initial = {}
    NAV_LINKS.forEach((item) => {
      if (
        item.children?.some((child) => location.pathname.startsWith(child.href))
      ) {
        initial[item.label] = true
      }
    })
    return initial
  })

  const toggleMenu = (label) => {
    setOpenMenus((current) => ({
      ...current,
      [label]: !current[label],
    }))
  }

  const isActive = (item) => {
    if (item.href === '/') return location.pathname === '/'
    if (location.pathname.startsWith(item.href)) return true
    return item.children?.some((child) => location.pathname.startsWith(child.href))
  }

  return (
    <OverlayShell
      height={423}
      className="bg-[rgba(6,16,90,0.16)] backdrop-blur-[0px]"
    >
      <CloseHeader onClose={onClose} />
      <nav
        className="max-h-[calc(100vh-48px)] w-full overflow-y-auto bg-[#FFFDE7] px-[20px]"
        aria-label="Menu mobile"
      >
        <div className="flex w-full flex-col pb-[20px] pt-[20px]">
          {NAV_LINKS.map((item) => {
            const hasChildren = Boolean(item.children?.length)
            const expanded = Boolean(openMenus[item.label])
            const active = isActive(item)

            if (!hasChildren) {
              return (
                <MenuRow
                  key={item.label}
                  to={item.href}
                  active={active}
                  onClick={onClose}
                >
                  {item.label}
                </MenuRow>
              )
            }

            return (
              <div key={item.label}>
                <MenuRow
                  to={item.href}
                  active={active}
                  expanded={expanded}
                  hasChildren
                  onClick={onClose}
                  onToggle={() => toggleMenu(item.label)}
                >
                  {item.label}
                </MenuRow>
                <div
                  className={`overflow-hidden pl-[20px] transition-all duration-300 ease-premium ${
                    expanded ? 'opacity-100' : 'max-h-0 opacity-0'
                  }`}
                  style={{ maxHeight: expanded ? item.children.length * 40 : 0 }}
                >
                  <div className="flex flex-col gap-[5px]">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        to={child.href}
                        onClick={onClose}
                        className="flex h-[35px] w-[295px] items-center border-b-[0.5px] border-[#1565C0] pr-[20px] font-['Roboto'] text-[11px] leading-[1.5] tracking-[0.15px] text-[#1565C0] transition-colors hover:text-[#0D47A1]"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </nav>
    </OverlayShell>
  )
}

function MobileSearchOverlay({ onClose }) {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const displayQuery = query.trim() || DEFAULT_MOBILE_SEARCH_QUERY
  const preview = useMemo(
    () => mockSearchApi({ query: displayQuery, type: 'all', sort: 'relevant' }),
    [displayQuery],
  )
  const suggestions = useMemo(() => {
    const buckets = preview.results
    const matched = [
      ...buckets.services,
      ...buckets.otherServices,
      ...buckets.products,
      ...buckets.knowledge,
      ...buckets.firstAid,
      ...buckets.community,
    ]
      .map((item) => item.title || item.name || item.label)
      .filter(Boolean)

    return matched.length
      ? matched.slice(0, 4)
      : [
          `Tìm "${displayQuery}"`,
          'Khám tổng quát',
          'Grooming & Spa',
          'Sản phẩm chăm sóc thú cưng',
        ]
  }, [displayQuery, preview.results])
  const relatedProducts = useMemo(() => {
    const products = [
      ...preview.results.products,
      ...preview.results.suggestedProducts,
    ]

    return products.length
      ? products.slice(0, 2)
      : mockSearchApi({
          query: '',
          type: 'shopping',
          sort: 'relevant',
        }).results.products.slice(0, 2)
  }, [preview.results])

  const submitSearch = (value = displayQuery) => {
    const normalized = value.trim()
    if (!normalized) return
    onClose()
    navigate(`/search?q=${encodeURIComponent(normalized)}`)
  }

  return (
    <OverlayShell
      height={451}
      className="bg-[rgba(6,16,90,0.2)] backdrop-blur-[6px]"
    >
      <form
        className="flex h-[48px] w-full items-center justify-center bg-white px-[15px]"
        onSubmit={(event) => {
          event.preventDefault()
          submitSearch()
        }}
      >
        <div className="flex h-[32px] flex-1 items-center justify-between gap-[10px]">
          <div className="relative flex h-[32px] flex-1 items-center rounded-[8px] border border-[#FDD835] bg-white pl-[10px] pr-[8px] shadow-[0_1px_3px_rgba(13,71,161,0.08)]">
            <img
              src={mobileNavbarImages.dogSearch}
              alt=""
              className="mr-[8px] h-[18px] w-[20px] shrink-0 object-cover"
            />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Bạn muốn tìm gì nè?"
              className="min-w-0 flex-1 border-0 bg-transparent font-['Roboto'] text-[12px] leading-[1.66] tracking-[0.4px] text-[rgba(0,0,0,0.87)] placeholder:text-[rgba(0,0,0,0.38)] focus:outline-none"
              aria-label="Tìm kiếm"
            />
            <button
              type="submit"
              aria-label="Tìm"
              className="ml-[6px] flex h-[16px] w-[16px] shrink-0 items-center justify-center transition hover:scale-110 active:scale-95"
            >
              <img
                src={mobileNavbarImages.searchBlue}
                alt=""
                className="size-full"
              />
            </button>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng tìm kiếm"
            className="h-[14px] w-[18px] transition hover:scale-110 active:scale-95"
          >
            <img
              src={mobileNavbarImages.closeBlue}
              alt=""
              className="h-full w-full"
            />
          </button>
        </div>
      </form>

      <div className="flex h-[403px] w-full flex-col justify-end bg-[#FFFDE7] pt-[4px]">
        <section className="flex w-full flex-col gap-[12px] px-[16px] py-[10px]">
          <h2 className="font-['Roboto'] text-[16px] font-bold leading-[1.5] tracking-[0.15px] text-[#353535]">
            Gợi ý phù hợp
          </h2>
          <div className="flex flex-col gap-[8px]">
            {suggestions.map((suggestion, index) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => submitSearch(suggestion)}
                className={`flex h-[40px] w-full items-center gap-[12px] rounded-[8px] border-b border-[#E0E0E0] p-[8px] text-left transition-colors hover:bg-[#FFF59D] ${
                  index === 0 ? 'bg-[#FFF59D]' : ''
                }`}
              >
                <img
                  src={
                    index === 0
                      ? mobileNavbarImages.searchBlue
                      : mobileNavbarImages.searchBlack
                  }
                  alt=""
                  className="size-[18px]"
                />
                <span
                  className={`font-['Roboto'] text-[14px] italic leading-[24px] ${
                    index === 0 ? 'text-[#0D47A1]' : 'text-[rgba(0,0,0,0.87)]'
                  }`}
                >
                  {suggestion}
                </span>
              </button>
            ))}
          </div>
        </section>

        <section className="flex w-full flex-col gap-[12px] px-[16px] py-[10px]">
          <h2 className="font-['Roboto'] text-[16px] font-bold leading-[1.5] tracking-[0.15px] text-[#353535]">
            Sản phẩm liên quan
          </h2>
          <div className="flex w-full justify-center gap-[12px]">
            {relatedProducts.map((product, index) => (
              <Link
                key={product.id || product.name}
                to={`/search?q=${encodeURIComponent(product.name || displayQuery)}`}
                onClick={onClose}
                className={`flex h-[64px] min-w-0 flex-1 items-center gap-[12px] rounded-[8px] p-[8px] transition-shadow hover:shadow-[0_2px_8px_rgba(13,71,161,0.18)] ${
                  index === 0 ? 'bg-[#FFF9C4]' : 'bg-[#FFF59D]'
                }`}
              >
                <img
                  src={product.image || mobileNavbarImages.searchProduct}
                  alt=""
                  className="size-[48px] shrink-0 rounded-[8px] object-cover"
                />
                <span className="flex min-w-0 flex-1 flex-col">
                  <span className="truncate font-['Roboto'] text-[13px] leading-[19.5px] text-[rgba(0,0,0,0.87)]">
                    {product.name}
                  </span>
                  <span className="font-['Roboto'] text-[12px] leading-[18px] text-[#0D47A1]">
                    {formatVnd(product.price)}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </section>

        <div className="flex w-full justify-center px-[16px] py-[10px]">
          <button
            type="button"
            onClick={() => submitSearch(displayQuery)}
            className="flex h-[35px] w-full items-center justify-center rounded bg-[#F5F5F5] px-[24px] py-[24px] font-['Roboto'] text-[14px] font-semibold leading-[20px] tracking-[0.28px] text-[#0D47A1] transition-colors hover:bg-[#FDD835] active:scale-[0.98]"
          >
            Xem tất cả kết quả cho &quot;{displayQuery}&quot;
          </button>
        </div>
      </div>
    </OverlayShell>
  )
}

function NotificationMessage({ parts }) {
  const toneClass = {
    strong: 'font-semibold text-[#1B1C1D]',
    strongDark: 'font-semibold text-[rgba(0,0,0,0.87)]',
    brandStrong: 'font-semibold text-[#094CB2]',
  }

  return (
    <>
      {parts.map((part, index) => (
        <span key={`${part.text}-${index}`} className={toneClass[part.tone] || ''}>
          {part.text}
        </span>
      ))}
    </>
  )
}

function MobileNotificationVisual({ item }) {
  if (item.avatar) {
    return (
      <span className="relative flex size-[40px] shrink-0 items-center justify-center overflow-hidden rounded-[12px] bg-[#E3E2E3] shadow-[0_0_0_1px_rgba(195,198,213,0.2)]">
        <img
          src={item.avatar}
          alt={item.avatarAlt || ''}
          className="absolute max-w-none object-cover"
          style={{
            width: item.avatarCrop?.width || '100%',
            height: item.avatarCrop?.height || '100%',
            left: item.avatarCrop?.left || 0,
            top: item.avatarCrop?.top || 0,
          }}
        />
      </span>
    )
  }

  return (
    <span
      className={`flex size-[40px] shrink-0 items-center justify-center overflow-hidden rounded-[12px] ${
        item.type === 'system' ? 'bg-[#FFF176]' : 'bg-white'
      }`}
    >
      <img
        src={item.icon}
        alt={item.iconAlt || ''}
        className={item.type === 'appointment' ? 'h-[20px] w-[18px]' : 'size-[18px]'}
      />
    </span>
  )
}

function MobileNotificationOverlay({
  unreadCount,
  activeFilter,
  searchValue,
  items,
  isUnread,
  onClose,
  onFilterChange,
  onSearchChange,
  onRead,
  onReadAll,
}) {
  return (
    <OverlayShell
      height={451}
      className="bg-[rgba(6,16,90,0.2)] backdrop-blur-[6px]"
    >
      <div className="flex h-[48px] w-full items-center justify-between border-b border-[#ECEFF1] bg-white px-[16px]">
        <h2 className="font-['Roboto'] text-[16px] font-bold leading-[24px] text-[#353535]">
          Thông báo
          {unreadCount ? (
            <span className="ml-[6px] text-[#F45757]">({unreadCount})</span>
          ) : null}
        </h2>
        <div className="flex items-center gap-[14px]">
          <button
            type="button"
            onClick={onReadAll}
            disabled={!unreadCount}
            className="font-['Roboto'] text-[11px] font-semibold leading-[16px] text-[#094CB2] transition hover:underline disabled:opacity-40 disabled:hover:no-underline"
          >
            Đọc tất cả
          </button>
          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng thông báo"
            className="h-[14px] w-[18px] transition hover:scale-110 active:scale-95"
          >
            <img
              src={mobileNavbarImages.closeBlue}
              alt=""
              className="h-full w-full"
            />
          </button>
        </div>
      </div>

      <div className="flex h-[403px] w-full flex-col bg-white">
        <div className="flex h-[82px] flex-col justify-center gap-[8px] border-b border-[rgba(195,198,213,0.18)] px-[16px]">
          <label className="relative flex h-[30px] w-full items-center rounded bg-[#F5F3F4] shadow-[0_0_0_1px_rgba(195,198,213,0.2)]">
            <img
              src={mobileNavbarImages.searchBlack}
              alt=""
              className="ml-[12px] size-[14px] opacity-70"
            />
            <input
              value={searchValue}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Tìm thông báo"
              className="min-w-0 flex-1 border-0 bg-transparent px-[12px] font-['Roboto'] text-[12px] leading-[14px] text-[#434653] placeholder:text-[rgba(67,70,83,0.6)] focus:outline-none"
            />
          </label>
          <div className="flex gap-[8px]">
            {NOTIFICATION_FILTERS.map((filter) => (
              <button
                key={filter.id}
                type="button"
                onClick={() => onFilterChange(filter.id)}
                className={`min-h-[24px] rounded-[12px] px-[12px] font-['Roboto'] text-[11px] font-medium leading-[16px] transition hover:-translate-y-px ${
                  activeFilter === filter.id
                    ? 'bg-[#094CB2] font-bold text-white'
                    : 'bg-[#E9E8E9] text-[#434653] hover:bg-[#DFE8F6]'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        <div className="h-[321px] overflow-y-auto bg-[#F9FAFB]">
          {items.length ? (
            items.map((item) => {
              const unread = isUnread(item)

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onRead(item.id)}
                  className={`flex w-full items-start gap-[12px] border-b border-[rgba(195,198,213,0.78)] px-[16px] py-[14px] text-left transition hover:brightness-[0.985] ${
                    unread ? 'bg-[rgba(144,202,249,0.79)]' : 'bg-white'
                  }`}
                >
                  <MobileNotificationVisual item={item} />
                  <span className="flex min-w-0 flex-1 flex-col gap-[4px]">
                    <span className="font-['Roboto'] text-[13px] leading-[18px] text-[#1B1C1D]">
                      <NotificationMessage parts={item.messageParts} />
                    </span>
                    <span className="font-['Roboto'] text-[10px] font-medium uppercase leading-[14px] tracking-[0.2px] text-[#094CB2]">
                      {item.relativeTime}
                    </span>
                  </span>
                  {unread ? (
                    <span className="mt-[4px] size-[8px] shrink-0 rounded-full bg-[#F45757]" />
                  ) : null}
                </button>
              )
            })
          ) : (
            <div className="flex h-full items-center justify-center px-[24px] text-center font-['Roboto'] text-[13px] leading-[20px] text-[#737784]">
              Không có thông báo phù hợp.
            </div>
          )}
        </div>
      </div>
    </OverlayShell>
  )
}

function QuantityButton({ children, onClick, label }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex h-[18px] items-center justify-center font-['Josefin_Sans'] text-[20px] font-medium leading-none text-[#353535] transition-colors hover:text-[#0D47A1] active:scale-90"
    >
      {children}
    </button>
  )
}

function MobileCartItem({ item }) {
  const { toggleCartItem, removeCartItem, updateCartQty } = useCart()
  const selected = item.selected !== false

  return (
    <div className="flex h-[80px] w-full shrink-0 items-center gap-[10px] border-b border-[#E0E0E0]">
      <button
        type="button"
        onClick={() => toggleCartItem(item.id)}
        className="flex h-[40px] shrink-0 items-center overflow-hidden"
        aria-label="Chọn sản phẩm"
      >
        <span
          className={`flex size-[24px] items-center justify-center rounded-[4px] border transition-colors ${
            selected
              ? 'border-[#0D47A1] bg-[#0D47A1]'
              : 'border-transparent bg-transparent'
          }`}
        >
          {selected ? (
            <span className="block h-[11px] w-[7px] rotate-45 border-b-2 border-r-2 border-white" />
          ) : (
            <img
              src={mobileNavbarImages.checkbox}
              alt=""
              className="size-[24px]"
            />
          )}
        </span>
      </button>
      <img
        src={
          item.image ||
          item.imageUrl ||
          item.thumbnail ||
          mobileNavbarImages.cartProduct
        }
        alt=""
        className="size-[60px] shrink-0 scale-y-[-1] object-cover"
      />
      <div className="flex min-w-0 flex-1 flex-col items-center justify-center gap-[3px]">
        <div className="flex w-full items-start justify-between">
          <p className="mr-[-58px] w-[278px] font-['Roboto'] text-[12px] font-bold leading-[1.43] tracking-[0.17px] text-[#0D47A1]">
            {item.name || 'Hạt dinh dưỡng cao cấp Petsol'}
          </p>
          <button
            type="button"
            onClick={() => removeCartItem(item.id)}
            className="h-[15px] w-[14px] shrink-0 transition hover:scale-110 active:scale-95"
            aria-label="Xóa sản phẩm"
          >
            <img src={mobileNavbarImages.bin} alt="" className="size-full" />
          </button>
        </div>
        <div className="flex w-full items-center justify-between text-[#353535]">
          <p className="whitespace-nowrap font-['Roboto'] text-[12px] font-bold leading-[1.43] tracking-[0.17px]">
            {formatVnd(item.price)}
          </p>
          <div className="flex h-[20px] w-[56px] items-center justify-between rounded border border-[#353535] px-[8px] text-center">
            <QuantityButton
              label="Giảm số lượng"
              onClick={() => updateCartQty(item.id, -1)}
            >
              -
            </QuantityButton>
            <span className="font-['Josefin_Sans'] text-[13px] font-medium leading-none">
              {item.qty || 1}
            </span>
            <QuantityButton
              label="Tăng số lượng"
              onClick={() => updateCartQty(item.id, 1)}
            >
              +
            </QuantityButton>
          </div>
        </div>
        <div className="flex w-full items-center gap-[40px] whitespace-nowrap font-['Roboto'] text-[10px] leading-[1.66] tracking-[0.4px] text-[#353535]">
          <span>Loại: {item.type || 'màu xanh'}</span>
          <span>Kích cỡ: {item.size || '1,5kg'}</span>
        </div>
      </div>
    </div>
  )
}

function MobileCartOverlay({ onClose }) {
  const { cartItems, openCheckout } = useCart()
  const selectedItems = cartItems.filter((item) => item.selected !== false)
  const subtotal = useMemo(() => {
    return formatVnd(
      selectedItems.reduce(
        (total, item) => total + getNumericPrice(item.price) * (item.qty || 1),
        0,
      ),
    )
  }, [selectedItems])

  const handleCheckout = () => {
    if (!selectedItems.length) return
    onClose()
    openCheckout()
  }

  return (
    <OverlayShell height={628} className="bg-white">
      <aside
        className="flex size-full flex-col items-center justify-center bg-white"
        role="dialog"
        aria-label="Giỏ hàng"
      >
        <div className="flex h-[48px] w-full flex-col items-center justify-center px-[10px] py-[20px]">
          <div className="flex w-full items-center justify-between pr-[10px]">
            <p className="whitespace-nowrap font-['Roboto'] text-[16px] font-bold leading-[1.5] tracking-[0.15px] text-[#353535]">
              Giỏ hàng{' '}
              <span className="text-[#F45757]">({cartItems.length})</span>
            </p>
            <div className="size-[30px]" />
            <button
              type="button"
              onClick={onClose}
              className="h-[14px] w-[18px] transition hover:scale-110 active:scale-95"
              aria-label="Đóng giỏ hàng"
            >
              <img
                src={mobileNavbarImages.closeBlue}
                alt=""
                className="h-full w-full"
              />
            </button>
          </div>
        </div>

        <div className="flex w-full flex-col items-center bg-[#FFFDE7]">
          <div className="flex h-[480px] w-[340px] flex-col items-start overflow-y-auto overflow-x-hidden">
            {cartItems.length ? (
              cartItems.map((item) => <MobileCartItem key={item.id} item={item} />)
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center px-[28px] text-center">
                <img
                  src={mobileNavbarImages.cart}
                  alt=""
                  className="mb-[14px] size-[32px] opacity-45"
                />
                <p className="font-['Roboto'] text-[14px] font-bold leading-[20px] text-[#0D47A1]">
                  Giỏ hàng của bạn đang trống
                </p>
                <p className="mt-[6px] font-['Roboto'] text-[12px] leading-[18px] text-[#475569]">
                  Thêm sản phẩm vào giỏ, tụi mình sẽ cập nhật ngay tại đây.
                </p>
              </div>
            )}
          </div>

          <div className="flex h-[100px] w-full items-start bg-[#FFFDE7] px-[10px] py-[20px]">
            <div className="flex h-[60px] w-full items-center justify-center gap-[24px] rounded bg-[#FAFAFA] p-[24px]">
              <div className="flex h-[20px] min-w-0 flex-1 items-center gap-[20px] font-['Roboto'] text-[16px] font-bold leading-[1.5] tracking-[0.15px]">
                <span className="whitespace-nowrap text-[rgba(0,0,0,0.87)]">
                  Tạm tính:
                </span>
                <span className="min-w-0 flex-1 text-[#F45757]">
                  {subtotal}
                </span>
              </div>
              <button
                type="button"
                onClick={handleCheckout}
                disabled={!selectedItems.length}
                className="flex h-[30px] w-[112px] shrink-0 items-center justify-center rounded bg-[#FFF176] px-[10px] py-[4px] shadow-elevation transition-colors hover:bg-[#0D47A1] hover:text-white active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:bg-[#FFF176] disabled:hover:text-inherit"
              >
                <span className="whitespace-nowrap font-['Roboto'] text-[12px] font-bold uppercase leading-[22px] tracking-[0.46px]">
                  Đặt hàng
                </span>
              </button>
            </div>
          </div>
        </div>
      </aside>
    </OverlayShell>
  )
}

function MobileNavBar({ isAuthenticated = false, avatarSrc }) {
  const [activeOverlay, setActiveOverlay] = useState(null)
  const [activeNotificationFilter, setActiveNotificationFilter] = useState('all')
  const [notificationSearch, setNotificationSearch] = useState('')
  const [readNotificationIds, setReadNotificationIds] = useState(() =>
    NOTIFICATION_ITEMS.filter((item) => !item.unread).map((item) => item.id),
  )
  const unreadNotificationIds = useMemo(
    () =>
      NOTIFICATION_ITEMS.filter(
        (item) => !readNotificationIds.includes(item.id),
      ).map((item) => item.id),
    [readNotificationIds],
  )
  const filteredNotifications = useMemo(() => {
    const normalizedSearch = notificationSearch
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim()

    return NOTIFICATION_ITEMS.filter((item) => {
      const unread = !readNotificationIds.includes(item.id)

      if (activeNotificationFilter === 'unread' && !unread) return false
      if (activeNotificationFilter === 'read' && unread) return false
      if (!normalizedSearch) return true

      return item.searchableText
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .includes(normalizedSearch)
    })
  }, [activeNotificationFilter, notificationSearch, readNotificationIds])
  const notificationCount = unreadNotificationIds.length

  const markAllNotificationsRead = () => {
    setReadNotificationIds(NOTIFICATION_ITEMS.map((item) => item.id))
  }

  const closeNotifications = () => {
    markAllNotificationsRead()
    setActiveOverlay(null)
  }

  const openOverlay = (overlay) => {
    setActiveOverlay(overlay)
  }

  return (
    <>
      <MobileHeader
        isAuthenticated={isAuthenticated}
        avatarSrc={avatarSrc}
        notificationCount={notificationCount}
        onSearch={() => openOverlay('search')}
        onNotifications={() => openOverlay('notifications')}
        onCart={() => openOverlay('cart')}
        onMenu={() => openOverlay('menu')}
      />
      <div className="h-[48px] shrink-0 lg:hidden" aria-hidden="true" />

      {activeOverlay === 'menu' ? (
        <MobileMenuOverlay onClose={() => setActiveOverlay(null)} />
      ) : null}
      {activeOverlay === 'search' ? (
        <MobileSearchOverlay onClose={() => setActiveOverlay(null)} />
      ) : null}
      {activeOverlay === 'cart' ? (
        <MobileCartOverlay onClose={() => setActiveOverlay(null)} />
      ) : null}
      {activeOverlay === 'notifications' ? (
        <MobileNotificationOverlay
          unreadCount={notificationCount}
          activeFilter={activeNotificationFilter}
          searchValue={notificationSearch}
          items={filteredNotifications}
          isUnread={(item) => !readNotificationIds.includes(item.id)}
          onClose={closeNotifications}
          onFilterChange={setActiveNotificationFilter}
          onSearchChange={setNotificationSearch}
          onRead={(id) =>
            setReadNotificationIds((current) =>
              current.includes(id) ? current : [...current, id],
            )
          }
          onReadAll={markAllNotificationsRead}
        />
      ) : null}
    </>
  )
}

export default MobileNavBar
