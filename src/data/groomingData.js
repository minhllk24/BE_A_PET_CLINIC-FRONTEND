import { groomingImages } from "../assets/groomingImages";

export const GROOMING_FAQS = [
  { id: 1, question: "Bao lâu thì nên tắm cho thú cưng?", answer: ["Với Chó: Tắm 1 lần/tháng là tần suất lý tưởng nhất. Tránh tắm quá 1 lần/tuần trừ khi có chỉ định từ bác sĩ, vì lạm dụng sẽ làm khô da và mất đi độ bóng của lông.", "Với Mèo: Mèo là loài tự làm sạch cơ thể rất giỏi. Bạn chỉ nên tắm cho chúng khi thực sự cần thiết (dính bẩn, ve rận hoặc mèo lông dài)."] },
  { id: 2, question: "Thú cưng chưa tiêm phòng đầy đủ có được làm spa không?", answer: ["Các spa thường từ chối nhận thú cưng chưa tiêm đủ mũi vắc-xin cốt lõi.", "Để bảo vệ sức khỏe cho chính thú cưng của bạn và tránh lây nhiễm chéo cho các bé khác tại cửa hàng.", "Bạn có thể đặt lịch và sử dụng dịch vụ tiêm phòng của chúng tôi."] },
  { id: 3, question: "Bao lâu thì nên cắt móng cho thú cưng?", answer: ["Bạn nên cắt móng cho chó và mèo định kỳ 2 đến 4 tuần/lần. Tần suất này có thể thay đổi tùy thuộc vào mức độ hoạt động và độ mài mòn tự nhiên của móng."] },
  { id: 4, question: "Chủ nuôi có được ở lại xem trực tiếp quá trình làm spa không?", answer: ["Thường là không nên vì thú cưng thấy chủ sẽ dễ phấn khích, bồn chồn và không đứng yên.", "Bạn có thể quan sát qua phòng kính cách âm hoặc xem camera giám sát tại phòng chờ của cửa hàng."] },
  { id: 5, question: "Thú cưng bị nhát, hung dữ hoặc sợ nước thì spa có nhận không?", answer: ["Spa vẫn nhận nhưng bạn cần thông báo trước với nhân viên để có biện pháp xử lý phù hợp.", "Nhân viên sẽ dùng kỹ thuật trấn an, dùng loa che mắt hoặc đeo rọ mõm vải mềm để đảm bảo an toàn cho cả hai bên."] },
];

export const GROOMING_REVIEWS = Array.from({ length: 3 }, (_, index) => ({
  id: index + 1,
  lines: ["These are the perfect size for our small", "dog. The design is cute and the rubber on", "the bottom is great because it makes them", "more durable. They've held up to being..."],
  author: "Mary Douglas",
  company: "Pet Shop Inc.",
}));

export const GROOMING_SERVICES = [
  { id: 1, title: "Tắm & Sấy khô", description: "Sử dụng các dòng sữa tắm cao cấp, phù hợp với từng loại da và màu lông của bé.", price: "Từ 50.000đ", image: groomingImages.serviceBath, mask: groomingImages.serviceCardMask },
  { id: 2, title: "Massage chuyên sâu", description: "Kỹ thuật massage nhẹ nhàng giúp pet giải tỏa áp lực, tăng cường sự gắn kết", price: "Từ 50.000đ", image: groomingImages.serviceMassage, mask: groomingImages.serviceCardMask },
  { id: 3, title: "Vệ sinh răng miệng", description: "Đánh răng loại bỏ mảng bám và xịt thơm miệng khử mùi hôi.", price: "Từ 30.000đ", image: groomingImages.serviceTeeth, mask: groomingImages.serviceCardMask },
  { id: 4, title: "Cắt & mài móng", description: "Cắt ngắn móng tránh đâm vào thịt và dùng máy mài mịn các góc sắc nhọn", price: "Từ 30.000đ", image: groomingImages.serviceNail, mask: groomingImages.serviceCardMaskAlt },
  { id: 5, title: "Chăm sóc bàn chân", description: "Cạo vệ sinh kẽ móng, chăm sóc bảo vệ phần đệm thịt", price: "Từ 30.000đ", image: groomingImages.servicePawCare, mask: groomingImages.serviceCardMask },
  { id: 6, title: "Điều trị ký sinh trùng", description: "Tiêu diệt ký sinh trùng và làm sạch môi trường sống để ngăn ngừa tái nhiễm", price: "Từ 80.000đ", image: groomingImages.serviceParasite, mask: groomingImages.serviceCardMask },
  { id: 7, title: "Cắt tỉa tạo kiểu", description: "Cắt tỉa lông theo yêu cầu hoặc theo form chuẩn của từng giống loài", price: "Từ 50.000đ", image: groomingImages.serviceGrooming, mask: groomingImages.serviceCardMask },
  { id: 8, title: "Nhuộm lông thời trang", description: "Sử dụng thuốc nhuộm organic 100% an toàn cho thú cưng, tạo điểm nhấn đặc biệt", price: "Từ 80.000đ", image: groomingImages.serviceDye, mask: groomingImages.serviceCardMask },
  { id: 9, title: "Vắt tuyến hôi", description: "Giúp thú cưng không bị ngứa ngáy hậu môn, hạn chế mùi hôi đặc trưng cơ thể", price: "Từ 50.000đ", image: groomingImages.serviceScent, mask: groomingImages.serviceCardMask },
];

export const GROOMING_COMBO_STEPS = [
  "Kiểm tra lông, da", "Cạo lông bàn chân", "Cạo lông bụng", "Cạo lông hậu môn",
  "Vắt tuyến hôi", "Vệ sinh tai", "Cắt, mài móng", "Tắm xả chuyên sâu 2 lần",
  "Massage làm sạch", "Sấy chải tạo độ phồng lông", "Xịt thơm dưỡng bóng lông",
];

export const GROOMING_VALUE_PROPS = [
  { num: "01", title: "Sản phẩm chăm sóc chất lượng & an toàn", desc: "Sự an toàn và thoải mái của bé cưng luôn là ưu tiên hàng đầu. Chúng tôi cam kết 100% trang thiết bị và dụng cụ sử dụng đều đạt tiêu chuẩn chất lượng cao và an toàn tuyệt đối.", top: 226 },
  { num: "02", title: "Đội ngũ chuyên viên được đào tạo bài bản", desc: "Đội ngũ chuyên viên chuyên nghiệp, sở hữu tình yêu lớn với động vật và nền tảng chuyên môn vững chắc. Bảo đảm sẽ giúp bé cưng của bạn có những phút giây thoải mái.", top: 425 },
  { num: "03", title: "Bảng giá minh bạch & Chi phí hợp lý", desc: "Chúng tôi mang đến giải pháp chăm sóc thú cưng toàn diện với mức giá cạnh tranh nhất thị trường, đi kèm chất lượng dịch vụ vượt trội xuất phát từ tình yêu thương.", top: 624 },
];
