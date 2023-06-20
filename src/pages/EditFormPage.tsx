import { EditForm } from "../components/forms/EditForm";
import { useAppSelector } from "../store/hooks";
import { useAuth } from "../customHooks/useAuth";

export const EditFormPage = () => {
  const isAuth = useAppSelector((state) => state.authorization.isAuthenticated);
  useAuth();

  return <>{isAuth ? <EditForm></EditForm> : null}</>;
};
