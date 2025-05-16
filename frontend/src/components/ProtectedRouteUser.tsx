import { useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
import { Loader } from "lucide-react";

const ProtectedRouteUser = ({ children }: { children: React.ReactNode }) => {
    const { isSignedIn, isLoaded } = useUser();

    if (!isLoaded) {
        return (
            <div className="h-screen flex items-center justify-center">
                <Loader className="size-6 text-emerald-500 animate-spin" />
            </div>
        );
    }

    if (!isSignedIn) {
        return <Navigate to="/auth-callback" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRouteUser;