import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Input } from "./Input";
import { useNavigate } from "react-router-dom";
import classes from "./Form.module.scss";
import { useState } from "react";
import { FormValuesForSignIn, isAuthError } from "../../interfaces/Interfaces";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "../../firebase/firebase";
import { TextError } from "./TextError";
import { useAppDispatch } from "../../store/hooks";
import { login } from "../../store/authSlice";

// * Для демонстрации, в реальном проекте регистрация одного пользователя осуществлялась
// * через Firebase

export const RegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [error, setError] = useState<string>("");

  const initialValues: FormValuesForSignIn = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Невалидный формат email")
      .required("Email обязателен для заполнения"),

    password: Yup.string()
      .min(6, "Пароль должен быть не менее 6 символов.")
      .max(30, "Слишком длинный пароль!")
      .required("Пароль обязателен для заполнения"),
  });

  const submitHandler = async ({ email, password }: FormValuesForSignIn) => {
    const auth = getAuth(app);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      dispatch(login());
      navigate("/listOfUsers");
    } catch (e: unknown) {
      if (!isAuthError(e)) {
        throw e;
      }
      const { code } = e;

      switch (code) {
        case "auth/email-already-in-use":
          setError("Пользователь с таким email уже существует!");
          break;
        case "auth/operation-not-allowed":
          setError("Операция не возможна, обратитесь к администратору!");
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
      <h1>Форма для регистрации</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={submitHandler}
      >
        {(formik) => {
          return (
            <div>
              <Form>
                <Input type="email" label="Email" name="email" />
                <Input type="password" label="Пароль" name="password" />
                <div className={classes.text}>
                  <button type="submit" disabled={!formik.isValid}>
                    Зарегистрируйтесь
                  </button>
                </div>
              </Form>
            </div>
          );
        }}
      </Formik>
      <TextError>{error ? <p>{error}</p> : null}</TextError>
    </div>
  );
};
