import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { productImages } from "../../assets/productImages";
import {
  formatCurrency,
  formatOrderDate,
  getOrderSubtotal,
  getOrderTotal,
  ORDER_FILTERS,
  ORDER_STATUS,
} from "../../data/orderData";
import { getMyOrders, getOrderDetails } from "../../services/orderService";
import { addCartItem } from "../../services/cartService";

const STATUS_STEPS = ["processing", "shipping", "delivered"];

const shiftDate = (value, days) => {
  const date = new Date(value);
  date.setDate(date.getDate() + days);
  return date;
};

const getStepDateLabel = (order, step) => {
  if (step === "processing") return formatOrderDate(order.orderedAt, false);
  if (!order.estimatedDelivery) return "Đang cập nhật";
  if (step === "shipping") return formatOrderDate(shiftDate(order.estimatedDelivery, -1), false);
  return order.status === "delivered"
    ? formatOrderDate(order.estimatedDelivery, false)
    : `Dự kiến ${formatOrderDate(order.estimatedDelivery, false)}`;
};

function YellowButton({ children, className = "", ...props }) {
  return (
    <button
      type="button"
      {...props}
      className={`h-[38px] rounded-[4px] bg-[#FFF176] px-[22px] text-[15px] font-medium uppercase tracking-[0.46px] shadow-elevation transition-colors hover:bg-[#FDD835] disabled:cursor-not-allowed disabled:bg-[#E4E7EC] disabled:text-[#98A2B3] disabled:shadow-none ${className}`}
    >
      {children}
    </button>
  );
}

function PaymentCountdown({ expiresAt, onExpire }) {
  const getRemainingSeconds = () =>
    Math.max(0, Math.floor((new Date(expiresAt).getTime() - Date.now()) / 1000));
  const [remainingSeconds, setRemainingSeconds] = useState(getRemainingSeconds);

  useEffect(() => {
    const updateRemaining = () => {
      const nextRemaining = getRemainingSeconds();
      setRemainingSeconds(nextRemaining);
      if (nextRemaining === 0) onExpire?.();
    };

    updateRemaining();
    const intervalId = window.setInterval(updateRemaining, 1000);
    return () => window.clearInterval(intervalId);
  }, [expiresAt, onExpire]);

  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;

  return (
    <span className={`text-[12px] font-medium ${remainingSeconds ? "text-[#C62828]" : "text-[#667085]"}`}>
      {remainingSeconds
        ? `Thanh toán trong ${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
        : "Đã hết thời gian thanh toán"}
    </span>
  );
}

function OutlineButton({ children, className = "", ...props }) {
  return (
    <button
      type="button"
      {...props}
      className={`h-[38px] rounded-[4px] border border-[#353535] px-[18px] text-[15px] font-medium uppercase transition-colors hover:bg-black/5 ${className}`}
    >
      {children}
    </button>
  );
}

function ProductSummary({ product, large = false }) {
  return (
    <div className={`flex items-center gap-[10px] ${large ? "min-h-[100px] w-full" : "h-[100px] w-[372px]"}`}>
      <img src={product.image || productImages.detailImage} alt={product.name} className="h-20 w-20 shrink-0 object-cover" />
      <div className="flex min-w-0 flex-1 flex-col gap-[8px]">
        <strong className={`${large ? "text-[20px]" : "text-[14px]"} line-clamp-2 text-[#0D47A1]`}>
          {product.name}
        </strong>
        <strong className="text-[14px] text-[#353535]">{formatCurrency(product.price)}</strong>
        <div className="flex flex-wrap gap-x-6 text-[12px] text-[#353535]">
          <span>Loại: {product.variant}</span>
          <span>Kích cỡ: {product.size}</span>
          <span>{large ? `x ${product.quantity}` : `Số lượng: ${product.quantity}`}</span>
        </div>
      </div>
    </div>
  );
}

function OrderActions({
  order,
  onNavigate,
  onPaymentUnavailable,
  onCancelUnavailable,
  onReviewUnavailable,
  onReorder,
  paymentExpired,
  isActionLoading,
}) {
  const stopAndRun = (callback) => (event) => {
    event.stopPropagation();
    callback?.();
  };

  if (order.status === "awaiting_payment") {
    return (
      <YellowButton onClick={stopAndRun(onPaymentUnavailable)} disabled={paymentExpired || isActionLoading}>
        Thanh toán
      </YellowButton>
    );
  }

  if (order.status === "processing") {
    return (
      <>
        <YellowButton onClick={stopAndRun(onNavigate)}>Theo dõi</YellowButton>
        <OutlineButton
          onClick={stopAndRun(onCancelUnavailable)}
          className="border-[#C62828] text-[#C62828]"
          disabled={isActionLoading}
        >
          Hủy đơn
        </OutlineButton>
      </>
    );
  }

  if (order.status === "shipping") {
    return <YellowButton onClick={stopAndRun(onNavigate)}>Theo dõi</YellowButton>;
  }

  if (order.status === "delivered") {
    return (
      <>
        <YellowButton onClick={stopAndRun(onReviewUnavailable)} disabled={isActionLoading}>
          Đánh giá
        </YellowButton>
        <OutlineButton onClick={stopAndRun(onReorder)} disabled={isActionLoading}>
          {isActionLoading ? "Đang thêm..." : "Đặt lại"}
        </OutlineButton>
      </>
    );
  }

  return (
    <OutlineButton onClick={stopAndRun(onReorder)} disabled={isActionLoading}>
      {isActionLoading ? "Đang thêm..." : "Đặt lại"}
    </OutlineButton>
  );
}

function OrderCard({ order, actionMessage, actionMessageType, onActionMessage, isActionLoading, onReorder }) {
  const navigate = useNavigate();
  const [paymentExpired, setPaymentExpired] = useState(
    order.status === "awaiting_payment" && new Date(order.paymentExpiresAt).getTime() <= Date.now(),
  );
  const status = ORDER_STATUS[order.status];
  const openDetails = () => navigate(`/don-hang-cua-toi/${order.id}`);
  const showUnavailableMessage = (message) => onActionMessage(message, "info");

  return (
    <article className="rounded-[16px] border border-[#C2C6D4] bg-white px-[21px] py-[11px] transition hover:border-[#1976D2] hover:shadow-md">
      <div
        role="link"
        tabIndex={0}
        onClick={openDetails}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") openDetails();
        }}
        className="flex min-h-[162px] w-full cursor-pointer items-center justify-between"
      >
        <div className="w-[372px]">
          <div className="flex justify-between text-[14px]">
            <strong>Mã đơn hàng: {order.id}</strong>
            <span>{formatOrderDate(order.orderedAt)}</span>
          </div>
          <ProductSummary product={order.products[0]} />
          {order.products.length > 1 && (
            <span className="text-[12px]">+ {order.products.length - 1} sản phẩm</span>
          )}
        </div>
        <div className="flex w-[205px] flex-col items-center gap-[10px]">
          <strong className="text-[20px] text-[#C62828]">{formatCurrency(getOrderTotal(order))}</strong>
          <span className={`rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.55px] ${status.badgeClass}`}>
            {status.label}
          </span>
          {order.status === "awaiting_payment" && (
            <PaymentCountdown expiresAt={order.paymentExpiresAt} onExpire={() => setPaymentExpired(true)} />
          )}
        </div>
        <div className="flex w-[230px] justify-end gap-2">
          <OrderActions
            order={order}
            onNavigate={openDetails}
            onPaymentUnavailable={() =>
              showUnavailableMessage("Backend hiện chưa có API thanh toán lại đơn hàng đang chờ thanh toán.")
            }
            onCancelUnavailable={() =>
              showUnavailableMessage("Backend hiện chưa mở API hủy đơn cho khách hàng.")
            }
            onReviewUnavailable={() =>
              showUnavailableMessage("Mục đánh giá từ trang đơn hàng mình sẽ nối tiếp khi chốt luồng review sản phẩm.")
            }
            onReorder={() => onReorder(order)}
            paymentExpired={paymentExpired}
            isActionLoading={isActionLoading}
          />
        </div>
      </div>
      {actionMessage ? (
        <p className={`mt-3 text-[14px] ${actionMessageType === "error" ? "text-[#D32F2F]" : "text-[#667085]"}`}>
          {actionMessage}
        </p>
      ) : null}
    </article>
  );
}

function SearchAndSort({
  searchInput,
  onSearchInputChange,
  onSearch,
  sortOrder,
  onSortChange,
}) {
  return (
    <form
      className="flex gap-[10px]"
      onSubmit={(event) => {
        event.preventDefault();
        onSearch();
      }}
    >
      <label className="flex h-[52px] min-w-0 flex-1 items-center justify-between rounded-[42px] border border-[rgba(25,118,210,0.5)] bg-white/80 py-2 pl-5 pr-2">
        <input
          value={searchInput}
          onChange={(event) => onSearchInputChange(event.target.value)}
          placeholder="Tìm kiếm theo Mã đơn hàng, Thời gian đặt hàng hoặc tên sản phẩm"
          className="min-w-0 flex-1 bg-transparent text-[15px] text-[#5F5F5F] outline-none placeholder:text-[#5F5F5F]"
        />
        <button
          type="submit"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition hover:bg-[#FFF176]"
          aria-label="Tìm kiếm đơn hàng"
        >
          <img src={productImages.searchIcon} alt="" className="h-6 w-6" />
        </button>
      </label>
      <label className="flex h-[52px] w-[170px] cursor-pointer items-center gap-[8px] rounded-[42px] border border-[rgba(25,118,210,0.5)] bg-white px-[14px]">
        <svg className="h-4 w-[18px] shrink-0 text-[#414141]" viewBox="0 0 18 12" aria-hidden="true">
          <path d="M1 1h16M1 6h10M1 11h5" stroke="currentColor" strokeWidth="1.5" />
        </svg>
        <select
          value={sortOrder}
          onChange={(event) => onSortChange(event.target.value)}
          className="w-full cursor-pointer appearance-none bg-transparent text-center text-[14px] font-medium outline-none"
          aria-label="Sắp xếp đơn hàng"
        >
          <option value="newest">Mới nhất</option>
          <option value="oldest">Cũ nhất</option>
        </select>
      </label>
    </form>
  );
}

export function MyOrdersPage() {
  const [ordersData, setOrdersData] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [activeOrderId, setActiveOrderId] = useState("");
  const [actionFeedback, setActionFeedback] = useState({});
  const navigate = useNavigate();

  const updateActionFeedback = (orderId, message, type = "info") => {
    setActionFeedback((current) => ({
      ...current,
      [orderId]: { message, type },
    }));
  };

  const handleReorder = async (order) => {
    const validItems = order.products.filter((product) => product.productId);
    if (!validItems.length) {
      updateActionFeedback(order.id, "Không thể đặt lại vì đơn hàng này không còn dữ liệu sản phẩm hợp lệ.", "error");
      return;
    }

    setActiveOrderId(order.id);
    updateActionFeedback(order.id, "");

    try {
      await Promise.all(
        validItems.map((product) =>
          addCartItem({
            productId: product.productId,
            variantId: product.variantId,
            qty: product.quantity,
          }),
        ),
      );

      updateActionFeedback(order.id, "Đã thêm lại sản phẩm vào giỏ hàng.");
      navigate("/gio-hang");
    } catch (error) {
      updateActionFeedback(order.id, error?.message || "Không thể thêm lại sản phẩm vào giỏ hàng.", "error");
    } finally {
      setActiveOrderId("");
    }
  };

  useEffect(() => {
    let active = true;
    setIsLoading(true);
    setLoadError("");

    getMyOrders()
      .then((orders) => {
        if (active) setOrdersData(orders);
      })
      .catch((error) => {
        if (!active) return;
        setOrdersData([]);
        setLoadError(error?.message || "Không thể tải danh sách đơn hàng.");
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const orders = useMemo(() => {
    const normalizedSearch = searchQuery.trim().toLocaleLowerCase("vi");
    const result = ordersData.filter((order) => {
      if (filter !== "all" && order.status !== filter) return false;
      if (!normalizedSearch) return true;
      const searchableText = [
        order.id,
        formatOrderDate(order.orderedAt),
        ...order.products.map((product) => product.name),
      ]
        .join(" ")
        .toLocaleLowerCase("vi");
      return searchableText.includes(normalizedSearch);
    });

    return [...result].sort((a, b) =>
      sortOrder === "oldest"
        ? new Date(a.orderedAt) - new Date(b.orderedAt)
        : new Date(b.orderedAt) - new Date(a.orderedAt),
    );
  }, [filter, ordersData, searchQuery, sortOrder]);

  return (
    <div className="mx-auto flex w-full max-w-[943px] flex-col gap-6 pb-10">
      <div className="flex flex-col gap-1">
        <h1 className="text-[28px] font-bold leading-9 text-[#031635]">Đơn hàng của tôi</h1>
        <p className="text-[15px] leading-6 text-[#667085]">
          Quản lý đơn hàng, theo dõi vận chuyển và xem lại hóa đơn mua sắm của bạn.
        </p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 pt-2">
        {ORDER_FILTERS.map(({ value, label }) => {
          const count = value === "all" ? ordersData.length : ordersData.filter((order) => order.status === value).length;
          return (
            <button
              key={value}
              type="button"
              onClick={() => setFilter(value)}
              className={`shrink-0 rounded-full px-6 py-2 text-[14px] font-semibold ${
                filter === value
                  ? "bg-[#0D47A1] text-white shadow-md"
                  : "border border-[#C2C6D4] bg-white text-[#424752]"
              }`}
            >
              {label} ({count})
            </button>
          );
        })}
      </div>
      <SearchAndSort
        searchInput={searchInput}
        onSearchInputChange={setSearchInput}
        onSearch={() => setSearchQuery(searchInput.trim())}
        sortOrder={sortOrder}
        onSortChange={setSortOrder}
      />
      {searchQuery && (
        <p className="text-[16px] leading-[27px] text-[#414141]">
          Kết quả tìm kiếm cho &quot;{searchQuery}&quot;
        </p>
      )}
      <div className="flex flex-col gap-4">
        {isLoading ? (
          <p className="py-16 text-center text-[#0D47A1]">Đang tải đơn hàng...</p>
        ) : loadError ? (
          <p className="py-16 text-center text-[#D32F2F]">{loadError}</p>
        ) : orders.length ? (
          orders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              actionMessage={actionFeedback[order.id]?.message}
              actionMessageType={actionFeedback[order.id]?.type}
              onActionMessage={(message, type) => updateActionFeedback(order.id, message, type)}
              isActionLoading={activeOrderId === order.id}
              onReorder={handleReorder}
            />
          ))
        ) : (
          <p className="py-16 text-center text-[#667085]">Không tìm thấy đơn hàng phù hợp.</p>
        )}
      </div>
    </div>
  );
}

function InvoiceModal({ order, onClose }) {
  const downloadInvoice = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30 p-5 backdrop-blur-sm" onClick={onClose}>
      <div className="max-h-full w-[595px] overflow-y-auto bg-white p-[10px]" onClick={(event) => event.stopPropagation()}>
        <div className="border border-[#CACACA] p-[21px] text-black">
          <div className="flex items-start justify-between border-b border-[#CACACA] pb-5">
            <div>
              <p className="text-[18px] text-[#726C6C]">Người nhận</p>
              <h2 className="mt-2 text-[24px] font-medium">{order.recipient.name}</h2>
              <p className="mt-2 max-w-[300px] text-[15px] text-[#726C6C]">{order.recipient.address}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={downloadInvoice}
                className="inline-flex h-9 items-center gap-2 rounded-[4px] bg-[#FFF176] px-3 text-[13px] font-bold transition-colors hover:bg-[#FDD835]"
              >
                <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M10 2v10m0 0 4-4m-4 4L6 8M3 14v3h14v-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Tải xuống
              </button>
              <button type="button" onClick={onClose} className="text-2xl" aria-label="Đóng hóa đơn">×</button>
            </div>
          </div>
          <h3 className="mt-4 text-[20px] font-semibold">Chi tiết đơn hàng #{order.id}</h3>
          <p className="mt-1 text-[14px] text-[#726C6C]">Ngày đặt: {formatOrderDate(order.orderedAt)}</p>
          <table className="mt-5 w-full text-left text-[14px]">
            <thead className="bg-[#F0F0F0]">
              <tr><th className="p-2">Sản phẩm</th><th className="p-2">Đơn giá</th><th className="p-2">SL</th><th className="p-2">Thành tiền</th></tr>
            </thead>
            <tbody className="text-[#726C6C]">
              {order.products.map((product) => (
                <tr key={product.id} className="border-b border-[#E5E5E5]">
                  <td className="px-2 py-4">{product.name}</td>
                  <td className="px-2 py-4">{formatCurrency(product.price)}</td>
                  <td className="px-2 py-4">{product.quantity}</td>
                  <td className="px-2 py-4">{formatCurrency(product.price * product.quantity)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 space-y-2 text-[15px]">
            <p className="flex justify-between"><span>Tạm tính</span><span>{formatCurrency(getOrderSubtotal(order))}</span></p>
            <p className="flex justify-between"><span>Phí vận chuyển</span><span>{formatCurrency(order.shippingFee)}</span></p>
            <p className="flex justify-between"><span>Giảm giá</span><span>-{formatCurrency(order.discount)}</span></p>
            <p className="flex justify-between border-t-2 border-[#CACACA] pt-3 text-[20px] font-semibold"><span>Tổng cộng</span><span>{formatCurrency(getOrderTotal(order))}</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function OrderDetailsPage() {
  const { orderId } = useParams();
  const [invoiceOpen, setInvoiceOpen] = useState(false);
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    let active = true;
    setIsLoading(true);
    setLoadError("");

    getOrderDetails(orderId)
      .then((detail) => {
        if (active) setOrder(detail);
      })
      .catch((error) => {
        if (!active) return;
        setOrder(null);
        setLoadError(error?.message || "Không thể tải chi tiết đơn hàng.");
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, [orderId]);

  if (isLoading) {
    return (
      <div className="mx-auto w-full max-w-[960px] py-16 text-center text-[#0D47A1]">
        Đang tải chi tiết đơn hàng...
      </div>
    );
  }

  if (loadError || !order) {
    return (
      <div className="mx-auto w-full max-w-[960px] py-16 text-center">
        <h1 className="text-2xl font-bold">{loadError || "Không tìm thấy đơn hàng"}</h1>
        <Link to="/don-hang-cua-toi" className="mt-4 inline-block text-[#0D47A1]">Quay lại danh sách đơn hàng</Link>
      </div>
    );
  }

  const activeStep = STATUS_STEPS.indexOf(order.status);

  return (
    <div className="mx-auto w-full max-w-[960px] pb-10">
      <div className="flex items-center gap-3 mb-5 flex-shrink-0">
        <Link 
          to="/don-hang-cua-toi"
          className="text-slate-500 hover:text-slate-900 transition"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </Link>
        <h1 className="text-2xl font-bold text-slate-900">Chi tiết đơn hàng</h1>
      </div>
      <section className="rounded-[14px] bg-white px-6 py-[30px]">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-[32px] font-bold text-[#344054]">Mã đơn hàng: {order.id}</h1>
            <span className={`mt-2 inline-block rounded-full px-3 py-1 text-[11px] font-bold uppercase ${ORDER_STATUS[order.status].badgeClass}`}>
              {ORDER_STATUS[order.status].label}
            </span>
          </div>
          <button onClick={() => setInvoiceOpen(true)} className="rounded border border-[#D0D5DD] px-4 py-2 text-[14px] font-bold text-[#667085]">📄Hóa đơn</button>
        </div>
        <div className="mt-5 flex gap-5 text-[14px] text-[#667085]">
          <span>Ngày đặt hàng: <strong className="text-[#1D2939]">{formatOrderDate(order.orderedAt)}</strong></span>
          {order.estimatedDelivery && <span className="text-[#12B76A]">Giao hàng dự kiến: {formatOrderDate(order.estimatedDelivery, false)}</span>}
        </div>
        {order.status !== "cancelled" && order.status !== "awaiting_payment" && (
          <div className="relative mt-7 h-[92px]">
            <div className="absolute left-[16.666%] right-[16.666%] top-[41px] h-1 rounded-[2px] bg-[#D0D5DD]">
              <div
                className="h-full rounded-[2px] bg-[#12B76A] transition-[width] duration-300"
                style={{ width: `${Math.max(0, activeStep) / (STATUS_STEPS.length - 1) * 100}%` }}
              />
            </div>
            <div className="relative flex h-full">
              {STATUS_STEPS.map((step, index) => {
                const completed = index <= activeStep;
                return (
                  <div key={step} className="grid flex-1 grid-rows-[28px_32px_24px] place-items-center text-center">
                    <span className={`text-[18px] font-medium leading-7 ${completed ? "text-[#12B76A]" : "text-[#D0D5DD]"}`}>
                      {ORDER_STATUS[step].label}
                    </span>
                    <span className={`z-10 h-[22px] w-[22px] rounded-full ${completed ? "bg-[#12B76A]" : "bg-[#D0D5DD]"}`} />
                    <span className="whitespace-nowrap text-[16px] leading-6 text-[#667085]">
                      {getStepDateLabel(order, step)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        <div className="mt-7 space-y-5">{order.products.map((product) => <ProductSummary key={product.id} product={product} large />)}</div>
        <div className="mt-6 grid grid-cols-2 gap-12 border-y border-[#D0D5DD] py-6">
          <div><h3 className="text-[20px] font-medium text-[#0D47A1]">Phương thức thanh toán</h3><p className="mt-2 text-[14px] text-[#667085]">{order.paymentMethod}</p></div>
          <div><h3 className="text-[20px] font-medium text-[#0D47A1]">Vận chuyển</h3><p className="mt-2 text-[16px] text-[#0D47A1]">Người nhận</p><p className="text-[14px] text-[#667085]">{order.recipient.name} | {order.recipient.phone}</p><p className="mt-2 text-[16px] text-[#0D47A1]">Địa chỉ</p><p className="text-[14px] text-[#667085]">{order.recipient.address}</p></div>
        </div>
        <div className="grid grid-cols-2 gap-12 py-6">
          <div><h3 className="text-[20px] font-medium">Cần hỗ trợ</h3>
            <p className="mt-3 text-[#667085]">ⓘ Liên hệ ↗</p>
            <p className="mt-3 text-[#667085]">📦Chính sách đổi trả ↗</p>
          </div>
          <div>
            <h3 className="text-[20px] font-medium text-[#0D47A1]">Tóm tắt đơn hàng</h3>
            {[["Tạm tính", getOrderSubtotal(order)], ["Phí vận chuyển", order.shippingFee], ["Giảm giá", -order.discount]].map(([label, value]) => <div key={label} className="mt-3 flex justify-between text-[#727780]"><span>{label}</span><span className="text-[#191C1E]">{formatCurrency(value)}</span></div>)}
            <div className="mt-3 flex justify-between border-t pt-3 text-[20px] font-bold text-[#00355F]"><span>Tổng cộng<small className="block text-[12px] font-normal text-black/40">(Đã bao gồm thuế VAT)</small></span><span>{formatCurrency(getOrderTotal(order))}</span></div>
          </div>
        </div>
      </section>
      {invoiceOpen && <InvoiceModal order={order} onClose={() => setInvoiceOpen(false)} />}
    </div>
  );
}
