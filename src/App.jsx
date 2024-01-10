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

function App() {
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
          <Route path={PATHS.PRODUCT.DETAIL} element={<ProductDetail />} />

          {/* Blog page */}
          <Route path={PATHS.BLOG.INDEX} element={<Blog />} />
          <Route path={PATHS.BLOG.DETAIL} element={<BlogDetail />} />

          {/* Cart page */}
          <Route path={PATHS.SHOPPING_CART} element={<Cart />} />
          <Route path={PATHS.CHECKOUT.INDEX} element={<Checkout />} />
          <Route path={PATHS.CHECKOUT.SUCCESS} element={<CheckoutSuccess />} />

          {/* 404 page */}
          <Route path={PATHS.NOT_FOUND} element={<Page404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
