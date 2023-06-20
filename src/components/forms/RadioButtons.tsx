import { Field, ErrorMessage } from "formik";
import { TextError } from "./TextError";
import classes from "./RadioButtons.module.scss";
import { RadioButtonsProps } from "../../interfaces/Interfaces";

export const RadioButtons = ({
  label,
  name,
  options,
  type,
}: RadioButtonsProps) => {
  return (
    <div>
      <label>{label}</label>
      <Field name={name}>
        {(props) => {
          return options.map((option) => {
            return (
              <div key={option.key} className={classes["radio-layout"]}>
                <div className={classes.input}>
                  <input
                    id={option.value}
                    type={type}
                    {...props.field}
                    value={option.value}
                    checked={props.field.value === option.value}
                  />
                </div>
                <label htmlFor={option.value}>{option.key} </label>
              </div>
            );
          });
        }}
      </Field>
      <ErrorMessage component={TextError} name={name} />
    </div>
  );
};
