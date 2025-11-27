// // // // // // src/pages/ProfilePage.jsx - SIMPLE LAYOUT NO OVERLAP
// // // // // import { useState, useEffect } from 'react';
// // // // // import { User, Mail, Phone, MapPin, Package, Edit2, Save, X, Camera } from 'lucide-react';

// // // // // const ProfilePage = () => {
// // // // //     const [isEditing, setIsEditing] = useState(false);
// // // // //     const [userData, setUserData] = useState({
// // // // //         name: 'Guest User',
// // // // //         email: 'guest@wearify.com',
// // // // //         phone: '+62 812 3456 7890',
// // // // //         address: 'Jl. Fashion No. 123, Jakarta',
// // // // //         memberSince: '2025',
// // // // //         photo: null
// // // // //     });

// // // // //     const [editData, setEditData] = useState({ ...userData });

// // // // //     useEffect(() => {
// // // // //         const savedData = localStorage.getItem('wearify_user_profile');
// // // // //         if (savedData) {
// // // // //             try {
// // // // //                 const parsed = JSON.parse(savedData);
// // // // //                 setUserData(parsed);
// // // // //                 setEditData(parsed);
// // // // //             } catch (error) {
// // // // //                 console.error('Error loading profile:', error);
// // // // //             }
// // // // //         }
// // // // //     }, []);

// // // // //     const handleEdit = () => {
// // // // //         setEditData({ ...userData });
// // // // //         setIsEditing(true);
// // // // //     };

// // // // //     const handleSave = () => {
// // // // //         setUserData({ ...editData });
// // // // //         localStorage.setItem('wearify_user_profile', JSON.stringify(editData));
// // // // //         setIsEditing(false);
// // // // //         alert('Profil berhasil diperbarui! ✅');
// // // // //     };

// // // // //     const handleCancel = () => {
// // // // //         setEditData({ ...userData });
// // // // //         setIsEditing(false);
// // // // //     };

// // // // //     const handleChange = (field, value) => {
// // // // //         setEditData({ ...editData, [field]: value });
// // // // //     };

// // // // //     const handlePhotoUpload = (e) => {
// // // // //         const file = e.target.files[0];
// // // // //         if (file) {
// // // // //             const reader = new FileReader();
// // // // //             reader.onloadend = () => {
// // // // //                 setEditData({ ...editData, photo: reader.result });
// // // // //             };
// // // // //             reader.readAsDataURL(file);
// // // // //         }
// // // // //     };

// // // // //     return (
// // // // //         <div className="min-h-screen bg-slate-50 pt-32 md:pt-28 pb-32">
// // // // //             <div className="max-w-7xl mx-auto px-8 py-8">
// // // // //                 {/* Page Title */}
// // // // //                 <div className="mb-8">
// // // // //                     <h1 className="text-4xl font-black text-slate-900 mb-2">Profil Saya</h1>
// // // // //                     <p className="text-lg text-slate-600">Kelola informasi profil Anda</p>
// // // // //                 </div>

// // // // //                 <div className="grid lg:grid-cols-3 gap-8">
// // // // //                     {/* Left Column - Profile Card */}
// // // // //                     <div className="lg:col-span-1">
// // // // //                         <div className="bg-white rounded-2xl p-8 shadow-md border-2 border-slate-200 sticky top-28">
// // // // //                             {/* Avatar */}
// // // // //                             <div className="text-center mb-6">
// // // // //                                 <div className="relative inline-block">
// // // // //                                     <div className="w-32 h-32 bg-sky-100 rounded-full flex items-center justify-center text-5xl font-black overflow-hidden mx-auto border-4 border-sky-200">
// // // // //                                         {userData.photo ? (
// // // // //                                             <img src={userData.photo} alt="Profile" className="w-full h-full object-cover" />
// // // // //                                         ) : (
// // // // //                                             <span className="text-sky-600">{userData.name.charAt(0)}</span>
// // // // //                                         )}
// // // // //                                     </div>

// // // // //                                     {isEditing && (
// // // // //                                         <label className="absolute bottom-0 right-0 w-11 h-11 bg-sky-600 text-white rounded-full flex items-center justify-center cursor-pointer hover:bg-sky-700 transition-colors shadow-lg">
// // // // //                                             <Camera className="w-5 h-5" />
// // // // //                                             <input
// // // // //                                                 type="file"
// // // // //                                                 accept="image/*"
// // // // //                                                 onChange={handlePhotoUpload}
// // // // //                                                 className="hidden"
// // // // //                                             />
// // // // //                                         </label>
// // // // //                                     )}
// // // // //                                 </div>

// // // // //                                 <h2 className="text-2xl font-black text-slate-900 mt-4 mb-1">{userData.name}</h2>
// // // // //                                 <p className="text-slate-600">Member sejak {userData.memberSince}</p>
// // // // //                             </div>

// // // // //                             {/* Stats */}
// // // // //                             <div className="space-y-3 pt-6 border-t-2 border-slate-100">
// // // // //                                 <StatItem label="Total Pesanan" value="0" />
// // // // //                                 <StatItem label="Total Belanja" value="Rp 0" />
// // // // //                                 <StatItem label="Wishlist" value="0" />
// // // // //                             </div>

// // // // //                             {/* Edit Button */}
// // // // //                             {!isEditing ? (
// // // // //                                 <button
// // // // //                                     onClick={handleEdit}
// // // // //                                     className="w-full mt-6 px-6 py-3 bg-sky-600 text-white rounded-xl font-bold hover:bg-sky-700 transition-colors flex items-center justify-center gap-2"
// // // // //                                 >
// // // // //                                     <Edit2 className="w-5 h-5" />
// // // // //                                     Edit Profil
// // // // //                                 </button>
// // // // //                             ) : (
// // // // //                                 <div className="flex gap-3 mt-6">
// // // // //                                     <button
// // // // //                                         onClick={handleSave}
// // // // //                                         className="flex-1 px-6 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
// // // // //                                     >
// // // // //                                         <Save className="w-5 h-5" />
// // // // //                                         Simpan
// // // // //                                     </button>
// // // // //                                     <button
// // // // //                                         onClick={handleCancel}
// // // // //                                         className="px-6 py-3 bg-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-300 transition-colors"
// // // // //                                     >
// // // // //                                         <X className="w-5 h-5" />
// // // // //                                     </button>
// // // // //                                 </div>
// // // // //                             )}
// // // // //                         </div>
// // // // //                     </div>

// // // // //                     {/* Right Column - Details & Orders */}
// // // // //                     <div className="lg:col-span-2 space-y-6">
// // // // //                         {/* Account Details */}
// // // // //                         <div className="bg-white rounded-2xl p-8 shadow-md border-2 border-slate-200">
// // // // //                             <h2 className="text-2xl font-black text-slate-900 mb-8">Detail Akun</h2>

// // // // //                             <div className="space-y-6">
// // // // //                                 <InfoRow
// // // // //                                     icon={<User className="w-6 h-6" />}
// // // // //                                     label="Nama Lengkap"
// // // // //                                     value={isEditing ? editData.name : userData.name}
// // // // //                                     isEditing={isEditing}
// // // // //                                     onChange={(value) => handleChange('name', value)}
// // // // //                                 />
// // // // //                                 <InfoRow
// // // // //                                     icon={<Mail className="w-6 h-6" />}
// // // // //                                     label="Email"
// // // // //                                     value={isEditing ? editData.email : userData.email}
// // // // //                                     isEditing={isEditing}
// // // // //                                     onChange={(value) => handleChange('email', value)}
// // // // //                                     type="email"
// // // // //                                 />
// // // // //                                 <InfoRow
// // // // //                                     icon={<Phone className="w-6 h-6" />}
// // // // //                                     label="Nomor Telepon"
// // // // //                                     value={isEditing ? editData.phone : userData.phone}
// // // // //                                     isEditing={isEditing}
// // // // //                                     onChange={(value) => handleChange('phone', value)}
// // // // //                                     type="tel"
// // // // //                                 />
// // // // //                                 <InfoRow
// // // // //                                     icon={<MapPin className="w-6 h-6" />}
// // // // //                                     label="Alamat"
// // // // //                                     value={isEditing ? editData.address : userData.address}
// // // // //                                     isEditing={isEditing}
// // // // //                                     onChange={(value) => handleChange('address', value)}
// // // // //                                     multiline
// // // // //                                 />
// // // // //                             </div>
// // // // //                         </div>

// // // // //                         {/* Order History */}
// // // // //                         <div className="bg-white rounded-2xl p-8 shadow-md border-2 border-slate-200">
// // // // //                             <div className="flex items-center justify-between mb-8">
// // // // //                                 <h2 className="text-2xl font-black text-slate-900">Riwayat Pesanan</h2>
// // // // //                                 <button className="text-sky-600 font-bold hover:text-sky-700 flex items-center gap-2 text-sm">
// // // // //                                     Refresh
// // // // //                                     <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// // // // //                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
// // // // //                                     </svg>
// // // // //                                 </button>
// // // // //                             </div>

// // // // //                             {/* Empty State */}
// // // // //                             <div className="text-center py-12">
// // // // //                                 <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
// // // // //                                     <Package className="w-10 h-10 text-slate-400" />
// // // // //                                 </div>
// // // // //                                 <h3 className="text-lg font-bold text-slate-900 mb-2">Belum Ada Pesanan</h3>
// // // // //                                 <p className="text-slate-600 mb-6 text-sm">Mulai berbelanja untuk melihat riwayat pesanan!</p>
// // // // //                                 <button className="px-6 py-3 bg-sky-600 text-white rounded-xl font-bold hover:bg-sky-700 transition-colors text-sm">
// // // // //                                     Mulai Belanja
// // // // //                                 </button>
// // // // //                             </div>
// // // // //                         </div>
// // // // //                     </div>
// // // // //                 </div>
// // // // //             </div>
// // // // //         </div>
// // // // //     );
// // // // // };

// // // // // const InfoRow = ({ icon, label, value, isEditing, onChange, type = 'text', multiline = false }) => (
// // // // //     <div className="flex items-start gap-4 pb-6 border-b-2 border-slate-100 last:border-0">
// // // // //         <div className="w-12 h-12 bg-sky-50 rounded-xl flex items-center justify-center text-sky-600 flex-shrink-0">
// // // // //             {icon}
// // // // //         </div>
// // // // //         <div className="flex-1 min-w-0">
// // // // //             <p className="text-sm font-bold text-slate-600 mb-2">{label}</p>
// // // // //             {isEditing ? (
// // // // //                 multiline ? (
// // // // //                     <textarea
// // // // //                         value={value}
// // // // //                         onChange={(e) => onChange(e.target.value)}
// // // // //                         className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 font-medium text-slate-900"
// // // // //                         rows={3}
// // // // //                     />
// // // // //                 ) : (
// // // // //                     <input
// // // // //                         type={type}
// // // // //                         value={value}
// // // // //                         onChange={(e) => onChange(e.target.value)}
// // // // //                         className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 font-medium text-slate-900"
// // // // //                     />
// // // // //                 )
// // // // //             ) : (
// // // // //                 <p className="text-base font-bold text-slate-900">{value}</p>
// // // // //             )}
// // // // //         </div>
// // // // //     </div>
// // // // // );

// // // // // const StatItem = ({ label, value }) => (
// // // // //     <div className="flex justify-between items-center py-2">
// // // // //         <span className="text-slate-600 text-sm">{label}</span>
// // // // //         <span className="text-lg font-black text-slate-900">{value}</span>
// // // // //     </div>
// // // // // );

// // // // // export default ProfilePage;

// // // // // src/pages/ProfilePage.jsx - FIXED HEADER OVERLAP & BUTTON
// // // // import { useState, useEffect } from 'react';
// // // // import { User, Mail, Phone, MapPin, Package, Edit2, Save, X, Camera, ShoppingBag } from 'lucide-react';

// // // // const ProfilePage = ({ onNavigate }) => {
// // // //     const [isEditing, setIsEditing] = useState(false);
// // // //     const [userData, setUserData] = useState({
// // // //         name: 'Guest User',
// // // //         email: 'guest@wearify.com',
// // // //         phone: '+62 812 3456 7890',
// // // //         address: 'Jl. Fashion No. 123, Jakarta',
// // // //         memberSince: '2025',
// // // //         photo: null
// // // //     });

// // // //     const [editData, setEditData] = useState({ ...userData });

// // // //     useEffect(() => {
// // // //         const savedData = localStorage.getItem('wearify_user_profile');
// // // //         if (savedData) {
// // // //             try {
// // // //                 const parsed = JSON.parse(savedData);
// // // //                 setUserData(parsed);
// // // //                 setEditData(parsed);
// // // //             } catch (error) {
// // // //                 console.error('Error loading profile:', error);
// // // //             }
// // // //         }
// // // //     }, []);

// // // //     const handleEdit = () => {
// // // //         setEditData({ ...userData });
// // // //         setIsEditing(true);
// // // //     };

// // // //     const handleSave = () => {
// // // //         setUserData({ ...editData });
// // // //         localStorage.setItem('wearify_user_profile', JSON.stringify(editData));
// // // //         setIsEditing(false);
// // // //         alert('Profil berhasil diperbarui! ✅');
// // // //     };

// // // //     const handleCancel = () => {
// // // //         setEditData({ ...userData });
// // // //         setIsEditing(false);
// // // //     };

// // // //     const handleChange = (field, value) => {
// // // //         setEditData({ ...editData, [field]: value });
// // // //     };

// // // //     const handlePhotoUpload = (e) => {
// // // //         const file = e.target.files[0];
// // // //         if (file) {
// // // //             const reader = new FileReader();
// // // //             reader.onloadend = () => {
// // // //                 setEditData({ ...editData, photo: reader.result });
// // // //             };
// // // //             reader.readAsDataURL(file);
// // // //         }
// // // //     };

// // // //     // FIXED: Navigate to home when button clicked
// // // //     const handleStartShopping = () => {
// // // //         if (onNavigate) {
// // // //             onNavigate('home');
// // // //         }
// // // //     };

// // // //     return (
// // // //         <div className="min-h-screen bg-slate-50 pt-24 pb-32">
// // // //             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
// // // //                 {/* Page Title */}
// // // //                 <div className="mb-8">
// // // //                     <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-2">Profil Saya</h1>
// // // //                     <p className="text-base md:text-lg text-slate-600">Kelola informasi profil Anda</p>
// // // //                 </div>

// // // //                 <div className="grid lg:grid-cols-3 gap-8">
// // // //                     {/* Left Column - Profile Card */}
// // // //                     <div className="lg:col-span-1">
// // // //                         <div className="bg-white rounded-2xl p-6 md:p-8 shadow-md border-2 border-slate-200 lg:sticky lg:top-24">
// // // //                             {/* Avatar */}
// // // //                             <div className="text-center mb-6">
// // // //                                 <div className="relative inline-block">
// // // //                                     <div className="w-28 h-28 md:w-32 md:h-32 bg-sky-100 rounded-full flex items-center justify-center text-4xl md:text-5xl font-black overflow-hidden mx-auto border-4 border-sky-200">
// // // //                                         {userData.photo ? (
// // // //                                             <img src={userData.photo} alt="Profile" className="w-full h-full object-cover" />
// // // //                                         ) : (
// // // //                                             <span className="text-sky-600">{userData.name.charAt(0)}</span>
// // // //                                         )}
// // // //                                     </div>

// // // //                                     {isEditing && (
// // // //                                         <label className="absolute bottom-0 right-0 w-10 h-10 md:w-11 md:h-11 bg-sky-600 text-white rounded-full flex items-center justify-center cursor-pointer hover:bg-sky-700 transition-colors shadow-lg">
// // // //                                             <Camera className="w-4 h-4 md:w-5 md:h-5" />
// // // //                                             <input
// // // //                                                 type="file"
// // // //                                                 accept="image/*"
// // // //                                                 onChange={handlePhotoUpload}
// // // //                                                 className="hidden"
// // // //                                             />
// // // //                                         </label>
// // // //                                     )}
// // // //                                 </div>

// // // //                                 <h2 className="text-xl md:text-2xl font-black text-slate-900 mt-4 mb-1">{userData.name}</h2>
// // // //                                 <p className="text-sm md:text-base text-slate-600">Member sejak {userData.memberSince}</p>
// // // //                             </div>

// // // //                             {/* Stats */}
// // // //                             <div className="space-y-3 pt-6 border-t-2 border-slate-100">
// // // //                                 <StatItem label="Total Pesanan" value="0" />
// // // //                                 <StatItem label="Total Belanja" value="Rp 0" />
// // // //                                 <StatItem label="Wishlist" value="0" />
// // // //                             </div>

// // // //                             {/* Edit Button */}
// // // //                             {!isEditing ? (
// // // //                                 <button
// // // //                                     onClick={handleEdit}
// // // //                                     className="w-full mt-6 px-6 py-3 bg-sky-600 text-white rounded-xl font-bold hover:bg-sky-700 transition-colors flex items-center justify-center gap-2"
// // // //                                 >
// // // //                                     <Edit2 className="w-5 h-5" />
// // // //                                     Edit Profil
// // // //                                 </button>
// // // //                             ) : (
// // // //                                 <div className="flex gap-3 mt-6">
// // // //                                     <button
// // // //                                         onClick={handleSave}
// // // //                                         className="flex-1 px-6 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
// // // //                                     >
// // // //                                         <Save className="w-5 h-5" />
// // // //                                         Simpan
// // // //                                     </button>
// // // //                                     <button
// // // //                                         onClick={handleCancel}
// // // //                                         className="px-6 py-3 bg-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-300 transition-colors"
// // // //                                     >
// // // //                                         <X className="w-5 h-5" />
// // // //                                     </button>
// // // //                                 </div>
// // // //                             )}
// // // //                         </div>
// // // //                     </div>

// // // //                     {/* Right Column - Details & Orders */}
// // // //                     <div className="lg:col-span-2 space-y-6">
// // // //                         {/* Account Details - FIXED: Better title positioning */}
// // // //                         <div className="bg-white rounded-2xl p-6 md:p-8 shadow-md border-2 border-slate-200">
// // // //                             <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-6 md:mb-8">Detail Akun</h2>

// // // //                             <div className="space-y-6">
// // // //                                 <InfoRow
// // // //                                     icon={<User className="w-5 h-5 md:w-6 md:h-6" />}
// // // //                                     label="Nama Lengkap"
// // // //                                     value={isEditing ? editData.name : userData.name}
// // // //                                     isEditing={isEditing}
// // // //                                     onChange={(value) => handleChange('name', value)}
// // // //                                 />
// // // //                                 <InfoRow
// // // //                                     icon={<Mail className="w-5 h-5 md:w-6 md:h-6" />}
// // // //                                     label="Email"
// // // //                                     value={isEditing ? editData.email : userData.email}
// // // //                                     isEditing={isEditing}
// // // //                                     onChange={(value) => handleChange('email', value)}
// // // //                                     type="email"
// // // //                                 />
// // // //                                 <InfoRow
// // // //                                     icon={<Phone className="w-5 h-5 md:w-6 md:h-6" />}
// // // //                                     label="Nomor Telepon"
// // // //                                     value={isEditing ? editData.phone : userData.phone}
// // // //                                     isEditing={isEditing}
// // // //                                     onChange={(value) => handleChange('phone', value)}
// // // //                                     type="tel"
// // // //                                 />
// // // //                                 <InfoRow
// // // //                                     icon={<MapPin className="w-5 h-5 md:w-6 md:h-6" />}
// // // //                                     label="Alamat"
// // // //                                     value={isEditing ? editData.address : userData.address}
// // // //                                     isEditing={isEditing}
// // // //                                     onChange={(value) => handleChange('address', value)}
// // // //                                     multiline
// // // //                                 />
// // // //                             </div>
// // // //                         </div>

// // // //                         {/* Order History */}
// // // //                         <div className="bg-white rounded-2xl p-6 md:p-8 shadow-md border-2 border-slate-200">
// // // //                             <div className="flex items-center justify-between mb-6 md:mb-8">
// // // //                                 <h2 className="text-xl md:text-2xl font-black text-slate-900">Riwayat Pesanan</h2>
// // // //                             </div>

// // // //                             {/* Empty State - FIXED: Working button */}
// // // //                             <div className="text-center py-12">
// // // //                                 <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
// // // //                                     <Package className="w-10 h-10 text-slate-400" />
// // // //                                 </div>
// // // //                                 <h3 className="text-lg font-bold text-slate-900 mb-2">Belum Ada Pesanan</h3>
// // // //                                 <p className="text-slate-600 mb-6 text-sm">Mulai berbelanja untuk melihat riwayat pesanan!</p>
// // // //                                 <button
// // // //                                     onClick={handleStartShopping}
// // // //                                     className="px-6 py-3 bg-sky-600 text-white rounded-xl font-bold hover:bg-sky-700 transition-colors text-sm inline-flex items-center gap-2"
// // // //                                 >
// // // //                                     <ShoppingBag className="w-5 h-5" />
// // // //                                     Mulai Belanja
// // // //                                 </button>
// // // //                             </div>
// // // //                         </div>
// // // //                     </div>
// // // //                 </div>
// // // //             </div>
// // // //         </div>
// // // //     );
// // // // };

// // // // const InfoRow = ({ icon, label, value, isEditing, onChange, type = 'text', multiline = false }) => (
// // // //     <div className="flex items-start gap-3 md:gap-4 pb-6 border-b-2 border-slate-100 last:border-0">
// // // //         <div className="w-10 h-10 md:w-12 md:h-12 bg-sky-50 rounded-xl flex items-center justify-center text-sky-600 flex-shrink-0">
// // // //             {icon}
// // // //         </div>
// // // //         <div className="flex-1 min-w-0">
// // // //             <p className="text-xs md:text-sm font-bold text-slate-600 mb-2">{label}</p>
// // // //             {isEditing ? (
// // // //                 multiline ? (
// // // //                     <textarea
// // // //                         value={value}
// // // //                         onChange={(e) => onChange(e.target.value)}
// // // //                         className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 font-medium text-slate-900 text-sm md:text-base"
// // // //                         rows={3}
// // // //                     />
// // // //                 ) : (
// // // //                     <input
// // // //                         type={type}
// // // //                         value={value}
// // // //                         onChange={(e) => onChange(e.target.value)}
// // // //                         className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 font-medium text-slate-900 text-sm md:text-base"
// // // //                     />
// // // //                 )
// // // //             ) : (
// // // //                 <p className="text-sm md:text-base font-bold text-slate-900 break-words">{value}</p>
// // // //             )}
// // // //         </div>
// // // //     </div>
// // // // );

// // // // const StatItem = ({ label, value }) => (
// // // //     <div className="flex justify-between items-center py-2">
// // // //         <span className="text-slate-600 text-xs md:text-sm">{label}</span>
// // // //         <span className="text-base md:text-lg font-black text-slate-900">{value}</span>
// // // //     </div>
// // // // );

// // // // export default ProfilePage;

// // // // src/pages/ProfilePage.jsx - ULTIMATE FIX WITH HUGE PADDING
// // // import { useState, useEffect } from 'react';
// // // import { User, Mail, Phone, MapPin, Package, Edit2, Save, X, Camera, ShoppingBag } from 'lucide-react';

// // // const ProfilePage = ({ onNavigate }) => {
// // //     const [isEditing, setIsEditing] = useState(false);
// // //     const [userData, setUserData] = useState({
// // //         name: 'Guest User',
// // //         email: 'guest@wearify.com',
// // //         phone: '+62 812 3456 7890',
// // //         address: 'Jl. Fashion No. 123, Jakarta',
// // //         memberSince: '2025',
// // //         photo: null
// // //     });

// // //     const [editData, setEditData] = useState({ ...userData });

// // //     useEffect(() => {
// // //         const savedData = localStorage.getItem('wearify_user_profile');
// // //         if (savedData) {
// // //             try {
// // //                 const parsed = JSON.parse(savedData);
// // //                 setUserData(parsed);
// // //                 setEditData(parsed);
// // //             } catch (error) {
// // //                 console.error('Error loading profile:', error);
// // //             }
// // //         }
// // //     }, []);

// // //     const handleEdit = () => {
// // //         setEditData({ ...userData });
// // //         setIsEditing(true);
// // //     };

// // //     const handleSave = () => {
// // //         setUserData({ ...editData });
// // //         localStorage.setItem('wearify_user_profile', JSON.stringify(editData));
// // //         setIsEditing(false);
// // //         alert('Profil berhasil diperbarui! ✅');
// // //     };

// // //     const handleCancel = () => {
// // //         setEditData({ ...userData });
// // //         setIsEditing(false);
// // //     };

// // //     const handleChange = (field, value) => {
// // //         setEditData({ ...editData, [field]: value });
// // //     };

// // //     const handlePhotoUpload = (e) => {
// // //         const file = e.target.files[0];
// // //         if (file) {
// // //             const reader = new FileReader();
// // //             reader.onloadend = () => {
// // //                 setEditData({ ...editData, photo: reader.result });
// // //             };
// // //             reader.readAsDataURL(file);
// // //         }
// // //     };

// // //     const handleStartShopping = () => {
// // //         if (onNavigate) {
// // //             onNavigate('home');
// // //         }
// // //     };

// // //     return (
// // //         <div className="min-h-screen bg-slate-50 pt-32 pb-32">
// // //             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
// // //                 {/* Page Title - FIXED: HUGE TOP MARGIN */}
// // //                 <div className="mb-12">
// // //                     <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-3">Profil Saya</h1>
// // //                     <p className="text-base md:text-lg text-slate-600">Kelola informasi profil Anda</p>
// // //                 </div>

// // //                 <div className="grid lg:grid-cols-3 gap-8">
// // //                     {/* Left Column - Profile Card */}
// // //                     <div className="lg:col-span-1">
// // //                         <div className="bg-white rounded-2xl p-6 md:p-8 shadow-md border-2 border-slate-200">
// // //                             {/* Avatar */}
// // //                             <div className="text-center mb-6">
// // //                                 <div className="relative inline-block">
// // //                                     <div className="w-28 h-28 md:w-32 md:h-32 bg-sky-100 rounded-full flex items-center justify-center text-4xl md:text-5xl font-black overflow-hidden mx-auto border-4 border-sky-200">
// // //                                         {userData.photo ? (
// // //                                             <img src={userData.photo} alt="Profile" className="w-full h-full object-cover" />
// // //                                         ) : (
// // //                                             <span className="text-sky-600">{userData.name.charAt(0)}</span>
// // //                                         )}
// // //                                     </div>

// // //                                     {isEditing && (
// // //                                         <label className="absolute bottom-0 right-0 w-10 h-10 md:w-11 md:h-11 bg-sky-600 text-white rounded-full flex items-center justify-center cursor-pointer hover:bg-sky-700 transition-colors shadow-lg">
// // //                                             <Camera className="w-4 h-4 md:w-5 md:h-5" />
// // //                                             <input
// // //                                                 type="file"
// // //                                                 accept="image/*"
// // //                                                 onChange={handlePhotoUpload}
// // //                                                 className="hidden"
// // //                                             />
// // //                                         </label>
// // //                                     )}
// // //                                 </div>

// // //                                 <h2 className="text-xl md:text-2xl font-black text-slate-900 mt-4 mb-1">{userData.name}</h2>
// // //                                 <p className="text-sm md:text-base text-slate-600">Member sejak {userData.memberSince}</p>
// // //                             </div>

// // //                             {/* Stats */}
// // //                             <div className="space-y-3 pt-6 border-t-2 border-slate-100">
// // //                                 <StatItem label="Total Pesanan" value="0" />
// // //                                 <StatItem label="Total Belanja" value="Rp 0" />
// // //                                 <StatItem label="Wishlist" value="0" />
// // //                             </div>

// // //                             {/* Edit Button */}
// // //                             {!isEditing ? (
// // //                                 <button
// // //                                     onClick={handleEdit}
// // //                                     className="w-full mt-6 px-6 py-3 bg-sky-600 text-white rounded-xl font-bold hover:bg-sky-700 transition-colors flex items-center justify-center gap-2"
// // //                                 >
// // //                                     <Edit2 className="w-5 h-5" />
// // //                                     Edit Profil
// // //                                 </button>
// // //                             ) : (
// // //                                 <div className="flex gap-3 mt-6">
// // //                                     <button
// // //                                         onClick={handleSave}
// // //                                         className="flex-1 px-6 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
// // //                                     >
// // //                                         <Save className="w-5 h-5" />
// // //                                         Simpan
// // //                                     </button>
// // //                                     <button
// // //                                         onClick={handleCancel}
// // //                                         className="px-6 py-3 bg-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-300 transition-colors"
// // //                                     >
// // //                                         <X className="w-5 h-5" />
// // //                                     </button>
// // //                                 </div>
// // //                             )}
// // //                         </div>
// // //                     </div>

// // //                     {/* Right Column - Details & Orders */}
// // //                     <div className="lg:col-span-2 space-y-6">
// // //                         {/* Account Details - FIXED: BETTER SPACING */}
// // //                         <div className="bg-white rounded-2xl p-6 md:p-8 shadow-md border-2 border-slate-200">
// // //                             <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-8">Detail Akun</h2>

// // //                             <div className="space-y-6">
// // //                                 <InfoRow
// // //                                     icon={<User className="w-5 h-5 md:w-6 md:h-6" />}
// // //                                     label="Nama Lengkap"
// // //                                     value={isEditing ? editData.name : userData.name}
// // //                                     isEditing={isEditing}
// // //                                     onChange={(value) => handleChange('name', value)}
// // //                                 />
// // //                                 <InfoRow
// // //                                     icon={<Mail className="w-5 h-5 md:w-6 md:h-6" />}
// // //                                     label="Email"
// // //                                     value={isEditing ? editData.email : userData.email}
// // //                                     isEditing={isEditing}
// // //                                     onChange={(value) => handleChange('email', value)}
// // //                                     type="email"
// // //                                 />
// // //                                 <InfoRow
// // //                                     icon={<Phone className="w-5 h-5 md:w-6 md:h-6" />}
// // //                                     label="Nomor Telepon"
// // //                                     value={isEditing ? editData.phone : userData.phone}
// // //                                     isEditing={isEditing}
// // //                                     onChange={(value) => handleChange('phone', value)}
// // //                                     type="tel"
// // //                                 />
// // //                                 <InfoRow
// // //                                     icon={<MapPin className="w-5 h-5 md:w-6 md:h-6" />}
// // //                                     label="Alamat"
// // //                                     value={isEditing ? editData.address : userData.address}
// // //                                     isEditing={isEditing}
// // //                                     onChange={(value) => handleChange('address', value)}
// // //                                     multiline
// // //                                 />
// // //                             </div>
// // //                         </div>

// // //                         {/* Order History */}
// // //                         <div className="bg-white rounded-2xl p-6 md:p-8 shadow-md border-2 border-slate-200">
// // //                             <div className="flex items-center justify-between mb-8">
// // //                                 <h2 className="text-xl md:text-2xl font-black text-slate-900">Riwayat Pesanan</h2>
// // //                             </div>

// // //                             <div className="text-center py-12">
// // //                                 <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
// // //                                     <Package className="w-10 h-10 text-slate-400" />
// // //                                 </div>
// // //                                 <h3 className="text-lg font-bold text-slate-900 mb-2">Belum Ada Pesanan</h3>
// // //                                 <p className="text-slate-600 mb-6 text-sm">Mulai berbelanja untuk melihat riwayat pesanan!</p>
// // //                                 <button
// // //                                     onClick={handleStartShopping}
// // //                                     className="px-6 py-3 bg-sky-600 text-white rounded-xl font-bold hover:bg-sky-700 transition-colors text-sm inline-flex items-center gap-2"
// // //                                 >
// // //                                     <ShoppingBag className="w-5 h-5" />
// // //                                     Mulai Belanja
// // //                                 </button>
// // //                             </div>
// // //                         </div>
// // //                     </div>
// // //                 </div>
// // //             </div>
// // //         </div>
// // //     );
// // // };

// // // const InfoRow = ({ icon, label, value, isEditing, onChange, type = 'text', multiline = false }) => (
// // //     <div className="flex items-start gap-3 md:gap-4 pb-6 border-b-2 border-slate-100 last:border-0">
// // //         <div className="w-10 h-10 md:w-12 md:h-12 bg-sky-50 rounded-xl flex items-center justify-center text-sky-600 flex-shrink-0">
// // //             {icon}
// // //         </div>
// // //         <div className="flex-1 min-w-0">
// // //             <p className="text-xs md:text-sm font-bold text-slate-600 mb-2">{label}</p>
// // //             {isEditing ? (
// // //                 multiline ? (
// // //                     <textarea
// // //                         value={value}
// // //                         onChange={(e) => onChange(e.target.value)}
// // //                         className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 font-medium text-slate-900 text-sm md:text-base"
// // //                         rows={3}
// // //                     />
// // //                 ) : (
// // //                     <input
// // //                         type={type}
// // //                         value={value}
// // //                         onChange={(e) => onChange(e.target.value)}
// // //                         className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 font-medium text-slate-900 text-sm md:text-base"
// // //                     />
// // //                 )
// // //             ) : (
// // //                 <p className="text-sm md:text-base font-bold text-slate-900 break-words">{value}</p>
// // //             )}
// // //         </div>
// // //     </div>
// // // );

// // // const StatItem = ({ label, value }) => (
// // //     <div className="flex justify-between items-center py-2">
// // //         <span className="text-slate-600 text-xs md:text-sm">{label}</span>
// // //         <span className="text-base md:text-lg font-black text-slate-900">{value}</span>
// // //     </div>
// // // );

// // // export default ProfilePage;

// // // src/pages/ProfilePage.jsx - SIMPLE & CLEAN VERSION
// // import { useState, useEffect } from 'react';
// // import { User, Mail, Phone, MapPin, Edit2, Save, X, Camera, ShoppingBag } from 'lucide-react';

// // const ProfilePage = ({ onNavigate }) => {
// //     const [isEditing, setIsEditing] = useState(false);
// //     const [userData, setUserData] = useState({
// //         name: 'Guest User',
// //         email: 'guest@wearify.com',
// //         phone: '+62 812 3456 7890',
// //         address: 'Jl. Fashion No. 123, Jakarta',
// //         memberSince: '2025',
// //         photo: null
// //     });

// //     const [editData, setEditData] = useState({ ...userData });

// //     useEffect(() => {
// //         const savedData = localStorage.getItem('wearify_user_profile');
// //         if (savedData) {
// //             try {
// //                 const parsed = JSON.parse(savedData);
// //                 setUserData(parsed);
// //                 setEditData(parsed);
// //             } catch (error) {
// //                 console.error('Error loading profile:', error);
// //             }
// //         }
// //     }, []);

// //     const handleEdit = () => {
// //         setEditData({ ...userData });
// //         setIsEditing(true);
// //     };

// //     const handleSave = () => {
// //         setUserData({ ...editData });
// //         localStorage.setItem('wearify_user_profile', JSON.stringify(editData));
// //         setIsEditing(false);
// //         alert('✅ Profil berhasil diperbarui!');
// //     };

// //     const handleCancel = () => {
// //         setEditData({ ...userData });
// //         setIsEditing(false);
// //     };

// //     const handleChange = (field, value) => {
// //         setEditData({ ...editData, [field]: value });
// //     };

// //     const handlePhotoUpload = (e) => {
// //         const file = e.target.files[0];
// //         if (file) {
// //             const reader = new FileReader();
// //             reader.onloadend = () => {
// //                 setEditData({ ...editData, photo: reader.result });
// //             };
// //             reader.readAsDataURL(file);
// //         }
// //     };

// //     const handleStartShopping = () => {
// //         if (onNavigate) {
// //             onNavigate('home');
// //         }
// //     };

// //     return (
// //         <div className="min-h-screen bg-slate-50 pt-32 pb-32">
// //             <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
// //                 {/* Page Title */}
// //                 <div className="mb-12">
// //                     <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-3">Profil Saya</h1>
// //                     <p className="text-base md:text-lg text-slate-600">Kelola informasi profil Anda</p>
// //                 </div>

// //                 {/* Profile Card */}
// //                 <div className="bg-white rounded-2xl p-8 shadow-md border-2 border-slate-200 mb-8">
// //                     {/* Avatar Section */}
// //                     <div className="flex flex-col md:flex-row items-center gap-8 mb-8 pb-8 border-b-2 border-slate-100">
// //                         <div className="relative">
// //                             <div className="w-32 h-32 bg-sky-100 rounded-full flex items-center justify-center text-5xl font-black overflow-hidden border-4 border-sky-200">
// //                                 {userData.photo ? (
// //                                     <img src={userData.photo} alt="Profile" className="w-full h-full object-cover" />
// //                                 ) : (
// //                                     <span className="text-sky-600">{userData.name.charAt(0)}</span>
// //                                 )}
// //                             </div>

// //                             {isEditing && (
// //                                 <label className="absolute bottom-0 right-0 w-11 h-11 bg-sky-600 text-white rounded-full flex items-center justify-center cursor-pointer hover:bg-sky-700 transition-colors shadow-lg">
// //                                     <Camera className="w-5 h-5" />
// //                                     <input
// //                                         type="file"
// //                                         accept="image/*"
// //                                         onChange={handlePhotoUpload}
// //                                         className="hidden"
// //                                     />
// //                                 </label>
// //                             )}
// //                         </div>

// //                         <div className="flex-1 text-center md:text-left">
// //                             <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">{userData.name}</h2>
// //                             <p className="text-slate-600 mb-4">Member sejak {userData.memberSince}</p>

// //                             {!isEditing ? (
// //                                 <button
// //                                     onClick={handleEdit}
// //                                     className="px-6 py-3 bg-sky-600 text-white rounded-xl font-bold hover:bg-sky-700 transition-colors inline-flex items-center gap-2"
// //                                 >
// //                                     <Edit2 className="w-5 h-5" />
// //                                     Edit Profil
// //                                 </button>
// //                             ) : (
// //                                 <div className="flex gap-3 justify-center md:justify-start">
// //                                     <button
// //                                         onClick={handleSave}
// //                                         className="px-6 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-colors inline-flex items-center gap-2"
// //                                     >
// //                                         <Save className="w-5 h-5" />
// //                                         Simpan
// //                                     </button>
// //                                     <button
// //                                         onClick={handleCancel}
// //                                         className="px-6 py-3 bg-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-300 transition-colors inline-flex items-center gap-2"
// //                                     >
// //                                         <X className="w-5 h-5" />
// //                                         Batal
// //                                     </button>
// //                                 </div>
// //                             )}
// //                         </div>
// //                     </div>

// //                     {/* Profile Information */}
// //                     <div className="space-y-6">
// //                         <InfoRow
// //                             icon={<User className="w-6 h-6" />}
// //                             label="Nama Lengkap"
// //                             value={isEditing ? editData.name : userData.name}
// //                             isEditing={isEditing}
// //                             onChange={(value) => handleChange('name', value)}
// //                         />
// //                         <InfoRow
// //                             icon={<Mail className="w-6 h-6" />}
// //                             label="Email"
// //                             value={isEditing ? editData.email : userData.email}
// //                             isEditing={isEditing}
// //                             onChange={(value) => handleChange('email', value)}
// //                             type="email"
// //                         />
// //                         <InfoRow
// //                             icon={<Phone className="w-6 h-6" />}
// //                             label="Nomor Telepon"
// //                             value={isEditing ? editData.phone : userData.phone}
// //                             isEditing={isEditing}
// //                             onChange={(value) => handleChange('phone', value)}
// //                             type="tel"
// //                         />
// //                         <InfoRow
// //                             icon={<MapPin className="w-6 h-6" />}
// //                             label="Alamat"
// //                             value={isEditing ? editData.address : userData.address}
// //                             isEditing={isEditing}
// //                             onChange={(value) => handleChange('address', value)}
// //                             multiline
// //                         />
// //                     </div>
// //                 </div>

// //                 {/* Call to Action */}
// //                 <div className="bg-gradient-to-r from-sky-600 to-blue-600 rounded-2xl p-8 text-center text-white">
// //                     <ShoppingBag className="w-16 h-16 mx-auto mb-4 opacity-90" />
// //                     <h3 className="text-2xl font-black mb-3">Mulai Belanja Sekarang!</h3>
// //                     <p className="text-sky-100 mb-6 max-w-md mx-auto">
// //                         Temukan koleksi fashion terbaru dan dapatkan penawaran menarik.
// //                     </p>
// //                     <button
// //                         onClick={handleStartShopping}
// //                         className="px-8 py-4 bg-white text-sky-600 rounded-xl font-bold hover:bg-sky-50 transition-colors inline-flex items-center gap-2 shadow-lg"
// //                     >
// //                         <ShoppingBag className="w-5 h-5" />
// //                         Jelajahi Produk
// //                     </button>
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // };

// // const InfoRow = ({ icon, label, value, isEditing, onChange, type = 'text', multiline = false }) => (
// //     <div className="flex items-start gap-4 pb-6 border-b-2 border-slate-100 last:border-0">
// //         <div className="w-12 h-12 bg-sky-50 rounded-xl flex items-center justify-center text-sky-600 flex-shrink-0">
// //             {icon}
// //         </div>
// //         <div className="flex-1 min-w-0">
// //             <p className="text-sm font-bold text-slate-600 mb-2">{label}</p>
// //             {isEditing ? (
// //                 multiline ? (
// //                     <textarea
// //                         value={value}
// //                         onChange={(e) => onChange(e.target.value)}
// //                         className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 font-medium text-slate-900"
// //                         rows={3}
// //                     />
// //                 ) : (
// //                     <input
// //                         type={type}
// //                         value={value}
// //                         onChange={(e) => onChange(e.target.value)}
// //                         className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 font-medium text-slate-900"
// //                     />
// //                 )
// //             ) : (
// //                 <p className="text-base font-bold text-slate-900 break-words">{value}</p>
// //             )}
// //         </div>
// //     </div>
// // );

// // export default ProfilePage;

// // src/pages/ProfilePage.jsx - PERFECT VERSION
// import { useState, useEffect } from 'react';
// import { User, Mail, Phone, MapPin, Edit2, Save, X, Camera, ShoppingBag } from 'lucide-react';

// const ProfilePage = ({ onNavigate }) => {
//     const [isEditing, setIsEditing] = useState(false);
//     const [userData, setUserData] = useState({
//         name: 'Guest User',
//         email: 'guest@wearify.com',
//         phone: '+62 812 3456 7890',
//         address: 'Jl. Fashion No. 123, Jakarta',
//         memberSince: '2025',
//         photo: null
//     });

//     const [editData, setEditData] = useState({ ...userData });

//     useEffect(() => {
//         const savedData = localStorage.getItem('wearify_user_profile');
//         if (savedData) {
//             try {
//                 const parsed = JSON.parse(savedData);
//                 setUserData(parsed);
//                 setEditData(parsed);
//             } catch (error) {
//                 console.error('Error loading profile:', error);
//             }
//         }
//     }, []);

//     const handleEdit = () => {
//         setEditData({ ...userData });
//         setIsEditing(true);
//     };

//     const handleSave = () => {
//         setUserData({ ...editData });
//         localStorage.setItem('wearify_user_profile', JSON.stringify(editData));
//         setIsEditing(false);
//         alert('✅ Profil berhasil diperbarui!');
//     };

//     const handleCancel = () => {
//         setEditData({ ...userData });
//         setIsEditing(false);
//     };

//     const handleChange = (field, value) => {
//         setEditData({ ...editData, [field]: value });
//     };

//     const handlePhotoUpload = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             const reader = new FileReader();
//             reader.onloadend = () => {
//                 setEditData({ ...editData, photo: reader.result });
//             };
//             reader.readAsDataURL(file);
//         }
//     };

//     const handleStartShopping = () => {
//         if (onNavigate) {
//             onNavigate('home');
//         }
//     };

//     return (
//         <div className="min-h-screen bg-slate-50 pt-24 pb-32">
//             <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//                 {/* Profile Card */}
//                 <div className="bg-white rounded-2xl p-8 shadow-md border-2 border-slate-200 mb-8">
//                     {/* Avatar Section - CENTERED */}
//                     <div className="flex flex-col items-center mb-8 pb-8 border-b-2 border-slate-100">
//                         <div className="relative mb-6">
//                             <div className="w-32 h-32 bg-sky-100 rounded-full flex items-center justify-center text-5xl font-black overflow-hidden border-4 border-sky-200">
//                                 {userData.photo ? (
//                                     <img src={userData.photo} alt="Profile" className="w-full h-full object-cover" />
//                                 ) : (
//                                     <span className="text-sky-600">{userData.name.charAt(0)}</span>
//                                 )}
//                             </div>

//                             {isEditing && (
//                                 <label className="absolute bottom-0 right-0 w-11 h-11 bg-sky-600 text-white rounded-full flex items-center justify-center cursor-pointer hover:bg-sky-700 transition-colors shadow-lg">
//                                     <Camera className="w-5 h-5" />
//                                     <input
//                                         type="file"
//                                         accept="image/*"
//                                         onChange={handlePhotoUpload}
//                                         className="hidden"
//                                     />
//                                 </label>
//                             )}
//                         </div>

//                         <div className="text-center">
//                             <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">{userData.name}</h2>
//                             <p className="text-slate-600 mb-6">Member sejak {userData.memberSince}</p>

//                             {!isEditing ? (
//                                 <button
//                                     onClick={handleEdit}
//                                     className="px-6 py-3 bg-sky-600 text-white rounded-xl font-bold hover:bg-sky-700 transition-colors inline-flex items-center gap-2"
//                                 >
//                                     <Edit2 className="w-5 h-5" />
//                                     Edit Profil
//                                 </button>
//                             ) : (
//                                 <div className="flex gap-3 justify-center">
//                                     <button
//                                         onClick={handleSave}
//                                         className="px-6 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-colors inline-flex items-center gap-2"
//                                     >
//                                         <Save className="w-5 h-5" />
//                                         Simpan
//                                     </button>
//                                     <button
//                                         onClick={handleCancel}
//                                         className="px-6 py-3 bg-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-300 transition-colors inline-flex items-center gap-2"
//                                     >
//                                         <X className="w-5 h-5" />
//                                         Batal
//                                     </button>
//                                 </div>
//                             )}
//                         </div>
//                     </div>

//                     {/* Profile Information */}
//                     <div className="space-y-6">
//                         <InfoRow
//                             icon={<User className="w-6 h-6" />}
//                             label="Nama Lengkap"
//                             value={isEditing ? editData.name : userData.name}
//                             isEditing={isEditing}
//                             onChange={(value) => handleChange('name', value)}
//                         />
//                         <InfoRow
//                             icon={<Mail className="w-6 h-6" />}
//                             label="Email"
//                             value={isEditing ? editData.email : userData.email}
//                             isEditing={isEditing}
//                             onChange={(value) => handleChange('email', value)}
//                             type="email"
//                         />
//                         <InfoRow
//                             icon={<Phone className="w-6 h-6" />}
//                             label="Nomor Telepon"
//                             value={isEditing ? editData.phone : userData.phone}
//                             isEditing={isEditing}
//                             onChange={(value) => handleChange('phone', value)}
//                             type="tel"
//                         />
//                         <InfoRow
//                             icon={<MapPin className="w-6 h-6" />}
//                             label="Alamat"
//                             value={isEditing ? editData.address : userData.address}
//                             isEditing={isEditing}
//                             onChange={(value) => handleChange('address', value)}
//                             multiline
//                         />
//                     </div>
//                 </div>

//                 {/* Call to Action - CENTERED */}
//                 <div className="bg-gradient-to-r from-sky-600 to-blue-600 rounded-2xl p-8 text-center text-white">
//                     <div className="flex justify-center mb-4">
//                         <ShoppingBag className="w-16 h-16 opacity-90" />
//                     </div>
//                     <h3 className="text-2xl font-black mb-3">Mulai Belanja Sekarang!</h3>
//                     <p className="text-sky-100 mb-6 max-w-md mx-auto">
//                         Temukan koleksi fashion terbaru dan dapatkan penawaran menarik.
//                     </p>
//                     <button
//                         onClick={handleStartShopping}
//                         className="px-8 py-4 bg-white text-sky-600 rounded-xl font-bold hover:bg-sky-50 transition-colors inline-flex items-center gap-2 shadow-lg mx-auto"
//                     >
//                         <ShoppingBag className="w-5 h-5" />
//                         Jelajahi Produk
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// <div className="min-h-screen bg-slate-50 pt-24 pb-32">
//     {/* Content langsung start tanpa hero */}
// </div>

// const InfoRow = ({ icon, label, value, isEditing, onChange, type = 'text', multiline = false }) => (
//     <div className="flex items-start gap-4 pb-6 border-b-2 border-slate-100 last:border-0">
//         <div className="w-12 h-12 bg-sky-50 rounded-xl flex items-center justify-center text-sky-600 flex-shrink-0">
//             {icon}
//         </div>
//         <div className="flex-1 min-w-0">
//             <p className="text-sm font-bold text-slate-600 mb-2">{label}</p>
//             {isEditing ? (
//                 multiline ? (
//                     <textarea
//                         value={value}
//                         onChange={(e) => onChange(e.target.value)}
//                         className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 font-medium text-slate-900"
//                         rows={3}
//                     />
//                 ) : (
//                     <input
//                         type={type}
//                         value={value}
//                         onChange={(e) => onChange(e.target.value)}
//                         className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 font-medium text-slate-900"
//                     />
//                 )
//             ) : (
//                 <p className="text-base font-bold text-slate-900 break-words">{value}</p>
//             )}
//         </div>
//     </div>
// );

// export default ProfilePage;

// src/pages/ProfilePage.jsx - TRULY CENTERED
import { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Edit2, Save, X, Camera, ShoppingBag } from 'lucide-react';

const ProfilePage = ({ onNavigate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [userData, setUserData] = useState({
        name: 'Desca Rahma',
        email: 'descarahma13@gmail.com',
        phone: '+62 812 3456 7890',
        address: 'Jl. Fashion No. 123, Jakarta',
        memberSince: '2025',
        photo: null
    });

    const [editData, setEditData] = useState({ ...userData });

    useEffect(() => {
        const savedData = localStorage.getItem('wearify_user_profile');
        if (savedData) {
            try {
                const parsed = JSON.parse(savedData);
                setUserData(parsed);
                setEditData(parsed);
            } catch (error) {
                console.error('Error loading profile:', error);
            }
        }
    }, []);

    const handleEdit = () => {
        setEditData({ ...userData });
        setIsEditing(true);
    };

    const handleSave = () => {
        setUserData({ ...editData });
        localStorage.setItem('wearify_user_profile', JSON.stringify(editData));
        setIsEditing(false);
        alert('✅ Profil berhasil diperbarui!');
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
            onNavigate('home');
        }
    };

    return (
        // <div className="min-h-screen bg-slate-50 pt-28 pb-32 md:pt-32">
        <div className="min-h-screen bg-slate-50 mt-[90px] pb-32">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Profile Card - EVERYTHING CENTERED */}
                <div className="bg-white rounded-2xl p-8 shadow-md border-2 border-slate-200 mb-8 mt-6">
                    {/* Avatar Section - CENTERED */}
                    <div className="flex flex-col items-center text-center mb-8 pb-8 border-b-2 border-slate-100">
                        <div className="relative mb-6">
                            <div className="w-32 h-32 bg-sky-100 rounded-full flex items-center justify-center text-5xl font-black overflow-hidden border-4 border-sky-200">
                                {userData.photo ? (
                                    <img src={userData.photo} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-sky-600">{userData.name.charAt(0)}</span>
                                )}
                            </div>

                            {isEditing && (
                                <label className="absolute bottom-0 right-0 w-11 h-11 bg-sky-600 text-white rounded-full flex items-center justify-center cursor-pointer hover:bg-sky-700 transition-colors shadow-lg">
                                    <Camera className="w-5 h-5" />
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handlePhotoUpload}
                                        className="hidden"
                                    />
                                </label>
                            )}
                        </div>

                        <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">{userData.name}</h2>
                        <p className="text-slate-600 mb-6">Member sejak {userData.memberSince}</p>

                        {!isEditing ? (
                            <button
                                onClick={handleEdit}
                                className="px-6 py-3 bg-sky-600 text-white rounded-xl font-bold hover:bg-sky-700 transition-colors inline-flex items-center gap-2"
                            >
                                <Edit2 className="w-5 h-5" />
                                Edit Profil
                            </button>
                        ) : (
                            <div className="flex gap-3">
                                <button
                                    onClick={handleSave}
                                    className="px-6 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-colors inline-flex items-center gap-2"
                                >
                                    <Save className="w-5 h-5" />
                                    Simpan
                                </button>
                                <button
                                    onClick={handleCancel}
                                    className="px-6 py-3 bg-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-300 transition-colors inline-flex items-center gap-2"
                                >
                                    <X className="w-5 h-5" />
                                    Batal
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Profile Information */}
                    <div className="space-y-6">
                        <InfoRow
                            icon={<User className="w-6 h-6" />}
                            label="Nama Lengkap"
                            value={isEditing ? editData.name : userData.name}
                            isEditing={isEditing}
                            onChange={(value) => handleChange('name', value)}
                        />
                        <InfoRow
                            icon={<Mail className="w-6 h-6" />}
                            label="Email"
                            value={isEditing ? editData.email : userData.email}
                            isEditing={isEditing}
                            onChange={(value) => handleChange('email', value)}
                            type="email"
                        />
                        <InfoRow
                            icon={<Phone className="w-6 h-6" />}
                            label="Nomor Telepon"
                            value={isEditing ? editData.phone : userData.phone}
                            isEditing={isEditing}
                            onChange={(value) => handleChange('phone', value)}
                            type="tel"
                        />
                        <InfoRow
                            icon={<MapPin className="w-6 h-6" />}
                            label="Alamat"
                            value={isEditing ? editData.address : userData.address}
                            isEditing={isEditing}
                            onChange={(value) => handleChange('address', value)}
                            multiline
                        />
                    </div>
                </div>

                {/* Call to Action - EVERYTHING CENTERED */}
                <div className="bg-gradient-to-r from-sky-600 to-blue-600 rounded-2xl p-8 text-white">
                    <div className="flex flex-col items-center text-center">
                        <ShoppingBag className="w-16 h-16 opacity-90 mb-4" />
                        <h3 className="text-2xl font-black mb-3">Mulai Belanja Sekarang!</h3>
                        <p className="text-sky-100 mb-6 max-w-md">
                            Temukan koleksi fashion terbaru dan dapatkan penawaran menarik.
                        </p>
                        <button
                            onClick={handleStartShopping}
                            className="px-8 py-4 bg-white text-sky-600 rounded-xl font-bold hover:bg-sky-50 transition-colors inline-flex items-center gap-2 shadow-lg"
                        >
                            <ShoppingBag className="w-5 h-5" />
                            Jelajahi Produk
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const InfoRow = ({ icon, label, value, isEditing, onChange, type = 'text', multiline = false }) => (
    <div className="flex items-start gap-4 pb-6 border-b-2 border-slate-100 last:border-0">
        <div className="w-12 h-12 bg-sky-50 rounded-xl flex items-center justify-center text-sky-600 flex-shrink-0">
            {icon}
        </div>
        <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-slate-600 mb-2">{label}</p>
            {isEditing ? (
                multiline ? (
                    <textarea
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 font-medium text-slate-900"
                        rows={3}
                    />
                ) : (
                    <input
                        type={type}
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 font-medium text-slate-900"
                    />
                )
            ) : (
                <p className="text-base font-bold text-slate-900 break-words">{value}</p>
            )}
        </div>
    </div>
);

export default ProfilePage;