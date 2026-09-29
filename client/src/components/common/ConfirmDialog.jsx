import { AlertTriangle, X } from "lucide-react";

export default function ConfirmDialog({ open, title, message, confirmLabel = "Confirm", onConfirm, onCancel, busy = false }) {
  if (!open) return null;
  return (
    <div className="dialog-backdrop" role="presentation">
      <div className="confirm-dialog" role="dialog" aria-modal="true" aria-labelledby="confirm-title">
        <button className="dialog-close" type="button" onClick={onCancel} disabled={busy} aria-label="Close"><X size={18} /></button>
        <AlertTriangle className="dialog-icon" size={27} aria-hidden="true" />
        <h2 id="confirm-title">{title}</h2>
        <p>{message}</p>
        <div className="dialog-actions">
          <button className="button button-outline" type="button" onClick={onCancel} disabled={busy}>Cancel</button>
          <button className="button button-primary" type="button" onClick={onConfirm} disabled={busy}>{busy ? "Working..." : confirmLabel}</button>
        </div>
      </div>
    </div>
  );
}