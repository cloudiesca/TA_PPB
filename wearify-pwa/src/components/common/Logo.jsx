import logoImage from '../../assets/logo.png';

export default function Logo({ size = 'md', className = '' }) {
    const sizes = {
        sm: 'h-10 w-10',
        md: 'h-12 w-12',
        lg: 'h-16 w-16',
        xl: 'h-24 w-24',
    };

    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <img
                src={logoImage}
                alt="Wearify Logo"
                className={`${sizes[size]} object-contain`}
            />
            <div className="flex flex-col">
                <span className="text-xl font-bold text-slate-800">WEARIFY</span>
                <span className="text-xs text-slate-500 -mt-1">Fashion Store</span>
            </div>
        </div>
    );
}