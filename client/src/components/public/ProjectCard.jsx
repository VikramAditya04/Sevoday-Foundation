import { ArrowRight, BookOpen, Heart, Leaf } from "lucide-react";

const ICONS = { education: BookOpen, healthcare: Heart, environment: Leaf };

export default function ProjectCard({ project }) {
  const Icon = ICONS[project.icon] || BookOpen;
  return (
    <article className="project-card">
      <div className="card-image">
        <img src={project.image} alt={`${project.title} project`} />
        <span className={`icon-badge ${project.color}`}>
          <Icon size={20} aria-hidden="true" />
        </span>
      </div>
      <div className="card-body">
        <h3>{project.title}</h3>
        <span className="card-type">{project.type}{project.status ? ` · ${project.status.charAt(0)}${project.status.slice(1).toLowerCase()}` : ""}</span>
        <p>{project.text}</p>
        <a className="text-link" href={project.href || "/projects"}>
          View Details <ArrowRight size={15} />
        </a>
      </div>
    </article>
  );
}
