const PRODUCT_PATH = "/products";
const BLOG_PATH = "/blog";

export const PATHS = {
  HOME: "/",
  ABOUT: "/about",
  CONTACT: "/contact",
  PROFILE: "/profile",
  SHOPPING_CART: "/shopping-cart",

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

  NOT_FOUND: "*",
};
