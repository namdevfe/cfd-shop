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

export const FOOTER_PATHS = [
  {
    title: "Useful Links",
    path: [PATHS.ABOUT, PATHS.PRODUCT.INDEX, PATHS.FAQ, PATHS.CONTACT],
  },
  {
    title: "Customer Service",
    path: [PATHS.PAYMENT_METHOD, PATHS.RETURNS, PATHS.SHIPPING, PATHS.PRIVACY],
  },
  {
    title: "My Account",
    path: [
      PATHS.DASHBOARD.MY_ACCOUNT,
      PATHS.SHOPPING_CART,
      PATHS.DASHBOARD.MY_WISHLIST,
      PATHS.DASHBOARD.MY_ORDERS,
    ],
  },
];
