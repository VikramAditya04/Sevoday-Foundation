import SectionHeading from "../../components/public/SectionHeading";

export default function PlaceholderPage({
  eyebrow = "Sevoday Foundation",
  title,
  description,
}) {
  return (
    <main className="inner-page">
      <div className="section">
        <SectionHeading eyebrow={eyebrow} title={title} />
        <p className="inner-page-copy">{description}</p>
      </div>
    </main>
  );
}
