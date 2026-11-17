
import { useEffect, useState } from "react";
import {
  Plus, Trash2, ImagePlus, Images,
  UploadCloud, LoaderCircle,
} from "lucide-react";
import { api, getError } from "../lib/api";
import {
  PageHeader, Reveal, Modal, Alert, Loading,
  Empty, inputClass, primaryButton, panelClass,
} from "../components/AdminUI";

export default function ManageGallery() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("School Activities");
  const [busy, setBusy] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function load() {
    try {
      const { data } = await api.get("/admin/gallery");
      setPhotos(data.gallery || []);
    } catch (err) {
      setError(getError(err));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  useEffect(() => {
    if (!file) {
      setPreview("");
      return;
    }

    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  function startUpload() {
    setTitle("");
    setCategory("School Activities");
    setFile(null);
    setError("");
    setOpen(true);
  }

  function chooseFile(e) {
    const selected = e.target.files?.[0];

    if (!selected) {
      setFile(null);
      return;
    }

    const types = ["image/jpeg", "image/png", "image/webp"];

    if (!types.includes(selected.type)) {
      setError("Only JPG, PNG and WebP images are allowed");
      setFile(null);
      e.target.value = "";
      return;
    }

    if (selected.size > 5 * 1024 * 1024) {
      setError("Image size must be 5 MB or smaller");
      setFile(null);
      e.target.value = "";
      return;
    }

    setError("");
    setFile(selected);
  }

  async function upload(e) {
    e.preventDefault();
    if (!file || busy) return;

    setBusy(true);
    setError("");

    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", title.trim());
    formData.append("category", category);

    try {
      await api.post("/gallery", formData);
      setOpen(false);
      setFile(null);
      setSuccess("Photo uploaded successfully");
      await load();
    } catch (err) {
      setError(getError(err));
    } finally {
      setBusy(false);
    }
  }

  async function remove(item) {
    if (!window.confirm(`Delete "${item.title}"?`)) return;

    setDeleting(item._id);
    setError("");

    try {
      await api.delete(`/gallery/${item._id}`);
      setSuccess("Photo deleted successfully");
      await load();
    } catch (err) {
      setError(getError(err));
    } finally {
      setDeleting(null);
    }
  }

  return (
    <Reveal watch={photos.length}>
      <div data-gsap-reveal>
        <PageHeader
          title="Manage Gallery"
          subtitle="Upload and organize your school's beautiful memories."
          action={
            <button onClick={startUpload} className={primaryButton}>
              <Plus size={19} /> Upload Photo
            </button>
          }
        />
      </div>

      <Alert message={!open ? error : ""} />
      <Alert message={success} success />

      {loading ? <Loading /> : photos.length === 0 ? (
        <div data-gsap-reveal className={panelClass}>
          <Empty message="No photos uploaded yet. Start building your gallery." />
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {photos.map((photo) => (
            <div
              data-gsap-reveal
              key={photo._id}
              className={`${panelClass} group overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl`}
            >
              <div className="relative h-52 overflow-hidden bg-slate-100">
                <img
                  src={photo.imageUrl}
                  alt={photo.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-[#102C50] backdrop-blur">
                  {photo.category}
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 p-5">
                <div className="min-w-0">
                  <h3 className="truncate font-bold text-[#102C50]">
                    {photo.title}
                  </h3>
                  <p className="mt-1 text-xs text-slate-400">
                    Gallery Photo
                  </p>
                </div>

                <button
                  aria-label={`Delete ${photo.title}`}
                  disabled={deleting === photo._id}
                  onClick={() => remove(photo)}
                  className="rounded-xl bg-red-50 p-3 text-red-600 transition hover:bg-red-100 disabled:opacity-50"
                >
                  {deleting === photo._id
                    ? <LoaderCircle size={19} className="animate-spin" />
                    : <Trash2 size={19} />}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {open && (
        <Modal title="Upload Gallery Photo" onClose={() => setOpen(false)}>
          <Alert message={error} />

          <form onSubmit={upload} className="space-y-5">
            <label className="block text-sm font-bold text-slate-700">
              Photo Title
              <input
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={inputClass}
                placeholder="Annual Function 2026"
              />
            </label>

            <label className="block text-sm font-bold text-slate-700">
              Category
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={inputClass}
              >
                {[
                  "School Activities",
                  "Sports",
                  "Celebrations",
                  "Academics",
                  "Campus",
                ].map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </label>

            <label className="block cursor-pointer rounded-2xl border-2 border-dashed border-blue-200 bg-blue-50/50 p-7 text-center transition hover:border-blue-500 hover:bg-blue-50">
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={chooseFile}
                className="sr-only"
              />
              <UploadCloud size={35} className="mx-auto text-blue-600" />
              <p className="mt-3 text-sm font-bold text-[#102C50]">
                Click to select an image
              </p>
              <p className="mt-1 text-xs text-slate-500">
                JPG, PNG or WebP • Maximum 5 MB
              </p>
            </label>

            {preview ? (
              <img
                src={preview}
                alt="Selected image preview"
                className="h-48 w-full rounded-xl object-cover"
              />
            ) : (
              <div className="grid h-36 place-items-center rounded-xl bg-slate-50 text-slate-300">
                <ImagePlus size={42} />
              </div>
            )}

            <button
              disabled={busy || !file}
              className={`${primaryButton} w-full`}
            >
              {busy ? (
                <>
                  <LoaderCircle size={19} className="animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Images size={19} />
                  Upload Photo
                </>
              )}
            </button>
          </form>
        </Modal>
      )}
    </Reveal>
  );
}
