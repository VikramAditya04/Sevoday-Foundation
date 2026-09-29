import "dotenv/config";
import connectDB from "../config/db.js";
import Project from "../models/Project.js";

const projects = [
  {
    title: "Project Udaan",
    type: "Education",
    text: "Providing quality education and learning resources to underprivileged children.",
    image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=900&q=85",
    icon: "education",
    color: "blue",
    status: "ONGOING",
    order: 1,
    isPublished: true,
  },
  {
    title: "Project Sehat",
    type: "Healthcare",
    text: "Supporting better healthcare access and health awareness in rural areas.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=85",
    icon: "healthcare",
    color: "red",
    status: "ONGOING",
    order: 2,
    isPublished: true,
  },
  {
    title: "Project Hariyali",
    type: "Environment",
    text: "Tree plantation and environmental awareness for a greener tomorrow.",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=900&q=85",
    icon: "environment",
    color: "green",
    status: "ONGOING",
    order: 3,
    isPublished: true,
  },
];

await connectDB();
for (const project of projects) {
  await Project.findOneAndUpdate({ title: project.title }, project, { upsert: true, new: true, setDefaultsOnInsert: true });
}
console.log("Projects seeded.");
process.exit(0);
