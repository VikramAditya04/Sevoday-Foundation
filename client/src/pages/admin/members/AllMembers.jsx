import { RefreshCw } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import StatusBadge from "../../../components/common/StatusBadge";
import Toast from "../../../components/common/Toast";
import { getAllMembers } from "../../../services/memberService";

const date = (value) =>
  value ? new Date(value).toLocaleDateString() : "-";

export default function AllMembers() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);

    try {
      const result = await getAllMembers();
      setMembers(result.members || []);
    } catch (error) {
      setToast({
        type: "error",
        message: error.message,
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(load, 0);

    return () => window.clearTimeout(timer);
  }, [load]);

  return (
    <section className="admin-page">
      <Toast
        message={toast?.message}
        type={toast?.type}
        onClose={() => setToast(null)}
      />

      <div className="admin-page-heading">
        <div>
          <span className="eyebrow">Membership</span>

          <h1>All Members</h1>

          <p>
            View all approved members of Sevoday Foundation.
          </p>
        </div>

        <button
          className="admin-refresh"
          type="button"
          onClick={load}
          disabled={loading}
        >
          <RefreshCw size={17} />
          Refresh
        </button>
      </div>

      {loading ? (
        <div className="admin-loading">
          Loading members...
        </div>
      ) : members.length === 0 ? (
        <div className="admin-empty">
          No approved members found.
        </div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Member</th>
                <th>Contact</th>
                <th>Designation</th>
                <th>Location</th>
                <th>Joined</th>
                <th>Status</th>
                <th />
              </tr>
            </thead>

            <tbody>
              {members.map((member) => (
                <tr key={member._id}>
                  <td>
                    <strong>{member.fullName}</strong>
                  </td>

                  <td>
                    {member.email}
                    <br />
                    {member.phone || "-"}
                  </td>

                  <td>
                    {member.requestedDesignation || "-"}
                  </td>

                  <td>
                    {member.city || "-"}
                    {member.state ? `, ${member.state}` : ""}
                  </td>

                  <td>
                    {date(member.approvedAt || member.createdAt)}
                  </td>

                  <td>
                    <StatusBadge status={member.status} />
                  </td>

                  <td>
                    <Link
                      className="table-action"
                      to={`/admin/members/${member._id}`}
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}