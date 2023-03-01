import React, { useState } from "react";
import "./RegisterForm.scss";
import { Form } from "semantic-ui-react";
import { useFormik } from "formik";
import { Auth } from "../../../../api";
import { initialValue, validationSchema } from "./registerForm-data.js";

const authController = new Auth();
const RegisterForm = () => {
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  const formik = useFormik({
    initialValues: initialValue(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        setError("");
        setMsg("");
        await authController.register(formValue);
      } catch (error) {
        setError("error en el servidor");
        console.log("error", error);
      }
    },
  });
  return (
    <>
      <Form className="register-form" onSubmit={formik.handleSubmit}>
        <Form.Input name="email" placeholder="email" onChange={formik.handleChange} value={formik.values.email} />
        <Form.Input
          name="password"
          type="password"
          placeholder="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          error={formik.errors.password}
        />
        <Form.Input
          name="repeatepassword"
          type="password"
          placeholder="repeate password"
          onChange={formik.handleChange}
          value={formik.values.repeatepassword}
          error={formik.errors.repeatepassword}
        />
        <Form.Checkbox
          name="conditionAcepted"
          label="Acepto las politicas de privacidad"
          onChange={(_, data) => formik.setFieldValue("conditionAcepted", data.checked)}
          checked={formik.values.conditionAcepted}
          error={formik.errors.conditionAcepted}
        />
        <Form.Button type="submit" primary fluid loading={formik.isSubmitting}>
          Registrarme
        </Form.Button>
      </Form>
      {error != "" ? (
        <div className="error-tab">
          <p>{error}</p>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export { RegisterForm };
