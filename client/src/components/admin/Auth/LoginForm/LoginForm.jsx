import React, { useState } from "react";
import { Form } from "semantic-ui-react";
import "./LoginForm.scss";

const LoginForm = () => {
  const [error, setError] = useState("");
  return (
    <Form className="register-form">
      <Form.Input name="email" placeholder="email" />
      <Form.Input name="password" type="password" placeholder="password" />
      <Form.Input name="password" type="password" placeholder="repeate password" />
      <Form.Checkbox name="conditionAcepted" label="Acepto las politicas de privacidad" />
      <Form.Button type="submit" primary fluid>
        Registrarme
      </Form.Button>
      {error != "" ? <p className="error">{error}</p> : ""}
    </Form>
  );
};

export { LoginForm };
