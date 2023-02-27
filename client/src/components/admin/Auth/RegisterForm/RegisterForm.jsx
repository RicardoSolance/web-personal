import React from "react";
import "./RegisterForm.scss";
import { Form } from "semantic-ui-react";
const RegisterForm = () => {
  return (
    <Form className="register-form">
      <Form.Input name="email" placeholder="emal" />
    </Form>
  );
};

export { RegisterForm };
