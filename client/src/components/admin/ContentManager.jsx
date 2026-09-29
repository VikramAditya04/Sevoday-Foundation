import { useEffect, useState } from "react";
import { Pencil, Plus, Save, Trash2, X } from "lucide-react";
import PageHeader from "./PageHeader";
import { createContent, deleteContent, getAdminContent, updateContent } from "../../services/contentService";

const initialValues = {
  title: "",
  eyebrow: "",
  description: "",
  content: "",
  image: "",
  alt: "",
  buttonText: "",
  buttonLink: "",
  slug: "",
  order: 0,
  isPublished: true,
};

const configs = {
  SLIDER: { title: "Slider", description: "Manage the homepage hero slides.", fields: ["eyebrow", "description", "image", "alt", "buttonText", "buttonLink", "order", "isPublished"] },
  ABOUT: { title: "About", description: "Manage the public About story and homepage preview.", fields: ["eyebrow", "description", "content", "image", "alt", "isPublished"] },
  GALLERY: { title: "Gallery", description: "Add and arrange public gallery images.", fields: ["description", "image", "alt", "order", "isPublished"] },
  CERTIFICATE: { title: "Certificates", description: "Publish certificates and recognitions on the public website.", fields: ["description", "content", "image", "alt", "order", "isPublished"] },
  ACHIEVEMENT: { title: "Achievements", description: "Publish achievements and milestones on the public website.", fields: ["description", "content", "image", "alt", "order", "isPublished"] },
  POLICY: { title: "Policies", description: "Manage public policy pages and documents.", fields: ["slug", "description", "content", "order", "isPublished"] },
  NEWS: { title: "News", description: "Publish news and updates across the website. Image and article link are optional.", fields: ["description", "content", "image", "alt", "buttonText", "buttonLink", "slug", "order", "isPublished"] },
  NOTICE: { title: "Notices", description: "Publish important public notices and announcements.", fields: ["description", "content", "slug", "order", "isPublished"] },
};

const inputClass = "mt-1 w-full rounded-lg border border-[#dfe8df] bg-[#fdfcf7] px-3 py-2.5 text-sm text-[#123524] outline-none transition focus:border-[#2f6b3f] focus:ring-2 focus:ring-[#2f6b3f20]";

function fieldLabel(field) {
  if (field === "buttonText") return "Article link label (optional)";
  if (field === "buttonLink") return "Article link URL (optional)";
  return field.replace(/([A-Z])/g, " $1").replace(/^./, (letter) => letter.toUpperCase());
}

export default function ContentManager({ type }) {
  const config = configs[type];
  const [items, setItems] = useState([]);
  const [values, setValues] = useState({ ...initialValues, type });
  const [imageFile, setImageFile] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const loadItems = () => {
    setIsLoading(true);
    getAdminContent(type)
      .then((response) => setItems(response.items || []))
      .catch((requestError) => setError(requestError.message))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    loadItems();
  }, [type]);

  const openCreate = () => {
    setValues({ ...initialValues, type });
    setImageFile(null);
    setEditingId(null);
    setError("");
    setMessage("");
    setIsFormOpen(true);
  };

  const openEdit = (item) => {
    setValues({ ...initialValues, ...item, type });
    setImageFile(null);
    setEditingId(item._id || item.id);
    setError("");
    setMessage("");
    setIsFormOpen(true);
  };

  const handleChange = (event) => {
    const { name, value, type: inputType, checked } = event.target;
    setValues((current) => ({ ...current, [name]: inputType === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSaving(true);
    setError("");
    setMessage("");
    try {
      if (editingId) await updateContent(editingId, type, values, imageFile);
      else await createContent(type, values, imageFile);
      setMessage(`${config.title} saved successfully.`);
      setIsFormOpen(false);
      loadItems();
    } catch (saveError) {
      setError(saveError.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this content permanently?")) return;
    try {
      await deleteContent(id);
      setMessage(`${config.title} deleted successfully.`);
      loadItems();
    } catch (deleteError) {
      setError(deleteError.message);
    }
  };

  return (
    <div className="rounded-2xl border border-[#dfe8df] bg-[#f7f6f1] p-3 sm:p-4 lg:p-5">
      <PageHeader
        breadcrumb={`Content / ${config.title}`}
        title={config.title}
        action={
          <button type="button" onClick={openCreate} className="inline-flex items-center gap-2 rounded-lg bg-[#123552] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#081e35]">
            <Plus className="h-4 w-4 text-white" /> Add {config.title}
          </button>
        }
      />

      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-slate-600">{config.description}</p>
        {isLoading ? <span className="text-sm text-slate-500">Loading...</span> : null}
      </div>
      {message ? <p className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{message}</p> : null}
      {error ? <p className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p> : null}

      {items.length === 0 && !isLoading ? (
        <div className="rounded-xl border border-dashed border-[#cbd8cc] bg-white px-5 py-14 text-center text-slate-500">No {config.title.toLowerCase()} added yet.</div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <article key={item._id || item.id} className="overflow-hidden rounded-xl border border-[#dfe8df] bg-white shadow-sm">
              {item.image ? <img src={item.image} alt={item.alt || item.title} className="h-44 w-full object-cover" /> : null}
              <div className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="font-semibold text-[#123524]">{item.title}</h2>
                    <p className="mt-1 text-xs text-slate-500">Order: {item.order || 0} · {item.isPublished ? "Published" : "Draft"}</p>
                  </div>
                  <span className={`rounded-full px-2 py-1 text-[10px] font-bold uppercase ${item.isPublished ? "bg-[#eaf3ec] text-[#2f6b3f]" : "bg-slate-100 text-slate-500"}`}>{item.isPublished ? "Live" : "Draft"}</span>
                </div>
                <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">{item.description || item.content || "No description added."}</p>
                <div className="mt-4 flex gap-2 border-t border-[#edf0eb] pt-3">
                  <button type="button" onClick={() => openEdit(item)} className="inline-flex items-center gap-1.5 rounded-md bg-[#eaf3ec] px-3 py-2 text-xs font-semibold text-[#1f4a2c] transition hover:bg-[#dfeedd]"><Pencil className="h-3.5 w-3.5" /> Edit</button>
                  <button type="button" onClick={() => handleDelete(item._id || item.id)} className="inline-flex items-center gap-1.5 rounded-md bg-red-50 px-3 py-2 text-xs font-semibold text-red-700 transition hover:bg-red-100"><Trash2 className="h-3.5 w-3.5" /> Delete</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {isFormOpen ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-[#12352480] p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-[#dfe8df] bg-white p-5 shadow-2xl sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#2f6b3f]">Content / {config.title}</p><h2 className="mt-1 text-xl font-bold text-[#123524]">{editingId ? "Edit" : "Add"} {config.title}</h2></div>
              <button type="button" onClick={() => setIsFormOpen(false)} className="rounded-lg p-2 text-slate-500 hover:bg-[#f4f7f0]" aria-label="Close content form"><X className="h-5 w-5" /></button>
            </div>
            <form className="mt-5 grid gap-4 sm:grid-cols-2" onSubmit={handleSubmit}>
              <label className="text-sm font-semibold text-[#123524] sm:col-span-2">Title<input className={inputClass} name="title" value={values.title} onChange={handleChange} required /></label>
              {config.fields.filter((field) => field !== "image").map((field) => (
                <label key={field} className={`text-sm font-semibold text-[#123524] ${["description", "content", "buttonLink"].includes(field) ? "sm:col-span-2" : ""}`}>
                  {fieldLabel(field)}
                  {field === "isPublished" ? <span className="mt-2 flex items-center gap-2 font-normal"><input type="checkbox" name={field} checked={values[field]} onChange={handleChange} /> Published on website</span> : field === "description" || field === "content" ? <textarea className={`${inputClass} min-h-28`} name={field} value={values[field]} onChange={handleChange} /> : <input className={inputClass} name={field} type={field === "order" ? "number" : "text"} value={values[field]} onChange={handleChange} />}
                </label>
              ))}
              <label className="text-sm font-semibold text-[#123524] sm:col-span-2">Image URL<input className={inputClass} name="image" value={values.image} onChange={handleChange} placeholder="Paste an image URL or upload below" /></label>
              <label className="text-sm font-semibold text-[#123524] sm:col-span-2">Upload image<input className="mt-1 block w-full rounded-lg border border-[#dfe8df] bg-[#fdfcf7] px-3 py-2 text-sm" type="file" accept="image/jpeg,image/png" onChange={(event) => setImageFile(event.target.files?.[0] || null)} /></label>
              <div className="flex justify-end gap-3 pt-2 sm:col-span-2"><button type="button" onClick={() => setIsFormOpen(false)} className="rounded-lg border border-[#dfe8df] px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-[#f4f7f0]">Cancel</button><button type="submit" disabled={isSaving} className="inline-flex items-center gap-2 rounded-lg bg-[#123552] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#081e35] disabled:opacity-60"><Save className="h-4 w-4 text-white" />{isSaving ? "Saving..." : "Save changes"}</button></div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}
