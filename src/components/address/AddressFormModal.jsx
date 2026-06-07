import { useEffect, useState } from "react";
import { MapPin, X } from "lucide-react";

const EMPTY_ADDRESS = {
  name: "",
  phone: "",
  email: "",
  country: "Việt Nam",
  address: "",
  city: "",
};

function AddressFormField({
  label,
  required = false,
  className = "",
  value,
  showError = false,
  ...inputProps
}) {
  const invalid = showError && required && !String(value ?? "").trim();

  return (
    <label className={`flex min-w-0 flex-col gap-[10px] ${className}`}>
      <span className="text-[14px] leading-5 tracking-[0.17px] text-[#3d3d3d]">
        {label}
        {required && <span className="text-[#c62828]">*</span>}
      </span>
      <input
        {...inputProps}
        value={value}
        required={required}
        data-address-error={invalid ? "true" : undefined}
        className={`h-[43px] w-full rounded-[4px] border bg-white px-3 text-[14px] text-[#191c1e] outline-none transition ${
          invalid
            ? "border-[#c62828] ring-1 ring-[#c62828]"
            : "border-[#e0e0e0] hover:border-[#90caf9] focus:border-[#0d47a1] focus:ring-1 focus:ring-[#0d47a1]"
        }`}
      />
      {invalid && <span className="-mt-2 text-xs text-[#c62828]">Vui lòng điền thông tin</span>}
    </label>
  );
}

function AddressFormModal({
  address,
  defaultValues,
  mode = "add",
  onClose,
  onSave,
}) {
  const [form, setForm] = useState(() => ({
    ...EMPTY_ADDRESS,
    ...defaultValues,
    ...address,
    name: address?.name ?? address?.recipient ?? defaultValues?.name ?? "",
  }));
  const [validationAttempted, setValidationAttempted] = useState(false);
  const title = mode === "edit" ? "Thay đổi địa chỉ" : "Thêm địa chỉ mới";

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const updateField = (field, value) =>
    setForm((current) => ({ ...current, [field]: value }));

  const handleSubmit = (event) => {
    event.preventDefault();
    const formElement = event.currentTarget;
    const requiredFields = ["name", "phone", "country", "address", "city"];
    if (requiredFields.some((field) => !String(form[field] ?? "").trim())) {
      setValidationAttempted(true);
      window.setTimeout(() => {
        formElement.querySelector('[data-address-error="true"]')?.focus();
      }, 0);
      return;
    }
    onSave({ ...address, ...form, recipient: form.name });
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[rgba(6,16,90,0.2)] p-4 backdrop-blur-[2px]"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      role="presentation"
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="max-h-[calc(100vh-32px)] w-full max-w-[737px] overflow-y-auto bg-white p-6 shadow-[0_20px_60px_rgba(6,16,90,0.18)]"
      >
        <div className="rounded-lg bg-white p-[10px]">
          <header className="mb-[10px] flex h-[37px] items-center gap-2">
            <MapPin className="h-5 w-4 shrink-0 text-[#00355f]" strokeWidth={2} />
            <h2 className="flex-1 text-[20px] font-bold leading-8 tracking-[0.15px] text-[#00355f]">
              {title}
            </h2>
            <button
              type="button"
              onClick={onClose}
              aria-label="Đóng"
              className="btn-icon-subtle flex size-[30px] items-center justify-center text-[#727780]"
            >
              <X className="size-[18px]" strokeWidth={1.6} />
            </button>
          </header>

          <form noValidate onSubmit={handleSubmit} className="flex flex-col items-center gap-[10px]">
            <div className="grid w-full gap-x-[46px] gap-y-[10px] sm:grid-cols-2">
              <AddressFormField
                label="Họ tên"
                required
                autoFocus
                autoComplete="name"
                showError={validationAttempted}
                value={form.name}
                onChange={(event) => updateField("name", event.target.value)}
              />
              <AddressFormField
                label="Số điện thoại"
                required
                type="tel"
                autoComplete="tel"
                showError={validationAttempted}
                value={form.phone}
                onChange={(event) => updateField("phone", event.target.value)}
              />
              <AddressFormField
                label="Email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={(event) => updateField("email", event.target.value)}
              />
              <AddressFormField
                label="Quốc gia"
                required
                autoComplete="country-name"
                showError={validationAttempted}
                value={form.country}
                onChange={(event) => updateField("country", event.target.value)}
              />
              <AddressFormField
                label="Địa chỉ cụ thể"
                required
                autoComplete="street-address"
                showError={validationAttempted}
                value={form.address}
                onChange={(event) => updateField("address", event.target.value)}
                className="sm:col-span-2"
              />
              <AddressFormField
                label="Tỉnh/Thành phố"
                required
                autoComplete="address-level1"
                showError={validationAttempted}
                value={form.city}
                onChange={(event) => updateField("city", event.target.value)}
                className="sm:col-span-2"
              />
            </div>
            <button
              type="submit"
              className="h-[33px] rounded-[4px] bg-[#fff176] px-[22px] text-[15px] font-medium uppercase leading-[26px] tracking-[0.46px] shadow-elevation hover:bg-[#fdd835]"
            >
              Lưu
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default AddressFormModal;
