import { Link, NavLink } from "react-router-dom";
import { PATHS } from "@/constants/path";
import { MenuStyle } from "../StyledComponents";
import useHeaderMiddle from "./useHeaderMiddle";
import Search from "../Search";
import CartDropdown from "../CartDropdown";

const HeaderMiddle = () => {
  const { handleShowMenuMobile, cartDropdownProps } = useHeaderMiddle();

  return (
    <div className="header-middle sticky-header">
      <div className="container">
        <div className="header-left">
          {/* Humburger Menu */}
          <button
            className="mobile-menu-toggler"
            onClick={handleShowMenuMobile}
          >
            <span className="sr-only">Toggle mobile menu</span>
            <i className="icon-bars" />
          </button>
          {/* Logo */}
          <Link to={PATHS.HOME} className="logo">
            <img
              src="/assets/images/logo.svg"
              alt="CFD Shop logo"
              width={160}
            />
          </Link>
        </div>
        {/* Navbar Menu */}
        <nav className="main-nav">
          <MenuStyle className="menu">
            <li>
              <NavLink to={PATHS.HOME}>Home</NavLink>
            </li>
            <li>
              <NavLink to={PATHS.ABOUT}>About Us</NavLink>
            </li>
            <li>
              <NavLink to={PATHS.PRODUCT.INDEX}>Product</NavLink>
            </li>
            <li>
              <NavLink to={PATHS.BLOG.INDEX}>Blog</NavLink>
            </li>
            <li>
              <NavLink to={PATHS.CONTACT}>Contact Us</NavLink>
            </li>
          </MenuStyle>
        </nav>
        <div className="header-right">
          <CartDropdown {...cartDropdownProps} />
        </div>
      </div>
    </div>
  );
};

export default HeaderMiddle;
