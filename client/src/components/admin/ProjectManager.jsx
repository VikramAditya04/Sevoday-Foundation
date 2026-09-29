import { useEffect, useState } from "react";
import { Pencil, Plus, Save, Trash2, X } from "lucide-react";
import PageHeader from "./PageHeader";
import { createProject, deleteProject, getAdminProjects, updateProject } from "../../services/projectService";

const initialValues = {
  title: "",
  type: "",
  text: "",
  image: "",
  icon: "education",
  color: "blue",
  startDate: "",
  endDate: "",
  status: "ONGOING",
  slug: "",
  order: 0,
  isPublished: true,
};

const inputClass = "mt-1 w-full rounded-lg border border-[#dfe8df] bg-[#fdfcf7] px-3 py-2.5 text-sm text-[#123524] outline-none transition focus:border-[#2f6b3f] focus:ring-2 focus:ring-[#2f6b3f20]";

function formatDate(value) {
  return value ? new Date(value).toISOString().slice(0, 10) : "";
}

export default function ProjectManager() {
  const [projects, setProjects] = useState([]);
  const [values, setValues] = useState(initialValues);
  const [imageFile, setImageFile] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const loadProjects = () => {
    setIsLoading(true);
    getAdminProjects()
      .then((response) => setProjects(response.projects || []))
      .catch((requestError) => setError(requestError.message))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const openCreate = () => {
    setValues(initialValues);
    setImageFile(null);
    setEditingId(null);
    setError("");
    setMessage("");
    setIsFormOpen(true);
  };

  const openEdit = (project) => {
    setValues({ ...initialValues, ...project, startDate: formatDate(project.startDate), endDate: formatDate(project.endDate) });
    setImageFile(null);
    setEditingId(project.id);
    setError("");
    setMessage("");
    setIsFormOpen(true);
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setValues((current) => ({ ...current, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSaving(true);
    setError("");
    setMessage("");
    try {
      if (editingId) await updateProject(editingId, values, imageFile);
      else await createProject(values, imageFile);
      setMessage("Project saved successfully.");
      setIsFormOpen(false);
      loadProjects();
    } catch (saveError) {
      setError(saveError.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this project permanently?")) return;
    try {
      await deleteProject(id);
      setMessage("Project deleted successfully.");
      loadProjects();
    } catch (deleteError) {
      setError(deleteError.message);
    }
  };

  return (
    <div className="rounded-2xl border border-[#dfe8df] bg-[#f7f6f1] p-3 sm:p-4 lg:p-5">
      <PageHeader
        breadcrumb="Projects"
        title="Projects"
        action={<button type="button" onClick={openCreate} className="inline-flex items-center gap-2 rounded-lg bg-[#123552] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#081e35]"><Plus className="h-4 w-4" /> Add Project</button>}
      />
      <div className="mb-5 flex items-center justify-between gap-3"><p className="text-sm text-slate-600">Manage public projects, descriptions, images, and status.</p>{isLoading ? <span className="text-sm text-slate-500">Loading...</span> : null}</div>
      {message ? <p className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{message}</p> : null}
      {error ? <p className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p> : null}
      {!isLoading && projects.length === 0 ? <div className="rounded-xl border border-dashed border-[#cbd8cc] bg-white px-5 py-14 text-center text-slate-500">No projects added yet.</div> : null}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <article key={project.id} className="overflow-hidden rounded-xl border border-[#dfe8df] bg-white shadow-sm">
            {project.image ? <img src={project.image} alt={`${project.title} project`} className="h-44 w-full object-cover" /> : null}
            <div className="p-4">
              <div className="flex items-start justify-between gap-3"><div><h2 className="font-semibold text-[#123524]">{project.title}</h2><p className="mt-1 text-xs text-slate-500">{project.type} · Order {project.order || 0}</p></div><span className="rounded-full bg-[#eaf3ec] px-2 py-1 text-[10px] font-bold uppercase text-[#2f6b3f]">{project.status}</span></div>
              <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">{project.text}</p>
              <p className="mt-2 text-xs text-slate-500">{project.isPublished ? "Published on website" : "Draft"}</p>
              <div className="mt-4 flex gap-2 border-t border-[#edf0eb] pt-3"><button type="button" onClick={() => openEdit(project)} className="inline-flex items-center gap-1.5 rounded-md bg-[#eaf3ec] px-3 py-2 text-xs font-semibold text-[#1f4a2c] hover:bg-[#dfeedd]"><Pencil className="h-3.5 w-3.5" /> Edit</button><button type="button" onClick={() => handleDelete(project.id)} className="inline-flex items-center gap-1.5 rounded-md bg-red-50 px-3 py-2 text-xs font-semibold text-red-700 hover:bg-red-100"><Trash2 className="h-3.5 w-3.5" /> Delete</button></div>
            </div>
          </article>
        ))}
      </div>

      {isFormOpen ? <div className="fixed inset-0 z-50 grid place-items-center bg-[#12352480] p-4"><div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-[#dfe8df] bg-white p-5 shadow-2xl sm:p-6"><div className="flex items-start justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#2f6b3f]">Projects</p><h2 className="mt-1 text-xl font-bold text-[#123524]">{editingId ? "Edit" : "Add"} Project</h2></div><button type="button" onClick={() => setIsFormOpen(false)} className="rounded-lg p-2 text-slate-500 hover:bg-[#f4f7f0]" aria-label="Close project form"><X className="h-5 w-5" /></button></div><form className="mt-5 grid gap-4 sm:grid-cols-2" onSubmit={handleSubmit}><label className="text-sm font-semibold text-[#123524]">Project name<input className={inputClass} name="title" value={values.title} onChange={handleChange} required /></label><label className="text-sm font-semibold text-[#123524]">Type<input className={inputClass} name="type" value={values.type} onChange={handleChange} placeholder="Education" required /></label><label className="text-sm font-semibold text-[#123524] sm:col-span-2">Description<textarea className={`${inputClass} min-h-28`} name="text" value={values.text} onChange={handleChange} required /></label><label className="text-sm font-semibold text-[#123524]">Status<select className={inputClass} name="status" value={values.status} onChange={handleChange}><option value="ONGOING">Ongoing</option><option value="COMPLETED">Completed</option><option value="PLANNED">Planned</option><option value="PAUSED">Paused</option></select></label><label className="text-sm font-semibold text-[#123524]">Order<input className={inputClass} name="order" type="number" value={values.order} onChange={handleChange} /></label><label className="text-sm font-semibold text-[#123524]">Start date<input className={inputClass} name="startDate" type="date" value={values.startDate} onChange={handleChange} /></label><label className="text-sm font-semibold text-[#123524]">End date<input className={inputClass} name="endDate" type="date" value={values.endDate} onChange={handleChange} /></label><label className="text-sm font-semibold text-[#123524]">Icon<input className={inputClass} name="icon" value={values.icon} onChange={handleChange} placeholder="education" /></label><label className="text-sm font-semibold text-[#123524]">Color<input className={inputClass} name="color" value={values.color} onChange={handleChange} placeholder="blue" /></label><label className="text-sm font-semibold text-[#123524] sm:col-span-2">Slug<input className={inputClass} name="slug" value={values.slug} onChange={handleChange} /></label><label className="text-sm font-semibold text-[#123524] sm:col-span-2">Image URL<input className={inputClass} name="image" value={values.image} onChange={handleChange} placeholder="Optional image URL" /></label><label className="text-sm font-semibold text-[#123524] sm:col-span-2">Upload image<input className="mt-1 block w-full rounded-lg border border-[#dfe8df] bg-[#fdfcf7] px-3 py-2 text-sm" type="file" accept="image/jpeg,image/png" onChange={(event) => setImageFile(event.target.files?.[0] || null)} /></label><label className="flex items-center gap-2 text-sm font-semibold text-[#123524] sm:col-span-2"><input name="isPublished" type="checkbox" checked={values.isPublished} onChange={handleChange} /> Published on website</label><div className="flex justify-end gap-3 pt-2 sm:col-span-2"><button type="button" onClick={() => setIsFormOpen(false)} className="rounded-lg border border-[#dfe8df] px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-[#f4f7f0]">Cancel</button><button type="submit" disabled={isSaving} className="inline-flex items-center gap-2 rounded-lg bg-[#123552] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#081e35] disabled:opacity-60"><Save className="h-4 w-4" />{isSaving ? "Saving..." : "Save changes"}</button></div></form></div></div> : null}
    </div>
  );
}
