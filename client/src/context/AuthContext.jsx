import { createContext, useEffect, useState } from "react";
import { User, Auth } from "../api";
import { hasExpired } from "../utils";

const userController = new User();
const authController = new Auth();
export const AuthContext = createContext();
export function AuthProvider(props) {
  const { children } = props;
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    //comprobar si el usuario esta logueado
    // init();
    (async () => {
      const accesToken = authController.getAccessToken();
      const refreshToken = authController.getRefreshToken();
      console.log("tokeeeennss:", accesToken);
      if (!accesToken || !refreshToken) {
        logOut;
        setLoading(false);
        return;
      }

      if (hasExpired(accesToken)) {
        if (hasExpired(refreshToken)) {
          logOut();
        } else {
          await reLogin(refreshToken);
        }
      } else {
        await login(accesToken);
      }
      setLoading(false);
    })();
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

  const init = async () => {
    const accesToken = authController.getAccessToken();
    const refreshToken = authController.getRefreshToken();
    console.log("tokeeeennss:", accesToken);
    if (!accesToken || !refreshToken) {
      logOut;
      setLoading(false);
      return;
    }

    if (hasExpired(accesToken)) {
      if (hasExpired(refreshToken)) {
        logOut();
      } else {
        await reLogin(refreshToken);
      }
    } else {
      await login(accesToken);
    }
    setLoading(false);
  };

  const reLogin = async (refreshToken) => {
    try {
      const { accesToken } = await authController.refreshToken(refreshToken);
      console.log(accesToken);
      authController.setAccessToken(accesToken);
      await login(accesToken);
    } catch (error) {
      console.log(error);
    }
  };

  const logOut = () => {
    setUser(null);
    setToken(null);
    authController.removeTokens();
  };
  const data = {
    accesToken: token,
    user,
    login,
    logOut,
  };

  if (loading) return null;

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
}
