export default function FormInput({
  label,
  name,
  error,
  className = "",
  ...props
}) {
  const errorId = error ? `${name}-error` : undefined;
  return (
    <div className={`form-field ${className}`}>
      <label htmlFor={name}>
        {label}
        {props.required && <span aria-hidden="true"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        aria-invalid={Boolean(error)}
        aria-describedby={errorId}
        {...props}
      />
      {error && (
        <p className="form-error" id={errorId} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
