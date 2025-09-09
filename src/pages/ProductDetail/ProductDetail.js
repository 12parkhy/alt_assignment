import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductCard from "../../components/product/ProductCard";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import productService from "../../services/productService";
import { LOADING_STATES } from "../../utils/constants";
import "./ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(LOADING_STATES.IDLE);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(LOADING_STATES.LOADING);
        const productData = await productService.getProductById(id);
        setProduct(productData);
        setLoading(LOADING_STATES.SUCCESS);
      } catch (err) {
        setError(err.message);
        setLoading(LOADING_STATES.ERROR);
      }
    };

    if (id) {
      loadProduct();
    }
  }, [id]);

  if (loading === LOADING_STATES.LOADING) {
    return (
      <div className="page-loading">
        <LoadingSpinner size="large" text="Loading product details..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Product Not Found</h2>
        <p>{error}</p>
        <button onClick={() => navigate("/")} className="back-button">
          ← Back to Products
        </button>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <div className="product-detail-container">
      <button onClick={() => navigate("/")} className="back-button">
        ← Back to Products
      </button>

      <ProductCard product={product} variant="detail" />

      {/* Additional product images */}
      {product.images && product.images.length > 1 && (
        <div className="product-gallery">
          <h3>More Images</h3>
          <div className="gallery-grid">
            {product.images.slice(1).map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${product.title} ${index + 2}`}
                className="gallery-image"
                loading="lazy"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
