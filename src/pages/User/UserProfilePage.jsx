import { useEffect, useRef, useState } from "react";
import { Camera, MapPin } from "lucide-react";
import ButtonComponent from "../../components/Button/ButtonComponent";
import AddressFormModal from "../../components/address/AddressFormModal";
import defaultAvatar from "../../assets/images/profile/user-avatar.png";
import {
  DEFAULT_USER_ADDRESSES,
  DEFAULT_USER_PROFILE,
  PROFILE_STORAGE_KEYS,
} from "../../data/userProfileData";
import { useAuth } from "../../context/AuthContext";

const inputClass =
  "input-brand h-12 w-full rounded-lg border-[#c1c6d5] px-3 text-base text-black";

function loadStoredData(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function Field({ label, action, children }) {
  return (
    <label className="block min-w-0">
      <span className="mb-2 block pl-1 text-base font-medium">{label}</span>
      <span className="relative block">
        {children}
        {action}
      </span>
    </label>
  );
}

function formatAddressLine(address) {
  const streetAddress = String(address.address ?? "").trim();
  const city = String(address.city ?? "").trim();

  if (!city || streetAddress.toLowerCase().includes(city.toLowerCase())) {
    return streetAddress;
  }

  return [streetAddress, city].filter(Boolean).join(", ");
}

function AddressCard({ address, onEdit, onDelete, onSetDefault }) {
  const recipient = address.name ?? address.recipient;
  const addressLine = formatAddressLine(address);

  return (
    <article
      className={`rounded-lg border p-[17px] text-base ${
        address.isDefault
          ? "border-[rgba(25,118,210,0.5)] bg-[rgba(25,118,210,0.04)]"
          : "border-[#c1c6d5] bg-white"
      }`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <strong>{recipient}</strong>
          {address.isDefault && (
            <span className="rounded bg-[#d2e4ff] px-2 py-1 text-xs">Mặc định</span>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm font-medium">
          <button type="button" onClick={() => onEdit(address)} className="hover:text-[#0d47a1]">
            Thay đổi
          </button>
          {!address.isDefault && (
            <>
              <button type="button" onClick={() => onSetDefault(address.id)} className="text-[#0d47a1]">
                Đặt làm mặc định
              </button>
              <button type="button" onClick={() => onDelete(address.id)} className="text-[#c62828]">
                Xóa
              </button>
            </>
          )}
        </div>
      </div>
      <p className="mt-2">{address.phone}</p>
      <p>{addressLine}</p>
    </article>
  );
}

function UserProfilePage() {
  const { updateUserProfile } = useAuth();
  const fileInputRef = useRef(null);
  const [profile, setProfile] = useState(() =>
    loadStoredData(PROFILE_STORAGE_KEYS.profile, DEFAULT_USER_PROFILE),
  );
  const [addresses, setAddresses] = useState(() =>
    loadStoredData(PROFILE_STORAGE_KEYS.addresses, DEFAULT_USER_ADDRESSES),
  );
  const [avatar, setAvatar] = useState(defaultAvatar);
  const [message, setMessage] = useState("");
  const [addressModal, setAddressModal] = useState(null);

  useEffect(() => {
    if (!message) return undefined;
    const timeoutId = window.setTimeout(() => setMessage(""), 2500);
    return () => window.clearTimeout(timeoutId);
  }, [message]);

  const updateProfile = (event) => {
    const { name, value } = event.target;
    setProfile((current) => ({ ...current, [name]: value }));
  };

  const saveProfile = (event) => {
    event.preventDefault();
    updateUserProfile(profile);
    setMessage("Đã lưu thông tin người dùng.");
  };

  const changeAvatar = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setAvatar(URL.createObjectURL(file));
  };

  const saveAddresses = (nextAddresses) => {
    setAddresses(nextAddresses);
    localStorage.setItem(PROFILE_STORAGE_KEYS.addresses, JSON.stringify(nextAddresses));
  };

  const saveAddress = (address) => {
    if (address.id) {
      saveAddresses(addresses.map((item) => (item.id === address.id ? address : item)));
    } else {
      saveAddresses([
        ...addresses,
        { ...address, id: `address-${Date.now()}`, isDefault: addresses.length === 0 },
      ]);
    }
    setAddressModal(null);
    setMessage(address.id ? "Đã cập nhật địa chỉ." : "Đã thêm địa chỉ mới.");
  };

  const deleteAddress = (id) => saveAddresses(addresses.filter((address) => address.id !== id));

  const setDefaultAddress = (id) =>
    saveAddresses(addresses.map((address) => ({ ...address, isDefault: address.id === id })));

  return (
    <div className="mx-auto w-full max-w-[1160px] font-sans text-[rgba(0,0,0,0.87)]">
      {addressModal && (
        <AddressFormModal
          mode={addressModal.mode}
          address={addressModal.address}
          defaultValues={{
            name: profile.fullName,
            phone: profile.phone,
            email: profile.email,
          }}
          onClose={() => setAddressModal(null)}
          onSave={saveAddress}
        />
      )}
      <header className="mb-4">
        <h1 className="text-[28px] font-bold leading-10">Thông tin người dùng</h1>
        <p className="mt-1 text-base">Quản lý thông tin cá nhân và tài khoản của bạn</p>
      </header>

      <form
        onSubmit={saveProfile}
        className="grid overflow-hidden rounded-xl border border-[#c1c6d5]/50 bg-white lg:grid-cols-[286px_1fr]"
      >
        <section className="flex flex-col items-center gap-5 p-6">
          <div className="relative">
            <div className="size-32 overflow-hidden rounded-full border-4 border-[#e3f2fd] bg-[#65787c]">
              <img src={avatar} alt="Ảnh đại diện" className="size-full object-cover" />
            </div>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="focus-ring-brand absolute bottom-1 right-2 flex size-8 items-center justify-center rounded-full bg-[#fdd835] shadow-elevation hover:bg-[#fbc02d]"
              aria-label="Đổi ảnh đại diện"
            >
              <Camera className="size-4" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={changeAvatar}
              className="hidden"
            />
          </div>
          <h2 className="text-center text-2xl font-bold">{profile.fullName}</h2>
          <ButtonComponent
            variant="secondary"
            onClick={() => setMessage("Tính năng đổi mật khẩu sẽ được kết nối với API.")}
            className="h-[38px] bg-[#fff176] px-[22px] text-[15px] uppercase shadow-elevation hover:bg-[#fdd835]"
          >
            Đổi mật khẩu
          </ButtonComponent>
        </section>

        <section className="flex flex-col gap-6 p-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="grid gap-6">
              <Field label="Họ và tên">
                <input name="fullName" value={profile.fullName} onChange={updateProfile} className={inputClass} />
              </Field>
              <Field
                label="Email"
                action={
                  <button type="button" className="absolute right-3 top-3 font-semibold text-[#0d47a1]">
                    Thay đổi
                  </button>
                }
              >
                <input name="email" type="email" value={profile.email} onChange={updateProfile} className={`${inputClass} pr-24`} />
              </Field>
            </div>
            <div className="grid gap-6">
              <Field
                label="Số điện thoại"
                action={
                  <button type="button" className="absolute right-3 top-3 font-semibold text-[#0d47a1]">
                    Thay đổi
                  </button>
                }
              >
                <input name="phone" value={profile.phone} onChange={updateProfile} className={`${inputClass} pr-24`} />
              </Field>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Giới tính">
                  <select name="gender" value={profile.gender} onChange={updateProfile} className={inputClass}>
                    <option value="">Chưa chọn</option>
                    <option value="male">Nam</option>
                    <option value="female">Nữ</option>
                    <option value="other">Khác</option>
                  </select>
                </Field>
                <Field label="Ngày sinh">
                  <input name="birthDate" type="date" value={profile.birthDate} onChange={updateProfile} className={inputClass} />
                </Field>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <button type="submit" className="btn-yellow h-[38px] px-[22px] py-1">
              Lưu
            </button>
          </div>
        </section>
      </form>

      <section className="mt-4 rounded-xl border border-[#c1c6d5]/50 bg-white p-6">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <h2 className="flex items-center gap-2 text-xl font-bold text-[#0d47a1]">
            <MapPin className="size-5" />
            Danh sách địa chỉ
          </h2>
          <button
            type="button"
            onClick={() => setAddressModal({ mode: "add", address: null })}
            className="rounded bg-[#fff176] px-4 py-2 text-xs font-bold hover:bg-[#fdd835]"
          >
            + Thêm địa chỉ mới
          </button>
        </div>
        <div className="grid gap-4">
          {addresses.map((address) => (
            <AddressCard
              key={address.id}
              address={address}
              onEdit={(address) => setAddressModal({ mode: "edit", address })}
              onDelete={deleteAddress}
              onSetDefault={setDefaultAddress}
            />
          ))}
        </div>
      </section>

      {message && (
        <div className="fixed bottom-6 right-6 z-50 rounded-lg bg-[#06105a] px-4 py-3 text-sm text-white shadow-lg">
          {message}
        </div>
      )}
    </div>
  );
}

export default UserProfilePage;
