import { groomingImages } from "../../assets/groomingImages";

const REVIEWS = [
  {
    id: 1,
    text: `"These are the perfect size for our small\ndog. The design is cute and the rubber on\nthe bottom is great because it makes them\nmore durable. They've held up to being..."`,
    author: "Mary Douglas",
    company: "Pet Shop Inc.",
  },
  {
    id: 2,
    text: `"These are the perfect size for our small\ndog. The design is cute and the rubber on\nthe bottom is great because it makes them\nmore durable. They've held up to being..."`,
    author: "Mary Douglas",
    company: "Pet Shop Inc.",
  },
  {
    id: 3,
    text: `"These are the perfect size for our small\ndog. The design is cute and the rubber on\nthe bottom is great because it makes them\nmore durable. They've held up to being..."`,
    author: "Mary Douglas",
    company: "Pet Shop Inc.",
  },
];

function GroomingFeedback() {
  return (
    <section
      className="relative mx-auto flex items-center justify-center"
      style={{
        maxWidth: 1440,
        height: 683,
        padding: "0 120px",
      }}
    >
      {/* Background */}
      <div
        className="absolute"
        style={{
          left: 0,
          top: 0,
          width: 1440,
          height: 683,
        }}
      >
        <img
          src={groomingImages.feedbackBg}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content container */}
      <div
        className="relative flex flex-col items-end"
        style={{
          padding: "34px 12px",
          height: 603,
        }}
      >
        {/* Inner content */}
        <div
          className="flex flex-col items-center"
          style={{ width: 1416, gap: 58 }}
        >
          {/* Title */}
          <div className="flex flex-col items-center w-full">
            <h2
              style={{
                width: 942,
                height: 58,
                fontFamily: '"Baloo Tamma", "Baloo 2", cursive',
                fontWeight: 400,
                fontSize: 64,
                lineHeight: "1.1em",
                textAlign: "center",
                color: "#02000F",
              }}
            >
              Phản hồi của khách hàng
            </h2>
          </div>

          {/* Cards */}
          <div
            className="flex items-center justify-center"
            style={{ width: 1200, gap: 10 }}
          >
            {REVIEWS.map((review) => (
              <div
                key={review.id}
                className="flex flex-col justify-center"
                style={{
                  flex: "1 1 0",
                  backgroundColor: "#FFFFFF",
                  borderRadius: 24,
                  padding: 40,
                  gap: 10,
                }}
              >
                {/* Stars */}
                <div className="flex items-center" style={{ gap: 8 }}>
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      style={{
                        width: 17,
                        height: 15,
                        fontSize: 15,
                        lineHeight: "1em",
                        color: "#FF9D00",
                      }}
                    >
                      ★
                    </span>
                  ))}
                </div>

                {/* Review text */}
                <p
                  style={{
                    height: 118,
                    fontFamily: "Roboto, sans-serif",
                    fontWeight: 400,
                    fontSize: 16,
                    lineHeight: "1.75em",
                    letterSpacing: "0.009em",
                    textAlign: "justify",
                    color: "#333333",
                    whiteSpace: "pre-line",
                  }}
                >
                  {review.text}
                </p>

                {/* Author */}
                <div
                  className="flex items-center w-full"
                  style={{ gap: 10 }}
                >
                  <div className="flex items-center" style={{ gap: 16 }}>
                    {/* Avatar placeholder */}
                    <div
                      className="rounded-full overflow-hidden"
                      style={{
                        width: 44,
                        height: 44,
                        backgroundColor: "#E0E0E0",
                      }}
                    />
                    <div className="flex flex-col" style={{ width: 150, gap: 2 }}>
                      <span
                        style={{
                          fontFamily: "Fredoka, sans-serif",
                          fontWeight: 500,
                          fontSize: 24,
                          lineHeight: "1em",
                          color: "#02000F",
                        }}
                      >
                        {review.author}
                      </span>
                      <span
                        style={{
                          fontFamily: "Onest, sans-serif",
                          fontWeight: 400,
                          fontSize: 16,
                          lineHeight: "1.75em",
                          color: "#6C6D71",
                        }}
                      >
                        {review.company}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel dots */}
        <div
          className="flex items-center justify-center w-full"
          style={{ gap: 21, marginTop: 20 }}
        >
          {/* Left line decoration */}
          <div
            style={{
              width: 271,
              height: 10,
              opacity: 0.3,
            }}
          />

          {/* Dots */}
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              style={{
                width: 22,
                height: 22,
                borderRadius: 9,
                backgroundColor: i === 1 ? "#F4E11B" : "#FFFFFF",
                border: i === 1 ? "3px solid #02000F" : "none",
              }}
            />
          ))}

          {/* Right line decoration */}
          <div
            style={{
              width: 271,
              height: 10,
              opacity: 0.3,
            }}
          />
        </div>
      </div>
    </section>
  );
}

export default GroomingFeedback;
