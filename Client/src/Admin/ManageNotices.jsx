
import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Megaphone } from "lucide-react";
import { api, getError } from "../lib/api";
import {
  PageHeader, Reveal, Modal, Alert, Loading,
  Empty, Status, inputClass, primaryButton, panelClass,
} from "../component/Adminui";

const blank = {
  title: "",
  description: "",
  category: "General",
  published: false,
};

export default function ManageNotices() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(blank);
  const [busy, setBusy] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function load() {
    try {
      const { data } = await api.get("/admin/notices");
      setNotices(data.notices || []);
    } catch (err) {
      setError(getError(err));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  function start(item = null) {
    setEditing(item);
    setForm(item ? {
      title: item.title || "",
      description: item.description || "",
      category: item.category || "General",
      published: !!item.published,
    } : { ...blank });
    setError("");
    setOpen(true);
  }

  function update(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function save(e) {
    e.preventDefault();
    setBusy(true);
    setError("");

    try {
      if (editing) {
        await api.patch(`/notices/${editing._id}`, form);
      } else {
        await api.post("/notices", form);
      }
      setOpen(false);
      setSuccess(editing ? "Notice updated successfully" : "Notice created successfully");
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
      await api.delete(`/notices/${item._id}`);
      setSuccess("Notice deleted successfully");
      await load();
    } catch (err) {
      setError(getError(err));
    } finally {
      setDeleting(null);
    }
  }

  return (
    <Reveal watch={notices.length}>
      <div data-gsap-reveal>
        <PageHeader
          title="Manage Notices"
          subtitle="Create and publish school announcements."
          action={
            <button onClick={() => start()} className={primaryButton}>
              <Plus size={19} /> Add Notice
            </button>
          }
        />
      </div>

      <Alert message={!open ? error : ""} />
      <Alert message={success} success />

      {loading ? <Loading /> : (
        <div data-gsap-reveal className={`${panelClass} overflow-hidden`}>
          {notices.length === 0 ? (
            <Empty message="No notices found. Create your first notice." />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-175 text-left">
                <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                  <tr>
                    {["Notice", "Category", "Status", "Updated", "Actions"].map((h) => (
                      <th key={h} className="px-6 py-5 font-bold">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {notices.map((item) => (
                    <tr key={item._id} className="border-t border-slate-100 transition hover:bg-blue-50/40">
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                            <Megaphone size={19} />
                          </div>
                          <div className="max-w-60">
                            <p className="truncate font-bold text-[#102C50]">{item.title}</p>
                            <p className="truncate text-xs text-slate-400">{item.description}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-sm text-slate-600">{item.category}</td>
                      <td className="px-6 py-5"><Status published={item.published} /></td>
                      <td className="px-6 py-5 text-sm text-slate-500">
                        {item.updatedAt ? new Date(item.updatedAt).toLocaleDateString("en-IN") : "—"}
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex gap-2">
                          <button aria-label="Edit notice" onClick={() => start(item)} className="rounded-lg p-2.5 text-blue-600 transition hover:bg-blue-100">
                            <Pencil size={18} />
                          </button>
                          <button aria-label="Delete notice" disabled={deleting === item._id} onClick={() => remove(item)} className="rounded-lg p-2.5 text-red-600 transition hover:bg-red-100 disabled:opacity-50">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {open && (
        <Modal title={editing ? "Edit Notice" : "Create New Notice"} onClose={() => setOpen(false)}>
          <Alert message={error} />
          <form onSubmit={save} className="space-y-5">
            <label className="block text-sm font-bold text-slate-700">
              Notice Title
              <input required maxLength={160} value={form.title} onChange={(e) => update("title", e.target.value)} className={inputClass} placeholder="Enter notice title" />
            </label>
            <label className="block text-sm font-bold text-slate-700">
              Description
              <textarea required rows={5} value={form.description} onChange={(e) => update("description", e.target.value)} className={inputClass} placeholder="Write notice details..." />
            </label>
            <label className="block text-sm font-bold text-slate-700">
              Category
              <select value={form.category} onChange={(e) => update("category", e.target.value)} className={inputClass}>
                {["General", "Examination", "Admission", "Holiday", "Important"].map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </label>
            <label className="flex items-center gap-3 rounded-xl bg-blue-50 p-4 text-sm font-semibold text-[#102C50]">
              <input type="checkbox" checked={form.published} onChange={(e) => update("published", e.target.checked)} className="h-4 w-4 accent-blue-600" />
              Publish this notice on the website
            </label>
            <button disabled={busy} className={`${primaryButton} w-full`}>
              {busy ? "Saving..." : editing ? "Update Notice" : "Create Notice"}
            </button>
          </form>
        </Modal>
      )}
    </Reveal>
  );
}
