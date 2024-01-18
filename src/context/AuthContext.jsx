import { PATHS } from "@/constants/path";
import { customerService } from "@/services/customerService";
import tokenMethod from "@/utils/token";
import { message } from "antd";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({});

const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = useState(""); // login || register || ""
  // const [profile, setProfile] = useState({});

  // useEffect(() => {
  //   const accessToken = !!tokenMethod.get()?.accessToken;
  //   if (accessToken) {
  //     getProfile();
  //   }
  // }, []);

  // Handle show auth modal
  const handleShowAuthModal = (modalType) => {
    setShowAuthModal(modalType || "");
  };

  // Handlec close auth modal
  const handleCloseAuthModal = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setShowAuthModal("");
  };

  // Handle get profile
  const getProfile = async () => {
    try {
      const res = await customerService.getProfile();
      if (res?.data?.data) {
        setProfile(res.data.data);
      }
    } catch (error) {
      console.log("🚀error---->", error);
    }
  };

  // Handle login
  const handleLogin = async (loginData, callback) => {
    // Payload
    const payload = {
      ...loginData,
    };

    // Call Api
    try {
      const res = await customerService.login(payload);
      if (res?.data?.data) {
        // Response from server is token
        const { token: accessToken, refreshToken } = res.data.data || {};

        // Save token to client-storage
        tokenMethod.set({
          accessToken,
          refreshToken,
        });

        // Handle get profile
        getProfile();

        // Handle close modal & Notify success
        handleCloseAuthModal();
        message.success("Logged in successfully!");
      } else {
        message.error("Login failed!");
      }
    } catch (error) {
      message.error("Login failed!");
    } finally {
      callback?.();
    }
  };

  // Handle register
  const handleRegister = async (registerData, callback) => {
    const { email, password, isAgree } = registerData || {};
    // Payload
    const payload = {
      firstName: "",
      lastName: "",
      email,
      password,
      isAgree,
    };

    // Call API
    try {
      const res = await customerService.register(payload);
      if (res?.data?.data?.id) {
        message.success("Register successfully!");
        handleLogin({
          email,
          password,
        });
      }
    } catch (error) {
      if (error?.response?.status === 403) {
        message.error("Registered account already exists");
      } else {
        message.error("Register failed!");
      }
    } finally {
      callback?.();
    }
  };

  // Handle logout
  const handleLogout = () => {
    // Remove token
    tokenMethod.remove();
    setProfile(null);
    // Navigate to home page
    navigate(PATHS.HOME);
    // Notify
    message.success("Account is logged out");
  };

  return (
    <AuthContext.Provider
      value={{
        showAuthModal,
        handleShowAuthModal,
        handleCloseAuthModal,
        handleLogin,
        handleRegister,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const useAuthContext = () => useContext(AuthContext);
