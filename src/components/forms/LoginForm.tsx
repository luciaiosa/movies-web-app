import React, { FunctionComponent } from "react";
import { useForm } from "react-hook-form";
import { styles } from './FormStyles';

interface LoginFormProps {
  onSubmit(data: User): void;
}
interface User {
  email: string;
  password: string;
}

const LoginForm: FunctionComponent<LoginFormProps> = (
  props
): JSX.Element => {
  const { handleSubmit, register, errors } = useForm();
  const classes = styles();

  const onSubmit = (values: any) => {
    props.onSubmit(values);
  }

  const labelFieldClassName = (field: string) => errors[field] ? classes.fieldLabelInvalid : classes.label;
  const inputFieldClassName = (field: string) => errors[field] ? classes.fieldInputInvalid : classes.input;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
      <p className={classes.formTitle}>Log in</p>
      <div className={classes.fieldContainer}>
        <label className={labelFieldClassName("email")}>Email*</label>
        <input
          className={inputFieldClassName("email")}
          name="email"
          type="text"
          placeholder="Email:"
          aria-invalid={errors.email ? "true" : "false"}
          ref={register({
            required: "Required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "Invalid email address",
            },
          })}
        />
        <span className={classes.error}>{errors.email && errors.email.message}</span>
      </div>
      <div className={classes.fieldContainer}>
        <label className={labelFieldClassName("password")}>Password*</label>
        <input
          className={inputFieldClassName("password")}
          name="password"
          type="password"
          placeholder="Password:"
          maxLength={30}
          aria-invalid={errors.password ? "true" : "false"}
          ref={register({
            required: "Required",
            /* maxLength: 30, */
            pattern: {
              value: /^[A-Z0-9._%+-]{1,30}$/i,
              message: "Max length 30 characters",
            },
          })}
        />
        <span className={classes.error}>{errors.password && errors.password.message}</span>
      </div>

      <div className={classes.fieldContainer}>
        <button type="submit" className={classes.button}>Submit</button>
      </div>
    </form>
  );
};
export default LoginForm;
