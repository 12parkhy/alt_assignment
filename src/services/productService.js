import { API_CONFIG } from "../utils/constants";

// Base API service class
class ProductService {
  constructor() {
    this.baseURL = API_CONFIG.BASE_URL;
  }

  // Generic API call handler with error handling
  async apiCall(url, options = {}) {
    try {
      const response = await fetch(`${this.baseURL}${url}`, {
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("API call failed:", error);
      throw error;
    }
  }

  // Get products with pagination (for list page)
  async getProducts(
    skip = API_CONFIG.PAGINATION.DEFAULT_SKIP,
    limit = API_CONFIG.PAGINATION.DEFAULT_LIMIT
  ) {
    const url = `${API_CONFIG.ENDPOINTS.PRODUCTS}?skip=${skip}&limit=${limit}`;
    return this.apiCall(url);
  }

  // Get single product by ID (for detail page)
  async getProductById(id) {
    const url = `${API_CONFIG.ENDPOINTS.PRODUCT_DETAIL}/${id}`;
    return this.apiCall(url);
  }

  // Search products (bonus feature for later)
  async searchProducts(query, skip = 0, limit = 20) {
    const url = `${API_CONFIG.ENDPOINTS.PRODUCTS}/search?q=${encodeURIComponent(
      query
    )}&skip=${skip}&limit=${limit}`;
    return this.apiCall(url);
  }
}

// Export singleton instance
export const productService = new ProductService();
export default productService;
