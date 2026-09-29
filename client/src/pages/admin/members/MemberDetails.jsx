import { ArrowLeft, Check, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ConfirmDialog from "../../../components/common/ConfirmDialog";
import StatusBadge from "../../../components/common/StatusBadge";
import Toast from "../../../components/common/Toast";
import {
  approveMember,
  getMember,
  rejectMember,
} from "../../../services/memberService";

const date = (value) => (value ? new Date(value).toLocaleString() : "-");

export default function MemberDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [confirm, setConfirm] = useState(null);
  const [toast, setToast] = useState(null);
  const load = useCallback(async () => {
    setLoading(true);
    try {
      setMember((await getMember(id)).member);
    } catch (error) {
      setToast({ type: "error", message: error.message });
    } finally {
      setLoading(false);
    }
  }, [id]);
  useEffect(() => {
    const timer = window.setTimeout(load, 0);
    return () => window.clearTimeout(timer);
  }, [load]);
  const updateStatus = async (action) => {
    setBusy(true);
    try {
      const result =
        action === "approve" ? await approveMember(id) : await rejectMember(id);
      setToast({ type: "success", message: result.message });
      setConfirm(null);
      if (action === "reject")
        window.setTimeout(() => navigate("/admin/members"), 500);
      else await load();
    } catch (error) {
      setToast({ type: "error", message: error.message });
    } finally {
      setBusy(false);
    }
  };
  if (loading)
    return (
      <section className="admin-page">
        <div className="admin-loading">Loading member details...</div>
      </section>
    );
  if (!member)
    return (
      <section className="admin-page">
        <div className="admin-empty">Member not found.</div>
      </section>
    );
  return (
    <section className="admin-page">
      <Toast
        message={toast?.message}
        type={toast?.type}
        onClose={() => setToast(null)}
      />
      <Link className="admin-back-link" to="/admin/members">
        <ArrowLeft size={16} /> Back to requests
      </Link>
      <div className="admin-page-heading detail-heading">
        <div>
          <span className="eyebrow">Application details</span>
          <h1>{member.fullName}</h1>
          <p>Submitted {date(member.createdAt)}</p>
        </div>
        <StatusBadge status={member.status} />
      </div>
      <div className="member-detail-layout">
        <div className="member-photo-panel">
          {member.profilePhoto ? (
            <img src={member.profilePhoto} alt={`${member.fullName} profile`} />
          ) : (
            <div className="member-photo-placeholder">
              {member.fullName.slice(0, 1).toUpperCase()}
            </div>
          )}
        </div>
        <div className="member-detail-grid">
          {[
            ["Email", member.email],
            ["Phone", member.phone],
            ["Gender", member.gender],
            ["Date of Birth", date(member.dateOfBirth)],
            ["Occupation", member.occupation],
            ["Requested Designation", member.requestedDesignation],
            ["Address", member.address],
            ["City / Village", member.city],
            ["State", member.state],
            ["District", member.district],
            ["PIN Code", member.pinCode],
            ["Created At", date(member.createdAt)],
          ].map(([label, value]) => (
            <div className="detail-field" key={label}>
              <span>{label}</span>
              <strong>{value || "-"}</strong>
            </div>
          ))}
        </div>
      </div>
      {member.status === "PENDING" && (
        <div className="member-actions">
          <button
            className="button button-primary"
            type="button"
            onClick={() => setConfirm("approve")}
            disabled={busy}
          >
            <Check size={17} /> Approve
          </button>
          <button
            className="button button-danger"
            type="button"
            onClick={() => setConfirm("reject")}
            disabled={busy}
          >
            <X size={17} /> Reject
          </button>
        </div>
      )}
      <ConfirmDialog
        open={Boolean(confirm)}
        title={
          confirm === "approve"
            ? "Approve this application?"
            : "Reject this application?"
        }
        message={
          confirm === "approve"
            ? "The member will receive login credentials by email."
            : "This application will be marked as rejected and removed from pending requests."
        }
        confirmLabel={
          confirm === "approve" ? "Approve Member" : "Reject Application"
        }
        onConfirm={() => updateStatus(confirm)}
        onCancel={() => setConfirm(null)}
        busy={busy}
      />
    </section>
  );
}
