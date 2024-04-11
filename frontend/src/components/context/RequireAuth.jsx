import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const RequireAuth = () => {
  const { loggedIn } = useAuth();
  const location = useLocation();

  return loggedIn || loggedIn === undefined ? (
    <Outlet />
  ) : (
    <Navigate to="/landing-page" state={{ from: location }} replace />
    // replace /login in the users location history with the location they came from
    // state={{ from: location }} replace alows the user to go back to the page they were
    // on if they press back
  );
};

export default RequireAuth;
