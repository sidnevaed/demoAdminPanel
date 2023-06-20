import { UsersTableList } from "../components/table/UsersTableList";
import { useAppSelector } from "../store/hooks";
import { useAuth } from "../customHooks/useAuth";

export const UsersPage = () => {
  const isAuth = useAppSelector((state) => state.authorization.isAuthenticated);
  useAuth();

  return <>{isAuth ? <UsersTableList /> : null}</>;
};
