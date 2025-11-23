import { PackageOpen } from 'lucide-react';

export default function EmptyState({
    title = "No Items Found",
    message = "Try adjusting your search or filters",
    icon: Icon = PackageOpen
}) {
    return (
        <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="bg-slate-100 rounded-full p-6 mb-4">
                <Icon className="w-16 h-16 text-slate-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">{title}</h3>
            <p className="text-slate-600 text-center max-w-md">{message}</p>
        </div>
    );
}