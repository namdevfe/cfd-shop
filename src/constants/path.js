const PRODUCT_PATH = "/products";
const BLOG_PATH = "/blog";
const CHECKOUT_PATH = "/checkout";

export const PATHS = {
  HOME: "/",
  ABOUT: "/about",
  CONTACT: "/contact",
  PROFILE: "/profile",
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
  CHECKOUT: {
    INDEX: CHECKOUT_PATH,
    SUCCESS: CHECKOUT_PATH + "/checkout-success",
  },

  NOT_FOUND: "*",
};
