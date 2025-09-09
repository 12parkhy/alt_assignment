// API configuration and constants
export const API_CONFIG = {
  BASE_URL: "https://dummyjson.com",
  ENDPOINTS: {
    PRODUCTS: "/products",
    PRODUCT_DETAIL: "/products",
  },
  PAGINATION: {
    DEFAULT_LIMIT: 20,
    DEFAULT_SKIP: 0,
  },
};

export const LOADING_STATES = {
  IDLE: "idle",
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error",
};
