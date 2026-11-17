
import {
  Navigate,
  Outlet,
} from "react-router-dom";

import { LoaderCircle } from "lucide-react";
import { useAuth } from "./AuthContext";

export default function ProtectedRoute() {
  const { admin, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <LoaderCircle
          size={38}
          className="animate-spin text-blue-600"
        />

        <p className="mt-4 font-semibold text-slate-600">
          Checking admin session...
        </p>
      </div>
    );
  }

  if (!admin) {
    return (
      <Navigate
        to="/admin/login"
        replace
      />
    );
  }

  return <Outlet />;
}
