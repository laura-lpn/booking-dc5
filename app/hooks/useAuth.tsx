import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import AuthService from "../services/auth.service";
import { removeToken, setToken } from "../utils/token";

export const useAuth = () => {
  const { setUser } = useContext(AuthContext);

  const signin = async (email: string, password: string) => {
    const response = await AuthService.signin(email, password);
    setUser(response.user);
    setToken(response.token);
  };

  const signup = async (email: string, password: string, name?: string) => {
    try {
      const response = await AuthService.signup(email, password, name);
      if (response.error) {
        throw new Error(response.error);
      }
      setUser(response.user);
      setToken(response.token);
    } catch (error) {
      console.error("Error signing up:", error);
      throw error;
    }
  };

  const signout = () => {
    setUser(null);
    removeToken();
  };

  return { signout, signin, signup };
};
