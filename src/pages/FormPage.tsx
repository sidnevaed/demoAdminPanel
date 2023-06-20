import { CreateUserForm } from "../components/forms/CreateUserForm";
import { useAppSelector } from "../store/hooks";
import { useAuth } from "../customHooks/useAuth";

export const FormPage = () => {
  const isAuth = useAppSelector((state) => state.authorization.isAuthenticated);
  useAuth();

  return <>{isAuth ? <CreateUserForm></CreateUserForm> : null}</>;
};
