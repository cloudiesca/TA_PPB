const USER_PROFILE_KEY = 'wearify_user_profile';
const USER_IDENTIFIER_KEY = 'wearify_user_identifier';

/**
 * Get or generate user identifier
 */
export const getUserIdentifier = () => {
    let userId = localStorage.getItem(USER_IDENTIFIER_KEY);
    if (!userId) {
        userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        localStorage.setItem(USER_IDENTIFIER_KEY, userId);
    }
    return userId;
};

/**
 * Get user profile from localStorage
 */
export const getUserProfile = () => {
    try {
        const profile = localStorage.getItem(USER_PROFILE_KEY);
        if (profile) {
            return JSON.parse(profile);
        }
        // Return default profile with user identifier
        return {
            username: 'Guest User',
            email: '',
            phone: '',
            address: '',
            userId: getUserIdentifier()
        };
    } catch (error) {
        return {
            username: 'Guest User',
            email: '',
            phone: '',
            address: '',
            userId: getUserIdentifier()
        };
    }
};

/**
 * Save user profile to localStorage
 */
export const saveUserProfile = (profile) => {
    try {
        const userId = getUserIdentifier();
        const profileData = {
            ...profile,
            userId,
            updatedAt: new Date().toISOString()
        };
        localStorage.setItem(USER_PROFILE_KEY, JSON.stringify(profileData));
        return { success: true, data: profileData };
    } catch (error) {
        return { success: false, message: error.message };
    }
};

/**
 * Update username
 */
export const updateUsername = (username) => {
    try {
        const profile = getUserProfile();
        profile.username = username.trim() || 'Guest User';
        return saveUserProfile(profile);
    } catch (error) {
        return { success: false, message: error.message };
    }
};

/**
 * Update email
 */
export const updateEmail = (email) => {
    try {
        const profile = getUserProfile();
        profile.email = email.trim();
        return saveUserProfile(profile);
    } catch (error) {
        return { success: false, message: error.message };
    }
};

/**
 * Update phone
 */
export const updatePhone = (phone) => {
    try {
        const profile = getUserProfile();
        profile.phone = phone.trim();
        return saveUserProfile(profile);
    } catch (error) {
        return { success: false, message: error.message };
    }
};

/**
 * Update address
 */
export const updateAddress = (address) => {
    try {
        const profile = getUserProfile();
        profile.address = address.trim();
        return saveUserProfile(profile);
    } catch (error) {
        return { success: false, message: error.message };
    }
};

/**
 * Clear user data
 */
export const clearUserData = () => {
    try {
        localStorage.removeItem(USER_PROFILE_KEY);
        localStorage.removeItem(USER_IDENTIFIER_KEY);
        return { success: true };
    } catch (error) {
        return { success: false, message: error.message };
    }
};

export default {
    getUserIdentifier,
    getUserProfile,
    saveUserProfile,
    updateUsername,
    updateEmail,
    updatePhone,
    updateAddress,
    clearUserData
};