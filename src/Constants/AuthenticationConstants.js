import * as Yup from "yup";

const SignUpInitialValues = {
  name: "",
  email: "",
  password: "",
};

const LoginInitialValues = {
  email: "",
  password: "",
};

const SignUpValidationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const LoginValidationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export {
  SignUpInitialValues,
  LoginInitialValues,
  SignUpValidationSchema,
  LoginValidationSchema,
};
