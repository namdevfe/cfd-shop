import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import { PATHS } from "./constants/path";
import Page404 from "./pages/Page404";
import About from "./pages/About";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import CheckoutSuccess from "./pages/CheckoutSuccess";
import Contact from "./pages/Contact";
import Faq from "./pages/Faq";
import PaymentMethod from "./pages/PaymentMethod";
import Privacy from "./pages/Privacy";
import Product from "./pages/Product";
import ProductDetail from "./pages/ProductDetail";
import Returns from "./pages/Returns";
import Shipping from "./pages/Shipping";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import MyAccount from "./pages/Dashboard/MyAccount";
import MyWishlist from "./pages/Dashboard/MyWishlist";
import MyAddress from "./pages/Dashboard/MyAddress";
import MyOrders from "./pages/Dashboard/MyOrders";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { handleGetProfile } from "./store/reducers/authReducer";
import { message } from "antd";
import tokenMethod from "./utils/token";
import { handleGetCart } from "./store/reducers/cartReducer";

function App() {
  const dispatch = useDispatch();

  // Config message antd
  message.config({
    top: 80,
    duration: 3,
    maxCount: 3,
  });

  useEffect(() => {
    if (tokenMethod.get()) {
      // Handle Get Profile
      dispatch(handleGetProfile());
      // Handle Get Cart
      dispatch(handleGetCart());
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={PATHS.HOME} element={<MainLayout />}>
          {/* Home Page */}
          <Route index element={<Home />} />

          {/* About page */}
          <Route path={PATHS.ABOUT} element={<About />} />

          {/* Contact page*/}
          <Route path={PATHS.CONTACT} element={<Contact />} />

          {/* Faq page */}
          <Route path={PATHS.FAQ} element={<Faq />} />

          {/* PaymentMethod page */}
          <Route path={PATHS.PAYMENT_METHOD} element={<PaymentMethod />} />

          {/* Privacy page */}
          <Route path={PATHS.PRIVACY} element={<Privacy />} />

          {/* Returns page */}
          <Route path={PATHS.RETURNS} element={<Returns />} />

          {/* Shipping page */}
          <Route path={PATHS.SHIPPING} element={<Shipping />} />

          {/* Products page */}
          <Route path={PATHS.PRODUCT.INDEX} element={<Product />} />
          {/* Product  Detail */}
          <Route path={PATHS.PRODUCT.DETAIL} element={<ProductDetail />} />

          {/* Blog page */}
          <Route path={PATHS.BLOG.INDEX} element={<Blog />} />
          <Route path={PATHS.BLOG.DETAIL} element={<BlogDetail />} />

          {/* Private pages */}
          <Route element={<PrivateRoute redirectPath={PATHS.HOME} />}>
            {/* Cart - Checkout - Checkout Success */}
            <Route path={PATHS.SHOPPING_CART} element={<Cart />} />
            <Route path={PATHS.CHECKOUT.INDEX} element={<Checkout />} />
            <Route
              path={PATHS.CHECKOUT.SUCCESS}
              element={<CheckoutSuccess />}
            />

            {/* Profile */}
            <Route path={PATHS.DASHBOARD.MY_ACCOUNT} element={<Dashboard />}>
              {/* MyAccount */}
              <Route index element={<MyAccount />} />

              {/* MyAddress */}
              <Route
                path={PATHS.DASHBOARD.MY_ADDRESS}
                element={<MyAddress />}
              />

              {/* MyOrders */}
              <Route path={PATHS.DASHBOARD.MY_ORDERS} element={<MyOrders />} />

              {/* MyWishlist */}
              <Route
                path={PATHS.DASHBOARD.MY_WISHLIST}
                element={<MyWishlist />}
              />
            </Route>
          </Route>

          {/* 404 page */}
          <Route path={PATHS.NOT_FOUND} element={<Page404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
