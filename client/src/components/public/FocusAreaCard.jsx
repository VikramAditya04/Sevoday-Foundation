import {
  ArrowRight,
  BookOpen,
  HeartPulse,
  Leaf,
  Users,
  UserRound,
  UserRoundPlus,
} from "lucide-react";

const ICONS = {
  education: BookOpen,
  healthcare: HeartPulse,
  community: Users,
  women: UserRound,
  youth: UserRoundPlus,
  environment: Leaf,
};

export default function FocusAreaCard({ area }) {
  const Icon = ICONS[area.icon] || Users;
  return (
    <article className="focus-card">
      <span className="focus-icon">
        <Icon size={24} aria-hidden="true" />
      </span>
      <h3>{area.title}</h3>
      <p>{area.text}</p>
      <a className="text-link" href={area.href || "/projects"}>
        Learn more <ArrowRight size={15} />
      </a>
    </article>
  );
}
