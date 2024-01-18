import { MODAL_TYPES } from "@/constants/general";
import { PATHS } from "@/constants/path";
import {
  handleLogout,
  handleShowAuthModal,
} from "@/store/reducers/authReducer";
import tokenMethod from "@/utils/token";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const HeaderTop = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.auth);
  const { firstName, email } = profile || {};

  const _onShowAuthModal = (e) => {
    e?.stopPropagation();
    e?.preventDefault();
    dispatch(handleShowAuthModal(MODAL_TYPES.LOGIN));
  };

  const _onLogout = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    dispatch(handleLogout());
    navigate(PATHS.HOME);
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
          {!!tokenMethod.get() ? (
            <ul className="top-menu">
              <li>
                <a href="#" className="top-link-menu">
                  <i className="icon-user" />
                  {firstName || email || "Default"}
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
                        <a href="#" onClick={_onLogout}>
                          Sign Out
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          ) : (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default HeaderTop;
