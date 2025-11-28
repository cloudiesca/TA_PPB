// src/pages/HomePage.jsx
import { useState, useEffect } from "react";
import { ArrowRight, Truck, Shield, Package } from "lucide-react";
import ProductCard from "../components/product/ProductCard";
import { productService } from "../services/productService";

const HomePage = ({ onNavigate, onProductClick }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const productsData = await productService.getAllProducts();
      setProducts(productsData || []);
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const featuredProducts = products.slice(0, 8);
  const menProducts = products.filter((p) => p.gender === "men").slice(0, 4);
  const womenProducts = products
    .filter((p) => p.gender === "women")
    .slice(0, 4);

  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <section style={styles.heroSection}>
        <div style={styles.decorativeBlob1}></div>
        <div style={styles.decorativeBlob2}></div>

        <div style={styles.heroContent}>
          <div style={styles.heroGrid}>
            {/* Left Content */}
            <div style={styles.heroLeft}>
              <div style={styles.badge}>✨ Koleksi Terbaru 2025</div>

              <h1 style={styles.heroTitle}>
                Selamat datang di
                <span style={styles.heroTitleGradient}>Wearify Fashion</span>
              </h1>

              <p style={styles.heroDescription}>
                Temukan ribuan produk fashion autentik dari seluruh Indonesia.
                Dari gaya kasual hingga formal yang memukau.
              </p>

              <div style={styles.heroCTAContainer}>
                <button
                  onClick={() => onNavigate("men")}
                  style={styles.buttonPrimary}
                >
                  <span>Jelajahi Koleksi</span>
                  <ArrowRight style={styles.icon} />
                </button>
                <button
                  onClick={() =>
                    window.scrollTo({ top: 600, behavior: "smooth" })
                  }
                  style={styles.buttonSecondary}
                >
                  Lihat Produk
                </button>
              </div>
            </div>

            {/* Right Images Grid */}
            <div style={styles.imageGrid}>
              <div style={styles.imageColumn}>
                <div style={styles.imageBox1}>
                  <img
                    src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=500&q=80"
                    alt="Fashion"
                    style={styles.image}
                  />
                </div>
                <div style={styles.imageBox2}>
                  <img
                    src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=500&q=80"
                    alt="Fashion"
                    style={styles.image}
                  />
                </div>
              </div>
              <div style={styles.imageColumnOffset}>
                <div style={styles.imageBox2}>
                  <img
                    src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500&q=80"
                    alt="Fashion"
                    style={styles.image}
                  />
                </div>
                <div style={styles.imageBox1}>
                  <img
                    src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=500&q=80"
                    alt="Fashion"
                    style={styles.image}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={styles.featuresSection}>
        <div style={styles.featuresContainer}>
          <div style={styles.featuresGrid}>
            <FeatureCard
              icon={<Truck style={styles.featureIcon} />}
              title="Gratis Ongkir"
              description="Untuk pesanan di atas Rp 500.000"
            />
            <FeatureCard
              icon={<Shield style={styles.featureIcon} />}
              title="100% Original"
              description="Produk asli dengan garansi kualitas"
            />
            <FeatureCard
              icon={<Package style={styles.featureIcon} />}
              title="Pengiriman Cepat"
              description="Express delivery tersedia"
            />
          </div>
        </div>
      </section>

      {/* Loading State */}
      {loading && (
        <div style={styles.loadingContainer}>
          <div style={styles.loadingContent}>
            <div style={styles.spinner}></div>
            <p style={styles.loadingText}>Memuat produk...</p>
          </div>
        </div>
      )}

      {/* Products Section */}
      {!loading && products.length > 0 && (
        <>
          {/* Featured Products */}
          <section style={styles.sectionGray}>
            <div style={styles.sectionContainer}>
              <div style={styles.sectionHeader}>
                <h2 style={styles.sectionTitle}>Produk Pilihan</h2>
                <p style={styles.sectionSubtitle}>
                  Produk-produk terbaik yang dipilih khusus untuk Anda
                </p>
              </div>

              <div style={styles.productGrid}>
                {featuredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onClick={onProductClick}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* Men's Collection */}
          {menProducts.length > 0 && (
            <section style={styles.sectionWhite}>
              <div style={styles.sectionContainer}>
                <div style={styles.collectionHeader}>
                  <div>
                    <h2 style={styles.sectionTitle}>Koleksi Pria</h2>
                    <p style={styles.sectionSubtitle}>
                      Fashion maskulin dan modern
                    </p>
                  </div>
                  <button
                    onClick={() => onNavigate("men")}
                    style={styles.buttonSky}
                  >
                    <span>Lihat Semua</span>
                    <ArrowRight style={styles.icon} />
                  </button>
                </div>

                <div style={styles.productGrid}>
                  {menProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onClick={onProductClick}
                    />
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Women's Collection */}
          {womenProducts.length > 0 && (
            <section style={styles.sectionGray}>
              <div style={styles.sectionContainer}>
                <div style={styles.collectionHeader}>
                  <div>
                    <h2 style={styles.sectionTitle}>Koleksi Wanita</h2>
                    <p style={styles.sectionSubtitle}>Elegan dan menawan</p>
                  </div>
                  <button
                    onClick={() => onNavigate("women")}
                    style={styles.buttonRose}
                  >
                    <span>Lihat Semua</span>
                    <ArrowRight style={styles.icon} />
                  </button>
                </div>

                <div style={styles.productGrid}>
                  {womenProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onClick={onProductClick}
                    />
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Newsletter */}
          <section style={styles.newsletterSection}>
            <div style={styles.newsletterContainer}>
              <h2 style={styles.newsletterTitle}>Dapatkan Update Terbaru</h2>
              <p style={styles.newsletterSubtitle}>
                Berlangganan newsletter untuk penawaran eksklusif dan tips
                fashion
              </p>
              <div style={styles.newsletterForm}>
                <input
                  type="email"
                  placeholder="Masukkan email Anda"
                  style={styles.newsletterInput}
                />
                <button style={styles.newsletterButton}>Berlangganan</button>
              </div>
            </div>
          </section>
        </>
      )}

      {/* Empty State */}
      {!loading && products.length === 0 && (
        <div style={styles.emptyState}>
          <Package style={styles.emptyIcon} />
          <h3 style={styles.emptyTitle}>Belum Ada Produk</h3>
          <p style={styles.emptyText}>Produk akan segera hadir!</p>
          <button onClick={fetchData} style={styles.buttonPrimary}>
            Muat Ulang
          </button>
        </div>
      )}
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div style={styles.featureCard}>
    <div style={styles.featureIconBox}>{icon}</div>
    <h3 style={styles.featureTitle}>{title}</h3>
    <p style={styles.featureDescription}>{description}</p>
  </div>
);

// ============================================
// STYLES - Semua styling dipisahkan di bawah
// ============================================

const styles = {
  // Container
  container: {
    minHeight: "100vh",
    backgroundColor: "white",
    paddingTop: "5rem",
  },

  // Hero Section
  heroSection: {
    position: "relative",
    background:
      "linear-gradient(135deg, #f8fafc 0%, #ffffff 50%, #f0f9ff 100%)",
    paddingTop: "3rem",
    paddingBottom: "3rem",
    overflow: "hidden",
  },
  decorativeBlob1: {
    position: "absolute",
    top: 0,
    right: 0,
    width: "500px",
    height: "500px",
    backgroundColor: "rgba(186, 230, 253, 0.3)",
    borderRadius: "50%",
    filter: "blur(80px)",
  },
  decorativeBlob2: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "500px",
    height: "500px",
    backgroundColor: "rgba(191, 219, 254, 0.3)",
    borderRadius: "50%",
    filter: "blur(80px)",
  },
  heroContent: {
    maxWidth: "1280px",
    margin: "0 auto",
    padding: "0 1.5rem",
    position: "relative",
    zIndex: 10,
  },
  heroGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "3rem",
    alignItems: "center",
  },
  heroLeft: {
    display: "flex",
    flexDirection: "column",
    gap: "1.25rem",
  },
  badge: {
    display: "inline-block",
    padding: "0.375rem 1rem",
    backgroundColor: "#e0f2fe",
    color: "#0369a1",
    borderRadius: "9999px",
    fontSize: "0.875rem",
    fontWeight: "600",
    width: "fit-content",
  },
  heroTitle: {
    fontSize: "3.75rem",
    fontWeight: "900",
    color: "#0f172a",
    lineHeight: "1.2",
    margin: 0,
  },
  heroTitleGradient: {
    display: "block",
    background: "linear-gradient(90deg, #0284c7 0%, #2563eb 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    marginTop: "0.25rem",
  },
  heroDescription: {
    fontSize: "1.125rem",
    color: "#475569",
    lineHeight: "1.75",
    margin: 0,
  },
  heroCTAContainer: {
    display: "flex",
    gap: "0.75rem",
    paddingTop: "0.5rem",
    flexWrap: "wrap",
  },

  // Buttons
  buttonPrimary: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0.625rem 1.5rem",
    backgroundColor: "#0284c7",
    color: "white",
    borderRadius: "0.5rem",
    fontWeight: "600",
    border: "none",
    cursor: "pointer",
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s",
  },
  buttonSecondary: {
    padding: "0.625rem 1.5rem",
    backgroundColor: "white",
    color: "#334155",
    borderRadius: "0.5rem",
    fontWeight: "600",
    border: "2px solid #e2e8f0",
    cursor: "pointer",
    transition: "all 0.3s",
  },
  buttonSky: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0.5rem 1.25rem",
    backgroundColor: "#0284c7",
    color: "white",
    borderRadius: "0.5rem",
    fontWeight: "600",
    border: "none",
    cursor: "pointer",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s",
  },
  buttonRose: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0.5rem 1.25rem",
    backgroundColor: "#e11d48",
    color: "white",
    borderRadius: "0.5rem",
    fontWeight: "600",
    border: "none",
    cursor: "pointer",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s",
  },
  icon: {
    width: "1rem",
    height: "1rem",
  },

  // Image Grid
  imageGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "0.75rem",
  },
  imageColumn: {
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
  },
  imageColumnOffset: {
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
    marginTop: "2rem",
  },
  imageBox1: {
    height: "9rem",
    borderRadius: "0.75rem",
    overflow: "hidden",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
  },
  imageBox2: {
    height: "13rem",
    borderRadius: "0.75rem",
    overflow: "hidden",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.7s",
  },

  // Features Section
  featuresSection: {
    padding: "2.5rem 0",
    backgroundColor: "white",
    borderTop: "1px solid #f1f5f9",
    borderBottom: "1px solid #f1f5f9",
  },
  featuresContainer: {
    maxWidth: "1280px",
    margin: "0 auto",
    padding: "0 1.5rem",
  },
  featuresGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "2rem",
  },
  featureCard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    padding: "1rem",
  },
  featureIconBox: {
    width: "3rem",
    height: "3rem",
    backgroundColor: "#f0f9ff",
    borderRadius: "0.75rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "0.75rem",
    transition: "background-color 0.3s",
  },
  featureIcon: {
    width: "1.5rem",
    height: "1.5rem",
    color: "#0284c7",
  },
  featureTitle: {
    fontSize: "1rem",
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: "0.25rem",
    margin: "0 0 0.25rem 0",
  },
  featureDescription: {
    fontSize: "0.875rem",
    color: "#475569",
    margin: 0,
  },

  // Loading
  loadingContainer: {
    padding: "5rem 0",
  },
  loadingContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "1rem",
  },
  spinner: {
    width: "3rem",
    height: "3rem",
    border: "4px solid #0284c7",
    borderTopColor: "transparent",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  loadingText: {
    color: "#475569",
    fontWeight: "500",
    margin: 0,
  },

  // Sections
  sectionGray: {
    padding: "3rem 0",
    backgroundColor: "#f8fafc",
  },
  sectionWhite: {
    padding: "3rem 0",
    backgroundColor: "white",
  },
  sectionContainer: {
    maxWidth: "1280px",
    margin: "0 auto",
    padding: "0 1.5rem",
  },
  sectionHeader: {
    textAlign: "center",
    marginBottom: "2rem",
  },
  sectionTitle: {
    fontSize: "2.25rem",
    fontWeight: "900",
    color: "#0f172a",
    marginBottom: "0.5rem",
    margin: "0 0 0.5rem 0",
  },
  sectionSubtitle: {
    color: "#475569",
    margin: 0,
  },
  collectionHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "2rem",
    gap: "0.75rem",
  },

  // Product Grid
  productGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "1.25rem",
  },

  // Newsletter
  newsletterSection: {
    padding: "3rem 0",
    background: "linear-gradient(135deg, #0284c7 0%, #2563eb 100%)",
  },
  newsletterContainer: {
    maxWidth: "768px",
    margin: "0 auto",
    padding: "0 1.5rem",
    textAlign: "center",
  },
  newsletterTitle: {
    fontSize: "2.25rem",
    fontWeight: "900",
    color: "white",
    marginBottom: "0.5rem",
    margin: "0 0 0.5rem 0",
  },
  newsletterSubtitle: {
    color: "#e0f2fe",
    marginBottom: "1.5rem",
    margin: "0 0 1.5rem 0",
  },
  newsletterForm: {
    display: "flex",
    gap: "0.75rem",
    maxWidth: "448px",
    margin: "0 auto",
  },
  newsletterInput: {
    flex: 1,
    padding: "0.625rem 1rem",
    borderRadius: "0.5rem",
    color: "#0f172a",
    border: "none",
    outline: "none",
  },
  newsletterButton: {
    padding: "0.625rem 1.5rem",
    backgroundColor: "white",
    color: "#0284c7",
    borderRadius: "0.5rem",
    fontWeight: "600",
    border: "none",
    cursor: "pointer",
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s",
    whiteSpace: "nowrap",
  },

  // Empty State
  emptyState: {
    padding: "5rem 0",
    textAlign: "center",
  },
  emptyIcon: {
    width: "5rem",
    height: "5rem",
    color: "#cbd5e1",
    margin: "0 auto 1rem",
  },
  emptyTitle: {
    fontSize: "1.5rem",
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: "0.5rem",
    margin: "0 0 0.5rem 0",
  },
  emptyText: {
    color: "#475569",
    marginBottom: "1.5rem",
    margin: "0 0 1.5rem 0",
  },
};

// Inject keyframes untuk animasi spinner
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;
document.head.appendChild(styleSheet);

export default HomePage;
