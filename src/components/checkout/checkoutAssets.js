export const checkoutImages = {
  product:
    "https://www.figma.com/api/mcp/asset/119059f1-03f3-4369-89d5-e045322a2396",
  backArrow:
    "https://www.figma.com/api/mcp/asset/c0a91732-d6c5-4f5d-8150-0e82cf15bddd",
  locationPin:
    "https://www.figma.com/api/mcp/asset/2453da1e-ca37-458b-a7e5-25cfd2463ebe",
  momo: "https://www.figma.com/api/mcp/asset/964bceb7-c1d0-4002-aab4-ae87caebdd4d",
  zalopay:
    "https://www.figma.com/api/mcp/asset/0cc23b90-c52b-4e76-8b61-29a2b0ea6fab",
  vnpay:
    "https://www.figma.com/api/mcp/asset/30e87f5c-1184-4617-9d44-950ce6fdbbe3",
  radioUnchecked:
    "https://www.figma.com/api/mcp/asset/377bd4ad-9b21-4ccc-838e-c2597e272c3b",
  radioChecked:
    "https://www.figma.com/api/mcp/asset/cb45fed8-dedb-403f-b352-ed3c6391c3ed",
  bankIcon:
    "https://www.figma.com/api/mcp/asset/c6a2891e-09ec-478b-9efd-a269fd643873",
  checkmark:
    "https://www.figma.com/api/mcp/asset/b3948361-c9f6-4bfa-966c-77afc0954aca",
  atmIcon:
    "https://www.figma.com/api/mcp/asset/44104f2c-127d-4c71-b8b2-9425b6cca8c6",
  cardIcon:
    "https://www.figma.com/api/mcp/asset/88e6bfeb-5c0f-44a1-af95-908c427e4561",
};

export const GUEST_ORDER_ITEMS = [
  {
    id: 1,
    name: "Hạt dinh dưỡng cao cấp Petsol",
    price: "50.000đ",
    type: "màu xanh",
    size: "1,5kg",
    qty: 2,
  },
  {
    id: 2,
    name: "Laptop lenovhbhfbv fbdfhdvd chhvuhv",
    price: "89.000",
    type: "màu xanh",
    size: "1,5kg",
    qty: 2,
  },
  {
    id: 3,
    name: "Hạt dinh dưỡng cao cấp Petsol",
    price: "50.000đ",
    type: "màu xanh",
    size: "1,5kg",
    qty: 2,
  },
  {
    id: 4,
    name: "Hạt dinh dưỡng cao cấp Petsol",
    price: "50.000đ",
    type: "màu xanh",
    size: "1,5kg",
    qty: 2,
  },
];

export const ORDER_ITEMS = GUEST_ORDER_ITEMS;

export const GUEST_ORDER_TOTAL = "200.000 đ";

export const ONLINE_PAYMENT_METHODS = [
  {
    id: "momo",
    label: "MoMo",
    icon: checkoutImages.momo,
    iconClass: "h-[32px] w-[34px] object-contain",
  },
  {
    id: "zalopay",
    label: "ZaloPay",
    icon: checkoutImages.zalopay,
    iconClass: "size-[49px] object-cover",
  },
  {
    id: "vnpay",
    label: "VNPay",
    icon: checkoutImages.vnpay,
    iconClass: "h-[29px] w-[37px] object-cover",
  },
  {
    id: "bank",
    label: "Chuyển khoản ngân hàng",
    icon: checkoutImages.bankIcon,
    iconClass: "size-8",
    checkIcon: checkoutImages.checkmark,
  },
  {
    id: "atm",
    label: "Thẻ ATM",
    icon: checkoutImages.atmIcon,
    iconClass: "h-[25px] w-8",
  },
  {
    id: "card",
    label: "Thẻ Tín dụng/Ghi nợ",
    icon: checkoutImages.cardIcon,
    iconClass: "h-[25px] w-8",
  },
];

export const ORDER_CODE = "BK-8712-2023";
