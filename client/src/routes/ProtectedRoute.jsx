import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function ProtectedRoute({ roles }) {
	const { user, isLoading } = useAuth();
	const location = useLocation();

	if (isLoading) return <div className="route-loading">Checking your session...</div>;
	if (!user) return <Navigate to="/login" replace state={{ from: location.pathname }} />;
	if (roles && !roles.includes(user.role)) return <Navigate to="/" replace />;
	if (user.status !== "APPROVED") return <Navigate to="/" replace />;
	return <Outlet />;
}
