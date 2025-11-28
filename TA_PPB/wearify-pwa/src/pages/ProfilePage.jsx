// src/pages/ProfilePage.jsx
import { useState, useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Edit2,
  Save,
  X,
  Camera,
  ShoppingBag,
} from "lucide-react";

const ProfilePage = ({ onNavigate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: "Desca Rahma",
    email: "descarahma13@gmail.com",
    phone: "+62 812 3456 7890",
    address: "Jl. Fashion No. 123, Jakarta",
    memberSince: "2025",
    photo: null,
  });

  const [editData, setEditData] = useState({ ...userData });

  useEffect(() => {
    const savedData = localStorage.getItem("wearify_user_profile");
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setUserData(parsed);
        setEditData(parsed);
      } catch (error) {
        console.error("Error loading profile:", error);
      }
    }
  }, []);

  const handleEdit = () => {
    setEditData({ ...userData });
    setIsEditing(true);
  };

  const handleSave = () => {
    setUserData({ ...editData });
    localStorage.setItem("wearify_user_profile", JSON.stringify(editData));
    setIsEditing(false);
    alert("✅ Profil berhasil diperbarui!");
  };

  const handleCancel = () => {
    setEditData({ ...userData });
    setIsEditing(false);
  };

  const handleChange = (field, value) => {
    setEditData({ ...editData, [field]: value });
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditData({ ...editData, photo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStartShopping = () => {
    if (onNavigate) {
      onNavigate("home");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        {/* Profile Card */}
        <div style={styles.profileCard}>
          {/* Avatar Section */}
          <div style={styles.avatarSection}>
            <div style={styles.avatarContainer}>
              <div style={styles.avatar}>
                {userData.photo ? (
                  <img
                    src={userData.photo}
                    alt="Profile"
                    style={styles.avatarImage}
                  />
                ) : (
                  <span style={styles.avatarInitial}>
                    {userData.name.charAt(0)}
                  </span>
                )}
              </div>

              {isEditing && (
                <label style={styles.cameraButton}>
                  <Camera style={styles.cameraIcon} />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    style={styles.fileInput}
                  />
                </label>
              )}
            </div>

            <h2 style={styles.userName}>{userData.name}</h2>
            <p style={styles.memberSince}>
              Member sejak {userData.memberSince}
            </p>

            {!isEditing ? (
              <button onClick={handleEdit} style={styles.editButton}>
                <Edit2 style={styles.buttonIcon} />
                Edit Profil
              </button>
            ) : (
              <div style={styles.actionButtons}>
                <button onClick={handleSave} style={styles.saveButton}>
                  <Save style={styles.buttonIcon} />
                  Simpan
                </button>
                <button onClick={handleCancel} style={styles.cancelButton}>
                  <X style={styles.buttonIcon} />
                  Batal
                </button>
              </div>
            )}
          </div>

          {/* Profile Information */}
          <div style={styles.infoSection}>
            <InfoRow
              icon={<User style={styles.infoIcon} />}
              label="Nama Lengkap"
              value={isEditing ? editData.name : userData.name}
              isEditing={isEditing}
              onChange={(value) => handleChange("name", value)}
            />
            <InfoRow
              icon={<Mail style={styles.infoIcon} />}
              label="Email"
              value={isEditing ? editData.email : userData.email}
              isEditing={isEditing}
              onChange={(value) => handleChange("email", value)}
              type="email"
            />
            <InfoRow
              icon={<Phone style={styles.infoIcon} />}
              label="Nomor Telepon"
              value={isEditing ? editData.phone : userData.phone}
              isEditing={isEditing}
              onChange={(value) => handleChange("phone", value)}
              type="tel"
            />
            <InfoRow
              icon={<MapPin style={styles.infoIcon} />}
              label="Alamat"
              value={isEditing ? editData.address : userData.address}
              isEditing={isEditing}
              onChange={(value) => handleChange("address", value)}
              multiline
            />
          </div>
        </div>

        {/* Call to Action */}
        <div style={styles.ctaCard}>
          <div style={styles.ctaContent}>
            <ShoppingBag style={styles.ctaIcon} />
            <h3 style={styles.ctaTitle}>Mulai Belanja Sekarang!</h3>
            <p style={styles.ctaDescription}>
              Temukan koleksi fashion terbaru dan dapatkan penawaran menarik.
            </p>
            <button onClick={handleStartShopping} style={styles.ctaButton}>
              <ShoppingBag style={styles.buttonIcon} />
              Jelajahi Produk
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoRow = ({
  icon,
  label,
  value,
  isEditing,
  onChange,
  type = "text",
  multiline = false,
}) => (
  <div style={styles.infoRow}>
    <div style={styles.iconBox}>{icon}</div>
    <div style={styles.infoContent}>
      <p style={styles.infoLabel}>{label}</p>
      {isEditing ? (
        multiline ? (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            style={styles.textarea}
            rows={3}
          />
        ) : (
          <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            style={styles.input}
          />
        )
      ) : (
        <p style={styles.infoValue}>{value}</p>
      )}
    </div>
  </div>
);

// ============================================
// STYLES - Semua styling dipisahkan di bawah
// ============================================

const styles = {
  // Container
  container: {
    minHeight: "100vh",
    backgroundColor: "#f8fafc",
    marginTop: "90px",
    paddingBottom: "8rem",
  },

  // Content
  content: {
    maxWidth: "896px",
    margin: "0 auto",
    padding: "2rem 1rem",
  },

  // Profile Card
  profileCard: {
    backgroundColor: "white",
    borderRadius: "1rem",
    padding: "2rem",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    border: "2px solid #e2e8f0",
    marginBottom: "2rem",
    marginTop: "1.5rem",
  },

  // Avatar Section
  avatarSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    marginBottom: "2rem",
    paddingBottom: "2rem",
    borderBottom: "2px solid #f1f5f9",
  },
  avatarContainer: {
    position: "relative",
    marginBottom: "1.5rem",
  },
  avatar: {
    width: "8rem",
    height: "8rem",
    backgroundColor: "#e0f2fe",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "3rem",
    fontWeight: "900",
    overflow: "hidden",
    border: "4px solid #bae6fd",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  avatarInitial: {
    color: "#0284c7",
  },

  // Camera Button
  cameraButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: "2.75rem",
    height: "2.75rem",
    backgroundColor: "#0284c7",
    color: "white",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "background-color 0.3s",
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
  },
  cameraIcon: {
    width: "1.25rem",
    height: "1.25rem",
  },
  fileInput: {
    display: "none",
  },

  // User Info
  userName: {
    fontSize: "1.875rem",
    fontWeight: "900",
    color: "#0f172a",
    marginBottom: "0.5rem",
    margin: "0 0 0.5rem 0",
  },
  memberSince: {
    color: "#475569",
    marginBottom: "1.5rem",
    margin: "0 0 1.5rem 0",
  },

  // Action Buttons
  editButton: {
    padding: "0.75rem 1.5rem",
    backgroundColor: "#0284c7",
    color: "white",
    borderRadius: "0.75rem",
    fontWeight: "700",
    border: "none",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    transition: "background-color 0.3s",
  },
  actionButtons: {
    display: "flex",
    gap: "0.75rem",
  },
  saveButton: {
    padding: "0.75rem 1.5rem",
    backgroundColor: "#16a34a",
    color: "white",
    borderRadius: "0.75rem",
    fontWeight: "700",
    border: "none",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    transition: "background-color 0.3s",
  },
  cancelButton: {
    padding: "0.75rem 1.5rem",
    backgroundColor: "#e2e8f0",
    color: "#334155",
    borderRadius: "0.75rem",
    fontWeight: "700",
    border: "none",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    transition: "background-color 0.3s",
  },
  buttonIcon: {
    width: "1.25rem",
    height: "1.25rem",
  },

  // Info Section
  infoSection: {
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
  },

  // Info Row
  infoRow: {
    display: "flex",
    alignItems: "flex-start",
    gap: "1rem",
    paddingBottom: "1.5rem",
    borderBottom: "2px solid #f1f5f9",
  },
  iconBox: {
    width: "3rem",
    height: "3rem",
    backgroundColor: "#f0f9ff",
    borderRadius: "0.75rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#0284c7",
    flexShrink: 0,
  },
  infoIcon: {
    width: "1.5rem",
    height: "1.5rem",
  },

  // Info Content
  infoContent: {
    flex: 1,
    minWidth: 0,
  },
  infoLabel: {
    fontSize: "0.875rem",
    fontWeight: "700",
    color: "#475569",
    marginBottom: "0.5rem",
    margin: "0 0 0.5rem 0",
  },
  infoValue: {
    fontSize: "1rem",
    fontWeight: "700",
    color: "#0f172a",
    wordBreak: "break-word",
    margin: 0,
  },

  // Input Fields
  input: {
    width: "100%",
    padding: "0.75rem 1rem",
    border: "2px solid #cbd5e1",
    borderRadius: "0.75rem",
    fontSize: "1rem",
    fontWeight: "500",
    color: "#0f172a",
    outline: "none",
    transition: "all 0.3s",
  },
  textarea: {
    width: "100%",
    padding: "0.75rem 1rem",
    border: "2px solid #cbd5e1",
    borderRadius: "0.75rem",
    fontSize: "1rem",
    fontWeight: "500",
    color: "#0f172a",
    outline: "none",
    transition: "all 0.3s",
    resize: "vertical",
    fontFamily: "inherit",
  },

  // CTA Card
  ctaCard: {
    background: "linear-gradient(90deg, #0284c7 0%, #2563eb 100%)",
    borderRadius: "1rem",
    padding: "2rem",
    color: "white",
  },
  ctaContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },
  ctaIcon: {
    width: "4rem",
    height: "4rem",
    opacity: 0.9,
    marginBottom: "1rem",
  },
  ctaTitle: {
    fontSize: "1.5rem",
    fontWeight: "900",
    marginBottom: "0.75rem",
    margin: "0 0 0.75rem 0",
  },
  ctaDescription: {
    color: "#e0f2fe",
    marginBottom: "1.5rem",
    maxWidth: "448px",
    margin: "0 0 1.5rem 0",
  },
  ctaButton: {
    padding: "1rem 2rem",
    backgroundColor: "white",
    color: "#0284c7",
    borderRadius: "0.75rem",
    fontWeight: "700",
    border: "none",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    transition: "background-color 0.3s",
  },
};

// Inject CSS untuk focus states dan responsive
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  input:focus, textarea:focus {
    border-color: #0ea5e9 !important;
    box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.1) !important;
  }
  
  button:hover {
    opacity: 0.9;
  }
  
  @media (max-width: 640px) {
    /* Mobile adjustments */
  }
  
  @media (min-width: 641px) and (max-width: 1024px) {
    /* Tablet adjustments */
  }
`;
document.head.appendChild(styleSheet);

export default ProfilePage;
