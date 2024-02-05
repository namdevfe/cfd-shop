import { useMainContext } from "@/context/MainContext";
import cn from "@/utils/cn";
import React, { useState } from "react";
import { MenuStyle } from "../StyledComponents";
import { NavLink } from "react-router-dom";
import { PATHS } from "@/constants/path";
import useQuery from "@/hooks/useQuery";
import { productService } from "@/services/productService";

const MENUS = {
  MENU: "menu",
  CATE: "cate",
};

const MenuMobile = () => {
  const { data: categoriesData } = useQuery(productService.getCategories);
  const { handleCloseMenuMobile } = useMainContext();
  const [selectedTab, setSelectedTab] = useState(MENUS.MENU);
  const _onTabChange = (e, selectedTab) => {
    e.preventDefault();
    setSelectedTab(selectedTab);
  };

  const categories = categoriesData?.products || [];

  return (
    <>
      {/* Menu mobile overlay */}
      <div className="mobile-menu-overlay" onClick={handleCloseMenuMobile} />

      {/* Menu mobile */}
      <div className="mobile-menu-container">
        <div className="mobile-menu-wrapper">
          <span className="mobile-menu-close" onClick={handleCloseMenuMobile}>
            <i className="icon-close" />
          </span>

          {/* Search */}
          <form action="#" method="get" className="mobile-search">
            <label htmlFor="mobile-search" className="sr-only">
              Search
            </label>
            <input
              type="search"
              className="form-control"
              name="mobile-search"
              id="mobile-search"
              placeholder="Search in..."
              required
            />
            <button className="btn btn-primary" type="submit">
              <i className="icon-search" />
            </button>
          </form>

          {/* Tab List */}
          <ul className="nav nav-pills-mobile nav-border-anim" role="tablist">
            {/* Tab menus */}
            <li className="nav-item">
              <a
                className={cn("nav-link", {
                  active: selectedTab === MENUS.MENU,
                })}
                href="#mobile-menu-tab"
                onClick={(e) => _onTabChange(e, MENUS.MENU)}
              >
                Menu
              </a>
            </li>

            {/* Tab categories */}
            <li className="nav-item">
              <a
                className={cn("nav-link", {
                  active: selectedTab === MENUS.CATE,
                })}
                href="#mobile-cats-tab"
                onClick={(e) => _onTabChange(e, MENUS.CATE)}
              >
                Categories
              </a>
            </li>
          </ul>

          {/* Panel menu tab */}
          <div className="tab-content">
            <div
              className={cn("tab-pane fade", {
                active: selectedTab === MENUS.MENU,
                show: selectedTab === MENUS.MENU,
              })}
            >
              <nav className="mobile-nav">
                <MenuStyle className="mobile-menu">
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
            </div>

            {/* Panel tab categories */}
            <div
              className={cn("tab-pane fade", {
                active: selectedTab === MENUS.CATE,
                show: selectedTab === MENUS.CATE,
              })}
            >
              <nav className="mobile-cats-nav">
                <ul className="mobile-cats-menu">
                  {categories?.length > 0 &&
                    categories.map((category, index) => {
                      const categoryPath =
                        category?.id &&
                        PATHS.PRODUCT.INDEX + `?category=${category?.id}`;
                      return (
                        <li key={category?.id || index}>
                          <NavLink to={categoryPath}>
                            {category?.name || ""}
                          </NavLink>
                        </li>
                      );
                    })}

                  {/* <li>
                    <a href="#">Computers</a>
                  </li>
                  <li>
                    <a href="#">Tablets &amp; Cell Phones</a>
                  </li>
                  <li>
                    <a href="#">Smartwatches</a>
                  </li>
                  <li>
                    <a href="#">Accessories</a>
                  </li> */}
                </ul>
                {/* End .mobile-cats-menu */}
              </nav>
              {/* End .mobile-cats-nav */}
            </div>
            {/* .End .tab-pane */}
          </div>
          {/* End .tab-content */}
          <div className="social-icons">
            <a
              href="#"
              className="social-icon"
              target="_blank"
              title="Facebook"
            >
              <i className="icon-facebook-f" />
            </a>
            <a href="#" className="social-icon" target="_blank" title="Twitter">
              <i className="icon-twitter" />
            </a>
            <a
              href="#"
              className="social-icon"
              target="_blank"
              title="Instagram"
            >
              <i className="icon-instagram" />
            </a>
            <a href="#" className="social-icon" target="_blank" title="Youtube">
              <i className="icon-youtube" />
            </a>
          </div>
          {/* End .social-icons */}
        </div>
        {/* End .mobile-menu-wrapper */}
      </div>
    </>
  );
};

export default MenuMobile;
