import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { createPortal } from "react-dom";

const DecisionModalContext = createContext(null);

const DEFAULT_COPY = {
  delete: {
    title: "XÁC NHẬN XÓA",
    message: "Bạn chắc chắn muốn xóa?\nHành động này không thể hoàn tác",
    confirmLabel: "Xóa",
    variant: "danger",
  },
  cancel: {
    title: "XÁC NHẬN HỦY",
    message: "Bạn chắc chắn muốn hủy?\nHành động này không thể hoàn tác",
    confirmLabel: "Hủy",
    variant: "danger",
  },
  success: {
    title: "THÀNH CÔNG",
    message: "Đã xóa dữ liệu thành công.\nBạn có thể tiếp tục hoặc quay về trang chủ",
    cancelLabel: "Quay về Trang chủ",
    confirmLabel: "Tiếp tục",
    variant: "success",
  },
};

const initialState = {
  open: false,
  type: "delete",
  title: "",
  message: "",
  cancelLabel: "",
  confirmLabel: "",
  onConfirm: null,
  onCancel: null,
};

function WarningMark({ type }) {
  const isSuccess = type === "success";

  return (
    <div className="decision-modal__icon-wrap" aria-hidden="true">
      <span className="decision-modal__icon-glow" />
      <span className="decision-modal__icon-tile">
        {isSuccess ? (
          <svg width="42" height="42" viewBox="0 0 42 42" fill="none">
            <circle cx="21" cy="21" r="17" fill="#4CAF50" />
            <path
              d="M13.6 21.2L18.5 26.1L29.2 15.4"
              stroke="white"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path d="M20 5L36 33H4L20 5Z" fill="#FFB400" />
            <path d="M20 15V22" stroke="white" strokeWidth="4" strokeLinecap="round" />
            <circle cx="20" cy="28" r="2.2" fill="white" />
          </svg>
        )}
      </span>
      <span className={`decision-modal__paw ${isSuccess ? "decision-modal__paw--success" : ""}`}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path
            d="M19.08 15.72C18.49 12.19 15.1 9.32 11.52 9.32C7.63 9.32 4.21 12.47 3.88 16.35C3.75 17.85 4.23 19.27 5.22 20.34C6.2 21.41 7.58 22 9.08 22H13.76C15.45 22 16.93 21.34 17.94 20.15C18.95 18.96 19.35 17.38 19.08 15.72Z"
            fill="currentColor"
          />
          <path d="M10.28 7.86C11.9 7.86 13.21 6.55 13.21 4.93C13.21 3.31 11.9 2 10.28 2C8.66 2 7.35 3.31 7.35 4.93C7.35 6.55 8.66 7.86 10.28 7.86Z" fill="currentColor" />
          <path d="M16.94 9.03C18.29 9.03 19.38 7.94 19.38 6.59C19.38 5.24 18.29 4.15 16.94 4.15C15.59 4.15 14.5 5.24 14.5 6.59C14.5 7.94 15.59 9.03 16.94 9.03Z" fill="currentColor" />
          <path d="M20.55 12.93C21.63 12.93 22.5 12.06 22.5 10.98C22.5 9.9 21.63 9.03 20.55 9.03C19.47 9.03 18.6 9.9 18.6 10.98C18.6 12.06 19.47 12.93 20.55 12.93Z" fill="currentColor" />
          <path d="M3.94 10.98C5.29 10.98 6.38 9.89 6.38 8.54C6.38 7.19 5.29 6.1 3.94 6.1C2.59 6.1 1.5 7.19 1.5 8.54C1.5 9.89 2.59 10.98 3.94 10.98Z" fill="currentColor" />
        </svg>
      </span>
    </div>
  );
}

function DecisionModal({ state, onClose, onCancel, onConfirm }) {
  if (!state.open) return null;

  const isSuccess = state.type === "success";

  return createPortal(
    <div className="decision-modal__overlay" role="presentation">
      <section
        className="decision-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="decision-modal-title"
        aria-describedby="decision-modal-message"
      >
        <button
          type="button"
          className="decision-modal__close"
          onClick={onClose}
          aria-label="Đóng popup"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        <div className={isSuccess ? "decision-modal__success-body" : "decision-modal__body"}>
          <WarningMark type={state.type} />

          <div className={isSuccess ? "decision-modal__copy decision-modal__copy--success" : "decision-modal__copy"}>
            <h2 id="decision-modal-title">{state.title}</h2>
            <p id="decision-modal-message">{state.message}</p>
          </div>

          <div className="decision-modal__actions">
            <button
              type="button"
              className={isSuccess ? "decision-modal__button decision-modal__button--yellow-outline" : "decision-modal__button decision-modal__button--outline"}
              onClick={onCancel}
            >
              {state.cancelLabel}
            </button>
            <button
              type="button"
              className={isSuccess ? "decision-modal__button decision-modal__button--yellow" : "decision-modal__button decision-modal__button--danger"}
              onClick={onConfirm}
            >
              {state.confirmLabel}
            </button>
          </div>
        </div>
      </section>
    </div>,
    document.body,
  );
}

export function DecisionModalProvider({ children }) {
  const [state, setState] = useState(initialState);

  const closeModal = useCallback(() => {
    setState(initialState);
  }, []);

  const cancelModal = useCallback(() => {
    setState((current) => {
      if (current.type === "success" && !current.onCancel) {
        window.location.href = "/";
      } else {
        current.onCancel?.();
      }
      return initialState;
    });
  }, []);

  const confirmModal = useCallback(() => {
    setState((current) => {
      current.onConfirm?.();
      return initialState;
    });
  }, []);

  const openModal = useCallback((options = {}) => {
    const defaults = DEFAULT_COPY[options.type || "delete"] || DEFAULT_COPY.delete;
    setState({
      ...initialState,
      ...defaults,
      ...options,
      open: true,
      message: options.message || defaults.message,
    });
  }, []);

  const value = useMemo(
    () => ({
      openDecisionModal: openModal,
      confirmDelete: (options) => openModal({ type: "delete", ...options }),
      confirmCancel: (options) => openModal({ type: "cancel", ...options }),
      showSuccessModal: (options) => openModal({ type: "success", ...options }),
    }),
    [openModal],
  );

  return (
    <DecisionModalContext.Provider value={value}>
      {children}
      <DecisionModal state={state} onClose={closeModal} onCancel={cancelModal} onConfirm={confirmModal} />
    </DecisionModalContext.Provider>
  );
}

export function useDecisionModal() {
  const context = useContext(DecisionModalContext);
  if (!context) {
    throw new Error("useDecisionModal must be used within DecisionModalProvider");
  }
  return context;
}
