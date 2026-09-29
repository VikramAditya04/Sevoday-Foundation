export function normalizeEmail(email) {
  return String(email || "")
    .trim()
    .toLowerCase();
}

export function validateRegistration(body) {
  const required = [
    "fullName",
    "email",
    "phone",
    "gender",
    "dateOfBirth",
    "occupation",
    "requestedDesignation",
    "address",
    "city",
    "state",
    "district",
    "pinCode",
  ];
  const missing = required.filter((field) => !String(body[field] || "").trim());
  if (missing.length) return `Missing required fields: ${missing.join(", ")}`;
  if (!/^\S+@\S+\.\S+$/.test(normalizeEmail(body.email)))
    return "Please provide a valid email address.";
  if (!/^\d{10}$/.test(String(body.phone).replace(/\D/g, "")))
    return "Please provide a valid 10-digit phone number.";
  if (!/^\d{6}$/.test(String(body.pinCode).trim()))
    return "Please provide a valid 6-digit PIN code.";
  if (Number.isNaN(new Date(body.dateOfBirth).getTime()))
    return "Please provide a valid date of birth.";
  return null;
}

export function safeUser(user) {
  return {
    id: user._id,
    fullName: user.fullName,
    email: user.email,
    profilePhoto: user.profilePhoto,
    phone: user.phone,
    role: user.role,
    status: user.status,
    mustChangePassword: user.mustChangePassword,
  };
}
