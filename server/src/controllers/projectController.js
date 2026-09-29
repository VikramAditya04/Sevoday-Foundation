import { cloudinary, isConfigured } from "../config/cloudinary.js";
import Project from "../models/Project.js";

const statuses = ["ONGOING", "COMPLETED", "PLANNED", "PAUSED"];

function projectPayload(body) {
  const status = String(body.status || "ONGOING").trim().toUpperCase();
  return {
    title: String(body.title || "").trim(),
    type: String(body.type || "").trim(),
    text: String(body.text || "").trim(),
    image: String(body.image || "").trim(),
    icon: String(body.icon || "education").trim(),
    color: String(body.color || "blue").trim(),
    startDate: body.startDate ? new Date(body.startDate) : null,
    endDate: body.endDate ? new Date(body.endDate) : null,
    status: statuses.includes(status) ? status : "ONGOING",
    slug: String(body.slug || "").trim(),
    order: Number.isFinite(Number(body.order)) ? Number(body.order) : 0,
    isPublished: body.isPublished !== "false" && body.isPublished !== false,
  };
}

async function uploadProjectImage(file) {
  if (!file || !isConfigured) return null;
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "sevoday/projects" },
      (error, result) => (error ? reject(error) : resolve(result.secure_url)),
    );
    stream.end(file.buffer);
  });
}

function validateProject(project) {
  if (!project.title) return "Project name is required.";
  if (!project.type) return "Project type is required.";
  if (!project.text) return "Project description is required.";
  if (project.startDate && Number.isNaN(project.startDate.getTime())) return "Please provide a valid start date.";
  if (project.endDate && Number.isNaN(project.endDate.getTime())) return "Please provide a valid end date.";
  return null;
}

function serialize(project) {
  return {
    id: project._id,
    title: project.title,
    type: project.type,
    text: project.text,
    image: project.image,
    icon: project.icon,
    color: project.color,
    startDate: project.startDate,
    endDate: project.endDate,
    status: project.status,
    slug: project.slug,
    order: project.order,
    isPublished: project.isPublished,
    createdAt: project.createdAt,
    updatedAt: project.updatedAt,
  };
}

export async function listPublicProjects(req, res, next) {
  try {
    const projects = await Project.find({ isPublished: true }).sort({ order: 1, createdAt: -1 }).lean();
    return res.json({ success: true, projects: projects.map(serialize) });
  } catch (error) {
    next(error);
  }
}

export async function listAdminProjects(req, res, next) {
  try {
    const projects = await Project.find().sort({ order: 1, createdAt: -1 }).lean();
    return res.json({ success: true, projects: projects.map(serialize) });
  } catch (error) {
    next(error);
  }
}

export async function createProject(req, res, next) {
  try {
    const payload = projectPayload(req.body);
    const validationError = validateProject(payload);
    if (validationError) return res.status(400).json({ success: false, message: validationError });
    const image = await uploadProjectImage(req.file);
    if (image) payload.image = image;
    const project = await Project.create(payload);
    return res.status(201).json({ success: true, project: serialize(project.toObject()) });
  } catch (error) {
    next(error);
  }
}

export async function updateProject(req, res, next) {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ success: false, message: "Project not found." });
    const payload = projectPayload(req.body);
    const validationError = validateProject(payload);
    if (validationError) return res.status(400).json({ success: false, message: validationError });
    const image = await uploadProjectImage(req.file);
    Object.assign(project, payload);
    if (image) project.image = image;
    await project.save();
    return res.json({ success: true, project: serialize(project.toObject()) });
  } catch (error) {
    next(error);
  }
}

export async function deleteProject(req, res, next) {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ success: false, message: "Project not found." });
    return res.json({ success: true, message: "Project deleted successfully." });
  } catch (error) {
    next(error);
  }
}
