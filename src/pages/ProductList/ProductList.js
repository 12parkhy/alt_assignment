import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../../components/product/ProductCard";
import LoadingSpinner, {
  ProductCardSkeleton,
} from "../../components/common/LoadingSpinner";
import productService from "../../services/productService";
import { LOADING_STATES } from "../../utils/constants";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import "./ProductList.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(LOADING_STATES.IDLE);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [skip, setSkip] = useState(0);
  const navigate = useNavigate();
  const isLoadingRef = useRef(false);

  const limit = 20;

  const loadMoreProducts = useCallback(async () => {
    if (isLoadingRef.current || !hasMore) {
      console.log("Skip loading:", {
        isLoading: isLoadingRef.current,
        hasMore,
      });
      return;
    }

    try {
      isLoadingRef.current = true;
      setLoading(LOADING_STATES.LOADING);

      const nextSkip = skip + limit;
      console.log("Loading products:", { skip: nextSkip, limit });

      const response = await productService.getProducts(nextSkip, limit);
      console.log("API Response:", {
        productsLength: response.products.length,
        total: response.total,
        skip: response.skip,
      });

      setProducts((prev) => {
        const newProducts = [...prev, ...response.products];
        console.log("Total products after update:", newProducts.length);
        return newProducts;
      });

      const newHasMore = nextSkip + limit < response.total;
      console.log("Has more products:", newHasMore);
      setHasMore(newHasMore);
      setSkip(nextSkip);
      setLoading(LOADING_STATES.SUCCESS);
    } catch (err) {
      console.error("Error loading products:", err);
      setError(err.message);
      setLoading(LOADING_STATES.ERROR);
    } finally {
      isLoadingRef.current = false;
    }
  }, [skip, limit, hasMore]);

  const [isFetching] = useInfiniteScroll(
    loadMoreProducts,
    hasMore,
    isLoadingRef.current
  );

  const loadInitialProducts = async () => {
    try {
      setLoading(LOADING_STATES.LOADING);
      const response = await productService.getProducts(0, limit);

      console.log("Initial load:", {
        productsLength: response.products.length,
        total: response.total,
      });

      setProducts(response.products);
      setHasMore(limit < response.total);
      setSkip(0);
      setLoading(LOADING_STATES.SUCCESS);
    } catch (err) {
      setError(err.message);
      setLoading(LOADING_STATES.ERROR);
    }
  };

  useEffect(() => {
    loadInitialProducts();
  }, []);

  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`);
  };

  if (loading === LOADING_STATES.LOADING && products.length === 0) {
    return (
      <div className="page-loading">
        <LoadingSpinner size="large" text="Loading products..." />
      </div>
    );
  }

  if (error && products.length === 0) {
    return (
      <div className="error-container">
        <h2>Oops! Something went wrong</h2>
        <p>{error}</p>
        <button onClick={loadInitialProducts} className="retry-button">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="product-list-container">
      <div className="product-list-header">
        <h1>Our Products</h1>
        <p>Discover amazing products at great prices</p>
      </div>

      <div className="product-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            variant="list"
            onClick={handleProductClick}
          />
        ))}

        {/* Loading skeleton cards while loading more */}
        {isLoadingRef.current && (
          <>
            {Array.from({ length: 4 }).map((_, index) => (
              <ProductCardSkeleton key={`skeleton-${index}`} />
            ))}
          </>
        )}
      </div>

      {/* Infinite scroll loading indicator */}
      {isLoadingRef.current && products.length > 0 && (
        <div className="infinite-scroll-loading">
          <LoadingSpinner text="Loading more products..." />
        </div>
      )}

      {/* End of products message */}
      {!hasMore && products.length > 0 && (
        <div className="end-message">
          <p>You've seen all {products.length} products! 🎉</p>
        </div>
      )}

      {/* Manual load more button for debugging */}
      {hasMore && !isLoadingRef.current && (
        <div className="load-more-container">
          <button onClick={loadMoreProducts} className="load-more-button">
            Load More (Debug)
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductList;
