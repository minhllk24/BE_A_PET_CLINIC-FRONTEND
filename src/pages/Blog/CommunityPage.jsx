import { useEffect, useMemo, useRef, useState } from "react";
import {
  Bookmark,
  Camera,
  Check,
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
import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/Navbar";
import { blogImages } from "../../assets/blogImages";
import { useAuth } from "../../context/AuthContext";
import {
  COMMUNITY_POSTS,
  FEATURED_COMMUNITY_POST,
  INITIAL_COMMUNITY_COMMENTS,
} from "../../data/communityData";
import { getPostsPage } from "../../services/contentService";

const POST_TYPES = {
  "Khoảnh khắc": "bg-[#E3F2FD] text-[#005AB4]",
  "Hỏi đáp": "bg-[#F3E8EE] text-[#672950]",
  "Mẹo vặt": "bg-[#DDF4F1] text-[#346461]",
  "Kinh nghiệm": "bg-[#FFF1D6] text-[#8A5700]",
};

const EMPTY_COMMENTS = [];

function normalizeCommunityPost(post) {
  return {
    ...post,
    content: post.content || post.paragraphs?.join("\n\n") || "",
    likes: post.likes ?? 0,
    comments: post.comments ?? 0,
  };
}

function normalizeApiCommunityPost(post) {
  return normalizeCommunityPost({
    ...post,
    author: post.author,
    avatar: post.authorImage,
    time: post.publishedAt,
    image: post.image,
    content: post.description || post.excerpt,
    type: post.categoryLabel,
    likes: post.likesCount,
    comments: post.commentsCount,
    tags: post.tags,
  });
}

function splitBalanced(posts) {
  const columns = [[], []];
  posts.forEach((post, index) => columns[index % 2].push(post));
  return columns;
}

function Author({ post, large = false }) {
  return (
    <div className="flex items-center gap-3">
      {post.avatar ? (
        <img src={post.avatar} alt="" className={`${large ? "h-12 w-12" : "h-10 w-10"} rounded-full border-2 border-[#005AB4] object-cover`} />
      ) : (
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#D7E2FF] text-[14px] font-semibold text-[#3E5E95]">
          {post.initials || post.author?.slice(0, 1)}
        </span>
      )}
      <div>
        <p className={`${large ? "text-[18px]" : "text-[16px]"} font-semibold text-[#1A1C1C]`}>{post.author}</p>
        <p className="text-[12px] text-[#414753]">{post.time}</p>
      </div>
    </div>
  );
}

function TypeBadge({ type }) {
  if (!type) return null;
  return <span className={`rounded-full px-3 py-1 text-[12px] font-semibold ${POST_TYPES[type] || "bg-[#EEE] text-[#414753]"}`}>{type}</span>;
}

function Actions({ post, liked, saved, onLike, onComment, onShare, onSave }) {
  const action = (handler) => (event) => {
    event.stopPropagation();
    handler();
  };
  return (
    <div className="flex items-center justify-between border-t border-[#F3F3F3] pt-4 text-[#414753]">
      <div className="flex gap-6">
        <button type="button" onClick={action(onLike)} className={`flex items-center gap-2 ${liked ? "text-[#D32F2F]" : ""}`}>
          <Heart className="h-[18px] w-5" fill={liked ? "currentColor" : "none"} /> {post.likes}
        </button>
        <button type="button" onClick={action(onComment)} className="flex items-center gap-2"><MessageSquare className="h-5 w-5" /> {post.comments}</button>
      </div>
      <div className="flex gap-4">
        <button type="button" onClick={action(onSave)} aria-label="Lưu bài viết" className={saved ? "text-[#005AB4]" : ""}><Bookmark className="h-5 w-5" fill={saved ? "currentColor" : "none"} /></button>
        <button type="button" onClick={action(onShare)} aria-label="Chia sẻ"><Share2 className="h-5 w-5" /></button>
      </div>
    </div>
  );
}

function CommunityCard({ post, state, onOpen, onLike, onShare, onSave }) {
  return (
    <article
      role="button"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={(event) => event.key === "Enter" && onOpen()}
      // className={`cursor-pointer overflow-hidden rounded-[24px] border border-[#EEE] shadow-sm transition-transform hover:-translate-y-0.5 ${post.type === "Mẹo vặt" ? "bg-[rgba(186,236,232,0.4)]" : "bg-white"}`}
      className={`cursor-pointer overflow-hidden rounded-[24px] border border-[#EEE] shadow-sm transition-transform hover:-translate-y-0.5 bg-white`}
    >
      {post.image && <img src={post.image} alt="" className={`${post.featured ? "h-[562px]" : "h-64"} w-full object-cover`} />}
      {post.video && <video src={post.video} controls onClick={(event) => event.stopPropagation()} className="h-64 w-full bg-black object-contain" />}
      <div className={post.featured ? "p-8" : "p-6"}>
        <div className="flex items-start justify-between"><Author post={post} large={post.featured} /><TypeBadge type={post.type} /></div>
        {post.title && <h3 className="mt-4 text-[16px] font-bold text-[rgba(0,0,0,0.87)]">{post.title}</h3>}
        {/* <div className={`mt-3 whitespace-pre-line text-[16px] leading-[26px] ${post.type === "Mẹo vặt" ? "italic text-[#1C4E4C]" : "text-[#414753]"}`}>{post.content}</div> */}
        <div className={`mt-3 whitespace-pre-line text-[16px] leading-[26px] text-[#414753]`}>{post.content}</div>
        {post.tags && <div className="mt-4 flex flex-wrap gap-2">{post.tags.map((tag) => <span key={tag} className="rounded-lg bg-[rgba(214,227,255,0.5)] px-2 py-0.5 text-[10px] font-semibold text-[#005AB4]">{tag}</span>)}</div>}
        <div className="mt-6">
          <Actions post={post} liked={state.liked} saved={state.saved} onLike={onLike} onComment={onOpen} onShare={onShare} onSave={onSave} />
        </div>
      </div>
    </article>
  );
}

function Composer({ onPost }) {
  const imageInput = useRef(null);
  const videoInput = useRef(null);
  const [value, setValue] = useState("");
  const [type, setType] = useState("");
  const [media, setMedia] = useState(null);
  const [showTypes, setShowTypes] = useState(false);

  const selectFile = (event, kind) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setMedia({ kind, name: file.name, url: URL.createObjectURL(file) });
  };
  const submit = () => {
    if (!value.trim() && !media) return;
    onPost({ content: value.trim(), type, [media?.kind]: media?.url });
    setValue("");
    setMedia(null);
  };

  return (
    <section className="relative w-[1210px] overflow-visible rounded-[32px] border-2 border-dashed border-[rgba(0,90,180,0.2)] bg-[#FFF9C4] p-8 shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1)]">
      <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-[34px] rounded-br-[62px] rounded-tl-[58px] rounded-tr-[20px] bg-[#FDD835]" />
      <div className="relative flex gap-6">
        <img src={blogImages.communityAuthor} alt="" className="h-[57px] w-[57px] rounded-full border-2 border-[#005AB4] object-cover" />
        <div className="flex-1">
          <textarea value={value} onChange={(event) => setValue(event.target.value)} placeholder="Sen đang nghĩ gì về các boss hôm nay..." className="h-[80px] w-full resize-none rounded-[24px] border border-white/80 bg-white/60 px-6 py-4 outline-none" />
          {media && <div className="mt-3 flex items-center justify-between rounded-xl bg-white/70 px-4 py-2 text-sm text-[#005AB4]"><span>{media.kind === "image" ? "Ảnh" : "Video"}: {media.name}</span><button onClick={() => setMedia(null)}><X className="h-4 w-4" /></button></div>}
        </div>
      </div>
      <div className="relative mt-6 flex items-center justify-between">
        <div className="flex gap-4">
          <input ref={imageInput} type="file" accept="image/*" className="hidden" onChange={(event) => selectFile(event, "image")} />
          <input ref={videoInput} type="file" accept="video/*" className="hidden" onChange={(event) => selectFile(event, "video")} />
          <button type="button" onClick={() => imageInput.current?.click()} className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[#005AB4] shadow-sm"><Image className="h-[18px] w-[18px]" />Ảnh</button>
          <button type="button" onClick={() => videoInput.current?.click()} className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[#005AB4] shadow-sm"><Video className="h-[18px] w-[18px]" />Video</button>
          <div className="relative">
            <button type="button" onClick={() => setShowTypes((open) => !open)} className={`flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[#005AB4] shadow-sm ${POST_TYPES[type]}`}><Tag className="h-[18px] w-[18px]" />{type || "Thẻ"}</button>
            {showTypes && <div className="absolute left-0 top-12 z-20 flex w-44 flex-col gap-2 rounded-2xl bg-white p-3 shadow-xl">{Object.keys(POST_TYPES).map((item) => <button key={item} type="button" onClick={() => { setType(item); setShowTypes(false); }} className={`flex items-center justify-between rounded-xl px-3 py-2 text-left text-sm ${POST_TYPES[item]}`}>{item}{type === item && <Check className="h-4 w-4" />}</button>)}</div>}
          </div>
        </div>
        <button type="button" onClick={submit} disabled={!value.trim() && !media} className="rounded-full bg-[#90CAF9] px-10 py-3 font-semibold shadow-lg transition-colors hover:bg-[#64B5F6] disabled:cursor-not-allowed disabled:opacity-50">Chia sẻ</button>
      </div>
    </section>
  );
}

function PostModal({ post, comments, state, onClose, onAddComment, onLike, onShare, onSave }) {
  const imageInput = useRef(null);
  const fileInput = useRef(null);
  const commentInput = useRef(null);
  const [value, setValue] = useState("");
  const [replyTo, setReplyTo] = useState(null);
  const [attachment, setAttachment] = useState(null);
  const [likedComments, setLikedComments] = useState({});
  const selectAttachment = (event, kind) => {
    const file = event.target.files?.[0];
    if (file) setAttachment({ kind, name: file.name });
  };
  const submit = () => {
    if (!value.trim() && !attachment) return;
    onAddComment(value.trim() || `Đã gửi ${attachment.kind === "image" ? "một ảnh" : "một tệp đính kèm"}`, replyTo);
    setValue("");
    setReplyTo(null);
    setAttachment(null);
  };
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4 sm:p-6" onMouseDown={onClose}>
      <div className="flex h-[795px] max-h-[calc(100vh-48px)] w-[1024px] max-w-[calc(100vw-32px)] overflow-hidden rounded-[16px] border border-[#C1C6D5] bg-white shadow-2xl" onMouseDown={(event) => event.stopPropagation()}>
        <div className="flex min-h-0 w-[623px] flex-col border-r border-[#C1C6D5]">
          <div className="border-b border-[#C1C6D5] px-6 py-4">Bài viết của {post.author}</div>
          {post.image && <img src={post.image} alt="" className="h-[360px] w-full object-cover" />}
          {post.video && <video src={post.video} controls className="h-[360px] w-full bg-black object-contain" />}
          <div className="min-h-0 flex-1 overflow-y-auto p-6">
            <div className="flex items-start justify-between"><Author post={post} large /><TypeBadge type={post.type} /></div>
            {post.title && <h2 className="mt-5 text-[16px] font-semibold">{post.title}</h2>}
            <div className="mt-4 whitespace-pre-line text-[16px] leading-[26px] text-[#414753]">{post.content}</div>
            <div className="mt-6"><Actions post={post} liked={state.liked} saved={state.saved} onLike={onLike} onComment={() => commentInput.current?.focus()} onShare={onShare} onSave={onSave} /></div>
          </div>
        </div>
        <div className="flex min-h-0 w-[400px] flex-col">
          <div className="flex items-center justify-between border-b border-[#C1C6D5] px-6 py-4"><span>Bình luận ({comments.length})</span><button type="button" onClick={onClose}><X className="h-5 w-5" /></button></div>
          <div className="min-h-0 flex-1 overflow-y-auto p-6">
            {comments.length ? comments.map((comment) => (
              <div key={comment.id} className="mb-4 flex gap-3">
                <span className="h-8 w-8 shrink-0 rounded-full bg-[#EEE]" />
                <div className="flex-1">
                  <div className="rounded-bl-[16px] rounded-br-[16px] rounded-tr-[16px] bg-[#F3F3F3] p-3"><p className="text-[16px] text-[#1A1C1C]">{comment.author}</p>{comment.replyTo && <p className="text-xs text-[#005AB4]">Trả lời {comment.replyTo}</p>}<p className="text-[16px] text-[#414753]">{comment.content}</p></div>
                  <div className="mt-1 flex gap-4 px-1 text-[12px]"><button className={likedComments[comment.id] ? "font-semibold text-[#005AB4]" : ""} onClick={() => setLikedComments((items) => ({ ...items, [comment.id]: !items[comment.id] }))}>Thích</button><button onClick={() => { setReplyTo(comment.author); commentInput.current?.focus(); }}>Trả lời</button><span className="opacity-60">{comment.time}</span></div>
                </div>
              </div>
            )) : <div className="flex h-full flex-col items-center justify-center text-center text-[#414753]"><MessageSquare className="h-14 w-14 text-[#C1C6D5]" /><p className="mt-3 text-[#1A1C1C]">Chưa có bình luận nào</p><p>Hãy là người đầu tiên bình luận.</p></div>}
          </div>
          <div className="flex gap-3 border-t border-[#C1C6D5] p-3">
            <img src={blogImages.communityAuthor} alt="" className="h-10 w-10 rounded-full border-2 border-[#005AB4]" />
            <div className="flex-1 rounded-[16px] bg-[#EEE] p-3">
              {replyTo && <div className="mb-2 flex justify-between text-[12px] text-[#414753]"><span>Đang trả lời <b>{replyTo}</b></span><button onClick={() => setReplyTo(null)}><X className="h-3 w-3" /></button></div>}
              <textarea ref={commentInput} value={value} onChange={(event) => setValue(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); submit(); } }} placeholder="Sen nghĩ gì về bài đăng này..." className="h-12 w-full resize-none bg-transparent outline-none" />
              {attachment && <div className="mb-2 flex items-center justify-between rounded-lg bg-white px-2 py-1 text-[11px] text-[#005AB4]"><span className="truncate">{attachment.name}</span><button type="button" onClick={() => setAttachment(null)}><X className="h-3 w-3" /></button></div>}
              <div className="flex items-center justify-between border-t border-[#C1C6D5]/30 pt-2">
                <div className="flex gap-2">
                  <input ref={imageInput} type="file" accept="image/*" className="hidden" onChange={(event) => selectAttachment(event, "image")} />
                  <input ref={fileInput} type="file" className="hidden" onChange={(event) => selectAttachment(event, "file")} />
                  <button type="button" onClick={() => imageInput.current?.click()} aria-label="Đính kèm ảnh"><Camera className="h-4 w-4" /></button>
                  <button type="button" onClick={() => fileInput.current?.click()} aria-label="Đính kèm tệp"><Paperclip className="h-5 w-5" /></button>
                </div>
                <button type="button" onClick={submit} disabled={!value.trim() && !attachment} className="rounded-full bg-[#005AB4] p-2 text-white disabled:opacity-40"><Send className="h-4 w-4" /></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CommunityPage() {
  const { isAuthenticated } = useAuth();
  const featured = useMemo(() => ({ ...normalizeCommunityPost(FEATURED_COMMUNITY_POST), featured: true }), []);
  const [posts, setPosts] = useState(() => COMMUNITY_POSTS.map(normalizeCommunityPost));
  const [selectedId, setSelectedId] = useState(null);
  const [commentsByPost, setCommentsByPost] = useState({ [featured.id]: INITIAL_COMMUNITY_COMMENTS });
  const [postState, setPostState] = useState({});
  const [shareNotice, setShareNotice] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    let active = true;
    setIsLoading(true);
    setLoadError("");

    getPostsPage({ type: "community", limit: 100 })
      .then((payload) => {
        if (!active || !payload.posts.length) return;
        setPosts(payload.posts.map(normalizeApiCommunityPost));
      })
      .catch((error) => {
        if (!active) return;
        setLoadError(error?.message || "Không thể tải bài viết cộng đồng.");
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const allPosts = useMemo(() => [featured, ...posts], [featured, posts]);
  const selectedPost = allPosts.find((post) => post.id === selectedId);
  const columns = useMemo(() => splitBalanced(allPosts), [allPosts]);
  const getState = (id) => postState[id] || { liked: false, saved: false };
  const updatePostState = (id, key) => setPostState((state) => {
    const current = state[id] || { liked: false, saved: false };
    return { ...state, [id]: { ...current, [key]: !current[key] } };
  });
  const openPost = (id) => setSelectedId(id);
  const sharePost = async (post) => {
    const url = `${window.location.origin}/blog/cong-dong#${post.id}`;
    if (navigator.share) await navigator.share({ title: post.title || "Bài viết cộng đồng", url }).catch(() => {});
    else await navigator.clipboard?.writeText(url);
    setShareNotice("Đã sao chép liên kết bài viết");
    window.setTimeout(() => setShareNotice(""), 1800);
  };
  const addPost = (payload) => setPosts((items) => [{ id: `post-${Date.now()}`, author: "Bạn", initials: "B", time: "Vừa xong", likes: 0, comments: 0, ...payload }, ...items]);
  const addComment = (postId, content, replyTo) => {
    setCommentsByPost((state) => ({ ...state, [postId]: [...(state[postId] || []), { id: Date.now(), author: "Bạn", content, replyTo, time: "Vừa xong" }] }));
    setPosts((items) => items.map((post) => post.id === postId ? { ...post, comments: Number(post.comments || 0) + 1 } : post));
  };

  return (
    <div className="min-h-screen bg-white">
      <CanvasLayout>
        <NavBar isAuthenticated={isAuthenticated} />
        <main className="flex min-h-[2100px] flex-col items-center gap-3 bg-[#E5F6FD] pb-10">
          <nav className="flex h-14 w-[1200px] items-center gap-10 text-[16px]">
            <Link to="/blog/kien-thuc" className="font-medium text-[#4B5563]">Kiến thức thú cưng</Link>
            <span className="flex h-full items-center border-b-2 border-[#0D47A1] font-bold text-[#0D47A1]">Cộng đồng chia sẻ</span>
            <Link to="/blog/so-cuu" className="font-medium text-[#4B5563]">Cẩm nang sơ cứu</Link>
          </nav>
          <section className="flex flex-col items-center pb-5 pt-2 text-center"><h1 className="flex items-center gap-1 text-[40px] font-bold tracking-[-0.8px]">Kết nối <span className="text-[#0D47A1]">chia sẻ</span><img src={blogImages.communityTitle} alt="" className="h-12 w-12" /></h1><p className="mt-2 text-[16px] leading-6 text-[#414753]">Nơi chia sẻ khoảnh khắc, kinh nghiệm và lan tỏa yêu thương<br />cùng cộng đồng yêu thú cưng!!</p></section>
          <Composer onPost={addPost} />
          {loadError && <p className="w-[1208px] text-[14px] text-[#D32F2F]">{loadError}</p>}
          {isLoading && <p className="w-[1208px] text-[16px] text-[#0D47A1]">Đang tải bài viết cộng đồng...</p>}
          <section className="mt-7 grid w-[1208px] grid-cols-2 items-start gap-4">
            {columns.map((column, columnIndex) => <div key={columnIndex} className="flex flex-col gap-4">{column.map((post) => <CommunityCard key={post.id} post={post} state={getState(post.id)} onOpen={() => openPost(post.id)} onLike={() => updatePostState(post.id, "liked")} onSave={() => updatePostState(post.id, "saved")} onShare={() => sharePost(post)} />)}{columnIndex === 1 && <div className="rounded-[24px] bg-[#0D47A1] p-8 text-center text-white"><h3 className="font-semibold">Gia đình Dr.Pet</h3><p className="mt-2 text-[14px]">Tham gia cộng đồng Zalo để cập nhật tin tức và ưu đãi sớm nhất.</p><button className="mt-5 rounded-full bg-white px-8 py-2 text-[12px] font-bold text-[#0D47A1]">THAM GIA NGAY</button></div>}</div>)}
          </section>
        </main>
        <Footer variant="white" />
      </CanvasLayout>
      {shareNotice && <div className="fixed bottom-6 left-1/2 z-[110] -translate-x-1/2 rounded-full bg-[#1A1C1C] px-5 py-3 text-sm text-white shadow-xl">{shareNotice}</div>}
      {selectedPost && <PostModal post={selectedPost} comments={commentsByPost[selectedPost.id] || EMPTY_COMMENTS} state={getState(selectedPost.id)} onClose={() => setSelectedId(null)} onAddComment={(content, replyTo) => addComment(selectedPost.id, content, replyTo)} onLike={() => updatePostState(selectedPost.id, "liked")} onSave={() => updatePostState(selectedPost.id, "saved")} onShare={() => sharePost(selectedPost)} />}
    </div>
  );
}
