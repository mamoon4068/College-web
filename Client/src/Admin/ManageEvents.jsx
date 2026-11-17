
import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, CalendarDays } from "lucide-react";
import { api, getError } from "../lib/api";
import {
  PageHeader, Reveal, Modal, Alert, Loading,
  Empty, Status, inputClass, primaryButton, panelClass,
} from "../components/AdminUI";

const blank = {
  title: "",
  description: "",
  date: "",
  venue: "",
  imageUrl: "",
  published: false,
};

export default function ManageEvents() {
  const [events, setEvents] = useState([]);
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
      const { data } = await api.get("/admin/events");
      setEvents(data.events || []);
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
      date: item.date ? item.date.slice(0, 10) : "",
      venue: item.venue || "",
      imageUrl: item.imageUrl || "",
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
        await api.patch(`/events/${editing._id}`, form);
      } else {
        await api.post("/events", form);
      }
      setOpen(false);
      setSuccess(editing ? "Event updated successfully" : "Event created successfully");
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
      await api.delete(`/events/${item._id}`);
      setSuccess("Event deleted successfully");
      await load();
    } catch (err) {
      setError(getError(err));
    } finally {
      setDeleting(null);
    }
  }

  return (
    <Reveal watch={events.length}>
      <div data-gsap-reveal>
        <PageHeader
          title="Manage Events"
          subtitle="Create and organize school activities and celebrations."
          action={
            <button onClick={() => start()} className={primaryButton}>
              <Plus size={19} /> Add Event
            </button>
          }
        />
      </div>

      <Alert message={!open ? error : ""} />
      <Alert message={success} success />

      {loading ? <Loading /> : (
        <div data-gsap-reveal className={`${panelClass} overflow-hidden`}>
          {events.length === 0 ? (
            <Empty message="No events found. Create your first event." />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-175 text-left">
                <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                  <tr>
                    {["Event", "Date", "Venue", "Status", "Actions"].map((h) => (
                      <th key={h} className="px-6 py-5 font-bold">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {events.map((item) => (
                    <tr key={item._id} className="border-t border-slate-100 transition hover:bg-blue-50/40">
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="rounded-xl bg-violet-50 p-3 text-violet-600">
                            <CalendarDays size={20} />
                          </div>
                          <div className="max-w-55">
                            <p className="truncate font-bold text-[#102C50]">{item.title}</p>
                            <p className="truncate text-xs text-slate-400">{item.description}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-sm text-slate-600">
                        {item.date ? new Date(item.date).toLocaleDateString("en-IN", { timeZone: "UTC" }) : "—"}
                      </td>
                      <td className="px-6 py-5 text-sm text-slate-600">{item.venue || "—"}</td>
                      <td className="px-6 py-5"><Status published={item.published} /></td>
                      <td className="px-6 py-5">
                        <div className="flex gap-2">
                          <button aria-label="Edit event" onClick={() => start(item)} className="rounded-lg p-2.5 text-blue-600 hover:bg-blue-100">
                            <Pencil size={18} />
                          </button>
                          <button aria-label="Delete event" disabled={deleting === item._id} onClick={() => remove(item)} className="rounded-lg p-2.5 text-red-600 hover:bg-red-100 disabled:opacity-50">
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
        <Modal title={editing ? "Edit Event" : "Create New Event"} onClose={() => setOpen(false)}>
          <Alert message={error} />
          <form onSubmit={save} className="space-y-5">
            <label className="block text-sm font-bold text-slate-700">
              Event Title
              <input required value={form.title} onChange={(e) => update("title", e.target.value)} className={inputClass} placeholder="Annual Sports Day" />
            </label>

            <label className="block text-sm font-bold text-slate-700">
              Description
              <textarea required rows={4} value={form.description} onChange={(e) => update("description", e.target.value)} className={inputClass} placeholder="Event details..." />
            </label>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm font-bold text-slate-700">
                Event Date
                <input required type="date" value={form.date} onChange={(e) => update("date", e.target.value)} className={inputClass} />
              </label>
              <label className="block text-sm font-bold text-slate-700">
                Venue
                <input value={form.venue} onChange={(e) => update("venue", e.target.value)} className={inputClass} placeholder="School Campus" />
              </label>
            </div>

            <label className="block text-sm font-bold text-slate-700">
              Event Image URL
              <input type="url" value={form.imageUrl} onChange={(e) => update("imageUrl", e.target.value)} className={inputClass} placeholder="https://..." />
            </label>

            {form.imageUrl && (
              <img src={form.imageUrl} alt="Event preview" className="h-40 w-full rounded-xl bg-slate-100 object-cover" />
            )}

            <label className="flex items-center gap-3 rounded-xl bg-blue-50 p-4 text-sm font-semibold text-[#102C50]">
              <input type="checkbox" checked={form.published} onChange={(e) => update("published", e.target.checked)} className="h-4 w-4 accent-blue-600" />
              Publish event on website
            </label>

            <button disabled={busy} className={`${primaryButton} w-full`}>
              {busy ? "Saving..." : editing ? "Update Event" : "Create Event"}
            </button>
          </form>
        </Modal>
      )}
    </Reveal>
  );
}
