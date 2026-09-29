export default function FormSection({ title, description, children }) {
  return (
    <fieldset className="form-section">
      <legend>{title}</legend>
      {description && <p className="form-section-description">{description}</p>}
      <div className="form-section-grid">{children}</div>
    </fieldset>
  );
}
