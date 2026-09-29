import { ArrowRight } from "lucide-react";

export default function SectionHeading({ eyebrow, title, action, headingId }) {
  return (
    <div className="section-title">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h2 id={headingId}>{title}</h2>
      </div>
      {action && (
        <a className="text-link" href={action.href}>
          {action.label} <ArrowRight size={16} />
        </a>
      )}
    </div>
  );
}
