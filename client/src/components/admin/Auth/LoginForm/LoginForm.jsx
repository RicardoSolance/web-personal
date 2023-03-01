import React, { useState } from "react";
import { Form } from "semantic-ui-react";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./LoginForm-data";
import { Auth } from "../../../../api";
import { useAuth } from "../../../../hooks";
import "./LoginForm.scss";

const LoginForm = () => {
  const authController = new Auth();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const resp = await authController.login(formValue);
        authController.setAccessToken(resp.access);
        authController.setRefreshToken(resp.refresh);
        login(resp.access);
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <Form className="Login-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        name="email"
        placeholder="email"
        onChange={formik.handleChange}
        value={formik.values.email}
        error={formik.errors.email}
      />
      <Form.Input
        name="password"
        type="password"
        placeholder="password"
        onChange={formik.handleChange}
        value={formik.values.password}
        error={formik.errors.email}
      />
      <Form.Button type="submit" primary fluid loading={formik.isSubmitting}>
        Login
      </Form.Button>
      {error != "" ? <p className="error">{error}</p> : ""}
    </Form>
  );
};

export { LoginForm };
