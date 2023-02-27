import React, { useState } from "react";
import ricon from "../../../assets/icon/ricon.png";
import { LoginForm, RegisterForm } from "../../../components/admin/Auth";
import "./Auth.scss";

function Auth() {
  const [switchTab, setswitchTab] = useState(false);
  const changeTab = () => {
    switchTab ? setswitchTab(false) : setswitchTab(true);
  };
  return (
    <div className="Auth container d-flex flex-column justify-content-center align-items-center">
      <img src={ricon} alt="" srcset="" />
      <h3>wellcome to the admin panel </h3>
      <p>make sure to login, to gain access</p>
      {!switchTab ? <LoginForm /> : <RegisterForm />}
      {!switchTab ? (
        <a onClick={changeTab}>registrate aqui</a>
      ) : (
        <p onClick={changeTab}>Logeate aqui</p>
      )}
    </div>
  );
}

export { Auth };
