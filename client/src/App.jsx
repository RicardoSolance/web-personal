import React from "react";
import { BrowserRouter } from "react-router-dom";
import AdminRouter from "./router/AdminRouter";
import WebRouter from "./router/WebRouter";
import { AuthProvider } from "./context";
import "./styles/style.scss";
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <WebRouter />
        <AdminRouter />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
