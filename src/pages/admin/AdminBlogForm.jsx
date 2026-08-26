import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { usePortfolio } from "../../context/PortfolioContext";
import { styles } from "../../styles";
import ImageUploader from "../../components/admin/ImageUploader";

const AdminBlogForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { blogs = [], addBlog, updateBlog } = usePortfolio();

  const isEditMode = id !== undefined;
  const targetIndex = isEditMode ? parseInt(id, 10) : -1;

  const [activeTab, setActiveTab] = useState("editor"); // 'editor' | 'preview'
  const [tagInput, setTagInput] = useState("");
  const [newGalleryUrl, setNewGalleryUrl] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    category: "Web Development",
    readTime: "5 min read",
    date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    image: "",
    excerpt: "",
    content: "",
    gallery: [],
    tags: ["React", "JavaScript", "WebDev"],
    author: {
      name: "Amir Ali Liaqat",
      role: "Full Stack Engineer",
      avatar: "/assets/amir.png",
    },
  });

  useEffect(() => {
    if (isEditMode) {
      let existing = blogs.find((b) => (b._id ? b._id === id : String(b.id) === String(id)));
      if (!existing && targetIndex >= 0 && blogs[targetIndex]) {
        existing = blogs[targetIndex];
      }

      if (existing) {
        setFormData({
          title: existing.title || "",
          category: existing.category || "Web Development",
          readTime: existing.readTime || "5 min read",
          date: existing.date || new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
          image: existing.image || "",
          excerpt: existing.excerpt || "",
          content: existing.content || "",
          gallery: existing.gallery || [],
          tags: existing.tags || [],
          author: {
            name: existing.author?.name || "Amir Ali Liaqat",
            role: existing.author?.role || "Full Stack Engineer",
            avatar: existing.author?.avatar || "/assets/amir.png",
          },
        });
      }
    }
  }, [id, blogs, isEditMode, targetIndex]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAuthorChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      author: { ...prev.author, [name]: value },
    }));
  };

  // Tag Management
  const addTag = () => {
    if (!tagInput.trim()) return;
    const cleanTag = tagInput.trim().replace(/^#/, "");
    if (!formData.tags.includes(cleanTag)) {
      setFormData((prev) => ({ ...prev, tags: [...prev.tags, cleanTag] }));
    }
    setTagInput("");
  };

  const removeTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tagToRemove),
    }));
  };

  // Gallery Management
  const addGalleryImage = (url) => {
    if (!url) return;
    setFormData((prev) => ({
      ...prev,
      gallery: [...(prev.gallery || []), url],
    }));
    setNewGalleryUrl("");
  };

  const removeGalleryImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((_, i) => i !== index),
    }));
  };

  // Content Insertion Tool Buttons
  const insertContentFormat = (prefix, suffix = "") => {
    const textarea = document.getElementById("blog-content-textarea");
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end) || "Sample Text";

    const replacement = `${prefix}${selectedText}${suffix}`;
    const newContent =
      textarea.value.substring(0, start) + replacement + textarea.value.substring(end);

    setFormData((prev) => ({ ...prev, content: newContent }));

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + prefix.length + selectedText.length);
    }, 50);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEditMode) {
      await updateBlog(targetIndex >= 0 ? targetIndex : id, formData);
      alert("Blog post updated successfully in MongoDB Atlas!");
    } else {
      await addBlog(formData);
      alert("New blog post published successfully to MongoDB Atlas!");
    }
    navigate("/admin/blogs");
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h2 className={styles.sectionHeadText}>
            {isEditMode ? "Edit Blog Article" : "Create New Blog Article"}
          </h2>
          <p className="text-secondary text-sm mt-1">
            Publish technical tutorials, code snippets, featured images, and galleries.
          </p>
        </div>

        {/* Action Tabs & Buttons */}
        <div className="flex items-center gap-3">
          <div className="bg-tertiary p-1 rounded-xl border border-white/10 flex items-center">
            <button
              type="button"
              onClick={() => setActiveTab("editor")}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === "editor"
                  ? "bg-[#915EFF] text-white shadow-md shadow-[#915EFF]/30"
                  : "text-secondary hover:text-white"
              }`}
            >
              <i className="fa-solid fa-pen-to-square mr-1.5" /> Editor Mode
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("preview")}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === "preview"
                  ? "bg-[#915EFF] text-white shadow-md shadow-[#915EFF]/30"
                  : "text-secondary hover:text-white"
              }`}
            >
              <i className="fa-solid fa-[#915EFF] fa-eye mr-1.5" /> Live Reader Preview
            </button>
          </div>

          <button
            type="button"
            onClick={() => navigate("/admin/blogs")}
            className="bg-black-100 text-secondary hover:text-white px-4 py-2.5 rounded-xl text-xs font-bold border border-white/10"
          >
            Cancel
          </button>
        </div>
      </div>

      {activeTab === "preview" ? (
        /* LIVE READER PREVIEW */
        <div className="bg-tertiary p-8 rounded-2xl border border-white/10 shadow-2xl space-y-6">
          <div className="border-b border-white/10 pb-6">
            <div className="flex items-center gap-3 text-xs text-secondary mb-3">
              <span className="bg-[#915EFF]/20 text-[#915EFF] px-3 py-1 rounded-full font-semibold">
                {formData.category}
              </span>
              <span>•</span>
              <span>{formData.date}</span>
              <span>•</span>
              <span>{formData.readTime}</span>
            </div>

            <h1 className="text-white font-bold text-3xl sm:text-4xl leading-tight mb-4">
              {formData.title || "Blog Post Title Placeholder"}
            </h1>

            <p className="text-secondary text-lg leading-relaxed italic">
              {formData.excerpt || "Short summary/excerpt of the blog post will appear here."}
            </p>

            {/* Author */}
            <div className="flex items-center gap-3 mt-6 pt-6 border-t border-white/5">
              <img
                src={formData.author.avatar || "/assets/amir.png"}
                alt={formData.author.name}
                className="w-12 h-12 rounded-full object-cover border border-[#915EFF]"
              />
              <div>
                <h4 className="text-white font-bold text-sm">{formData.author.name}</h4>
                <p className="text-secondary text-xs">{formData.author.role}</p>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          {formData.image && (
            <div className="rounded-2xl overflow-hidden max-h-[400px]">
              <img src={formData.image} alt={formData.title} className="w-full h-full object-cover" />
            </div>
          )}

          {/* Article Body Content */}
          <div className="prose prose-invert max-w-none text-secondary text-base leading-relaxed space-y-4 whitespace-pre-wrap">
            {formData.content || "Main body content of the blog post will be rendered here."}
          </div>

          {/* Gallery Section */}
          {formData.gallery && formData.gallery.length > 0 && (
            <div className="mt-10 pt-6 border-t border-white/10">
              <h3 className="text-white font-bold text-xl mb-4">Article Gallery ({formData.gallery.length})</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {formData.gallery.map((imgUrl, gIdx) => (
                  <div key={gIdx} className="rounded-xl overflow-hidden h-48 bg-black-100 border border-white/10">
                    <img src={imgUrl} alt={`Gallery ${gIdx}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {formData.tags && formData.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-6 border-t border-white/10">
              {formData.tags.map((t, idx) => (
                <span key={idx} className="bg-black-100 text-[#915EFF] px-3 py-1 rounded-lg text-xs font-mono">
                  #{t}
                </span>
              ))}
            </div>
          )}
        </div>
      ) : (
        /* EDITOR FORM MODE */
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* 1. Basic Article Meta */}
          <div className="bg-tertiary p-8 rounded-2xl shadow-card space-y-6">
            <h3 className="text-white font-bold text-lg border-b border-white/10 pb-3 flex items-center gap-2">
              <i className="fa-solid fa-heading text-[#915EFF]" />
              General Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <label className="flex flex-col md:col-span-2">
                <span className="text-white font-medium mb-2">Blog Title</span>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Master MERN Stack & Next.js Architecture in 2026"
                  className="bg-black-100 py-4 px-6 rounded-xl text-white outline-none font-medium"
                  required
                />
              </label>

              <label className="flex flex-col">
                <span className="text-white font-medium mb-2">Category</span>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="Web Development, MERN Stack, React, Cloud..."
                  className="bg-black-100 py-4 px-6 rounded-xl text-white outline-none font-medium"
                />
              </label>

              <label className="flex flex-col">
                <span className="text-white font-medium mb-2">Estimated Read Time</span>
                <input
                  type="text"
                  name="readTime"
                  value={formData.readTime}
                  onChange={handleChange}
                  placeholder="5 min read"
                  className="bg-black-100 py-4 px-6 rounded-xl text-white outline-none font-medium"
                />
              </label>
            </div>

            <label className="flex flex-col">
              <span className="text-white font-medium mb-2">Short Description / Excerpt</span>
              <textarea
                rows="3"
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                placeholder="Brief summary shown on blog preview cards and search engines..."
                className="bg-black-100 py-4 px-6 rounded-xl text-white outline-none font-medium"
              />
            </label>
          </div>

          {/* 2. Featured Image & Author */}
          <div className="bg-tertiary p-8 rounded-2xl shadow-card space-y-6">
            <h3 className="text-white font-bold text-lg border-b border-white/10 pb-3 flex items-center gap-2">
              <i className="fa-solid fa-image text-[#915EFF]" />
              Featured Cover Image & Author Settings
            </h3>

            <ImageUploader
              label="Featured Banner Image (Cloudinary)"
              value={formData.image}
              onChange={(url) => setFormData((prev) => ({ ...prev, image: url }))}
              placeholder="Cloudinary image URL"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-white/10">
              <label className="flex flex-col">
                <span className="text-white font-medium mb-2">Author Name</span>
                <input
                  type="text"
                  name="name"
                  value={formData.author.name}
                  onChange={handleAuthorChange}
                  className="bg-black-100 py-3.5 px-4 rounded-xl text-white outline-none font-medium text-sm"
                />
              </label>

              <label className="flex flex-col">
                <span className="text-white font-medium mb-2">Author Role</span>
                <input
                  type="text"
                  name="role"
                  value={formData.author.role}
                  onChange={handleAuthorChange}
                  className="bg-black-100 py-3.5 px-4 rounded-xl text-white outline-none font-medium text-sm"
                />
              </label>

              <ImageUploader
                label="Author Avatar"
                value={formData.author.avatar}
                onChange={(url) =>
                  setFormData((prev) => ({
                    ...prev,
                    author: { ...prev.author, avatar: url },
                  }))
                }
              />
            </div>
          </div>

          {/* 3. Rich Content Editor */}
          <div className="bg-tertiary p-8 rounded-2xl shadow-card space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
              <h3 className="text-white font-bold text-lg flex items-center gap-2">
                <i className="fa-solid fa-file-pen text-[#915EFF]" />
                Blog Content Body & Rich Editor
              </h3>
              <span className="text-secondary text-xs">Supports Markdown formatting, Headings, Lists, & Code</span>
            </div>

            {/* Formatting Toolbar */}
            <div className="bg-black-100 p-2.5 rounded-xl border border-white/10 flex flex-wrap gap-1.5 items-center">
              <button
                type="button"
                onClick={() => insertContentFormat("\n# ", "\n")}
                className="bg-tertiary hover:bg-[#915EFF] text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors"
                title="H1 Heading"
              >
                H1
              </button>
              <button
                type="button"
                onClick={() => insertContentFormat("\n## ", "\n")}
                className="bg-tertiary hover:bg-[#915EFF] text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors"
                title="H2 Heading"
              >
                H2
              </button>
              <button
                type="button"
                onClick={() => insertContentFormat("\n### ", "\n")}
                className="bg-tertiary hover:bg-[#915EFF] text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors"
                title="H3 Heading"
              >
                H3
              </button>
              <div className="h-5 w-[1px] bg-white/20 mx-1" />
              <button
                type="button"
                onClick={() => insertContentFormat("**", "**")}
                className="bg-tertiary hover:bg-[#915EFF] text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors"
                title="Bold"
              >
                <i className="fa-solid fa-bold" />
              </button>
              <button
                type="button"
                onClick={() => insertContentFormat("*", "*")}
                className="bg-tertiary hover:bg-[#915EFF] text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors"
                title="Italic"
              >
                <i className="fa-solid fa-italic" />
              </button>
              <button
                type="button"
                onClick={() => insertContentFormat("\n> ", "\n")}
                className="bg-tertiary hover:bg-[#915EFF] text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors"
                title="Quote"
              >
                <i className="fa-solid fa-quote-right" />
              </button>
              <button
                type="button"
                onClick={() => insertContentFormat("\n```js\n", "\n```\n")}
                className="bg-tertiary hover:bg-[#915EFF] text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors"
                title="Code Block"
              >
                <i className="fa-solid fa-code" />
              </button>
              <div className="h-5 w-[1px] bg-white/20 mx-1" />
              <button
                type="button"
                onClick={() => insertContentFormat("\n- ", "\n- \n- \n")}
                className="bg-tertiary hover:bg-[#915EFF] text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors"
                title="Bullet List"
              >
                <i className="fa-solid fa-list-ul" />
              </button>
              <button
                type="button"
                onClick={() => insertContentFormat("\n1. ", "\n2. \n3. \n")}
                className="bg-tertiary hover:bg-[#915EFF] text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors"
                title="Numbered List"
              >
                <i className="fa-solid fa-list-ol" />
              </button>
              <button
                type="button"
                onClick={() => insertContentFormat("[", "](https://example.com)")}
                className="bg-tertiary hover:bg-[#915EFF] text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors"
                title="Link"
              >
                <i className="fa-solid fa-link" />
              </button>
            </div>

            <textarea
              id="blog-content-textarea"
              rows="16"
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Write your complete blog article here. Use the formatting toolbar above to add headings, bold text, lists, quotes, links, and code snippets..."
              className="w-full bg-black-100 p-6 rounded-xl text-white outline-none font-mono text-sm leading-relaxed border border-white/10 focus:border-[#915EFF]"
              required
            />
          </div>

          {/* 4. Multiple Image Gallery */}
          <div className="bg-tertiary p-8 rounded-2xl shadow-card space-y-6">
            <h3 className="text-white font-bold text-lg border-b border-white/10 pb-3 flex items-center gap-2">
              <i className="fa-solid fa-images text-[#915EFF]" />
              Blog Image Gallery ({formData.gallery?.length || 0})
            </h3>

            <div className="flex flex-col sm:flex-row gap-3 items-end">
              <div className="flex-1 w-full">
                <ImageUploader
                  label="Add Image to Gallery (Cloudinary)"
                  value={newGalleryUrl}
                  onChange={(url) => setNewGalleryUrl(url)}
                  placeholder="Upload image for article gallery"
                />
              </div>
              <button
                type="button"
                onClick={() => addGalleryImage(newGalleryUrl)}
                className="bg-[#915EFF] text-white font-bold py-3.5 px-6 rounded-xl hover:bg-indigo-600 transition-colors text-sm flex-shrink-0"
              >
                + Add Image
              </button>
            </div>

            {formData.gallery && formData.gallery.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
                {formData.gallery.map((imgUrl, index) => (
                  <div key={index} className="relative group rounded-xl overflow-hidden h-32 border border-white/10 bg-black-100">
                    <img src={imgUrl} alt={`Gallery ${index}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeGalleryImage(index)}
                      className="absolute top-2 right-2 bg-red-600 text-white p-1.5 rounded-full text-xs opacity-90 hover:opacity-100 transition-opacity"
                    >
                      <i className="fa-solid fa-trash" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 5. Article Tags */}
          <div className="bg-tertiary p-8 rounded-2xl shadow-card space-y-6">
            <h3 className="text-white font-bold text-lg border-b border-white/10 pb-3 flex items-center gap-2">
              <i className="fa-solid fa-[#915EFF] fa-tags text-[#915EFF]" />
              Article Tags
            </h3>

            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder="Enter tag (e.g. React, MERN, Cloud)"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addTag();
                  }
                }}
                className="bg-black-100 py-3.5 px-5 rounded-xl text-white outline-none font-medium text-sm flex-1"
              />
              <button
                type="button"
                onClick={addTag}
                className="bg-[#915EFF] text-white font-bold py-3.5 px-6 rounded-xl hover:bg-indigo-600 transition-colors text-sm"
              >
                + Add Tag
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {formData.tags.map((t, idx) => (
                <span
                  key={idx}
                  className="bg-black-100 text-white border border-[#915EFF]/40 px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2"
                >
                  <span>#{t}</span>
                  <button
                    type="button"
                    onClick={() => removeTag(t)}
                    className="text-secondary hover:text-red-400 cursor-pointer"
                  >
                    <i className="fa-solid fa-xmark text-xs" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate("/admin/blogs")}
              className="bg-black-100 text-secondary hover:text-white font-bold py-4 px-8 rounded-xl transition-colors text-base"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#915EFF] text-white font-bold py-4 px-10 rounded-xl hover:bg-indigo-600 transition-colors shadow-lg shadow-[#915EFF]/30 text-base"
            >
              {isEditMode ? "Update Blog Post" : "Publish Blog Post"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AdminBlogForm;
