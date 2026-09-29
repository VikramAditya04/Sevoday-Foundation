import { cloudinary, isConfigured } from "../config/cloudinary.js";
import Content, { contentTypes } from "../models/Content.js";

function normalizeType(value) {
  const type = String(value || "").trim().toUpperCase();
  return contentTypes.includes(type) ? type : null;
}

function contentPayload(body, type) {
  return {
    type,
    title: String(body.title || "").trim(),
    eyebrow: String(body.eyebrow || "").trim(),
    description: String(body.description || "").trim(),
    content: String(body.content || "").trim(),
    image: String(body.image || "").trim(),
    alt: String(body.alt || "").trim(),
    buttonText: String(body.buttonText || "").trim(),
    buttonLink: String(body.buttonLink || "").trim(),
    slug: String(body.slug || "").trim(),
    order: Number.isFinite(Number(body.order)) ? Number(body.order) : 0,
    isPublished: body.isPublished !== "false" && body.isPublished !== false,
  };
}

async function uploadContentImage(file) {
  if (!file || !isConfigured) return null;
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "sevoday/content" },
      (error, result) => (error ? reject(error) : resolve(result.secure_url)),
    );
    stream.end(file.buffer);
  });
}

function validatePayload(payload) {
  if (!payload.title) return "Title is required.";
  if (payload.type === "POLICY" && !payload.content && !payload.description)
    return "Policy content is required.";
  return null;
}

export async function listPublicContent(req, res, next) {
  try {
    const type = normalizeType(req.params.type);
    if (!type) return res.status(400).json({ success: false, message: "Invalid content type." });
    const query = { type, isPublished: true };
    const items = await Content.find(query).sort({ order: 1, createdAt: -1 }).lean();
    return res.json({ success: true, items });
  } catch (error) {
    next(error);
  }
}

export async function getPublicContentBySlug(req, res, next) {
  try {
    const type = normalizeType(req.params.type);
    if (!type) return res.status(400).json({ success: false, message: "Invalid content type." });
    const item = await Content.findOne({ type, slug: req.params.slug, isPublished: true }).lean();
    if (!item) return res.status(404).json({ success: false, message: "Content not found." });
    return res.json({ success: true, item });
  } catch (error) {
    next(error);
  }
}

export async function listAdminContent(req, res, next) {
  try {
    const type = normalizeType(req.params.type);
    if (!type) return res.status(400).json({ success: false, message: "Invalid content type." });
    const items = await Content.find({ type }).sort({ order: 1, createdAt: -1 }).lean();
    return res.json({ success: true, items });
  } catch (error) {
    next(error);
  }
}

export async function createContent(req, res, next) {
  try {
    const type = normalizeType(req.body.type);
    if (!type) return res.status(400).json({ success: false, message: "Invalid content type." });
    const payload = contentPayload(req.body, type);
    const validationError = validatePayload(payload);
    if (validationError) return res.status(400).json({ success: false, message: validationError });
    const image = await uploadContentImage(req.file);
    if (image) payload.image = image;
    const item = await Content.create(payload);
    return res.status(201).json({ success: true, item });
  } catch (error) {
    next(error);
  }
}

export async function updateContent(req, res, next) {
  try {
    const item = await Content.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: "Content not found." });
    const payload = contentPayload(req.body, item.type);
    const validationError = validatePayload(payload);
    if (validationError) return res.status(400).json({ success: false, message: validationError });
    const image = await uploadContentImage(req.file);
    Object.assign(item, payload);
    if (image) item.image = image;
    await item.save();
    return res.json({ success: true, item });
  } catch (error) {
    next(error);
  }
}

export async function deleteContent(req, res, next) {
  try {
    const item = await Content.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: "Content not found." });
    return res.json({ success: true, message: "Content deleted successfully." });
  } catch (error) {
    next(error);
  }
}
