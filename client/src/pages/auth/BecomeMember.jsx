import { useState } from "react";
import { Check, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import FormInput from "../../components/common/FormInput";
import FormSection from "../../components/common/FormSection";
import FormSelect from "../../components/common/FormSelect";
import Toast from "../../components/common/Toast";
import { apiRequest } from "../../services/api";

const initialValues = {
  fullName: "",
  email: "",
  phone: "",
  gender: "",
  dateOfBirth: "",
  occupation: "",
  requestedDesignation: "",
  profilePhoto: null,
  address: "",
  city: "",
  state: "",
  district: "",
  pinCode: "",
  captcha: "",
};
const states = ["Bihar", "Jharkhand", "Uttar Pradesh", "West Bengal"];
const districts = {
  Bihar: ["Nawada", "Gaya", "Patna"],
  Jharkhand: ["Ranchi", "Deoghar"],
  "Uttar Pradesh": ["Varanasi", "Prayagraj"],
  "West Bengal": ["Kolkata", "Asansol"],
};
const designations = [
  "General Member",
  "Volunteer",
  "Community Coordinator",
  "Youth Member",
];
const createCaptcha = () => {
  const first = Math.floor(Math.random() * 9) + 8;
  const second = Math.floor(Math.random() * 7) + 2;
  return { first, second, answer: first - second };
};

export default function BecomeMember() {
  const [values, setValues] = useState(initialValues);
  const [captcha, setCaptcha] = useState(createCaptcha);
  const [errors, setErrors] = useState({});
  const [fileError, setFileError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [toast, setToast] = useState(null);

  const updateValue = (event) =>
    setValues((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  const updateState = (event) =>
    setValues((current) => ({
      ...current,
      state: event.target.value,
      district: "",
    }));
  const updateFile = (event) => {
    const file = event.target.files?.[0];
    setFileError("");
    if (!file)
      return setValues((current) => ({ ...current, profilePhoto: null }));
    if (!["image/jpeg", "image/png"].includes(file.type))
      return setFileError("Please choose a JPG or PNG image.");
    if (file.size > 2 * 1024 * 1024)
      return setFileError("Profile photo must be smaller than 2 MB.");
    setValues((current) => ({ ...current, profilePhoto: file }));
  };

  const validate = () => {
    const nextErrors = {};
    const required = {
      fullName: "full name",
      email: "email address",
      phone: "phone number",
      gender: "gender",
      dateOfBirth: "date of birth",
      occupation: "occupation",
      requestedDesignation: "requested designation",
      address: "address",
      city: "city or village",
      state: "state",
      district: "district",
      pinCode: "PIN code",
      captcha: "verification answer",
    };
    Object.entries(required).forEach(([name, label]) => {
      if (!String(values[name]).trim())
        nextErrors[name] = `Please enter your ${label}.`;
    });
    if (values.email && !/^\S+@\S+\.\S+$/.test(values.email))
      nextErrors.email = "Please enter a valid email address.";
    if (values.phone && !/^\d{10}$/.test(values.phone.replace(/\D/g, "")))
      nextErrors.phone = "Please enter a valid 10-digit phone number.";
    if (values.pinCode && !/^\d{6}$/.test(values.pinCode))
      nextErrors.pinCode = "Please enter a valid 6-digit PIN code.";
    if (values.captcha && Number(values.captcha) !== captcha.answer)
      nextErrors.captcha = "That answer is not correct. Please try again.";
    return nextErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitError("");
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length || fileError) return;
    setIsSubmitting(true);
    const formData = new FormData();
    Object.entries(values).forEach(([name, value]) => {
      if (name !== "captcha" && value !== null) formData.append(name, value);
    });
    try {
      await apiRequest("/auth/register", { method: "POST", body: formData });
      setSubmitted(true);
      setToast({ type: "success", message: "Membership application submitted successfully." });
    } catch (error) {
      setSubmitError(error.message);
      setToast({ type: "error", message: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted)
    return (
      <>
        <Toast message={toast?.message} type={toast?.type} onClose={() => setToast(null)} />
        <div className="registration-success">
        <span className="success-icon">
          <Check size={30} aria-hidden="true" />
        </span>
        <span className="eyebrow">Application pending</span>
        <h2>Registration Submitted</h2>
        <p>
          Thank you for applying to become a member of Sevoday Foundation. Your
          application is currently pending review by our team.
        </p>
        <p>
          You will be able to access your member account after your application
          has been approved.
        </p>
        <div className="success-actions">
          <Link className="button button-primary" to="/">
            Back to Home
          </Link>
          <Link className="button button-outline" to="/login">
            Go to Login
          </Link>
        </div>
        </div>
      </>
    );

  return (
    <>
      <Toast message={toast?.message} type={toast?.type} onClose={() => setToast(null)} />
      <div className="registration-card">
      <div className="registration-heading">
        <span className="eyebrow">Join our community</span>
        <h2>Become a Member</h2>
        <p>
          Share a little about yourself and take the first step toward creating
          meaningful change with Sevoday Foundation.
        </p>
      </div>
      <form className="registration-form" onSubmit={handleSubmit} noValidate>
        <FormSection
          title="Personal Information"
          description="Tell us how we can reach you."
        >
          <FormInput
            label="Full Name"
            name="fullName"
            placeholder="Your full name"
            value={values.fullName}
            onChange={updateValue}
            error={errors.fullName}
            autoComplete="name"
            required
          />
          <FormInput
            label="Email Address"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={values.email}
            onChange={updateValue}
            error={errors.email}
            autoComplete="email"
            required
          />
          <FormInput
            label="Phone Number"
            name="phone"
            type="tel"
            placeholder="10-digit phone number"
            value={values.phone}
            onChange={updateValue}
            error={errors.phone}
            autoComplete="tel"
            required
          />
          <FormSelect
            label="Gender"
            name="gender"
            options={["Female", "Male", "Non-binary", "Prefer not to say"]}
            value={values.gender}
            onChange={updateValue}
            error={errors.gender}
            required
          />
          <FormInput
            label="Date of Birth"
            name="dateOfBirth"
            type="date"
            value={values.dateOfBirth}
            onChange={updateValue}
            error={errors.dateOfBirth}
            required
          />
        </FormSection>
        <FormSection title="Membership Information">
          <FormInput
            label="Occupation"
            name="occupation"
            placeholder="Your occupation"
            value={values.occupation}
            onChange={updateValue}
            error={errors.occupation}
            required
          />
          <FormSelect
            label="Requested Designation"
            name="requestedDesignation"
            options={designations}
            value={values.requestedDesignation}
            onChange={updateValue}
            error={errors.requestedDesignation}
            required
          />
        </FormSection>
        <FormSection
          title="Profile"
          description="Optional. JPG or PNG, maximum 2 MB."
        >
          <div className="file-field">
            <label htmlFor="profilePhoto">Profile Photo</label>
            <input
              id="profilePhoto"
              name="profilePhoto"
              type="file"
              accept="image/jpeg,image/png"
              onChange={updateFile}
              aria-describedby="profile-photo-help"
            />
            <span id="profile-photo-help">
              {values.profilePhoto?.name || "No file selected"}
            </span>
            {fileError && (
              <p className="form-error" role="alert">
                {fileError}
              </p>
            )}
          </div>
        </FormSection>
        <FormSection title="Address">
          <FormInput
            label="Address Line"
            name="address"
            placeholder="House number and street"
            value={values.address}
            onChange={updateValue}
            error={errors.address}
            autoComplete="street-address"
            required
          />
          <FormInput
            label="City / Village"
            name="city"
            placeholder="City or village"
            value={values.city}
            onChange={updateValue}
            error={errors.city}
            required
          />
          <FormSelect
            label="State"
            name="state"
            options={states}
            value={values.state}
            onChange={updateState}
            error={errors.state}
            required
          />
          <FormSelect
            label="District"
            name="district"
            options={districts[values.state] || []}
            value={values.district}
            onChange={updateValue}
            error={errors.district}
            disabled={!values.state}
            required
          />
          <FormInput
            label="PIN Code"
            name="pinCode"
            inputMode="numeric"
            placeholder="6-digit PIN code"
            value={values.pinCode}
            onChange={updateValue}
            error={errors.pinCode}
            autoComplete="postal-code"
            required
          />
        </FormSection>
        <FormSection
          title="Verification"
          description="This simple check helps us keep the prototype form human-friendly."
        >
          <div className="captcha-field">
            <label htmlFor="captcha">
              What is {captcha.first} - {captcha.second}?
            </label>
            <div>
              <input
                id="captcha"
                name="captcha"
                inputMode="numeric"
                placeholder="Your answer"
                value={values.captcha}
                onChange={updateValue}
                aria-invalid={Boolean(errors.captcha)}
                aria-describedby={errors.captcha ? "captcha-error" : undefined}
              />
              <button
                className="captcha-refresh"
                type="button"
                onClick={() => {
                  setCaptcha(createCaptcha());
                  setValues((current) => ({ ...current, captcha: "" }));
                  setErrors((current) => ({ ...current, captcha: "" }));
                }}
                aria-label="Get a new verification question"
              >
                <RefreshCw size={18} aria-hidden="true" />
              </button>
            </div>
            {errors.captcha && (
              <p className="form-error" id="captcha-error" role="alert">
                {errors.captcha}
              </p>
            )}
          </div>
        </FormSection>
        <button
          className="button button-primary registration-submit"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting application..." : "Submit Registration"}
        </button>
        {submitError && <p className="form-error" role="alert">{submitError}</p>}
      </form>
      <p className="registration-footer">
        Already a member? <Link to="/login">Sign In</Link>
      </p>
      </div>
    </>
  );
}
