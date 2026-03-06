import { ROUTES } from "@/shared/model/routes";
import { Navigate, Outlet } from "react-router-dom";
import { useSession } from "@/shared/model/session";

export function ProtectedRoute() {
  const { session } = useSession();

  if (!session) {
    return <Navigate to={ROUTES.LOGIN} />;
  }

  return <Outlet />;
}

