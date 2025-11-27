import { useState } from 'react';
import { User, Phone, Mail, MapPin } from 'lucide-react';
import { getUserProfile, saveUserProfile } from '../../services/userService';
import { isValidEmail, isValidPhone } from '../../utils/helpers';

export default function CheckoutForm({ onSubmit, loading }) {
    const userProfile = getUserProfile();

    const [formData, setFormData] = useState({
        customer_name: userProfile.username !== 'Guest User' ? userProfile.username : '',
        customer_email: userProfile.email || '',
        customer_phone: userProfile.phone || '',
        shipping_address: userProfile.address || '',
    });

    const [errors, setErrors] = useState({});
    const [saveProfile, setSaveProfile] = useState(true);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Clear error when user types
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: '',
            }));
        }
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.customer_name.trim()) {
            newErrors.customer_name = 'Name is required';
        } else if (formData.customer_name.trim().length < 3) {
            newErrors.customer_name = 'Name must be at least 3 characters';
        }

        if (!formData.customer_phone.trim()) {
            newErrors.customer_phone = 'Phone number is required';
        } else if (!isValidPhone(formData.customer_phone)) {
            newErrors.customer_phone = 'Invalid phone number format (e.g., 08123456789)';
        }

        if (formData.customer_email && !isValidEmail(formData.customer_email)) {
            newErrors.customer_email = 'Invalid email format';
        }

        if (!formData.shipping_address.trim()) {
            newErrors.shipping_address = 'Shipping address is required';
        } else if (formData.shipping_address.trim().length < 10) {
            newErrors.shipping_address = 'Address must be at least 10 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validate()) {
            return;
        }

        // Save profile if checkbox is checked
        if (saveProfile) {
            saveUserProfile({
                username: formData.customer_name,
                email: formData.customer_email,
                phone: formData.customer_phone,
                address: formData.shipping_address,
            });
        }

        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h2 className="text-xl font-bold text-slate-800 mb-6">
                    Shipping Information
                </h2>

                {/* Name */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                        Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                            type="text"
                            name="customer_name"
                            value={formData.customer_name}
                            onChange={handleChange}
                            placeholder="John Doe"
                            className={`w-full pl-11 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${errors.customer_name ? 'border-red-500' : 'border-slate-300'
                                }`}
                        />
                    </div>
                    {errors.customer_name && (
                        <p className="text-red-500 text-sm mt-1">{errors.customer_name}</p>
                    )}
                </div>

                {/* Phone */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                        Phone Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                            type="tel"
                            name="customer_phone"
                            value={formData.customer_phone}
                            onChange={handleChange}
                            placeholder="08123456789"
                            className={`w-full pl-11 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${errors.customer_phone ? 'border-red-500' : 'border-slate-300'
                                }`}
                        />
                    </div>
                    {errors.customer_phone && (
                        <p className="text-red-500 text-sm mt-1">{errors.customer_phone}</p>
                    )}
                </div>

                {/* Email (Optional) */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                        Email (Optional)
                    </label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                            type="email"
                            name="customer_email"
                            value={formData.customer_email}
                            onChange={handleChange}
                            placeholder="john@example.com"
                            className={`w-full pl-11 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${errors.customer_email ? 'border-red-500' : 'border-slate-300'
                                }`}
                        />
                    </div>
                    {errors.customer_email && (
                        <p className="text-red-500 text-sm mt-1">{errors.customer_email}</p>
                    )}
                </div>

                {/* Address */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                        Shipping Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <MapPin className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                        <textarea
                            name="shipping_address"
                            value={formData.shipping_address}
                            onChange={handleChange}
                            placeholder="Street address, City, Province, Postal code"
                            rows={4}
                            className={`w-full pl-11 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none ${errors.shipping_address ? 'border-red-500' : 'border-slate-300'
                                }`}
                        />
                    </div>
                    {errors.shipping_address && (
                        <p className="text-red-500 text-sm mt-1">{errors.shipping_address}</p>
                    )}
                </div>

                {/* Save Profile Checkbox */}
                <div className="flex items-center gap-2 mt-4">
                    <input
                        type="checkbox"
                        id="save-profile"
                        checked={saveProfile}
                        onChange={(e) => setSaveProfile(e.target.checked)}
                        className="w-4 h-4 text-primary-600 rounded focus:ring-2 focus:ring-primary-500"
                    />
                    <label htmlFor="save-profile" className="text-sm text-slate-600 cursor-pointer">
                        Save this information for next time
                    </label>
                </div>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl"
            >
                {loading ? 'Processing...' : 'Place Order'}
            </button>
        </form>
    );
}