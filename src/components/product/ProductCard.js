import React from "react";
import "./ProductCard.css";

const ProductCard = ({
  product,
  onClick,
  variant = "list", // 'list' or 'detail'
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick(product);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const renderTags = (tags) => {
    if (!tags || tags.length === 0) return null;

    return (
      <div className="product-tags">
        {tags.map((tag, index) => (
          <span key={index} className="product-tag">
            {tag}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div
      className={`product-card ${variant} ${onClick ? "clickable" : ""}`}
      onClick={handleClick}
    >
      <div className="product-image-container">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="product-image"
          loading="lazy"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/300x300?text=No+Image";
          }}
        />
      </div>

      <div className="product-info">
        <h3 className="product-title">{product.title}</h3>

        <div className="product-price-container">
          <span className="product-price">{formatPrice(product.price)}</span>
          {product.discountPercentage > 0 && (
            <span className="product-discount">
              -{product.discountPercentage.toFixed(1)}%
            </span>
          )}
        </div>

        {/* Tags only show in detail variant */}
        {variant === "detail" && renderTags(product.tags)}

        {/* Additional info for detail variant */}
        {variant === "detail" && (
          <div className="product-details">
            {product.description && (
              <p className="product-description">{product.description}</p>
            )}
            {product.rating && (
              <div className="product-rating">
                <span className="rating-stars">
                  {"★".repeat(Math.round(product.rating))}
                </span>
                <span className="rating-value">({product.rating})</span>
              </div>
            )}
            {product.stock && (
              <div className="product-stock">
                <span
                  className={`stock-status ${
                    product.stock < 10 ? "low" : "available"
                  }`}
                >
                  {product.stock < 10 ? "Low Stock" : "In Stock"} (
                  {product.stock})
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
