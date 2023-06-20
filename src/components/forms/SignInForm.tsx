import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Input } from "./Input";
import { Link, useNavigate } from "react-router-dom";
import classes from "./Form.module.scss";
import { FormValuesForSignIn, isAuthError } from "../../interfaces/Interfaces";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../../firebase/firebase";
import { TextError } from "./TextError";
import { useAppDispatch } from "../../store/hooks";
import { login } from "../../store/authSlice";

export const SignInForm = () => {
  const [error, setError] = useState<string>("");
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const initialValues: FormValuesForSignIn = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Невалидный формат email")
      .required("Email обязателен для заполнения"),

    password: Yup.string()
      .min(2, "Слишком короткий пароль")
      .max(30, "Слишком длинный пароль")
      .required("Пароль обязателен для заполнения"),
  });

  const submitHandler = async ({ email, password }: FormValuesForSignIn) => {
    const auth = getAuth(app);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      dispatch(login());
      navigate("/listOfUsers");
    } catch (e: unknown) {
      if (!isAuthError(e)) {
        throw e;
      }

      const { code } = e;
      switch (code) {
        case "auth/user-not-found":
          setError(
            "Пользователь c таким email не найден. Зарегистрируйтесь или исправьте email.",
          );
          break;
        case "auth/user-disabled":
          setError("Аккаунт заблокирован. Обратитесь к администратору.");
          break;
        case "auth/wrong-password":
          setError("Пароль неверен.");
          break;
        case "auth/too-many-requests":
          setError("Слишком много запросов. Пожалуйста, попробуйте позже.");
          break;
        case "auth/network-request-failed":
          setError("Нет соединения с сервером. Пожалуйста, попробуйте позже.");
          break;
        default:
          setError(code);
      }
    }
  };

  return (
    <div className={classes.form}>
      <h1>Авторизуйтесь</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={submitHandler}
      >
        {(formik) => {
          return (
            <Form>
              <Input type="email" label="Email" name="email" />
              <Input type="password" label="Пароль" name="password" />

              <div className={classes.text}>
                <button type="submit" disabled={!formik.isValid}>
                  Войти
                </button>
                <div>Еще не зарегистированы?</div>
                <Link to="/signup">Зарегистрируйтесь</Link>
              </div>
            </Form>
          );
        }}
      </Formik>

      <TextError>{error ? <p>{error}</p> : null}</TextError>
    </div>
  );
};
