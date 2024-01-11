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
  return (
    <AuthContext.Provider
      value={{ showAuthModal, handleShowAuthModal, handleCloseAuthModal }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const useAuthContext = () => useContext(AuthContext);
