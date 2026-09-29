import mongoose from "mongoose";

const contentTypes = [
  "SLIDER",
  "ABOUT",
  "GALLERY",
  "CERTIFICATE",
  "ACHIEVEMENT",
  "POLICY",
  "NEWS",
  "NOTICE",
];

const contentSchema = new mongoose.Schema(
  {
    type: { type: String, enum: contentTypes, required: true, index: true },
    title: { type: String, required: true, trim: true },
    eyebrow: { type: String, trim: true, default: "" },
    description: { type: String, trim: true, default: "" },
    content: { type: String, trim: true, default: "" },
    image: { type: String, default: "" },
    alt: { type: String, trim: true, default: "" },
    buttonText: { type: String, trim: true, default: "" },
    buttonLink: { type: String, trim: true, default: "" },
    slug: { type: String, trim: true, default: "" },
    order: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true },
);

contentSchema.index({ type: 1, order: 1, createdAt: -1 });

export { contentTypes };
export default mongoose.model("Content", contentSchema);
