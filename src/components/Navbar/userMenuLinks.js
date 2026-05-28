/** Menu dropdown avatar — map theo routing trong project_structure.md */
export const USER_MENU_LINKS = [
  { label: "Thông tin người dùng", href: "/user-profile" },
  {
    label: "Quản lý thú cưng",
    href: "/my-pets",
    children: [
      { label: "Hồ sơ bệnh án", href: "/my-pets/medical-records" },
      { label: "Nhật ký theo dõi", href: "/my-pets/tracking-log" },
    ],
  },
  { label: "Lịch sử đặt lịch", href: "/appointment/history" },
  { label: "Đơn hàng của tôi", href: "/my-orders" },
];

export const USER_MENU_LOGOUT = {
  label: "Đăng xuất",
  href: "/sign-in",
};
