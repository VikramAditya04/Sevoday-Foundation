import { Eye, EyeOff } from 'lucide-react'

export default function PasswordInput({ label = 'Password', name = 'password', error, showPassword, onToggle, ...props }) {
  const errorId = error ? `${name}-error` : undefined
  return <div className="form-field"><label htmlFor={name}>{label}{props.required && <span aria-hidden="true"> *</span>}</label><div className="password-input-wrap"><input id={name} name={name} type={showPassword ? 'text' : 'password'} aria-invalid={Boolean(error)} aria-describedby={errorId} {...props} /><button className="password-toggle" type="button" onClick={onToggle} aria-label={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? <EyeOff size={18} aria-hidden="true" /> : <Eye size={18} aria-hidden="true" />}</button></div>{error && <p className="form-error" id={errorId} role="alert">{error}</p>}</div>
}
