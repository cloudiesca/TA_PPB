// // src/pages/CartPage.jsx
// import { useState } from "react";
// import {
//   ShoppingBag,
//   Trash2,
//   Plus,
//   Minus,
//   ArrowLeft,
//   ShoppingCart,
// } from "lucide-react";
// import { useCart } from "../hooks/useCart";

// const CartPage = ({ onBack, onCheckout }) => {
//   const { cart, total, itemCount, updateQuantity, removeItem } = useCart();
//   const [imageErrors, setImageErrors] = useState({});

//   const formatPrice = (price) => {
//     return new Intl.NumberFormat("id-ID", {
//       style: "currency",
//       currency: "IDR",
//       minimumFractionDigits: 0,
//     }).format(price);
//   };

//   const handleQuantityChange = (item, newQuantity) => {
//     if (newQuantity < 1) return;
//     if (newQuantity > item.stock) {
//       alert(`Stok maksimal: ${item.stock}`);
//       return;
//     }
//     updateQuantity(item.id, item.size, item.color, newQuantity);
//   };

//   const handleRemoveItem = (item) => {
//     if (window.confirm(`Hapus ${item.name} dari keranjang?`)) {
//       removeItem(item.id, item.size, item.color);
//     }
//   };

//   const getImageUrl = (item) => {
//     const itemKey = `${item.id}-${item.size}-${item.color}`;
//     if (imageErrors[itemKey]) {
//       return "https://via.placeholder.com/120?text=No+Image";
//     }
//     return (
//       item.image_url ||
//       item.image ||
//       "https://via.placeholder.com/120?text=No+Image"
//     );
//   };

//   const handleImageError = (item) => {
//     const itemKey = `${item.id}-${item.size}-${item.color}`;
//     setImageErrors((prev) => ({ ...prev, [itemKey]: true }));
//   };

//   const shippingCost = total >= 500000 ? 0 : 50000;
//   const finalTotal = total + shippingCost;

//   if (cart.length === 0) {
//     return (
//       <div style={styles.emptyContainer}>
//         <div style={styles.emptyContent}>
//           <div style={styles.emptyIconWrapper}>
//             <ShoppingBag style={styles.emptyIcon} />
//           </div>
//           <h2 style={styles.emptyTitle}>Keranjang Kosong</h2>
//           <p style={styles.emptyText}>
//             Belum ada produk di keranjang. Mulai berbelanja sekarang!
//           </p>
//           <button onClick={onBack} style={styles.emptyButton}>
//             <ShoppingCart style={styles.buttonIcon} />
//             Mulai Belanja
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div style={styles.container}>
//       {/* Header - Fixed */}
//       <div style={styles.header}>
//         <div style={styles.headerContent}>
//           <div style={styles.headerInner}>
//             <button onClick={onBack} style={styles.backButton}>
//               <ArrowLeft style={styles.backIcon} />
//               <span style={styles.backText}>Lanjut Belanja</span>
//             </button>
//             <h1 style={styles.headerTitle}>Keranjang ({itemCount})</h1>
//             <div style={styles.headerSpacer}></div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content with Padding */}
//       <div style={styles.mainContent}>
//         <div style={styles.gridLayout}>
//           {/* Cart Items */}
//           <div style={styles.cartItemsColumn}>
//             {cart.map((item) => {
//               const itemPrice = Number(item.price) || 0;
//               const itemQuantity = Number(item.quantity) || 1;

//               return (
//                 <div
//                   key={`${item.id}-${item.size}-${item.color}`}
//                   style={styles.cartItem}
//                 >
//                   <div style={styles.cartItemInner}>
//                     {/* Product Image */}
//                     <div style={styles.imageWrapper}>
//                       <img
//                         src={getImageUrl(item)}
//                         alt={item.name}
//                         style={styles.productImage}
//                         onError={() => handleImageError(item)}
//                       />
//                     </div>

//                     {/* Product Info */}
//                     <div style={styles.productInfo}>
//                       <div style={styles.productHeader}>
//                         <div style={styles.productDetails}>
//                           <h3 style={styles.productName}>{item.name}</h3>
//                           <p style={styles.productBrand}>
//                             {item.brand || "Brand"}
//                           </p>
//                         </div>
//                         <button
//                           onClick={() => handleRemoveItem(item)}
//                           style={styles.removeButton}
//                         >
//                           <Trash2 style={styles.removeIcon} />
//                         </button>
//                       </div>

//                       {/* Size & Color */}
//                       {(item.size || item.color) && (
//                         <div style={styles.attributesWrapper}>
//                           {item.size && (
//                             <span style={styles.attributeBadge}>
//                               Ukuran: {item.size}
//                             </span>
//                           )}
//                           {item.color && (
//                             <span style={styles.attributeBadge}>
//                               Warna: {item.color}
//                             </span>
//                           )}
//                         </div>
//                       )}

//                       {/* Price & Quantity */}
//                       <div style={styles.priceQuantityRow}>
//                         <div style={styles.itemPrice}>
//                           {formatPrice(itemPrice * itemQuantity)}
//                         </div>

//                         <div style={styles.quantityControl}>
//                           <button
//                             onClick={() => handleQuantityChange(item, itemQuantity + 1)}
//                             disabled={item.stock > 0 && itemQuantity >= item.stock}
//                             style={{
//                               ...styles.quantityButton,
//                               opacity: (item.stock > 0 && itemQuantity >= item.stock) ? 0.5 : 1,
//                               cursor: (item.stock > 0 && itemQuantity >= item.stock) ? "not-allowed" : "pointer",
//                             }}
//                           >
//                             <Minus style={styles.quantityIcon} />
//                           </button>
//                           <span style={styles.quantityValue}>
//                             {itemQuantity}
//                           </span>
//                           <button
//                             onClick={() =>
//                               handleQuantityChange(item, itemQuantity + 1)
//                             }
//                             disabled={itemQuantity >= item.stock}
//                             style={{
//                               ...styles.quantityButton,
//                               opacity: itemQuantity >= item.stock ? 0.5 : 1,
//                               cursor:
//                                 itemQuantity >= item.stock
//                                   ? "not-allowed"
//                                   : "pointer",
//                             }}
//                           >
//                             <Plus style={styles.quantityIcon} />
//                           </button>
//                         </div>
//                       </div>

//                       {item.stock > 0 && itemQuantity >= item.stock && (
//                         <p style={styles.stockWarning}>
//                           Stok maksimal tercapai
//                         </p>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>

//           {/* Order Summary */}
//           <div style={styles.summaryColumn}>
//             <div style={styles.summaryCard}>
//               <h2 style={styles.summaryTitle}>Ringkasan Pesanan</h2>

//               <div style={styles.summaryDetails}>
//                 <div style={styles.summaryRow}>
//                   <span style={styles.summaryLabel}>
//                     Subtotal ({itemCount} item)
//                   </span>
//                   <span style={styles.summaryValue}>{formatPrice(total)}</span>
//                 </div>
//                 <div style={styles.summaryRow}>
//                   <span style={styles.summaryLabel}>Ongkir</span>
//                   <span style={styles.summaryValue}>
//                     {shippingCost === 0 ? (
//                       <span style={styles.freeShipping}>GRATIS</span>
//                     ) : (
//                       formatPrice(shippingCost)
//                     )}
//                   </span>
//                 </div>
//                 {total < 500000 && total > 0 && (
//                   <p style={styles.shippingPromo}>
//                     Belanja {formatPrice(500000 - total)} lagi untuk gratis
//                     ongkir!
//                   </p>
//                 )}
//               </div>

//               <div style={styles.totalRow}>
//                 <span style={styles.totalLabel}>Total</span>
//                 <span style={styles.totalValue}>{formatPrice(finalTotal)}</span>
//               </div>

//               <button
//                 onClick={onCheckout}
//                 disabled={total === 0}
//                 style={{
//                   ...styles.checkoutButton,
//                   opacity: total === 0 ? 0.5 : 1,
//                   cursor: total === 0 ? "not-allowed" : "pointer",
//                 }}
//               >
//                 <ShoppingCart style={styles.buttonIcon} />
//                 Checkout
//               </button>

//               <p style={styles.securityNote}>
//                 Belanja aman dengan enkripsi SSL
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ============================================
// // STYLES - Semua styling dipisahkan di bawah
// // ============================================

// const styles = {
//   // Container
//   container: {
//     minHeight: "100vh",
//     backgroundColor: "#f9fafb",
//   },

//   // Empty State
//   emptyContainer: {
//     minHeight: "100vh",
//     backgroundColor: "#f9fafb",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: "1rem",
//     paddingTop: "8rem",
//     paddingBottom: "8rem",
//   },
//   emptyContent: {
//     textAlign: "center",
//   },
//   emptyIconWrapper: {
//     width: "8rem",
//     height: "8rem",
//     backgroundColor: "#f3f4f6",
//     borderRadius: "50%",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     margin: "0 auto 1.5rem",
//   },
//   emptyIcon: {
//     width: "4rem",
//     height: "4rem",
//     color: "#9ca3af",
//   },
//   emptyTitle: {
//     fontSize: "1.875rem",
//     fontWeight: "700",
//     color: "#111827",
//     marginBottom: "0.75rem",
//     margin: "0 0 0.75rem 0",
//   },
//   emptyText: {
//     color: "#4b5563",
//     marginBottom: "2rem",
//     maxWidth: "448px",
//     margin: "0 auto 2rem",
//   },
//   emptyButton: {
//     padding: "1rem 2rem",
//     backgroundColor: "#4f46e5",
//     color: "white",
//     borderRadius: "0.75rem",
//     fontWeight: "600",
//     border: "none",
//     cursor: "pointer",
//     boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
//     display: "inline-flex",
//     alignItems: "center",
//     gap: "0.5rem",
//     transition: "all 0.3s",
//   },

//   // Header
//   header: {
//     backgroundColor: "white",
//     borderBottom: "1px solid #e5e7eb",
//     position: "fixed",
//     top: 0,
//     left: 0,
//     right: 0,
//     zIndex: 50,
//   },
//   headerContent: {
//     maxWidth: "1280px",
//     margin: "0 auto",
//     padding: "1.25rem 1rem",
//   },
//   headerInner: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "space-between",
//   },
//   backButton: {
//     display: "flex",
//     alignItems: "center",
//     gap: "0.5rem",
//     color: "#4b5563",
//     backgroundColor: "transparent",
//     border: "none",
//     cursor: "pointer",
//     fontWeight: "500",
//     transition: "color 0.3s",
//   },
//   backIcon: {
//     width: "1.25rem",
//     height: "1.25rem",
//   },
//   backText: {
//     display: "none",
//   },
//   headerTitle: {
//     fontSize: "1.5rem",
//     fontWeight: "700",
//     color: "#111827",
//     margin: 0,
//   },
//   headerSpacer: {
//     width: "6rem",
//   },

//   // Main Content
//   mainContent: {
//     maxWidth: "1280px",
//     margin: "0 auto",
//     padding: "1rem",
//     paddingTop: "11rem", // 176px for fixed header
//     paddingBottom: "2rem",
//   },
//   gridLayout: {
//     display: "grid",
//     gridTemplateColumns: "1fr",
//     gap: "2rem",
//   },

//   // Cart Items Column
//   cartItemsColumn: {
//     display: "flex",
//     flexDirection: "column",
//     gap: "1rem",
//   },

//   // Cart Item Card
//   cartItem: {
//     backgroundColor: "white",
//     borderRadius: "0.75rem",
//     padding: "1.5rem",
//     boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
//     transition: "box-shadow 0.3s",
//   },
//   cartItemInner: {
//     display: "flex",
//     gap: "1rem",
//   },

//   // Product Image
//   imageWrapper: {
//     flexShrink: 0,
//   },
//   productImage: {
//     width: "6rem",
//     height: "6rem",
//     objectFit: "cover",
//     borderRadius: "0.5rem",
//     backgroundColor: "#f3f4f6",
//   },

//   // Product Info
//   productInfo: {
//     flex: 1,
//     minWidth: 0,
//     display: "flex",
//     flexDirection: "column",
//     gap: "0.75rem",
//   },
//   productHeader: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "flex-start",
//     gap: "0.5rem",
//   },
//   productDetails: {
//     flex: 1,
//     minWidth: 0,
//   },
//   productName: {
//     fontWeight: "700",
//     color: "#111827",
//     fontSize: "1rem",
//     margin: "0 0 0.25rem 0",
//   },
//   productBrand: {
//     fontSize: "0.875rem",
//     color: "#4b5563",
//     margin: 0,
//   },

//   // Remove Button
//   removeButton: {
//     color: "#ef4444",
//     backgroundColor: "transparent",
//     border: "none",
//     cursor: "pointer",
//     padding: "0.5rem",
//     borderRadius: "0.5rem",
//     transition: "background-color 0.3s",
//     flexShrink: 0,
//   },
//   removeIcon: {
//     width: "1.25rem",
//     height: "1.25rem",
//   },

//   // Attributes
//   attributesWrapper: {
//     display: "flex",
//     flexWrap: "wrap",
//     gap: "0.5rem",
//   },
//   attributeBadge: {
//     fontSize: "0.75rem",
//     padding: "0.25rem 0.5rem",
//     backgroundColor: "#f3f4f6",
//     color: "#374151",
//     borderRadius: "0.25rem",
//   },

//   // Price & Quantity
//   priceQuantityRow: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "space-between",
//     marginTop: "0.5rem",
//   },
//   itemPrice: {
//     fontSize: "1.25rem",
//     fontWeight: "700",
//     color: "#4f46e5",
//   },
//   quantityControl: {
//     display: "flex",
//     alignItems: "center",
//     gap: "0.75rem",
//     backgroundColor: "#f9fafb",
//     borderRadius: "0.5rem",
//     padding: "0.25rem",
//   },
//   quantityButton: {
//     width: "2rem",
//     height: "2rem",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     borderRadius: "0.375rem",
//     backgroundColor: "transparent",
//     border: "none",
//     cursor: "pointer",
//     transition: "background-color 0.3s",
//   },
//   quantityIcon: {
//     width: "1rem",
//     height: "1rem",
//   },
//   quantityValue: {
//     fontWeight: "600",
//     color: "#111827",
//     minWidth: "2rem",
//     textAlign: "center",
//   },
//   stockWarning: {
//     fontSize: "0.75rem",
//     color: "#ea580c",
//     margin: "0.5rem 0 0 0",
//   },

//   // Summary Column
//   summaryColumn: {
//     gridColumn: "1",
//   },
//   summaryCard: {
//     backgroundColor: "white",
//     borderRadius: "0.75rem",
//     padding: "1.5rem",
//     boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
//   },
//   summaryTitle: {
//     fontSize: "1.25rem",
//     fontWeight: "700",
//     color: "#111827",
//     marginBottom: "1.5rem",
//     margin: "0 0 1.5rem 0",
//   },

//   // Summary Details
//   summaryDetails: {
//     display: "flex",
//     flexDirection: "column",
//     gap: "1rem",
//     marginBottom: "1.5rem",
//     paddingBottom: "1.5rem",
//     borderBottom: "1px solid #e5e7eb",
//   },
//   summaryRow: {
//     display: "flex",
//     justifyContent: "space-between",
//     color: "#4b5563",
//   },
//   summaryLabel: {
//     fontSize: "0.875rem",
//   },
//   summaryValue: {
//     fontWeight: "600",
//     fontSize: "0.875rem",
//   },
//   freeShipping: {
//     color: "#16a34a",
//     fontWeight: "700",
//   },
//   shippingPromo: {
//     fontSize: "0.75rem",
//     color: "#ea580c",
//     margin: 0,
//   },

//   // Total
//   totalRow: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: "1.5rem",
//   },
//   totalLabel: {
//     fontSize: "1.125rem",
//     fontWeight: "700",
//     color: "#111827",
//   },
//   totalValue: {
//     fontSize: "1.5rem",
//     fontWeight: "700",
//     color: "#4f46e5",
//   },

//   // Checkout Button
//   checkoutButton: {
//     width: "100%",
//     padding: "1rem",
//     backgroundColor: "#4f46e5",
//     color: "white",
//     borderRadius: "0.75rem",
//     fontWeight: "600",
//     border: "none",
//     cursor: "pointer",
//     boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     gap: "0.5rem",
//     transition: "all 0.3s",
//   },
//   buttonIcon: {
//     width: "1.25rem",
//     height: "1.25rem",
//   },

//   // Security Note
//   securityNote: {
//     fontSize: "0.75rem",
//     color: "#6b7280",
//     textAlign: "center",
//     marginTop: "1rem",
//     margin: "1rem 0 0 0",
//   },
// };

// // Inject CSS untuk responsive dan hover effects
// const styleSheet = document.createElement("style");
// styleSheet.textContent = `
//   /* Hover effects */
//   button:hover:not(:disabled) {
//     opacity: 0.9;
//   }

//   /* Responsive untuk desktop */
//   @media (min-width: 1024px) {
//     /* Grid layout untuk desktop */
//   }

//   /* Show back button text on larger screens */
//   @media (min-width: 640px) {
//     /* Tampilkan text pada backButton */
//   }
// `;
// document.head.appendChild(styleSheet);

// export default CartPage;

// src/pages/CartPage.jsx - COMPLETE FIX
import { useState, useMemo } from "react";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  ShoppingCart,
} from "lucide-react";
import { useCart } from "../hooks/useCart";

const CartPage = ({ onBack, onCheckout }) => {
  const { cart, itemCount, updateQuantity, removeItem } = useCart();
  const [imageErrors, setImageErrors] = useState({});

  // CRITICAL FIX: Calculate total directly from cart items
  const calculatedTotal = useMemo(() => {
    const total = cart.reduce((sum, item) => {
      const price = parseFloat(item.price) || 0;
      const quantity = parseInt(item.quantity) || 0;
      return sum + (price * quantity);
    }, 0);

    console.log('💰 Cart Total Recalculated:', total);
    return total;
  }, [cart]);

  const formatPrice = (price) => {
    const numPrice = parseFloat(price) || 0;
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(numPrice);
  };

  const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity < 1) return;

    const maxStock = parseInt(item.stock) || 999;
    if (newQuantity > maxStock) {
      alert(`Stok maksimal: ${maxStock}`);
      return;
    }

    updateQuantity(item.id, item.size, item.color, newQuantity);
  };

  const handleRemoveItem = (item) => {
    if (window.confirm(`Hapus ${item.name} dari keranjang?`)) {
      removeItem(item.id, item.size, item.color);
    }
  };

  const getImageUrl = (item) => {
    const itemKey = `${item.id}-${item.size}-${item.color}`;
    if (imageErrors[itemKey]) {
      return "https://via.placeholder.com/120?text=No+Image";
    }
    return (
      item.image_url ||
      item.image ||
      "https://via.placeholder.com/120?text=No+Image"
    );
  };

  const handleImageError = (item) => {
    const itemKey = `${item.id}-${item.size}-${item.color}`;
    setImageErrors((prev) => ({ ...prev, [itemKey]: true }));
  };

  const shippingCost = calculatedTotal >= 500000 ? 0 : 50000;
  const finalTotal = calculatedTotal + shippingCost;

  if (cart.length === 0) {
    return (
      <div style={styles.emptyContainer}>
        <div style={styles.emptyContent}>
          <div style={styles.emptyIconWrapper}>
            <ShoppingBag style={styles.emptyIcon} />
          </div>
          <h2 style={styles.emptyTitle}>Keranjang Kosong</h2>
          <p style={styles.emptyText}>
            Belum ada produk di keranjang. Mulai berbelanja sekarang!
          </p>
          <button onClick={onBack} style={styles.emptyButton}>
            <ShoppingCart style={styles.buttonIcon} />
            Mulai Belanja
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Header - Fixed */}
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.headerInner}>
            <button onClick={onBack} style={styles.backButton}>
              <ArrowLeft style={styles.backIcon} />
              <span style={styles.backText}>Lanjut Belanja</span>
            </button>
            <h1 style={styles.headerTitle}>Keranjang ({itemCount})</h1>
            <div style={styles.headerSpacer}></div>
          </div>
        </div>
      </div>

      {/* Main Content with Padding */}
      <div style={styles.mainContent}>
        <div style={styles.gridLayout}>
          {/* Cart Items */}
          <div style={styles.cartItemsColumn}>
            {cart.map((item) => {
              const itemPrice = parseFloat(item.price) || 0;
              const itemQuantity = parseInt(item.quantity) || 1;
              const itemTotal = itemPrice * itemQuantity;
              const maxStock = parseInt(item.stock) || 999;

              return (
                <div
                  key={`${item.id}-${item.size}-${item.color}`}
                  style={styles.cartItem}
                >
                  <div style={styles.cartItemInner}>
                    {/* Product Image */}
                    <div style={styles.imageWrapper}>
                      <img
                        src={getImageUrl(item)}
                        alt={item.name}
                        style={styles.productImage}
                        onError={() => handleImageError(item)}
                      />
                    </div>

                    {/* Product Info */}
                    <div style={styles.productInfo}>
                      <div style={styles.productHeader}>
                        <div style={styles.productDetails}>
                          <h3 style={styles.productName}>{item.name}</h3>
                          <p style={styles.productBrand}>
                            {item.brand || "Brand"}
                          </p>
                        </div>
                        <button
                          onClick={() => handleRemoveItem(item)}
                          style={styles.removeButton}
                        >
                          <Trash2 style={styles.removeIcon} />
                        </button>
                      </div>

                      {/* Size & Color */}
                      {(item.size || item.color) && (
                        <div style={styles.attributesWrapper}>
                          {item.size && (
                            <span style={styles.attributeBadge}>
                              Ukuran: {item.size}
                            </span>
                          )}
                          {item.color && (
                            <span style={styles.attributeBadge}>
                              Warna: {item.color}
                            </span>
                          )}
                        </div>
                      )}

                      {/* Price & Quantity */}
                      <div style={styles.priceQuantityRow}>
                        <div style={styles.itemPrice}>
                          {formatPrice(itemTotal)}
                        </div>

                        <div style={styles.quantityControl}>
                          <button
                            onClick={() =>
                              handleQuantityChange(item, itemQuantity - 1)
                            }
                            disabled={itemQuantity <= 1}
                            style={{
                              ...styles.quantityButton,
                              opacity: itemQuantity <= 1 ? 0.5 : 1,
                              cursor:
                                itemQuantity <= 1 ? "not-allowed" : "pointer",
                            }}
                          >
                            <Minus style={styles.quantityIcon} />
                          </button>
                          <span style={styles.quantityValue}>
                            {itemQuantity}
                          </span>
                          <button
                            onClick={() =>
                              handleQuantityChange(item, itemQuantity + 1)
                            }
                            disabled={maxStock > 0 && itemQuantity >= maxStock}
                            style={{
                              ...styles.quantityButton,
                              opacity: (maxStock > 0 && itemQuantity >= maxStock) ? 0.5 : 1,
                              cursor:
                                (maxStock > 0 && itemQuantity >= maxStock)
                                  ? "not-allowed"
                                  : "pointer",
                            }}
                          >
                            <Plus style={styles.quantityIcon} />
                          </button>
                        </div>
                      </div>

                      {maxStock > 0 && itemQuantity >= maxStock && (
                        <p style={styles.stockWarning}>
                          Stok maksimal tercapai
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order Summary */}
          <div style={styles.summaryColumn}>
            <div style={styles.summaryCard}>
              <h2 style={styles.summaryTitle}>Ringkasan Pesanan</h2>

              <div style={styles.summaryDetails}>
                <div style={styles.summaryRow}>
                  <span style={styles.summaryLabel}>
                    Subtotal ({itemCount} item)
                  </span>
                  <span style={styles.summaryValue}>{formatPrice(calculatedTotal)}</span>
                </div>
                <div style={styles.summaryRow}>
                  <span style={styles.summaryLabel}>Ongkir</span>
                  <span style={styles.summaryValue}>
                    {shippingCost === 0 ? (
                      <span style={styles.freeShipping}>GRATIS</span>
                    ) : (
                      formatPrice(shippingCost)
                    )}
                  </span>
                </div>
                {calculatedTotal < 500000 && calculatedTotal > 0 && (
                  <p style={styles.shippingPromo}>
                    Belanja {formatPrice(500000 - calculatedTotal)} lagi untuk gratis
                    ongkir!
                  </p>
                )}
              </div>

              <div style={styles.totalRow}>
                <span style={styles.totalLabel}>Total</span>
                <span style={styles.totalValue}>{formatPrice(finalTotal)}</span>
              </div>

              <button
                onClick={onCheckout}
                disabled={calculatedTotal === 0}
                style={{
                  ...styles.checkoutButton,
                  opacity: calculatedTotal === 0 ? 0.5 : 1,
                  cursor: calculatedTotal === 0 ? "not-allowed" : "pointer",
                }}
              >
                <ShoppingCart style={styles.buttonIcon} />
                Checkout
              </button>

              <p style={styles.securityNote}>
                Belanja aman dengan enkripsi SSL
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================
// STYLES - Semua styling dipisahkan di bawah
// ============================================

const styles = {
  // Container
  container: {
    minHeight: "100vh",
    backgroundColor: "#f9fafb",
  },

  // Empty State
  emptyContainer: {
    minHeight: "100vh",
    backgroundColor: "#f9fafb",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "1rem",
    paddingTop: "8rem",
    paddingBottom: "8rem",
  },
  emptyContent: {
    textAlign: "center",
  },
  emptyIconWrapper: {
    width: "8rem",
    height: "8rem",
    backgroundColor: "#f3f4f6",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 1.5rem",
  },
  emptyIcon: {
    width: "4rem",
    height: "4rem",
    color: "#9ca3af",
  },
  emptyTitle: {
    fontSize: "1.875rem",
    fontWeight: "700",
    color: "#111827",
    marginBottom: "0.75rem",
    margin: "0 0 0.75rem 0",
  },
  emptyText: {
    color: "#4b5563",
    marginBottom: "2rem",
    maxWidth: "448px",
    margin: "0 auto 2rem",
  },
  emptyButton: {
    padding: "1rem 2rem",
    backgroundColor: "#4f46e5",
    color: "white",
    borderRadius: "0.75rem",
    fontWeight: "600",
    border: "none",
    cursor: "pointer",
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    transition: "all 0.3s",
  },

  // Header
  header: {
    backgroundColor: "white",
    borderBottom: "1px solid #e5e7eb",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
  },
  headerContent: {
    maxWidth: "1280px",
    margin: "0 auto",
    padding: "1.25rem 1rem",
  },
  headerInner: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backButton: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    color: "#4b5563",
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    fontWeight: "500",
    transition: "color 0.3s",
  },
  backIcon: {
    width: "1.25rem",
    height: "1.25rem",
  },
  backText: {
    display: "none",
  },
  headerTitle: {
    fontSize: "1.5rem",
    fontWeight: "700",
    color: "#111827",
    margin: 0,
  },
  headerSpacer: {
    width: "6rem",
  },

  // Main Content
  mainContent: {
    maxWidth: "1280px",
    margin: "0 auto",
    padding: "1rem",
    paddingTop: "6rem",
    paddingBottom: "2rem",
  },
  gridLayout: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "2rem",
  },

  // Cart Items Column
  cartItemsColumn: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },

  // Cart Item Card
  cartItem: {
    backgroundColor: "white",
    borderRadius: "0.75rem",
    padding: "1.5rem",
    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
    transition: "box-shadow 0.3s",
  },
  cartItemInner: {
    display: "flex",
    gap: "1rem",
  },

  // Product Image
  imageWrapper: {
    flexShrink: 0,
  },
  productImage: {
    width: "6rem",
    height: "6rem",
    objectFit: "cover",
    borderRadius: "0.5rem",
    backgroundColor: "#f3f4f6",
  },

  // Product Info
  productInfo: {
    flex: 1,
    minWidth: 0,
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
  },
  productHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "0.5rem",
  },
  productDetails: {
    flex: 1,
    minWidth: 0,
  },
  productName: {
    fontWeight: "700",
    color: "#111827",
    fontSize: "1rem",
    margin: "0 0 0.25rem 0",
  },
  productBrand: {
    fontSize: "0.875rem",
    color: "#4b5563",
    margin: 0,
  },

  // Remove Button
  removeButton: {
    color: "#ef4444",
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    padding: "0.5rem",
    borderRadius: "0.5rem",
    transition: "background-color 0.3s",
    flexShrink: 0,
  },
  removeIcon: {
    width: "1.25rem",
    height: "1.25rem",
  },

  // Attributes
  attributesWrapper: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.5rem",
  },
  attributeBadge: {
    fontSize: "0.75rem",
    padding: "0.25rem 0.5rem",
    backgroundColor: "#f3f4f6",
    color: "#374151",
    borderRadius: "0.25rem",
  },

  // Price & Quantity
  priceQuantityRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "0.5rem",
  },
  itemPrice: {
    fontSize: "1.25rem",
    fontWeight: "700",
    color: "#4f46e5",
  },
  quantityControl: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    backgroundColor: "#f9fafb",
    borderRadius: "0.5rem",
    padding: "0.25rem",
  },
  quantityButton: {
    width: "2rem",
    height: "2rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "0.375rem",
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  quantityIcon: {
    width: "1rem",
    height: "1rem",
  },
  quantityValue: {
    fontWeight: "600",
    color: "#111827",
    minWidth: "2rem",
    textAlign: "center",
  },
  stockWarning: {
    fontSize: "0.75rem",
    color: "#ea580c",
    margin: "0.5rem 0 0 0",
  },

  // Summary Column
  summaryColumn: {
    gridColumn: "1",
  },
  summaryCard: {
    backgroundColor: "white",
    borderRadius: "0.75rem",
    padding: "1.5rem",
    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
  },
  summaryTitle: {
    fontSize: "1.25rem",
    fontWeight: "700",
    color: "#111827",
    marginBottom: "1.5rem",
    margin: "0 0 1.5rem 0",
  },

  // Summary Details
  summaryDetails: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    marginBottom: "1.5rem",
    paddingBottom: "1.5rem",
    borderBottom: "1px solid #e5e7eb",
  },
  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    color: "#4b5563",
  },
  summaryLabel: {
    fontSize: "0.875rem",
  },
  summaryValue: {
    fontWeight: "600",
    fontSize: "0.875rem",
  },
  freeShipping: {
    color: "#16a34a",
    fontWeight: "700",
  },
  shippingPromo: {
    fontSize: "0.75rem",
    color: "#ea580c",
    margin: 0,
  },

  // Total
  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "1.5rem",
  },
  totalLabel: {
    fontSize: "1.125rem",
    fontWeight: "700",
    color: "#111827",
  },
  totalValue: {
    fontSize: "1.5rem",
    fontWeight: "700",
    color: "#4f46e5",
  },

  // Checkout Button
  checkoutButton: {
    width: "100%",
    padding: "1rem",
    backgroundColor: "#4f46e5",
    color: "white",
    borderRadius: "0.75rem",
    fontWeight: "600",
    border: "none",
    cursor: "pointer",
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    transition: "all 0.3s",
  },
  buttonIcon: {
    width: "1.25rem",
    height: "1.25rem",
  },

  // Security Note
  securityNote: {
    fontSize: "0.75rem",
    color: "#6b7280",
    textAlign: "center",
    marginTop: "1rem",
    margin: "1rem 0 0 0",
  },
};

export default CartPage;