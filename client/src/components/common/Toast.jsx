import { CheckCircle2, X, XCircle } from "lucide-react";
import { useEffect } from "react";

export default function Toast({ message, type = "error", onClose }) {
  useEffect(() => {
    if (!message) return undefined;
    const timer = window.setTimeout(onClose, 4500);
    return () => window.clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;
  const Icon = type === "success" ? CheckCircle2 : XCircle;

  return (
    <div className={`toast toast-${type}`} role="alert">
      <Icon size={19} aria-hidden="true" />
      <span>{message}</span>
      <button type="button" onClick={onClose} aria-label="Dismiss notification">
        <X size={17} aria-hidden="true" />
      </button>
    </div>
  );
}