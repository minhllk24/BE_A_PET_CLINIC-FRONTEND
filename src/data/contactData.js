const contactAsset = (name) =>
  new URL(`../assets/images/contact/figma/${name}`, import.meta.url).href;

export const contactAssets = {
  letterSend: contactAsset("letter-send.png"),
  map: contactAsset("branch-map.png"),
  search: contactAsset("search-icon.svg"),
  chevron: contactAsset("chevron-down.svg"),
  clock: contactAsset("clock-icon.svg"),
  branchPhone: contactAsset("branch-phone.svg"),
};

export const CONTACT_CHANNELS = [
  {
    id: "phone",
    label: "0868.686.868",
    href: "tel:0868686868",
    icon: contactAsset("phone-contact.svg"),
  },
  {
    id: "email",
    label: "drpetshouse.cskh@gmail.com",
    href: "mailto:drpetshouse.cskh@gmail.com",
    icon: contactAsset("email-contact.svg"),
  },
  {
    id: "facebook",
    label: "Fanpage Dr. Pet’s Shop",
    href: "https://www.facebook.com/",
    icon: contactAsset("facebook-contact.svg"),
  },
  {
    id: "zalo",
    label: "Zalo Dr. Pet’s Shop",
    href: "https://zalo.me/",
    icon: contactAsset("zalo-contact.svg"),
  },
  {
    id: "instagram",
    label: "Instagram Dr. Pet’s Shop",
    href: "https://www.instagram.com/",
    icon: contactAsset("instagram-contact.svg"),
  },
  {
    id: "tiktok",
    label: "TikTok Dr. Pet’s Shop",
    href: "https://www.tiktok.com/",
    icon: contactAsset("tiktok-contact.svg"),
  },
];

export const BRANCHES = [
  {
    id: 1,
    name: "Chi nhánh 1",
    address: "669 Đỗ Mười, khu phố 13, Linh Xuân, Hồ Chí Minh",
    hours: "Cả ngày (24/7) kể cả cuối tuần, lễ, Tết.",
    phone: "0987.654.321",
    pin: contactAsset("branch-pin-red.svg"),
    mapPosition: { left: 287, top: 228, size: 61 },
  },
  {
    id: 2,
    name: "Chi nhánh 2",
    address: "530 Huỳnh Tấn Phát, Tân Thuận, Hồ Chí Minh",
    hours: "Cả ngày (24/7) kể cả cuối tuần, lễ, Tết.",
    phone: "0123.456.789",
    pin: contactAsset("branch-pin-orange.svg"),
    mapPosition: { left: 100, top: 136, size: 40 },
  },
  {
    id: 3,
    name: "Chi nhánh 3",
    address: "162T Trường Chinh, Bảy Hiền, Hồ Chí Minh",
    hours: "8:00 - 22:00 (kể cả cuối tuần, lễ, Tết)",
    phone: "0923.446.779",
    pin: contactAsset("branch-pin-yellow.svg"),
    mapPosition: { left: 558, top: 303, size: 40 },
  },
];
