import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LockKeyhole } from "lucide-react";
import FormInput from "../../components/common/FormInput";
import PasswordInput from "../../components/common/PasswordInput";
import Toast from "../../components/common/Toast";
import { apiRequest } from "../../services/api";
import { setAuthUser } from "../../store/authStore";

export default function Login() {
  const [values, setValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState(null);
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateValue = (event) =>
    setValues((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));

  const validate = () => {
    const nextErrors = {};
    if (!values.email.trim())
      nextErrors.email = "Please enter your email address.";
    else if (!/^\S+@\S+\.\S+$/.test(values.email))
      nextErrors.email = "Please enter a valid email address.";
    if (!values.password) nextErrors.password = "Please enter your password.";
    return nextErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus(null);
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    setIsSubmitting(true);
    try {
      const { user } = await apiRequest("/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      setAuthUser(user);
      setStatus("You are signed in successfully.");
      setToast({ type: "success", message: "Signed in successfully." });
      window.setTimeout(() => navigate(user.role === "ADMIN" || user.role === "SUPER_ADMIN" ? "/admin/dashboard" : "/"), 350);
    } catch (error) {
      setStatus(error.message);
      setToast({ type: "error", message: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Toast message={toast?.message} type={toast?.type} onClose={() => setToast(null)} />
      <div className="auth-card">
      <div className="auth-card-heading">
        <span className="auth-lock">
          <LockKeyhole size={20} aria-hidden="true" />
        </span>
        <span className="eyebrow">Member access</span>
        <h2>Welcome Back</h2>
        <p>Sign in to access your Sevoday Foundation member account.</p>
      </div>
      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <FormInput
          label="Email Address"
          name="email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          value={values.email}
          onChange={updateValue}
          error={errors.email}
          required
        />
        <PasswordInput
          label="Password"
          name="password"
          placeholder="Enter your password"
          autoComplete="current-password"
          value={values.password}
          onChange={updateValue}
          error={errors.password}
          showPassword={showPassword}
          onToggle={() => setShowPassword((current) => !current)}
          required
        />
        <button
          className="button button-primary auth-submit"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Checking access..." : "Sign In"}
        </button>
        {status && (
          <p className="auth-status" role="status">
            {status}
          </p>
        )}
      </form>
      <div className="auth-card-links">
        <p>
          Not a member yet? <Link to="/become-a-member">Become a Member</Link>
        </p>
        <Link to="/">Back to Home</Link>
      </div>
      </div>
    </>
  );
}
