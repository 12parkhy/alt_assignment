import React from "react";
import "./LoadingSpinner.css";

const LoadingSpinner = ({
  size = "medium",
  text = "Loading...",
  variant = "spinner", // 'spinner', 'text', 'skeleton'
}) => {
  if (variant === "text") {
    return (
      <div className="loading-text-container">
        <div className="loading-text">{text}</div>
        <div className="loading-dots">
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </div>
      </div>
    );
  }

  if (variant === "skeleton") {
    return <ProductCardSkeleton />;
  }

  return (
    <div className="loading-spinner-container">
      <div className={`loading-spinner ${size}`}></div>
      {text && <div className="loading-text">{text}</div>}
    </div>
  );
};

// Skeleton loader for product cards
const ProductCardSkeleton = () => (
  <div className="product-skeleton">
    <div className="skeleton-image"></div>
    <div className="skeleton-content">
      <div className="skeleton-title"></div>
      <div className="skeleton-price"></div>
    </div>
  </div>
);

export default LoadingSpinner;
export { ProductCardSkeleton };
