import { useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Input } from "./Input";
import classes from "./Form.module.scss";
import { RadioButtons } from "./RadioButtons";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { editUser, fetchUsers } from "../../store/usersSlice";
import { UsersTypes, FormValuesEditing } from "../../interfaces/Interfaces";
import { SignOut } from "../table/SignOut";

export const EditForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id: userId } = useParams();

  const users = useAppSelector((state) => state.usersLists.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const initialValues = getInitialValues(users, userId);

  const radioOptions = [
    { key: "Да", value: "Да" },
    { key: "Нет", value: "Нет" },
  ];

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
    openedORClosed: Yup.string().required("Галочка обязательна для заполнения"),
  });

  const submitHandler = async (values: FormValuesEditing) => {
    if (!userId) {
      throw new TypeError(`Пользователь с id ${userId} не найден`);
    }

    await dispatch(
      editUser({
        userId,
        values,
      }),
    );

    navigate("/listOfUsers");
  };

  return (
    <div className={classes.form}>
      <h1>Внести изменения в таблицу</h1>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={submitHandler}
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
                <RadioButtons
                  type="radio"
                  label="Открыт ли доступ к игре?"
                  name="openedORClosed"
                  options={radioOptions}
                />

                <div className={classes.text}>
                  <button type="submit" disabled={!formik.isValid}>
                    Изменить данные пользователя
                  </button>
                </div>

                <div className={classes.text}>
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

function getInitialValues(
  users: UsersTypes[],
  userId?: UsersTypes["id"],
): FormValuesEditing {
  if (users.length === 0) {
    return {
      firstName: "",
      surname: "",
      email: "",
      openedORClosed: "",
    };
  }

  if (userId === undefined) {
    throw new Error("UserId неопределен");
  }

  const user = users.find((user) => user.id === userId);
  if (!user) {
    throw new Error(`Пользователь с id ${userId} не найден`);
  }

  const { firstName, surname, email, openedORClosed } = user;

  return {
    firstName,
    surname,
    email,
    openedORClosed,
  };
}
