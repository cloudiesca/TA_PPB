import { useState } from 'react';
import { ArrowLeft, CreditCard, MapPin, User, Check } from 'lucide-react';
import { useCart } from '../hooks/useCart';

const CheckoutPage = ({ onBack, onSuccess }) => {
    const { cart, total, itemCount, clearCart } = useCart();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        postalCode: '',
        paymentMethod: 'credit-card'
    });
    const [isProcessing, setIsProcessing] = useState(false);
    const [imageErrors, setImageErrors] = useState({});

    const formatPrice = (price) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price);
    };

    const shippingCost = total >= 500000 ? 0 : 50000;
    const finalTotal = total + shippingCost;

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e?.preventDefault?.();

        // Validation
        if (!formData.name || !formData.email || !formData.phone || !formData.address) {
            alert('Mohon lengkapi semua field yang diperlukan');
            return;
        }

        setIsProcessing(true);

        // Simulate payment processing
        setTimeout(() => {
            clearCart();
            setIsProcessing(false);
            onSuccess();
            alert('Pesanan berhasil dibuat! 🎉');
        }, 2000);
    };

    const getImageUrl = (item) => {
        const itemKey = `${item.id}-${item.size}-${item.color}`;
        if (imageErrors[itemKey]) {
            return 'https://via.placeholder.com/80?text=No+Image';
        }
        return item.image_url || item.image || 'https://via.placeholder.com/80?text=No+Image';
    };

    const handleImageError = (item) => {
        const itemKey = `${item.id}-${item.size}-${item.color}`;
        setImageErrors(prev => ({ ...prev, [itemKey]: true }));
    };

    return (
        <div style={styles.container}>
            {/* Header - Fixed */}
            <div style={styles.header}>
                <div style={styles.headerContent}>
                    <button onClick={onBack} style={styles.backButton}>
                        <ArrowLeft style={styles.backIcon} />
                        <span style={styles.backText}>Kembali</span>
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div style={styles.mainContent}>
                <h1 style={styles.pageTitle}>Checkout</h1>

                <div style={styles.gridLayout}>
                    {/* Left Column - Forms */}
                    <div style={styles.formsColumn}>
                        {/* Personal Information */}
                        <div style={styles.card}>
                            <div style={styles.cardHeader}>
                                <div style={styles.iconWrapper}>
                                    <User style={styles.icon} />
                                </div>
                                <h2 style={styles.cardTitle}>Informasi Pribadi</h2>
                            </div>

                            <div style={styles.formGrid}>
                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Nama Lengkap *</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        style={styles.input}
                                        placeholder="John Doe"
                                    />
                                </div>

                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Email *</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        style={styles.input}
                                        placeholder="john@example.com"
                                    />
                                </div>

                                <div style={styles.formGroupFull}>
                                    <label style={styles.label}>Nomor Telepon *</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                        style={styles.input}
                                        placeholder="+62 812 3456 7890"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Shipping Address */}
                        <div style={styles.card}>
                            <div style={styles.cardHeader}>
                                <div style={styles.iconWrapper}>
                                    <MapPin style={styles.icon} />
                                </div>
                                <h2 style={styles.cardTitle}>Alamat Pengiriman</h2>
                            </div>

                            <div style={styles.formGrid}>
                                <div style={styles.formGroupFull}>
                                    <label style={styles.label}>Alamat Lengkap *</label>
                                    <textarea
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        required
                                        rows={3}
                                        style={styles.textarea}
                                        placeholder="Jl. Contoh No. 123, Apartment 4B"
                                    />
                                </div>

                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Kota *</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        required
                                        style={styles.input}
                                        placeholder="Jakarta"
                                    />
                                </div>

                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Kode Pos *</label>
                                    <input
                                        type="text"
                                        name="postalCode"
                                        value={formData.postalCode}
                                        onChange={handleChange}
                                        required
                                        style={styles.input}
                                        placeholder="12345"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div style={styles.card}>
                            <div style={styles.cardHeader}>
                                <div style={styles.iconWrapper}>
                                    <CreditCard style={styles.icon} />
                                </div>
                                <h2 style={styles.cardTitle}>Metode Pembayaran</h2>
                            </div>

                            <div style={styles.paymentOptions}>
                                <PaymentOption
                                    id="credit-card"
                                    name="paymentMethod"
                                    value="credit-card"
                                    checked={formData.paymentMethod === 'credit-card'}
                                    onChange={handleChange}
                                    label="Kartu Kredit / Debit"
                                    description="Visa, Mastercard, AMEX"
                                />
                                <PaymentOption
                                    id="bank-transfer"
                                    name="paymentMethod"
                                    value="bank-transfer"
                                    checked={formData.paymentMethod === 'bank-transfer'}
                                    onChange={handleChange}
                                    label="Transfer Bank"
                                    description="BCA, Mandiri, BNI"
                                />
                                <PaymentOption
                                    id="e-wallet"
                                    name="paymentMethod"
                                    value="e-wallet"
                                    checked={formData.paymentMethod === 'e-wallet'}
                                    onChange={handleChange}
                                    label="E-Wallet"
                                    description="GoPay, OVO, Dana"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Order Summary */}
                    <div style={styles.summaryColumn}>
                        <div style={styles.summaryCard}>
                            <h2 style={styles.summaryTitle}>Ringkasan Pesanan</h2>

                            {/* Cart Items */}
                            <div style={styles.cartItems}>
                                {cart.map((item) => (
                                    <div key={`${item.id}-${item.size}-${item.color}`} style={styles.cartItem}>
                                        <img
                                            src={getImageUrl(item)}
                                            alt={item.name}
                                            style={styles.itemImage}
                                            onError={() => handleImageError(item)}
                                        />
                                        <div style={styles.itemDetails}>
                                            <p style={styles.itemName}>{item.name}</p>
                                            <div style={styles.itemMeta}>
                                                <span>Qty: {item.quantity}</span>
                                                {item.size && <span>• {item.size}</span>}
                                                {item.color && <span>• {item.color}</span>}
                                            </div>
                                            <p style={styles.itemPrice}>
                                                {formatPrice(item.price * item.quantity)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Price Breakdown */}
                            <div style={styles.priceBreakdown}>
                                <div style={styles.priceRow}>
                                    <span style={styles.priceLabel}>Subtotal ({itemCount} item)</span>
                                    <span style={styles.priceValue}>{formatPrice(total)}</span>
                                </div>
                                <div style={styles.priceRow}>
                                    <span style={styles.priceLabel}>Ongkir</span>
                                    <span style={styles.priceValue}>
                                        {shippingCost === 0 ? (
                                            <span style={styles.freeShipping}>GRATIS</span>
                                        ) : (
                                            formatPrice(shippingCost)
                                        )}
                                    </span>
                                </div>
                            </div>

                            {/* Total */}
                            <div style={styles.totalRow}>
                                <span style={styles.totalLabel}>Total</span>
                                <span style={styles.totalValue}>{formatPrice(finalTotal)}</span>
                            </div>

                            {/* Place Order Button */}
                            <button
                                onClick={handleSubmit}
                                disabled={isProcessing}
                                style={{
                                    ...styles.orderButton,
                                    opacity: isProcessing ? 0.5 : 1,
                                    cursor: isProcessing ? 'not-allowed' : 'pointer',
                                }}
                            >
                                {isProcessing ? (
                                    <>
                                        <div style={styles.spinner}></div>
                                        Memproses...
                                    </>
                                ) : (
                                    <>
                                        <Check style={styles.buttonIcon} />
                                        Buat Pesanan
                                    </>
                                )}
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

const PaymentOption = ({ id, name, value, checked, onChange, label, description }) => (
    <label
        htmlFor={id}
        style={{
            ...styles.paymentOption,
            borderColor: checked ? '#4f46e5' : '#e5e7eb',
            backgroundColor: checked ? '#eef2ff' : 'white',
        }}
    >
        <input
            type="radio"
            id={id}
            name={name}
            value={value}
            checked={checked}
            onChange={onChange}
            style={styles.radio}
        />
        <div style={styles.paymentInfo}>
            <p style={styles.paymentLabel}>{label}</p>
            <p style={styles.paymentDescription}>{description}</p>
        </div>
    </label>
);

// ============================================
// STYLES
// ============================================

const styles = {
    // Container
    container: {
        minHeight: '100vh',
        backgroundColor: '#f9fafb',
    },

    // Header
    header: {
        backgroundColor: 'white',
        borderBottom: '1px solid #e5e7eb',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
    },
    headerContent: {
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '1.25rem 1rem',
    },
    backButton: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        color: '#4b5563',
        backgroundColor: 'transparent',
        border: 'none',
        cursor: 'pointer',
        fontWeight: '500',
        transition: 'color 0.3s',
    },
    backIcon: {
        width: '1.25rem',
        height: '1.25rem',
    },
    backText: {
        fontSize: '0.875rem',
    },

    // Main Content
    mainContent: {
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '1rem',
        paddingTop: '7rem',
        paddingBottom: '2rem',
    },
    pageTitle: {
        fontSize: '1.875rem',
        fontWeight: '700',
        color: '#111827',
        marginBottom: '2rem',
        margin: '0 0 2rem 0',
    },

    // Grid Layout
    gridLayout: {
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '2rem',
    },

    // Forms Column
    formsColumn: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
    },

    // Card
    card: {
        backgroundColor: 'white',
        borderRadius: '0.75rem',
        padding: '1.5rem',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    },
    cardHeader: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        marginBottom: '1.5rem',
    },
    iconWrapper: {
        width: '2.5rem',
        height: '2.5rem',
        backgroundColor: '#eef2ff',
        borderRadius: '0.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        width: '1.25rem',
        height: '1.25rem',
        color: '#4f46e5',
    },
    cardTitle: {
        fontSize: '1.25rem',
        fontWeight: '700',
        color: '#111827',
        margin: 0,
    },

    // Form
    formGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '1rem',
    },
    formGroup: {
        display: 'flex',
        flexDirection: 'column',
    },
    formGroupFull: {
        display: 'flex',
        flexDirection: 'column',
        gridColumn: '1 / -1',
    },
    label: {
        fontSize: '0.875rem',
        fontWeight: '500',
        color: '#374151',
        marginBottom: '0.5rem',
    },
    input: {
        padding: '0.75rem 1rem',
        border: '1px solid #d1d5db',
        borderRadius: '0.5rem',
        fontSize: '0.875rem',
        outline: 'none',
        transition: 'all 0.3s',
    },
    textarea: {
        padding: '0.75rem 1rem',
        border: '1px solid #d1d5db',
        borderRadius: '0.5rem',
        fontSize: '0.875rem',
        outline: 'none',
        transition: 'all 0.3s',
        resize: 'vertical',
        fontFamily: 'inherit',
    },

    // Payment Options
    paymentOptions: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
    },
    paymentOption: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        padding: '1rem',
        border: '2px solid',
        borderRadius: '0.5rem',
        cursor: 'pointer',
        transition: 'all 0.3s',
    },
    radio: {
        width: '1.25rem',
        height: '1.25rem',
        cursor: 'pointer',
    },
    paymentInfo: {
        flex: 1,
    },
    paymentLabel: {
        fontWeight: '600',
        color: '#111827',
        margin: '0 0 0.25rem 0',
    },
    paymentDescription: {
        fontSize: '0.875rem',
        color: '#6b7280',
        margin: 0,
    },

    // Summary Column
    summaryColumn: {
        gridColumn: '1',
    },
    summaryCard: {
        backgroundColor: 'white',
        borderRadius: '0.75rem',
        padding: '1.5rem',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        position: 'sticky',
        top: '7rem',
    },
    summaryTitle: {
        fontSize: '1.25rem',
        fontWeight: '700',
        color: '#111827',
        marginBottom: '1.5rem',
        margin: '0 0 1.5rem 0',
    },

    // Cart Items
    cartItems: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        marginBottom: '1.5rem',
        maxHeight: '16rem',
        overflowY: 'auto',
    },
    cartItem: {
        display: 'flex',
        gap: '0.75rem',
        paddingBottom: '0.75rem',
        borderBottom: '1px solid #e5e7eb',
    },
    itemImage: {
        width: '4rem',
        height: '4rem',
        objectFit: 'cover',
        borderRadius: '0.5rem',
        backgroundColor: '#f3f4f6',
        flexShrink: 0,
    },
    itemDetails: {
        flex: 1,
        minWidth: 0,
    },
    itemName: {
        fontWeight: '500',
        color: '#111827',
        fontSize: '0.875rem',
        margin: '0 0 0.25rem 0',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
    itemMeta: {
        fontSize: '0.75rem',
        color: '#6b7280',
        marginBottom: '0.25rem',
    },
    itemPrice: {
        fontSize: '0.875rem',
        fontWeight: '600',
        color: '#4f46e5',
        margin: 0,
    },

    // Price Breakdown
    priceBreakdown: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        marginBottom: '1.5rem',
        paddingBottom: '1.5rem',
        borderBottom: '1px solid #e5e7eb',
    },
    priceRow: {
        display: 'flex',
        justifyContent: 'space-between',
        color: '#4b5563',
        fontSize: '0.875rem',
    },
    priceLabel: {},
    priceValue: {
        fontWeight: '600',
    },
    freeShipping: {
        color: '#16a34a',
        fontWeight: '700',
    },

    // Total
    totalRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1.5rem',
    },
    totalLabel: {
        fontSize: '1.125rem',
        fontWeight: '700',
        color: '#111827',
    },
    totalValue: {
        fontSize: '1.5rem',
        fontWeight: '700',
        color: '#4f46e5',
    },

    // Order Button
    orderButton: {
        width: '100%',
        padding: '1rem',
        backgroundColor: '#4f46e5',
        color: 'white',
        borderRadius: '0.75rem',
        fontWeight: '600',
        border: 'none',
        cursor: 'pointer',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        transition: 'all 0.3s',
    },
    buttonIcon: {
        width: '1.25rem',
        height: '1.25rem',
    },
    spinner: {
        width: '1.25rem',
        height: '1.25rem',
        border: '2px solid white',
        borderTopColor: 'transparent',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
    },

    // Security Note
    securityNote: {
        fontSize: '0.75rem',
        color: '#6b7280',
        textAlign: 'center',
        marginTop: '1rem',
        margin: '1rem 0 0 0',
    },
};

// Inject keyframes and responsive styles
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
    
    /* Focus styles */
    input:focus, textarea:focus {
        border-color: #4f46e5 !important;
        box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1) !important;
    }
    
    button:hover:not(:disabled) {
        opacity: 0.9;
    }
    
    /* Responsive - Tablet & Desktop */
    @media (min-width: 768px) {
        .formGrid {
            grid-template-columns: repeat(2, 1fr) !important;
        }
    }
    
    @media (min-width: 1024px) {
        .gridLayout {
            grid-template-columns: 2fr 1fr !important;
        }
    }
`;
document.head.appendChild(styleSheet);

export default CheckoutPage;