const PRODUCT_PATH = "/product";
const BLOG_PATH = "/blog";
const CHECKOUT_PATH = "/checkout";
const DASHBOARD_PATH = "/dashboard";

export const PATHS = {
  HOME: "/",
  ABOUT: "/about",
  CONTACT: "/contact",
  SHOPPING_CART: "/shopping-cart",
  FAQ: "/faq",
  PAYMENT_METHOD: "/payment-method",
  PRIVACY: "/privacy",
  RETURNS: "/returns",
  SHIPPING: "/shipping",

  // Product
  PRODUCT: {
    INDEX: PRODUCT_PATH,
    DETAIL: PRODUCT_PATH + "/:productSlug",
  },

  // Blog
  BLOG: {
    INDEX: BLOG_PATH,
    DETAIL: BLOG_PATH + "/:blogSlug",
  },

  // Checkout
  CHECKOUT: "/checkout",

  // Checkout Success
  CHECKOUT_SUCCESS: "/checkout-success",

  // Dashboard
  DASHBOARD: {
    MY_ACCOUNT: DASHBOARD_PATH,
    MY_ORDERS: DASHBOARD_PATH + "/my-orders",
    MY_WISHLIST: DASHBOARD_PATH + "/my-wishlist",
    MY_ADDRESS: DASHBOARD_PATH + "/my-address",
    CHANGE_PASSWORD: DASHBOARD_PATH + "/change-password",
  },

  NOT_FOUND: "*",
};
