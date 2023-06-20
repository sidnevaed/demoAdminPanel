import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Input } from "./Input";
import classes from "./Form.module.scss";
import axios from "axios";
import { SignOut } from "../table/SignOut";
import { FormValuesForNewUser } from "../../interfaces/Interfaces";

export const CreateUserForm = () => {
  const initialValues: FormValuesForNewUser = {
    firstName: "",
    surname: "",
    email: "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .min(3, "Слишком короткое имя")
      .required("Имя обязательно для заполнения"),
    surname: Yup.string()
      .min(3, "Слишком короткая фамилия")
      .required("Фамилия обязательна для заполнения"),
    email: Yup.string()
      .email("Невалидный формат email")
      .required("Email обязателен для заполнения"),
  });

  const navigate = useNavigate();

  return (
    <div className={classes.form}>
      <h1>Создать нового пользователя</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values: FormValuesForNewUser) => {
          // * Для демонстрации, в реальном проекте параметры задаются бэкендом
          // * на основе статистики, которую в бэкенд присылает мобильное приложение
          const maximumRate = getRandomArrayElement(maximumRateSet);
          const lastTimePlaying = getRandomArrayElement(lastTimePlayingSet);
          const openedORClosed = getRandomArrayElement(hasAccess);

          const newState = {
            ...values,
            openedORClosed,
            maximumRate,
            lastTimePlaying,
          };

          await axios.post(
            "https://super-game1-default-rtdb.firebaseio.com/usersV2.json",
            newState,
          );
          navigate("/listOfUsers");
        }}
      >
        {(formik) => {
          return (
            <div>
              <Form>
                <Input type="text" label="Имя пользователя" name="firstName" />
                <Input
                  type="text"
                  label="Фамилия пользователя"
                  name="surname"
                />
                <Input type="email" label="Email" name="email" />

                <div className={classes.text}>
                  <button type="submit" disabled={!formik.isValid}>
                    Создать
                  </button>
                  <SignOut />
                </div>
              </Form>
            </div>
          );
        }}
      </Formik>
    </div>
  );
};

// * Для демонстрации, в реальном проекте параметры задаются бэкендом
// * на основе статистики, которую в бэкенд присылает мобильное приложение
function getRandomArrayElement<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}
const maximumRateSet = [100, 250, 300, 330];
const lastTimePlayingSet = [
  new Date(2022, 11, 15),
  new Date(2023, 3, 28),
  new Date(2023, 2, 28),
  new Date(2023, 4, 28),
  new Date(2022, 10, 15),
];

const hasAccess = ["Да", "Нет"];
