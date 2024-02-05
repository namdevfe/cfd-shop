import Breadcrumb from "@/components/Breadcrumb";
import { PATHS } from "@/constants/path";
import { handleLogout } from "@/store/reducers/authReducer";
import { clearCart } from "@/store/reducers/cartReducer";
import { useDispatch } from "react-redux";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const _onLogout = () => {
    dispatch(handleLogout());
    dispatch(clearCart());
    navigate(PATHS.HOME);
  };

  return (
    <main className="main">
      <div
        className="page-header text-center"
        style={{ backgroundImage: 'url("/assets/images/page-header-bg.jpg")' }}
      >
        <div className="container">
          <h1 className="page-title">My Account</h1>
        </div>
      </div>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to={PATHS.HOME}>Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item isActive>My Account</Breadcrumb.Item>
      </Breadcrumb>

      <div className="page-content">
        <div className="dashboard">
          <div className="container">
            <div className="row">
              <aside className="col-md-4 col-lg-3">
                <ul className="nav nav-dashboard flex-column mb-3 mb-md-0">
                  <li className="nav-item">
                    <NavLink
                      end
                      className="nav-link"
                      to={PATHS.DASHBOARD.MY_ACCOUNT}
                      href="#"
                    >
                      Account Details
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to={PATHS.DASHBOARD.MY_ORDERS}
                      className="nav-link"
                      href="#"
                    >
                      Orders
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to={PATHS.DASHBOARD.MY_ADDRESS}
                      className="nav-link"
                      href="#"
                    >
                      Adresses
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to={PATHS.DASHBOARD.MY_WISHLIST}
                      className="nav-link"
                      href="#"
                    >
                      Wishlist
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to={PATHS.DASHBOARD.CHANGE_PASSWORD}
                      className="nav-link"
                      href="#"
                    >
                      Change Password
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#" onClick={_onLogout}>
                      Sign Out
                    </a>
                  </li>
                </ul>
              </aside>
              <div className="col-md-8 col-lg-9">
                <div className="tab-content">
                  <Outlet />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
