import { useFormik } from "formik";
import * as yup from "yup";
import useAuth from "~/src/hooks/useAuth";
import { useRouter } from "next/router";
export const useAuthForms = () => {
  const { login, register } = useAuth();
  const router = useRouter();
  const loginForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup
        .string("Enter your email")
        .email("Enter a valid email")
        .required("Email is required"),
      password: yup
        .string("Enter your password")
        .min(8, "Password should be of minimum 8 characters length")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        await login(values);
        router.replace("/");
      } catch (error) {}
    },
  });
  const registerForm = useFormik({
    initialValues: {
      email: "",
      password: "",
      name: "",
      phoneNumber: "",
      address: "",
    },
    validationSchema: yup.object({
      email: yup
        .string("Enter your email")
        .email("Enter a valid email")
        .required("Email is required"),
      password: yup
        .string("Enter your password")
        .min(8, "Password should be of minimum 8 characters length")
        .required("Password is required")
        .matches(
          "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})",
          "Password must be Strong"
        ),
      name: yup
        .string("Enter your Name")
        .min(3, "Name should be of minimum 3 characters length")
        .required("Name is required"),
      address: yup
        .string("Enter your Address")
        .min(10, "Address should be of minimum 1- characters length")
        .required("Address is required"),
      phoneNumber: yup
        .string("Enter your phoneNumber")
        .min(11, "phoneNumber should be of minimum 11 characters length")
        .max(11, "phoneNumber should be of maximum 11 characters length")
        .required("phoneNumber is required"),
    }),
    onSubmit: async (values) => {
      try {
        await register(values);
        router.replace("/");
      } catch (error) {}
    },
  });

  return {
    loginForm,
    registerForm,
  };
};
