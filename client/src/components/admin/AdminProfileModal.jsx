import { useState } from "react";
import { Camera, X } from "lucide-react";
import { updateProfile } from "../../services/userService";

export default function AdminProfileModal({ user, onClose, onSaved }) {
  const [values, setValues] = useState({
    fullName: user?.fullName || user?.name || "",
    email: user?.email || "",
  });
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (event) => {
    setValues((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    if (values.fullName.trim().length < 2) {
      setError("Please provide your full name.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(values.email.trim())) {
      setError("Please provide a valid email address.");
      return;
    }

    setIsSaving(true);
    try {
      const { user: updatedUser } = await updateProfile({
        fullName: values.fullName.trim(),
        email: values.email.trim(),
        profilePhoto,
      });
      onSaved(updatedUser);
      onClose();
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-[#12352480] p-4"
      role="presentation"
    >
      <div
        className="w-full max-w-md rounded-2xl border border-[#dfe8df] bg-white p-5 shadow-2xl sm:p-6"
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-profile-title"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#2f6b3f]">
              Account
            </p>
            <h2
              id="edit-profile-title"
              className="mt-1 text-xl font-bold text-[#123524]"
            >
              Edit Profile
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 transition hover:bg-[#f4f7f0] hover:text-[#123524]"
            aria-label="Close edit profile"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit} noValidate>
          <div className="flex items-center gap-4">
            {user?.profilePhoto ? (
              <img
                src={user.profilePhoto}
                alt="Current profile"
                className="h-16 w-16 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#1f4a2c] text-lg font-semibold text-white">
                {(values.fullName || "SA").slice(0, 2).toUpperCase()}
              </div>
            )}
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-[#cfe0d1] px-3 py-2 text-sm font-semibold text-[#1f4a2c] transition hover:bg-[#f4f7f0]">
              <Camera className="h-4 w-4" />
              Change photo
              <input
                type="file"
                accept="image/jpeg,image/png"
                className="sr-only"
                onChange={(event) =>
                  setProfilePhoto(event.target.files?.[0] || null)
                }
              />
            </label>
          </div>

          <label
            className="block text-sm font-semibold text-[#123524]"
            htmlFor="profile-full-name"
          >
            Full name
            <input
              id="profile-full-name"
              name="fullName"
              value={values.fullName}
              onChange={handleChange}
              className="mt-2 block w-full rounded-lg border border-[#dfe8df] bg-[#fdfcf7] px-3 py-2.5 font-normal outline-none transition focus:border-[#2f6b3f] focus:ring-2 focus:ring-[#2f6b3f20]"
              autoComplete="name"
              required
            />
          </label>

          <label
            className="block text-sm font-semibold text-[#123524]"
            htmlFor="profile-email"
          >
            Email address
            <input
              id="profile-email"
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              className="mt-2 block w-full rounded-lg border border-[#dfe8df] bg-[#fdfcf7] px-3 py-2.5 font-normal outline-none transition focus:border-[#2f6b3f] focus:ring-2 focus:ring-[#2f6b3f20]"
              autoComplete="email"
              required
            />
          </label>

          {profilePhoto ? (
            <p className="text-xs text-slate-500">
              Selected: {profilePhoto.name}
            </p>
          ) : null}
          {error ? (
            <p
              className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700"
              role="alert"
            >
              {error}
            </p>
          ) : null}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-[#dfe8df] px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-[#f4f7f0]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="rounded-lg bg-[#1f4a2c] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#2f6b3f] disabled:cursor-wait disabled:opacity-60"
            >
              {isSaving ? "Saving..." : "Save changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
