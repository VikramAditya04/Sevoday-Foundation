import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    type: { type: String, required: true, trim: true },
    text: { type: String, required: true, trim: true },
    image: { type: String, default: "" },
    icon: { type: String, default: "education", trim: true },
    color: { type: String, default: "blue", trim: true },
    startDate: { type: Date, default: null },
    endDate: { type: Date, default: null },
    status: {
      type: String,
      enum: ["ONGOING", "COMPLETED", "PLANNED", "PAUSED"],
      default: "ONGOING",
    },
    slug: { type: String, trim: true, default: "" },
    order: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true },
);

projectSchema.index({ order: 1, createdAt: -1 });
projectSchema.index({ slug: 1 }, { sparse: true });

export default mongoose.model("Project", projectSchema);
