import logoImage from '../../assets/logo.png';

export default function LogoContainer() {
    return (
        <div className="mb-8 relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-2xl opacity-20 animate-pulse"></div>
            <div className="relative bg-white rounded-full p-6 shadow-2xl">
                <img
                    src={logoImage}
                    alt="Wearify Logo"
                    className="w-24 h-24 sm:w-32 sm:h-32 object-contain"
                />
            </div>
        </div>
    );
}