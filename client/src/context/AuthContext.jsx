import { createContext, useEffect, useState } from "react";
import { User } from "../api";

const userController = new User();
export const AuthContext = createContext();
export function AuthProvider(props) {
  const { children } = props;
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    //comprobar si el usuario esta logueado
  }, []);

  const login = async (accesToken) => {
    try {
      const resp = await userController.getMe(accesToken);
      delete resp.password;
      setUser(resp);
      setToken(accesToken);
    } catch (error) {
      console.log(error);
    }
  };

  const data = {
    accesToken: token,
    user,
    login,
  };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
}
