import { useAuthStore } from "@/stores/useAuthStore";
import { Navigate } from "react-router-dom";
import { Loader } from "lucide-react";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { isAdmin, isLoading } = useAuthStore();

    if (isLoading) {
        return (
            <div className="h-screen flex items-center justify-center">
                <Loader className="size-6 text-emerald-500 animate-spin" />
            </div>
        );
    }

    if (!isAdmin) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;