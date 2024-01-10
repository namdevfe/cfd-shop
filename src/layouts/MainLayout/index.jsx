import React from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import OverlayMenuMobile from "@/components/OverlayMenuMobile";
import ScrollToTop from "@/components/ScrollToTop";
import MenuMobile from "@/components/MenuMobile";
import Modal from "@/components/Modal";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <div className="page-wrapper">
        <Header />
        <Outlet />
        <Footer />
      </div>
      <ScrollToTop />
      <OverlayMenuMobile />
      <MenuMobile />
      <Modal />
    </>
  );
};

export default MainLayout;
