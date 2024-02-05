import { message } from "antd";
import { Suspense, lazy, useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import { PATHS } from "./constants/path";
// import MainLayout from "./layouts/MainLayout";
// import About from "./pages/About";
// import Blog from "./pages/Blog";
// import BlogDetail from "./pages/BlogDetail";
// import Cart from "./pages/Cart";
// import Checkout from "./pages/Checkout";
// import CheckoutSuccess from "./pages/CheckoutSuccess";
// import Contact from "./pages/Contact";
// import Dashboard from "./pages/Dashboard";
// import ChangePassword from "./pages/Dashboard/ChangePassword";
// import MyAccount from "./pages/Dashboard/MyAccount";
// import MyAddress from "./pages/Dashboard/MyAddress";
// import MyOrders from "./pages/Dashboard/MyOrders";
// import MyWishlist from "./pages/Dashboard/MyWishlist";
// import Faq from "./pages/Faq";
// import Home from "./pages/Home";
// import Page404 from "./pages/Page404";
// import PaymentMethod from "./pages/PaymentMethod";
// import Privacy from "./pages/Privacy";
// import Product from "./pages/Product";
// import ProductDetail from "./pages/ProductDetail";
// import Returns from "./pages/Returns";
// import Shipping from "./pages/Shipping";
import { handleGetProfile } from "./store/reducers/authReducer";
import { handleGetCart } from "./store/reducers/cartReducer";
import tokenMethod from "./utils/token";
import PageLoading from "./components/PageLoading";

const MainLayout = lazy(() => import("./layouts/MainLayout"));
const About = lazy(() => import("./pages/About"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogDetail = lazy(() => import("./pages/BlogDetail"));
const Cart = lazy(() => import("./pages/Cart"));
const Checkout = lazy(() => import("./pages/Checkout"));
const CheckoutSuccess = lazy(() => import("./pages/CheckoutSuccess"));
const Contact = lazy(() => import("./pages/Contact"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const ChangePassword = lazy(() => import("./pages/Dashboard/ChangePassword"));
const MyAccount = lazy(() => import("./pages/Dashboard/MyAccount"));
const MyAddress = lazy(() => import("./pages/Dashboard/MyAddress"));
const MyOrders = lazy(() => import("./pages/Dashboard/MyOrders"));
const MyWishlist = lazy(() => import("./pages/Dashboard/MyWishlist"));
const Faq = lazy(() => import("./pages/Faq"));
const Home = lazy(() => import("./pages/Home"));
const Page404 = lazy(() => import("./pages/Page404"));
const PaymentMethod = lazy(() => import("./pages/PaymentMethod"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Product = lazy(() => import("./pages/Product"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const Returns = lazy(() => import("./pages/Returns"));
const Shipping = lazy(() => import("./pages/Shipping"));

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
    <Suspense fallback={<PageLoading />}>
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
              <Route path={PATHS.CHECKOUT} element={<Checkout />} />
              <Route
                path={PATHS.CHECKOUT_SUCCESS}
                element={<CheckoutSuccess />}
              />

              {/* Dashboard */}
              <Route path={PATHS.DASHBOARD.MY_ACCOUNT} element={<Dashboard />}>
                {/* My Account */}
                <Route index element={<MyAccount />} />

                {/* Change password */}
                <Route
                  path={PATHS.DASHBOARD.CHANGE_PASSWORD}
                  element={<ChangePassword />}
                />

                {/* My Address */}
                <Route
                  path={PATHS.DASHBOARD.MY_ADDRESS}
                  element={<MyAddress />}
                />

                {/* My Orders */}
                <Route
                  path={PATHS.DASHBOARD.MY_ORDERS}
                  element={<MyOrders />}
                />

                {/* My Wishlist */}
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
    </Suspense>
  );
}

export default App;
