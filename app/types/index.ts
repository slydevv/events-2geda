
import * as yup from "yup";

export type LoginFormInputs = {
  email: string;
  password: string;
}
export type SignupFormInputs = {
    name:string
  email: string;
  password: string;
}

export const loginFormSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});
export const signinFormSchema = yup.object({
    name:yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
});

// Auth page types 

export type AuthPageState = {
  displayComponent: AuthScreenDisplay;
}; 

export enum AuthScreenDisplay {
  signIn,
  signUp,
}

