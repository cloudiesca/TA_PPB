// src/components/product/ProductCard.jsx
import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useCart } from "../../hooks/useCart";

const ProductCard = ({ product, onClick }) => {
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { addItem } = useCart();

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (product.stock === 0) return;

    setIsAddingToCart(true);
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image_url,
      brand: product.brands?.name || "Brand",
    });

    setTimeout(() => {
      setIsAddingToCart(false);
    }, 1000);
  };

  // Determine button style
  const getButtonStyle = () => {
    if (product.stock === 0) {
      return styles.buttonDisabled;
    }
    if (isAddingToCart) {
      return styles.buttonAdding;
    }
    return styles.button;
  };

  return (
    <div
      onClick={() => onClick(product.id)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        ...styles.card,
        ...(isHovered ? styles.cardHover : {}),
      }}
    >
      {/* Image */}
      <div style={styles.imageContainer}>
        <img
          src={
            product.image_url ||
            "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600"
          }
          alt={product.name}
          style={{
            ...styles.image,
            ...(isHovered ? styles.imageHover : {}),
          }}
          onError={(e) => {
            e.target.src =
              "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600";
          }}
        />

        {/* Stock Badge */}
        {product.stock < 10 && product.stock > 0 && (
          <div style={styles.stockBadge}>Stok: {product.stock}</div>
        )}

        {product.stock === 0 && <div style={styles.outOfStockBadge}>Habis</div>}
      </div>

      {/* Info */}
      <div style={styles.infoContainer}>
        {/* Brand */}
        <p style={styles.brand}>{product.brands?.name || "BRAND"}</p>

        {/* Name */}
        <h3 style={styles.productName}>{product.name}</h3>

        {/* Category */}
        <p style={styles.category}>{product.categories?.name || "Kategori"}</p>

        {/* Price */}
        <p style={styles.price}>{formatPrice(product.price)}</p>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0 || isAddingToCart}
          style={getButtonStyle()}
        >
          {isAddingToCart ? (
            <>
              <span style={styles.spinner} />
              <span>Ditambahkan!</span>
            </>
          ) : (
            <>
              <ShoppingCart style={styles.buttonIcon} />
              <span>
                {product.stock === 0 ? "Stok Habis" : "Tambah ke Keranjang"}
              </span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

// ============================================
// STYLES - Semua styling dipisahkan di bawah
// ============================================

const styles = {
  // Card Container
  card: {
    backgroundColor: "white",
    borderRadius: "1rem",
    overflow: "hidden",
    cursor: "pointer",
    border: "2px solid #e2e8f0",
    transition: "all 0.3s ease",
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  cardHover: {
    boxShadow:
      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    borderColor: "#7dd3fc",
    transform: "translateY(-4px)",
  },

  // Image Container
  imageContainer: {
    position: "relative",
    width: "100%",
    paddingBottom: "100%", // 1:1 Aspect Ratio
    backgroundColor: "#f1f5f9",
    overflow: "hidden",
  },
  image: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.5s ease",
  },
  imageHover: {
    transform: "scale(1.05)",
  },

  // Stock Badges
  stockBadge: {
    position: "absolute",
    top: "1rem",
    left: "1rem",
    backgroundColor: "#f59e0b",
    color: "white",
    fontSize: "0.75rem",
    fontWeight: "700",
    padding: "0.5rem 1rem",
    borderRadius: "9999px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    zIndex: 10,
  },
  outOfStockBadge: {
    position: "absolute",
    top: "1rem",
    left: "1rem",
    backgroundColor: "#ef4444",
    color: "white",
    fontSize: "0.75rem",
    fontWeight: "700",
    padding: "0.5rem 1rem",
    borderRadius: "9999px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    zIndex: 10,
  },

  // Info Container
  infoContainer: {
    padding: "1.25rem",
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
  },

  // Brand
  brand: {
    fontSize: "0.75rem",
    fontWeight: "700",
    color: "#0284c7",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    marginBottom: "0.5rem",
    margin: "0 0 0.5rem 0",
  },

  // Product Name
  productName: {
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: "0.75rem",
    fontSize: "1rem",
    lineHeight: "1.4",
    minHeight: "2.8rem",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
    margin: "0 0 0.75rem 0",
  },

  // Category
  category: {
    fontSize: "0.875rem",
    color: "#64748b",
    marginBottom: "0.75rem",
    margin: "0 0 0.75rem 0",
  },

  // Price
  price: {
    fontSize: "1.5rem",
    fontWeight: "900",
    color: "#0f172a",
    marginBottom: "1rem",
    margin: "0 0 1rem 0",
  },

  // Buttons
  button: {
    width: "100%",
    padding: "0.875rem 1rem",
    borderRadius: "0.75rem",
    fontWeight: "700",
    fontSize: "0.875rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    transition: "all 0.3s ease",
    backgroundColor: "#0284c7",
    color: "white",
    border: "none",
    cursor: "pointer",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    marginTop: "auto",
  },
  buttonDisabled: {
    width: "100%",
    padding: "0.875rem 1rem",
    borderRadius: "0.75rem",
    fontWeight: "700",
    fontSize: "0.875rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    backgroundColor: "#e2e8f0",
    color: "#94a3b8",
    border: "none",
    cursor: "not-allowed",
    marginTop: "auto",
  },
  buttonAdding: {
    width: "100%",
    padding: "0.875rem 1rem",
    borderRadius: "0.75rem",
    fontWeight: "700",
    fontSize: "0.875rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    backgroundColor: "#22c55e",
    color: "white",
    border: "none",
    cursor: "default",
    marginTop: "auto",
  },
  buttonIcon: {
    width: "1.25rem",
    height: "1.25rem",
  },

  // Spinner
  spinner: {
    display: "inline-block",
    width: "1.25rem",
    height: "1.25rem",
    border: "2px solid white",
    borderTopColor: "transparent",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
};

// Inject keyframes untuk animasi spinner
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  
  /* Responsive adjustments */
  @media (max-width: 640px) {
    /* Mobile: smaller text and padding */
  }
  
  @media (min-width: 641px) and (max-width: 1024px) {
    /* Tablet: medium adjustments */
  }
  
  @media (min-width: 1025px) {
    /* Desktop: full size */
  }
`;
document.head.appendChild(styleSheet);

export default ProductCard;
