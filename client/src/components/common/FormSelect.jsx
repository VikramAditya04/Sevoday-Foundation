export default function FormSelect({
  label,
  name,
  options,
  error,
  placeholder = "Select an option",
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
      <select
        id={name}
        name={name}
        aria-invalid={Boolean(error)}
        aria-describedby={errorId}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option value={option.value || option} key={option.value || option}>
            {option.label || option}
          </option>
        ))}
      </select>
      {error && (
        <p className="form-error" id={errorId} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
