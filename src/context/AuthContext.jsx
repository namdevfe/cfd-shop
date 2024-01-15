import { customerService } from "@/services/customerService";
import tokenMethod from "@/utils/token";
import { message } from "antd";
import { createContext, useContext, useState } from "react";

export const AuthContext = createContext({});

const AuthContextProvider = ({ children }) => {
  const [showAuthModal, setShowAuthModal] = useState(""); // login || register || ""

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

        // Handle close modal & Notify success
        handleCloseAuthModal();
        message.success("Đăng nhập thành công!");
      } else {
        message.error("Đăng nhập thất bại!");
      }
    } catch (error) {
      message.error("Đăng nhập thất bại!");
    } finally {
      callback?.();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        showAuthModal,
        handleShowAuthModal,
        handleCloseAuthModal,
        handleLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const useAuthContext = () => useContext(AuthContext);
