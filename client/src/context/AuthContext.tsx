import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import api from "../configs/api";
import toast from "react-hot-toast";

// ✅ USER TYPE
interface IUser {
  _id: string;
  name: string;
  email: string;
}

// ✅ CONTEXT TYPE
interface AuthContextProps {
  isLoggedIn: boolean;

  setIsLoggedIn: (
    isLoggedIn: boolean
  ) => void;

  user: IUser | null;

  setUser: (
    user: IUser | null
  ) => void;

  login: (user: {
    email: string;
    password: string;
  }) => Promise<void>;

  signUp: (user: {
    name: string;
    email: string;
    password: string;
  }) => Promise<void>;

  logout: () => Promise<void>;
}

// ✅ CREATE CONTEXT
export const AuthContext =
  createContext<AuthContextProps>({
    isLoggedIn: false,

    setIsLoggedIn: () => {},

    user: null,

    setUser: () => {},

    login: async () => {},

    signUp: async () => {},

    logout: async () => {},
  });

// ✅ PROVIDER
export const AuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {

  const [user, setUser] =
    useState<IUser | null>(null);

  const [isLoggedIn, setIsLoggedIn] =
    useState<boolean>(false);

  // ================= SIGNUP =================
  const signUp = async ({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) => {

    try {

      const { data } = await api.post(
        "/auth/register",
        {
          name,
          email,
          password,
        }
      );

      if (data.user) {

        setUser(data.user);

        setIsLoggedIn(true);
      }

      toast.success(
        data.message || "Signup Success"
      );

    } catch (error: any) {

      console.log(error);

      toast.error(
        error.response?.data?.message ||
        "Signup Failed"
      );
    }
  };

  // ================= LOGIN =================
  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {

    try {

      const { data } = await api.post(
        "/auth/login",
        {
          email,
          password,
        }
      );

      if (data.user) {

        setUser(data.user);

        setIsLoggedIn(true);
      }

      toast.success(
        data.message || "Login Success"
      );

    } catch (error: any) {

      console.log(error);

      toast.error(
        error.response?.data?.message ||
        "Login Failed"
      );
    }
  };

  // ================= LOGOUT =================
  const logout = async () => {

    try {

      await api.post(
        "/auth/logout"
      );

    } catch (error) {

      // ignore backend logout error
      console.log(error);

    } finally {

      // ✅ ALWAYS CLEAR FRONTEND STATE
      setUser(null);

      setIsLoggedIn(false);

      toast.success(
        "Logout successful"
      );
    }
  };

  // ================= FETCH USER =================
  const fetchUser = async () => {

    try {

      const { data } = await api.get(
        "/auth/verify"
      );

      if (data.user) {

        setUser(data.user);

        setIsLoggedIn(true);

      } else {

        setUser(null);

        setIsLoggedIn(false);
      }

    } catch (error) {

      setUser(null);

      setIsLoggedIn(false);
    }
  };

  // ================= PAGE LOAD =================
  useEffect(() => {

    fetchUser();

  }, []);

  // ✅ CONTEXT VALUE
  const value = {
    user,
    setUser,

    isLoggedIn,
    setIsLoggedIn,

    signUp,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ CUSTOM HOOK
export const useAuth = () =>
  useContext(AuthContext);