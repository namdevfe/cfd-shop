import { MODAL_TYPES } from "@/constants/general";
import { useAuthContext } from "@/context/AuthContext";

const HeaderTop = () => {
  const { handleShowAuthModal } = useAuthContext();

  const _onShowAuthModal = (e) => {
    e.stopPropagation();
    e.preventDefault();
    handleShowAuthModal(MODAL_TYPES.LOGIN);
  };

  return (
    <div className="header-top">
      <div className="container">
        <div className="header-left">
          <a href="tel:0989596912">
            <i className="icon-phone" /> Hotline: 0377 813 805
          </a>
        </div>
        <div className="header-right">
          {/* Not LogIn */}
          <ul className="top-menu top-link-menu">
            <li>
              <a
                href="#signin-modal"
                className="top-menu-login"
                onClick={_onShowAuthModal}
              >
                <i className="icon-user"></i>Login | Resgister
              </a>
            </li>
          </ul>

          {/* Logged In */}
          {/* <ul className="top-menu">
            <li>
              <a href="#" className="top-link-menu">
                <i className="icon-user" />
                Tran Nghia{" "}
              </a>
              <ul>
                <li>
                  <ul>
                    <li>
                      <a href="dashboard.html">Account Details</a>
                    </li>
                    <li>
                      <a href="dashboard.html">Your Orders</a>
                    </li>
                    <li>
                      <a href="dashboard.html">
                        Wishlist <span>(3)</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">Sign Out</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul> */}
        </div>
      </div>
    </div>
  );
};

export default HeaderTop;
