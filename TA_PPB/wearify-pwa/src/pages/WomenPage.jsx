// src/pages/WomenPage.jsx
import { useState, useEffect } from "react";
import { Filter, Search, X, SlidersHorizontal } from "lucide-react";
import ProductCard from "../components/product/ProductCard";
import { productService } from "../services/productService";

const WomenPage = ({ onProductClick }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [productsData, categoriesData, brandsData] = await Promise.all([
        productService.getProductsByGender("women"),
        productService.getCategories(),
        productService.getBrands(),
      ]);

      setProducts(productsData || []);
      setCategories(categoriesData.filter((c) => c.gender === "women") || []);
      setBrands(brandsData || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || product.category_id === selectedCategory;

    const matchesBrand =
      selectedBrand === "all" || product.brand_id === selectedBrand;

    let matchesPrice = true;
    if (priceRange === "under-300k") matchesPrice = product.price < 300000;
    else if (priceRange === "300k-500k")
      matchesPrice = product.price >= 300000 && product.price <= 500000;
    else if (priceRange === "500k-1m")
      matchesPrice = product.price >= 500000 && product.price <= 1000000;
    else if (priceRange === "above-1m") matchesPrice = product.price > 1000000;

    return matchesSearch && matchesCategory && matchesBrand && matchesPrice;
  });

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedBrand("all");
    setPriceRange("all");
  };

  const hasActiveFilters =
    searchQuery ||
    selectedCategory !== "all" ||
    selectedBrand !== "all" ||
    priceRange !== "all";

  return (
    <div style={styles.container}>
      {/* Hero Header */}
      <div style={styles.heroHeader}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>Women's Fashion</h1>
          <p style={styles.heroSubtitle}>
            Temukan gaya elegan dan tren fashion untuk wanita modern.
          </p>
        </div>
      </div>

      <div style={styles.mainContent}>
        {/* Search and Filter Bar */}
        <div style={styles.filterCard}>
          <div style={styles.filterTopBar}>
            {/* Search */}
            <div style={styles.searchContainer}>
              <div style={styles.searchIconWrapper}>
                <Search style={styles.searchIcon} />
              </div>
              <input
                type="text"
                placeholder="Cari produk..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={styles.searchInput}
              />
            </div>

            {/* Filter Toggle Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              style={styles.filterButton}
            >
              <SlidersHorizontal style={styles.buttonIcon} />
              <span>Filter</span>
              {hasActiveFilters && (
                <span style={styles.activeBadge}>Aktif</span>
              )}
            </button>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div style={styles.filtersPanel}>
              <div style={styles.filtersGrid}>
                {/* Category Filter */}
                <div>
                  <label style={styles.filterLabel}>Kategori</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    style={styles.filterSelect}
                  >
                    <option value="all">Semua Kategori</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Brand Filter */}
                <div>
                  <label style={styles.filterLabel}>Brand</label>
                  <select
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                    style={styles.filterSelect}
                  >
                    <option value="all">Semua Brand</option>
                    {brands.map((brand) => (
                      <option key={brand.id} value={brand.id}>
                        {brand.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price Range Filter */}
                <div>
                  <label style={styles.filterLabel}>Harga</label>
                  <select
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    style={styles.filterSelect}
                  >
                    <option value="all">Semua Harga</option>
                    <option value="under-300k">Di bawah Rp 300K</option>
                    <option value="300k-500k">Rp 300K - 500K</option>
                    <option value="500k-1m">Rp 500K - 1M</option>
                    <option value="above-1m">Di atas Rp 1M</option>
                  </select>
                </div>

                {/* Clear Filters */}
                <div style={styles.clearButtonContainer}>
                  <button
                    onClick={clearFilters}
                    disabled={!hasActiveFilters}
                    style={{
                      ...styles.clearButton,
                      opacity: hasActiveFilters ? 1 : 0.5,
                      cursor: hasActiveFilters ? "pointer" : "not-allowed",
                    }}
                  >
                    <X style={styles.clearIcon} />
                    Hapus Semua
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div style={styles.resultsCount}>
          <p style={styles.resultsText}>
            Menampilkan{" "}
            <span style={styles.resultsBold}>{filteredProducts.length}</span>{" "}
            produk
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div style={styles.loadingContainer}>
            <div style={styles.spinner}></div>
            <p style={styles.loadingText}>Memuat produk...</p>
          </div>
        )}

        {/* Products Grid */}
        {!loading && filteredProducts.length > 0 && (
          <div style={styles.productsGrid}>
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={onProductClick}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredProducts.length === 0 && (
          <div style={styles.emptyState}>
            <div style={styles.emptyIconContainer}>
              <Filter style={styles.emptyIcon} />
            </div>
            <h3 style={styles.emptyTitle}>Tidak ada produk ditemukan</h3>
            <p style={styles.emptyText}>
              Coba sesuaikan filter atau pencarian Anda
            </p>
            {hasActiveFilters && (
              <button onClick={clearFilters} style={styles.emptyClearButton}>
                Hapus Semua Filter
              </button>
            )}
          </div>
        )}
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
    paddingBottom: "6rem",
    paddingTop: "5rem",
  },

  // Hero Header
  heroHeader: {
    background: "linear-gradient(90deg, #db2777 0%, #9333ea 100%)",
    color: "white",
    padding: "3rem 0",
  },
  heroContent: {
    maxWidth: "1280px",
    margin: "0 auto",
    padding: "0 1rem",
  },
  heroTitle: {
    fontSize: "2.5rem",
    fontWeight: "700",
    marginBottom: "0.75rem",
    margin: "0 0 0.75rem 0",
  },
  heroSubtitle: {
    fontSize: "1.125rem",
    color: "#fce7f3",
    margin: 0,
  },

  // Main Content
  mainContent: {
    maxWidth: "1280px",
    margin: "0 auto",
    padding: "2rem 1rem",
  },

  // Filter Card
  filterCard: {
    backgroundColor: "white",
    borderRadius: "0.75rem",
    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
    padding: "1rem",
    marginBottom: "1.5rem",
  },
  filterTopBar: {
    display: "flex",
    flexDirection: "row",
    gap: "1rem",
    flexWrap: "wrap",
  },

  // Search
  searchContainer: {
    flex: 1,
    position: "relative",
    minWidth: "250px",
  },
  searchIconWrapper: {
    position: "absolute",
    left: "0.75rem",
    top: "50%",
    transform: "translateY(-50%)",
    pointerEvents: "none",
  },
  searchIcon: {
    width: "1.25rem",
    height: "1.25rem",
    color: "#9ca3af",
  },
  searchInput: {
    width: "100%",
    paddingLeft: "2.5rem",
    paddingRight: "1rem",
    paddingTop: "0.75rem",
    paddingBottom: "0.75rem",
    border: "1px solid #d1d5db",
    borderRadius: "0.5rem",
    fontSize: "1rem",
    transition: "all 0.3s",
    outline: "none",
  },

  // Filter Button
  filterButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    padding: "0.75rem 1.5rem",
    backgroundColor: "#db2777",
    color: "white",
    borderRadius: "0.5rem",
    border: "none",
    cursor: "pointer",
    fontWeight: "500",
    transition: "background-color 0.3s",
    whiteSpace: "nowrap",
    flexShrink: 0,
  },
  buttonIcon: {
    width: "1.25rem",
    height: "1.25rem",
  },
  activeBadge: {
    marginLeft: "0.25rem",
    padding: "0.125rem 0.5rem",
    backgroundColor: "white",
    color: "#db2777",
    fontSize: "0.75rem",
    fontWeight: "700",
    borderRadius: "9999px",
  },

  // Filters Panel
  filtersPanel: {
    marginTop: "1rem",
    paddingTop: "1rem",
    borderTop: "1px solid #e5e7eb",
  },
  filtersGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "1rem",
  },
  filterLabel: {
    display: "block",
    fontSize: "0.875rem",
    fontWeight: "500",
    color: "#374151",
    marginBottom: "0.5rem",
  },
  filterSelect: {
    width: "100%",
    padding: "0.5rem 1rem",
    border: "1px solid #d1d5db",
    borderRadius: "0.5rem",
    fontSize: "0.875rem",
    outline: "none",
    transition: "all 0.3s",
  },

  // Clear Button
  clearButtonContainer: {
    display: "flex",
    alignItems: "flex-end",
  },
  clearButton: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    padding: "0.5rem 1rem",
    border: "1px solid #d1d5db",
    borderRadius: "0.5rem",
    backgroundColor: "white",
    color: "#374151",
    fontSize: "0.875rem",
    transition: "background-color 0.3s",
  },
  clearIcon: {
    width: "1rem",
    height: "1rem",
  },

  // Results Count
  resultsCount: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "1.5rem",
  },
  resultsText: {
    color: "#4b5563",
    margin: 0,
  },
  resultsBold: {
    fontWeight: "600",
    color: "#111827",
  },

  // Loading
  loadingContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "5rem 0",
  },
  spinner: {
    width: "4rem",
    height: "4rem",
    border: "4px solid #db2777",
    borderTopColor: "transparent",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
    marginBottom: "1rem",
  },
  loadingText: {
    color: "#4b5563",
    fontWeight: "500",
    margin: 0,
  },

  // Products Grid
  productsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "1.5rem",
  },

  // Empty State
  emptyState: {
    textAlign: "center",
    padding: "5rem 0",
  },
  emptyIconContainer: {
    width: "6rem",
    height: "6rem",
    backgroundColor: "#f3f4f6",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 1.5rem",
  },
  emptyIcon: {
    width: "3rem",
    height: "3rem",
    color: "#9ca3af",
  },
  emptyTitle: {
    fontSize: "1.5rem",
    fontWeight: "700",
    color: "#111827",
    marginBottom: "0.5rem",
    margin: "0 0 0.5rem 0",
  },
  emptyText: {
    color: "#4b5563",
    marginBottom: "1.5rem",
    margin: "0 0 1.5rem 0",
  },
  emptyClearButton: {
    padding: "0.75rem 1.5rem",
    backgroundColor: "#db2777",
    color: "white",
    borderRadius: "0.5rem",
    fontWeight: "600",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
};

// Inject keyframes untuk animasi spinner dan responsive styles
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  
  /* Focus styles */
  input:focus, select:focus {
    border-color: #ec4899 !important;
    box-shadow: 0 0 0 3px rgba(236, 72, 153, 0.1) !important;
  }
  
  button:hover {
    opacity: 0.9;
  }
  
  /* Responsive adjustments */
  @media (max-width: 767px) {
    /* Mobile */
  }
  
  @media (min-width: 768px) and (max-width: 1023px) {
    /* Tablet */
  }
  
  @media (min-width: 1024px) {
    /* Desktop */
  }
`;
document.head.appendChild(styleSheet);

export default WomenPage;
