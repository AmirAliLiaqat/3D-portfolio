import { useState } from "react";
import { portfolioAPI } from "../../services/api";

const ImageUploader = ({ value, onChange, label = "Image", placeholder = "Image URL" }) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await portfolioAPI.uploadImage(formData);
      if (res && res.url) {
        onChange(res.url);
      } else {
        throw new Error(res.message || "Failed to upload image");
      }
    } catch (err) {
      console.error("Image upload error:", err);
      setError(err.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    onChange("");
    setError("");
  };

  return (
    <div className="flex flex-col gap-3 bg-black-200/50 p-4 rounded-xl border border-white/10">
      <div className="flex items-center justify-between">
        <label className="text-white font-medium text-sm flex items-center gap-2">
          <i className="fa-solid fa-image text-[#915EFF]" />
          {label}
        </label>
        {value && (
          <button
            type="button"
            onClick={handleRemove}
            className="text-red-400 hover:text-red-300 text-xs font-semibold flex items-center gap-1 bg-red-500/10 px-3 py-1 rounded-lg transition-colors"
          >
            <i className="fa-solid fa-trash-can" /> Remove Image
          </button>
        )}
      </div>

      {/* Live Preview Box */}
      {value ? (
        <div className="relative w-full h-[180px] bg-black-100 rounded-lg overflow-hidden border border-white/10 group">
          <img
            src={value}
            alt={label}
            className="w-full h-full object-contain p-2"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://via.placeholder.com/400x200?text=Invalid+Image+URL";
            }}
          />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <a
              href={value}
              target="_blank"
              rel="noreferrer"
              className="bg-white/20 hover:bg-white/30 text-white text-xs px-3 py-2 rounded-lg backdrop-blur-md transition-all flex items-center gap-1.5"
            >
              <i className="fa-solid fa-arrow-up-right-from-square" /> View Full
            </a>
          </div>
        </div>
      ) : (
        <div className="w-full h-[100px] border-2 border-dashed border-white/10 rounded-lg flex flex-col items-center justify-center text-secondary/50 text-xs gap-1">
          <i className="fa-solid fa-cloud-arrow-up text-2xl text-secondary/30" />
          <span>No image uploaded</span>
        </div>
      )}

      {/* Controls: Upload Button & Direct URL Input */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
        <label className="bg-[#915EFF] hover:bg-[#7d44f2] text-white font-semibold text-xs py-3 px-5 rounded-xl cursor-pointer transition-all flex items-center justify-center gap-2 shadow-md shadow-[#915EFF]/20 disabled:opacity-50">
          {uploading ? (
            <>
              <i className="fa-solid fa-spinner animate-spin" />
              <span>Uploading to Cloudinary...</span>
            </>
          ) : (
            <>
              <i className="fa-solid fa-cloud-arrow-up text-sm" />
              <span>Upload to Cloudinary</span>
            </>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={uploading}
            className="hidden"
          />
        </label>

        <input
          type="text"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="bg-black-100 py-3 px-4 rounded-xl text-white outline-none border border-white/10 font-mono text-xs flex-1 placeholder:text-secondary/40"
        />
      </div>

      {error && <p className="text-red-400 text-xs">{error}</p>}
    </div>
  );
};

export default ImageUploader;
