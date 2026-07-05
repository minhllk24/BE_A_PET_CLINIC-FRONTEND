import { useMemo, useState } from "react";
import CanvasLayout from "../../components/layout/CanvasLayout";
import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/Navbar";
import { useAuth } from "../../context/AuthContext";
import {
  BRANCHES,
  CONTACT_CHANNELS,
  contactAssets,
} from "../../data/contactData";

const INITIAL_FORM = {
  name: "",
  gender: "",
  phone: "",
  email: "",
  message: "",
};

const getGoogleMapsLink = (address) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    address,
  )}`;

const getGoogleMapsEmbedLink = (address) =>
  `https://maps.google.com/maps?q=${encodeURIComponent(address)}&z=14&output=embed`;

function ContactChannel({ channel }) {
  const isExternal = channel.href.startsWith("http");

  return (
    <a
      className="contact-channel"
      href={channel.href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer" : undefined}
    >
      <span className="contact-channel__icon">
        <img src={channel.icon} alt="" />
      </span>
      <span>{channel.label}</span>
    </a>
  );
}

function ContactForm() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);

  const updateField = (field) => (event) => {
    setSubmitted(false);
    setForm((current) => ({ ...current, [field]: event.target.value }));
  };

  const submitForm = (event) => {
    event.preventDefault();
    setSubmitted(true);
    setForm(INITIAL_FORM);
  };

  return (
    <form className="contact-form" onSubmit={submitForm}>
      <p className="contact-form__intro">
        Chúng tôi luôn sẵn sàng lắng nghe góp ý của bạn. Hãy để lại lời nhắn
        bằng cách điền biểu mẫu dưới đây:
      </p>

      <div className="contact-form__row contact-form__row--name">
        <label>
          <span>Tên của bạn</span>
          <input
            type="text"
            value={form.name}
            onChange={updateField("name")}
            required
          />
        </label>
        <label className="contact-form__gender">
          <span>Giới tính</span>
          <span className="contact-form__select">
            <select
              value={form.gender}
              onChange={updateField("gender")}
              aria-label="Giới tính"
            >
              <option value="" aria-label="Chưa chọn" />
              <option value="female">Nữ</option>
              <option value="male">Nam</option>
              <option value="other">Khác</option>
            </select>
            <img src={contactAssets.chevron} alt="" />
          </span>
        </label>
      </div>

      <div className="contact-form__row">
        <label>
          <span>Số điện thoại</span>
          <input
            type="tel"
            value={form.phone}
            onChange={updateField("phone")}
            required
          />
        </label>
        <label>
          <span>Địa chỉ email</span>
          <input
            type="email"
            value={form.email}
            onChange={updateField("email")}
            required
          />
        </label>
      </div>

      <label className="contact-form__message">
        <span>Nội dung</span>
        <textarea
          value={form.message}
          onChange={updateField("message")}
          placeholder="Hãy để lại lời nhắn ở đây..."
          required
        />
      </label>

      <button type="submit">GỬI CHO CHÚNG TÔI</button>
      {submitted && (
        <p className="contact-form__success" role="status">
          Cảm ơn bạn! Dr.Pet&apos;s House đã nhận được lời nhắn.
        </p>
      )}
      <img
        className="contact-form__letter"
        src={contactAssets.letterSend}
        alt=""
      />
    </form>
  );
}

function BranchCard({ branch, active, onSelect }) {
  return (
    <button
      type="button"
      className={`contact-branch-card${active ? " is-active" : ""}`}
      onClick={() => onSelect(branch.id)}
      aria-pressed={active}
    >
      <span
        className={`contact-branch-card__pin${active ? " is-active" : ""}`}
        aria-hidden="true"
      />
      <span className="contact-branch-card__content">
        <strong>{branch.name}</strong>
        <span>{branch.address}</span>
        <span className="contact-branch-card__meta">
          <img src={contactAssets.clock} alt="" />
          <span>
            <b>Mở cửa:</b> {branch.hours}
          </span>
        </span>
        <span className="contact-branch-card__meta">
          <img src={contactAssets.branchPhone} alt="" />
          <span>
            <b>Liên hệ:</b> {branch.phone}
          </span>
        </span>
      </span>
    </button>
  );
}

function BranchDirectory() {
  const [query, setQuery] = useState("");
  const [activeBranch, setActiveBranch] = useState(1);
  const selectedBranch =
    BRANCHES.find((branch) => branch.id === activeBranch) ?? BRANCHES[0];

  const visibleBranches = useMemo(() => {
    const keyword = query.trim().toLocaleLowerCase("vi");
    if (!keyword) return BRANCHES;

    return BRANCHES.filter((branch) =>
      `${branch.name} ${branch.address} ${branch.phone}`
        .toLocaleLowerCase("vi")
        .includes(keyword),
    );
  }, [query]);

  return (
    <section className="contact-branches" id="branches">
      <h2>Danh sách chi nhánh</h2>
      <div className="contact-branches__content">
        <div className="contact-branches__panel">
          <label className="contact-branches__search">
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Tìm kiếm chi nhánh..."
              aria-label="Tìm kiếm chi nhánh"
            />
            <img src={contactAssets.search} alt="" />
          </label>
          <div className="contact-branches__list">
            {visibleBranches.map((branch) => (
              <BranchCard
                key={branch.id}
                branch={branch}
                active={activeBranch === branch.id}
                onSelect={setActiveBranch}
              />
            ))}
            {!visibleBranches.length && (
              <p className="contact-branches__empty">
                Không tìm thấy chi nhánh phù hợp.
              </p>
            )}
          </div>
        </div>

        <div className="contact-map" aria-label="Bản đồ chi nhánh">
          <iframe
            className="contact-map__embed"
            title={`Google Maps - ${selectedBranch.name}`}
            src={getGoogleMapsEmbedLink(selectedBranch.address)}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
          <a
            className="contact-map__open"
            href={getGoogleMapsLink(selectedBranch.address)}
            target="_blank"
            rel="noreferrer"
            aria-label={`Mở Google Maps cho ${selectedBranch.name}`}
          >
            Google Maps
          </a>
          {BRANCHES.map((branch) => (
            <button
              type="button"
              key={branch.id}
              className={`contact-map__pin${
                activeBranch === branch.id ? " is-active" : ""
              }`}
              style={{
                left: branch.mapPosition.left,
                top: branch.mapPosition.top,
                width: branch.mapPosition.size,
                height: branch.mapPosition.size,
              }}
              onClick={() => setActiveBranch(branch.id)}
              aria-label={`Chọn ${branch.name}`}
              aria-pressed={activeBranch === branch.id}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactPage() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="contact-page">
      <CanvasLayout>
        <NavBar isAuthenticated={isAuthenticated} />
        <main>
          <section className="contact-hero">
            <div className="contact-hero__details">
              <h1>
                Nếu bạn cần <span>hỗ trợ</span>?
                <br />
                <b>Hãy <em>liên hệ</em> ngay!</b>
              </h1>
              <p>
                Nếu bạn cần hỗ trợ ngay, hãy liên hệ với chúng tôi qua các kênh
                liên lạc dưới đây:
              </p>
              <div className="contact-channels">
                {CONTACT_CHANNELS.map((channel) => (
                  <ContactChannel key={channel.id} channel={channel} />
                ))}
              </div>
            </div>
            <ContactForm />
          </section>
          <BranchDirectory />
        </main>
        <Footer variant="white" />
      </CanvasLayout>
    </div>
  );
}

export default ContactPage;
