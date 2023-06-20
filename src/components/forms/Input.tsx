import { Field, ErrorMessage } from "formik";
import { TextError } from "./TextError";
import { InputProps } from "../../interfaces/Interfaces";

export const Input = ({ label, type, name }: InputProps) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <Field id={name} name={name} type={type} placeholder={label} />
      <ErrorMessage component={TextError} name={name} />
    </div>
  );
};
