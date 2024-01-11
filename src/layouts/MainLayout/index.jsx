import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MenuMobile from "@/components/MenuMobile";
import Modal from "@/components/Modal";
import ScrollToTop from "@/components/ScrollToTop";
import MainContextProvider from "@/context/MainContext";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <MainContextProvider>
      <div className="page-wrapper">
        <Header />
        <Outlet />
        <Footer />
      </div>
      <ScrollToTop />
      <MenuMobile />
      <Modal />
    </MainContextProvider>
  );
};

export default MainLayout;
