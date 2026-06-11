import { useState } from "react";
import {
  ArrowRight,
  Camera,
  Heart,
  Image,
  MessageSquare,
  Paperclip,
  Send,
  Share2,
  Tag,
  Video,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import CanvasLayout from "../../components/layout/CanvasLayout";
import Footer from "../../components/layout/Footer";
import NavBar from "../../components/Navbar";
import { blogImages } from "../../assets/blogImages";
import { useAuth } from "../../context/AuthContext";
import {
  COMMUNITY_POSTS,
  FEATURED_COMMUNITY_POST,
  INITIAL_COMMUNITY_COMMENTS,
} from "../../data/communityData";

function Author({ post, large = false }) {
  return (
    <div className="flex items-center gap-3">
      {post.avatar ? (
        <img src={post.avatar} alt="" className={`${large ? "h-12 w-12" : "h-10 w-10"} rounded-full border-2 border-[#005AB4] object-cover`} />
      ) : (
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#D7E2FF] text-[14px] font-semibold text-[#3E5E95]">
          {post.initials}
        </span>
      )}
      <div>
        <p className={`${large ? "text-[18px]" : "text-[16px]"} font-semibold text-[#1A1C1C]`}>{post.author}</p>
        <p className="text-[12px] text-[#414753]">{post.time}</p>
      </div>
    </div>
  );
}

function Actions({ post, onOpen }) {
  return (
    <div className="flex items-center justify-between border-t border-[#F3F3F3] pt-4 text-[#414753]">
      <div className="flex gap-6">
        <button type="button" className="flex items-center gap-2"><Heart className="h-[18px] w-5" /> {post.likes}</button>
        <button type="button" onClick={onOpen} className="flex items-center gap-2"><MessageSquare className="h-5 w-5" /> {post.comments}</button>
      </div>
      <button type="button" aria-label="Chia sẻ"><Share2 className="h-5 w-5" /></button>
    </div>
  );
}

function FeaturedCommunityCard({ onOpen }) {
  const post = FEATURED_COMMUNITY_POST;
  return (
    <article className="overflow-hidden rounded-[24px] border border-[#EEE] bg-white shadow-sm">
      <button type="button" onClick={onOpen} className="block h-[562px] w-full overflow-hidden bg-[#EEE]">
        <img src={post.image} alt="" className="h-full w-full object-cover" />
      </button>
      <div className="p-8">
        <Author post={post} large />
        <h2 className="mt-6 text-[16px] text-[rgba(0,0,0,0.87)]">{post.title}</h2>
        <div className="mt-4 space-y-5 text-[16px] leading-[26px] text-[#414753]">
          {post.paragraphs.map((text) => <p key={text}>{text}</p>)}
        </div>
        <div className="mt-8"><Actions post={post} onOpen={onOpen} /></div>
      </div>
    </article>
  );
}

function CommunityCard({ post, onOpen }) {
  return (
    <article className={`overflow-hidden rounded-[24px] border border-[#EEE] shadow-sm ${post.type === "Mẹo vặt" ? "bg-[rgba(186,236,232,0.4)]" : "bg-white"}`}>
      {post.image && <button type="button" onClick={onOpen} className="block h-64 w-full"><img src={post.image} alt="" className="h-full w-full object-cover" /></button>}
      <div className="p-6">
        <div className="flex items-start justify-between">
          <Author post={post} />
          {post.type && <span className="rounded-full bg-[#F3E8EE] px-3 py-1 text-[12px] font-semibold text-[#672950]">{post.type}</span>}
        </div>
        {post.title && <h3 className="mt-4 text-[16px] font-bold text-[rgba(0,0,0,0.87)]">{post.title}</h3>}
        <p className={`mt-3 text-[16px] leading-6 ${post.type === "Mẹo vặt" ? "italic text-[#1C4E4C]" : "text-[#1A1C1C]"}`}>{post.content}</p>
        {post.tags && <div className="mt-4 flex gap-2">{post.tags.map((tag) => <span key={tag} className="rounded-lg bg-[rgba(214,227,255,0.5)] px-2 py-0.5 text-[10px] font-semibold text-[#005AB4]">{tag}</span>)}</div>}
        <div className="mt-5"><Actions post={post} onOpen={onOpen} /></div>
      </div>
    </article>
  );
}

function Composer({ onPost }) {
  const [value, setValue] = useState("");
  const submit = () => {
    if (!value.trim()) return;
    onPost(value.trim());
    setValue("");
  };
  return (
    <section className="relative w-[1210px] overflow-hidden rounded-[32px] border-2 border-dashed border-[rgba(0,90,180,0.2)] bg-[#FFF9C4] p-8 shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1)]">
      <div className="absolute -right-4 -top-4 h-24 w-24 rounded-bl-[34px] rounded-br-[62px] rounded-tl-[58px] rounded-tr-[20px] bg-[#FDD835]" />
      <div className="relative flex gap-6">
        <img src={blogImages.communityAuthor} alt="" className="h-[57px] w-[57px] rounded-full border-2 border-[#005AB4] object-cover" />
        <textarea value={value} onChange={(event) => setValue(event.target.value)} placeholder="Sen đang nghĩ gì về các boss hôm nay?..." className="h-[80px] flex-1 resize-none rounded-[24px] border border-white/80 bg-white/60 px-6 py-4 outline-none" />
      </div>
      <div className="relative mt-6 flex items-center justify-between">
        <div className="flex gap-4">
          {[[Image, "Ảnh"], [Video, "Video"], [Tag, "Thẻ"]].map(([Icon, label]) => <button key={label} type="button" className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[#005AB4] shadow-sm"><Icon className="h-[18px] w-[18px]" />{label}</button>)}
        </div>
        <button type="button" onClick={submit} className="rounded-full bg-[#90CAF9] px-10 py-3 font-semibold shadow-lg">Đăng bài ngay</button>
      </div>
    </section>
  );
}

function PostModal({ post, comments, onClose, onAddComment }) {
  const [value, setValue] = useState("");
  const [replyTo, setReplyTo] = useState(null);
  const submit = () => {
    if (!value.trim()) return;
    onAddComment(value.trim());
    setValue("");
    setReplyTo(null);
  };
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-8" onMouseDown={onClose}>
      <div className="flex h-[795px] w-[1024px] overflow-hidden rounded-[16px] border border-[#C1C6D5] bg-white shadow-2xl" onMouseDown={(event) => event.stopPropagation()}>
        <div className="w-[623px] border-r border-[#C1C6D5]">
          <div className="border-b border-[#C1C6D5] px-6 py-4">Bài viết của {post.author}</div>
          <img src={post.image} alt="" className="h-[360px] w-full object-cover" />
          <div className="p-6">
            <Author post={post} large />
            <h2 className="mt-5 text-[16px]">{post.title}</h2>
            <div className="mt-4 space-y-5 text-[16px] leading-[26px] text-[#414753]">{post.paragraphs.map((text) => <p key={text}>{text}</p>)}</div>
            <div className="mt-6 grid grid-cols-3 gap-2">
              <button className="flex items-center justify-center gap-2 py-2"><Heart className="h-6 w-6" />{post.likes}</button>
              <button className="flex items-center justify-center gap-2 rounded-lg bg-[#C1C6D5]/20 py-2"><MessageSquare className="h-5 w-5" />{comments.length}</button>
              <button className="flex items-center justify-center gap-2 py-2"><Share2 className="h-5 w-5" />Chia sẻ</button>
            </div>
          </div>
        </div>
        <div className="flex w-[400px] flex-col">
          <div className="flex items-center justify-between border-b border-[#C1C6D5] px-6 py-4">
            <span>Bình luận ({comments.length})</span><button type="button" onClick={onClose}><X className="h-5 w-5" /></button>
          </div>
          <div className="flex-1 overflow-y-auto p-6">
            {comments.length ? comments.map((comment) => (
              <div key={comment.id} className="mb-4 flex gap-3">
                <span className="h-8 w-8 shrink-0 rounded-full bg-[#EEE]" />
                <div className="flex-1">
                  <div className="rounded-bl-[16px] rounded-br-[16px] rounded-tr-[16px] bg-[#F3F3F3] p-3">
                    <p className="text-[16px] text-[#1A1C1C]">{comment.author}</p><p className="text-[16px] text-[#414753]">{comment.content}</p>
                  </div>
                  <div className="mt-1 flex gap-4 px-1 text-[12px]"><button>Thích</button><button onClick={() => setReplyTo(comment.author)}>Trả lời</button><span className="opacity-60">{comment.time}</span></div>
                </div>
              </div>
            )) : <div className="flex h-full flex-col items-center justify-center text-center text-[#414753]"><MessageSquare className="h-14 w-14 text-[#C1C6D5]" /><p className="mt-3 text-[#1A1C1C]">Chưa có bình luận nào</p><p>Hãy là người đầu tiên bình luận.</p></div>}
          </div>
          <div className="flex gap-3 border-t border-[#C1C6D5] p-3">
            <img src={blogImages.communityAuthor} alt="" className="h-10 w-10 rounded-full border-2 border-[#005AB4]" />
            <div className="flex-1 rounded-[16px] bg-[#EEE] p-3">
              {replyTo && <div className="mb-2 flex justify-between text-[12px] text-[#414753]"><span>Đang trả lời <b>{replyTo}</b></span><button onClick={() => setReplyTo(null)}><X className="h-3 w-3" /></button></div>}
              <textarea value={value} onChange={(event) => setValue(event.target.value)} placeholder="Sen viết vài dòng đi nè..." className="h-12 w-full resize-none bg-transparent outline-none" />
              <div className="flex items-center justify-between border-t border-[#C1C6D5]/30 pt-2"><div className="flex gap-2"><Camera className="h-4 w-4" /><Paperclip className="h-5 w-5" /></div><button onClick={submit} className="rounded-full bg-[#005AB4] p-2 text-white"><Send className="h-4 w-4" /></button></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CommunityPage() {
  const { isAuthenticated } = useAuth();
  const [posts, setPosts] = useState(COMMUNITY_POSTS);
  const [comments, setComments] = useState(INITIAL_COMMUNITY_COMMENTS);
  const [modalOpen, setModalOpen] = useState(false);
  const addPost = (content) => setPosts((items) => [{ id: Date.now(), author: "Bạn", initials: "B", time: "Vừa xong", type: "Chia sẻ", content, likes: 0, comments: 0 }, ...items]);
  const addComment = (content) => setComments((items) => [...items, { id: Date.now(), author: "Bạn", content, time: "Vừa xong" }]);

  return (
    <div className="min-h-screen bg-white">
      <CanvasLayout>
        <NavBar isAuthenticated={isAuthenticated} />
        <main className="flex min-h-[2100px] flex-col items-center gap-3 bg-[#E5F6FD] pb-10">
          <nav className="flex h-14 w-[1200px] items-center gap-10 text-[16px]"><Link to="/blog" className="font-medium text-[#4B5563]">Blog nền tảng</Link><span className="flex h-full items-center border-b-2 border-[#0D47A1] font-bold text-[#0D47A1]">Cộng đồng chia sẻ</span></nav>
          <section className="flex flex-col items-center pb-5 pt-2 text-center"><h1 className="flex items-center gap-1 text-[40px] font-bold tracking-[-0.8px]">Kết nối <span className="text-[#0D47A1]">chia sẻ</span><img src={blogImages.communityTitle} alt="" className="h-12 w-12" /></h1><p className="mt-2 text-[16px] leading-6 text-[#414753]">Nơi chia sẻ khoảnh khắc, kinh nghiệm và lan tỏa yêu thương<br />cùng cộng đồng yêu thú cưng!!</p></section>
          <Composer onPost={addPost} />
          <section className="mt-7 grid w-[1208px] grid-cols-2 items-start gap-4">
            <div className="flex flex-col gap-4"><FeaturedCommunityCard onOpen={() => setModalOpen(true)} />{posts.filter((_, index) => index % 2 === 0).map((post) => <CommunityCard key={post.id} post={post} onOpen={() => setModalOpen(true)} />)}</div>
            <div className="flex flex-col gap-4">{posts.filter((_, index) => index % 2 === 1).map((post) => <CommunityCard key={post.id} post={post} onOpen={() => setModalOpen(true)} />)}<div className="rounded-[24px] bg-[#0D47A1] p-8 text-center text-white"><h3 className="font-semibold">Gia đình Dr.Pet</h3><p className="mt-2 text-[14px]">Tham gia cộng đồng Zalo để cập nhật tin tức và ưu đãi sớm nhất.</p><button className="mt-5 rounded-full bg-white px-8 py-2 text-[12px] font-bold text-[#0D47A1]">THAM GIA NGAY</button></div></div>
          </section>
          <button type="button" className="mt-8 flex items-center gap-2 rounded-full border-2 border-[#FDD835] bg-[#FFF9C4] px-8 py-4 font-bold text-[#374151]">Xem thêm bài viết <ArrowRight className="h-4 w-4" /></button>
        </main>
        <Footer variant="white" />
      </CanvasLayout>
      {modalOpen && <PostModal post={FEATURED_COMMUNITY_POST} comments={comments} onClose={() => setModalOpen(false)} onAddComment={addComment} />}
    </div>
  );
}
