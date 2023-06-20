import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { logout } from "../../store/authSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import classes from "./UsersTable.module.scss";
import { useState } from "react";

export const SignOut = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector((state) => state.authorization.isAuthenticated);

  const [error, setError] = useState<string>("");

  const logOut = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      dispatch(logout());
    } catch (error: unknown) {
      if (!(error instanceof Error)) {
        throw error;
      }
      setError(`Произошла ошибка при выходе: ${error.message}`);
    }
  };

  if (!isAuth) {
    navigate("/");
  }

  return (
    <>
      <button
        type="button"
        onClick={logOut}
        className={classes["user-buttons"]}
      >
        Выход
      </button>
      {error ? <p>{error}</p> : null}
    </>
  );
};
