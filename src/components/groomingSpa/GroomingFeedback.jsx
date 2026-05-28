import { homeImages } from "../../assets/homeImages";

const REVIEWS = [
  {
    id: 1,
    rating: 5,
    text: "These are the perfect size for our small dog. The design is cute and the rubber on the bottom is great because it makes them more durable. They've held up to being...",
    author: "Mary Douglas",
    company: "Pet Shop Inc.",
    avatar: "https://i.pravatar.cc/150?u=mary"
  },
  {
    id: 2,
    rating: 5,
    text: "These are the perfect size for our small dog. The design is cute and the rubber on the bottom is great because it makes them more durable. They've held up to being...",
    author: "Mary Douglas",
    company: "Pet Shop Inc.",
    avatar: "https://i.pravatar.cc/150?u=mary2"
  },
  {
    id: 3,
    rating: 5,
    text: "These are the perfect size for our small dog. The design is cute and the rubber on the bottom is great because it makes them more durable. They've held up to being...",
    author: "Mary Douglas",
    company: "Pet Shop Inc.",
    avatar: "https://i.pravatar.cc/150?u=mary3"
  }
];

function GroomingFeedback() {
  return (
    <section className="relative w-full overflow-hidden bg-white py-16">
      {/* Soft Blue Cloud Background Container */}
      <div className="mx-auto max-w-[1440px] relative px-4 md:px-20 py-20 rounded-[80px] bg-[#E5F6FD] overflow-hidden">
        
        {/* Decorative Paws on background */}
        <img src={homeImages.paw} alt="" className="absolute top-10 left-[20%] w-12 opacity-60 rotate-[30deg]" />
        <img src={homeImages.paw} alt="" className="absolute top-[15%] right-[15%] w-16 opacity-80 rotate-[-15deg]" />
        <img src={homeImages.paw} alt="" className="absolute bottom-10 left-[10%] w-10 opacity-70 rotate-[-45deg]" />
        <img src={homeImages.paw} alt="" className="absolute bottom-[20%] right-[5%] w-20 opacity-90 rotate-[10deg]" />

        {/* Title */}
        <h2 className="relative z-10 text-center font-display text-4xl md:text-5xl font-bold text-[#0B0F19] mb-12">
          Phản hồi của khách hàng
        </h2>

        {/* Cards Wrapper */}
        <div className="relative z-10 flex flex-col gap-6 md:flex-row md:justify-center">
          {REVIEWS.map((review) => (
            <article 
              key={review.id}
              className="flex-1 rounded-[24px] bg-white p-8 shadow-sm transition hover:shadow-md max-w-[380px]"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4 text-[#FFC107] text-xl">
                {'★'.repeat(review.rating)}
              </div>
              
              <p className="text-[#4A5568] text-sm md:text-base leading-relaxed mb-6 line-clamp-4">
                "{review.text}"
              </p>

              <div className="flex items-center gap-4">
                <img 
                  src={review.avatar} 
                  alt={review.author} 
                  className="w-12 h-12 rounded-full object-cover bg-gray-200" 
                />
                <div>
                  <h4 className="font-bold text-[#0B0F19] text-base">{review.author}</h4>
                  <p className="text-sm text-gray-500">{review.company}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Pagination Dots */}
        <div className="relative z-10 flex justify-center items-center gap-3 mt-12">
           <div className="w-12 h-[2px] bg-white/50 rounded" />
           <button className="w-4 h-4 rounded-full bg-[#FFC107] border-2 border-black" aria-label="Page 1" />
           <button className="w-4 h-4 rounded-full bg-white" aria-label="Page 2" />
           <button className="w-4 h-4 rounded-full bg-white" aria-label="Page 3" />
           <button className="w-4 h-4 rounded-full bg-white" aria-label="Page 4" />
           <button className="w-4 h-4 rounded-full bg-white" aria-label="Page 5" />
           <div className="w-12 h-[2px] bg-white/50 rounded" />
        </div>

      </div>
    </section>
  );
}

export default GroomingFeedback;
