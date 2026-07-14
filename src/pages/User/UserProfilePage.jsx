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
import {
  createUserAddress,
  deleteUserAddress,
  getUserAddresses,
  getUserProfile,
  updateUserAddress,
  updateUserProfileApi,
} from "../../services/userService";
import { changePassword } from "../../services/authService";

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

function ChangePasswordModal({ onClose, onSuccess }) {
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.oldPassword || !form.newPassword || !form.confirmPassword) {
      setError("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
      setError("Mật khẩu xác nhận không khớp.");
      return;
    }

    setIsSubmitting(true);
    try {
      await changePassword({
        oldPassword: form.oldPassword,
        newPassword: form.newPassword,
      });
      onSuccess();
    } catch (submitError) {
      setError(submitError?.message || "Không thể đổi mật khẩu.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[rgba(6,16,90,0.24)] p-4 backdrop-blur-[2px]">
      <section className="w-full max-w-[460px] rounded-xl bg-white p-6 shadow-[0_20px_60px_rgba(6,16,90,0.18)]">
        <div className="mb-5 flex items-center justify-between gap-4">
          <h2 className="text-xl font-bold text-[#003f87]">Đổi mật khẩu</h2>
          <button type="button" onClick={onClose} className="rounded px-2 py-1 text-xl leading-none hover:bg-slate-100">
            x
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-4">
          <Field label="Mật khẩu hiện tại">
            <input
              type="password"
              value={form.oldPassword}
              onChange={(event) => updateField("oldPassword", event.target.value)}
              className={inputClass}
              autoComplete="current-password"
            />
          </Field>
          <Field label="Mật khẩu mới">
            <input
              type="password"
              value={form.newPassword}
              onChange={(event) => updateField("newPassword", event.target.value)}
              className={inputClass}
              autoComplete="new-password"
            />
          </Field>
          <Field label="Xác nhận mật khẩu mới">
            <input
              type="password"
              value={form.confirmPassword}
              onChange={(event) => updateField("confirmPassword", event.target.value)}
              className={inputClass}
              autoComplete="new-password"
            />
          </Field>

          {error && <p className="rounded-lg bg-[#ffdad6] px-3 py-2 text-sm font-semibold text-[#ba1a1a]">{error}</p>}

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="rounded border border-[#c1c6d5] px-4 py-2 text-sm font-semibold hover:bg-slate-50">
              Hủy
            </button>
            <button type="submit" disabled={isSubmitting} className="btn-yellow h-[38px] px-[22px] py-1 disabled:cursor-not-allowed disabled:opacity-60">
              {isSubmitting ? "Đang lưu..." : "Lưu"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

function UserProfilePage() {
  const { logout, updateUserProfile, userProfile } = useAuth();
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
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const userId = profile.userId || userProfile?.userId;

  useEffect(() => {
    if (!message) return undefined;
    const timeoutId = window.setTimeout(() => setMessage(""), 2500);
    return () => window.clearTimeout(timeoutId);
  }, [message]);

  useEffect(() => {
    if (!userId) return undefined;

    let active = true;
    setIsLoadingProfile(true);

    Promise.allSettled([getUserProfile(userId), getUserAddresses(userId)])
      .then(([profileResult, addressesResult]) => {
        if (!active) return;

        if (profileResult.status === "fulfilled") {
          const nextProfile = {
            ...profile,
            ...profileResult.value,
            fullName: profileResult.value.fullName || profile.fullName,
            email: profileResult.value.email || profile.email,
            phone: profileResult.value.phone || profile.phone,
          };
          setProfile(nextProfile);
          updateUserProfile(nextProfile);
        }

        if (addressesResult.status === "fulfilled") {
          setAddresses(addressesResult.value);
          localStorage.setItem(PROFILE_STORAGE_KEYS.addresses, JSON.stringify(addressesResult.value));
        }

        if (profileResult.status === "rejected" && addressesResult.status === "rejected") {
          setMessage("Không thể tải hồ sơ mới nhất, đang dùng dữ liệu dự phòng.");
        }
      })
      .finally(() => {
        if (active) setIsLoadingProfile(false);
      });

    return () => {
      active = false;
    };
  }, [userId]);

  const updateProfile = (event) => {
    const { name, value } = event.target;
    setProfile((current) => ({ ...current, [name]: value }));
  };

  const saveProfile = async (event) => {
    event.preventDefault();
    setIsSavingProfile(true);

    try {
      const savedProfile = userId
        ? await updateUserProfileApi(userId, profile)
        : profile;
      const nextProfile = { ...profile, ...savedProfile };
      setProfile(nextProfile);
      updateUserProfile(nextProfile);
      setMessage(userId ? "Đã lưu thông tin người dùng." : "Đã lưu thông tin tạm thời.");
    } catch (error) {
      updateUserProfile(profile);
      setMessage(error?.message || "Không thể lưu lên API, đã giữ dữ liệu tạm thời.");
    } finally {
      setIsSavingProfile(false);
    }
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

  const saveAddress = async (address) => {
    const fallbackAddress = {
      ...address,
      id: address.id || `address-${Date.now()}`,
      isDefault: address.isDefault ?? addresses.length === 0,
    };
    let successMessage = address.id ? "Đã cập nhật địa chỉ." : "Đã thêm địa chỉ mới.";

    try {
      if (address.id && !String(address.id).startsWith("address-")) {
        const savedAddress = await updateUserAddress(address.id, address);
        saveAddresses(addresses.map((item) => (item.id === address.id ? savedAddress : item)));
      } else if (address.id) {
        saveAddresses(addresses.map((item) => (item.id === address.id ? fallbackAddress : item)));
      } else if (userId) {
        const savedAddress = await createUserAddress(userId, fallbackAddress);
        saveAddresses([...addresses, savedAddress]);
      } else {
        saveAddresses([...addresses, fallbackAddress]);
      }
    } catch (error) {
      if (address.id) {
        saveAddresses(addresses.map((item) => (item.id === address.id ? fallbackAddress : item)));
      } else {
        saveAddresses([...addresses, fallbackAddress]);
      }
      successMessage = error?.message || "API địa chỉ lỗi, đã lưu dữ liệu tạm thời.";
    }

    setAddressModal(null);
    setMessage(successMessage);
  };

  const deleteAddress = async (id) => {
    try {
      if (!String(id).startsWith("address-")) await deleteUserAddress(id);
    } catch (error) {
      setMessage(error?.message || "Không thể xóa địa chỉ trên API, đã xóa tạm trên giao diện.");
    }
    saveAddresses(addresses.filter((address) => address.id !== id));
  };

  const setDefaultAddress = async (id) => {
    const targetAddress = addresses.find((address) => address.id === id);
    if (!targetAddress) return;

    try {
      if (!String(id).startsWith("address-")) {
        await updateUserAddress(id, { ...targetAddress, isDefault: true });
      }
    } catch (error) {
      setMessage(error?.message || "Không thể đặt mặc định trên API, đã cập nhật tạm.");
    }

    saveAddresses(addresses.map((address) => ({ ...address, isDefault: address.id === id })));
  };

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
      {showChangePassword && (
        <ChangePasswordModal
          onClose={() => setShowChangePassword(false)}
          onSuccess={() => {
            setShowChangePassword(false);
            setMessage("Đổi mật khẩu thành công. Vui lòng đăng nhập lại.");
            window.setTimeout(() => logout(), 600);
          }}
        />
      )}
      <header className="mb-4">
        <h1 className="text-[28px] font-bold leading-10">Thông tin người dùng</h1>
        <p className="mt-1 text-base">
          {isLoadingProfile ? "Đang đồng bộ hồ sơ..." : "Quản lý thông tin cá nhân và tài khoản của bạn"}
        </p>
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
            onClick={() => setShowChangePassword(true)}
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
            <button type="submit" disabled={isSavingProfile} className="btn-yellow h-[38px] px-[22px] py-1 disabled:cursor-not-allowed disabled:opacity-60">
              {isSavingProfile ? "Đang lưu..." : "Lưu"}
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
