import scrollTop from "@/utils/scrollTop";
import { createContext, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";

export const MainContext = createContext({});

const MainContextProvider = ({ children }) => {
  const { pathname } = useLocation();

  // When change url
  useEffect(() => {
    handleCloseMenuMobile();

    // Handle event scroll to top
    scrollTop();
  }, [pathname]);

  // Handle show menu mobile
  const handleShowMenuMobile = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    $("body").addClass("mmenu-active");
  };

  // Handle close menu mobile
  const handleCloseMenuMobile = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    $("body").removeClass("mmenu-active");
  };
  return (
    <MainContext.Provider
      value={{ handleShowMenuMobile, handleCloseMenuMobile }}
    >
      {children}
    </MainContext.Provider>
  );
};

export default MainContextProvider;

export const useMainContext = () => useContext(MainContext);
