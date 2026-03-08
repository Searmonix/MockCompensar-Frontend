import { Navigate, useLocation } from "react-router-dom";
import UserService from "../../../services/UserService";


export const AdminRoute = ({ element: Component }) => {
  const location = useLocation();

  // Una operación ternaria. Si no es un Administrador, lo redirigirá a /login
  return UserService.isAdmin() ? (
    Component
  ) : (
    <Navigate to="/auth/login" replace state={{ from: location }} />
  );
};


export const DoctorRoute = ({ element: Component }) => {
  const location = useLocation();

  // Una operación ternaria. Si no es un Administrador, lo redirigirá a /login
  return UserService.isDoctor() ? (
    Component
  ) : (
    <Navigate to="/auth/login" replace state={{ from: location }} />
  );
};

export const PatientRoute = ({ element: Component }) => {
  const location = useLocation();

  // Una operación ternaria. Si no es un Administrador, lo redirigirá a /login
  return UserService.isPatient() ? (
    Component
  ) : (
    <Navigate to="/auth/login" replace state={{ from: location }} />
  );
};