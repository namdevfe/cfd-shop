import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MenuMobile from "@/components/MenuMobile";
import Modal from "@/components/AuthModal";
import ScrollToTop from "@/components/ScrollToTop";
import MainContextProvider from "@/context/MainContext";
import { Outlet } from "react-router-dom";
import AuthContextProvider from "@/context/AuthContext";

const MainLayout = () => {
  return (
    <MainContextProvider>
      <AuthContextProvider>
        <div className="page-wrapper">
          <Header />
          <Outlet />
          <Footer />
        </div>
        <ScrollToTop />
        <MenuMobile />
        <Modal />
      </AuthContextProvider>
    </MainContextProvider>
  );
};

export default MainLayout;
