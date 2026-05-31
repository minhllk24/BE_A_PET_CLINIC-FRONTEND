import { useState } from "react";
import { groomingImages } from "../../assets/groomingImages";

const FAQS = [
  {
    id: 1,
    question: "Bao lâu thì nên tắm cho thú cưng?",
    answer:
      "Với Chó: Tắm 1 lần/tháng là tần suất lý tưởng nhất. Tránh tắm quá 1 lần/tuần trừ khi có chỉ định từ bác sĩ, vì lạm dụng sẽ làm khô da và mất đi độ bóng của lông.\nVới Mèo: Mèo là loài tự làm sạch cơ thể rất giỏi. Bạn chỉ nên tắm cho chúng khi thực sự cần thiết (dính bẩn, ve rận hoặc mèo lông dài).",
  },
  {
    id: 2,
    question: "Thú cưng chưa tiêm phòng đầy đủ có được làm spa không?",
    answer:
      "Các spa thường từ chối nhận thú cưng chưa tiêm đủ mũi vắc-xin cốt lõi. \r\nĐể bảo vệ sức khỏe cho chính thú cưng của bạn và tránh lây nhiễm chéo cho các bé khác tại cửa hàng.\r\nBạn có thể đặt lịch và sử dụng dịch vụ tiêm phòng của chúng tôi.",
  },
  {
    id: 3,
    question: "Bao lâu thì nên cắt móng cho thú cưng?",
    answer:
      "Bạn nên cắt móng cho chó và mèo định kỳ 2 đến 4 tuần/lần. Tần suất này có thể thay đổi tùy thuộc vào mức độ hoạt động và độ mài mòn tự nhiên của móng. [1, 2]",
  },
  {
    id: 4,
    question:
      "Chủ nuôi có được ở lại xem trực tiếp quá trình làm spa không?",
    answer:
      "Thường là không nên vì thú cưng thấy chủ sẽ dễ phấn khích, bồn chồn và không đứng yên.\r\nBạn có thể quan sát qua phòng kính cách âm hoặc xem camera giám sát tại phòng chờ của cửa hàng.",
  },
  {
    id: 5,
    question:
      "Thú cưng bị nhát, hung dữ hoặc sợ nước thì spa có nhận không?",
    answer:
      "Spa vẫn nhận nhưng bạn cần thông báo trước với nhân viên để có biện pháp xử lý phù hợp.\nNhân viên sẽ dùng kỹ thuật trấn an, dùng loa che mắt hoặc đeo rọ mõm vải mềm để đảm bảo an toàn cho cả hai bên.",
  },
];

function GroomingFAQ() {
  const [openId, setOpenId] = useState(1);

  const toggleFAQ = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section
      className="relative mx-auto"
      style={{
        maxWidth: 1440,
        height: 908,
        backgroundColor: "#FFFFFF",
      }}
    >
      {/* Heading */}
      <h2
        className="absolute"
        style={{
          left: 63,
          top: 94,
          width: 661,
          fontFamily: '"Baloo Tamma", "Baloo 2", cursive',
          fontWeight: 400,
          fontSize: 56,
          lineHeight: "1.214em",
          color: "#02000F",
        }}
      >
        Câu hỏi thường gặp
      </h2>

      {/* FAQ question mark icon */}
      <img
        src={groomingImages.faqIcon}
        alt=""
        className="absolute"
        style={{
          left: 529,
          top: 36,
          width: 80,
          height: 80,
          objectFit: "cover",
        }}
      />

      {/* FAQ items */}
      <div
        className="absolute"
        style={{
          left: 72,
          top: 186,
          width: 639,
        }}
      >
        {FAQS.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div
              key={faq.id}
              className="overflow-hidden"
              style={{
                backgroundColor: "#E5F4FC",
                borderRadius: 8,
                marginBottom: 24,
              }}
            >
              {/* Question button */}
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="relative flex items-center w-full"
                style={{
                  height: isOpen ? 65 : 65,
                  padding: 0,
                  border: "none",
                  backgroundColor: "transparent",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                {/* Number */}
                <span
                  className="absolute"
                  style={{
                    left: 30,
                    top: 27,
                    fontFamily: "Roboto, sans-serif",
                    fontWeight: 500,
                    fontSize: 18,
                    lineHeight: "1.444em",
                    color: "#02000F",
                  }}
                >
                  {faq.id}.
                </span>

                {/* Question text */}
                <span
                  className="absolute"
                  style={{
                    left: 59,
                    top: 14,
                    width: 548,
                    fontFamily: "Roboto, sans-serif",
                    fontWeight: 500,
                    fontSize: 18,
                    lineHeight: "1.444em",
                    color: "#02000F",
                  }}
                >
                  {faq.question}
                </span>

                {/* Toggle icon */}
                <span
                  className="absolute"
                  style={{
                    left: 604,
                    top: isOpen ? 23 : 16,
                    fontFamily: "Roboto, sans-serif",
                    fontWeight: 900,
                    fontSize: 18,
                    lineHeight: "1em",
                    color: "#000000",
                    textAlign: "center",
                  }}
                >
                  {isOpen ? "_" : "+"}
                </span>
              </button>

              {/* Answer */}
              {isOpen && (
                <div
                  style={{
                    padding: "0 59px 24px",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "Roboto, sans-serif",
                      fontWeight: 400,
                      fontSize: 16,
                      lineHeight: "1.75em",
                      color: "#6C6D71",
                      whiteSpace: "pre-line",
                    }}
                  >
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Right side images */}
      <div
        className="absolute"
        style={{
          left: 757,
          top: 88,
          width: 685,
          height: 700,
          borderRadius: 32,
        }}
      >
        {/* Top left image */}
        <div
          className="absolute overflow-hidden"
          style={{
            left: 31,
            top: 51,
            width: 283,
            height: 266,
            borderRadius: 52,
          }}
        >
          <img
            src={groomingImages.faqImg1}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        {/* Top right image */}
        <div
          className="absolute overflow-hidden"
          style={{
            left: 332,
            top: 51,
            width: 283,
            height: 266,
            borderRadius: 52,
          }}
        >
          <img
            src={groomingImages.faqImg3}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        {/* Bottom large image */}
        <div
          className="absolute overflow-hidden"
          style={{
            left: 31,
            top: 342,
            width: 584,
            height: 356,
            borderRadius: 55,
          }}
        >
          <img
            src={groomingImages.faqImg2}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Blue ornament at bottom */}
      <svg
        className="absolute"
        style={{
          left: 679,
          top: 835,
          width: 290,
          height: 29,
        }}
        viewBox="0 0 290 29"
        fill="none"
        stroke="#0D47A1"
        strokeWidth="4"
        strokeLinecap="round"
      >
        <path d="M2 14 C20 -4, 35 32, 58 14 C81 -4, 96 32, 119 14 C142 -4, 157 32, 180 14 C203 -4, 218 32, 241 14 C264 -4, 274 32, 288 14" />
      </svg>
    </section>
  );
}

export default GroomingFAQ;
