import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { LayoutDashboardIcon } from "lucide-react";
import SignInOAuthButtons from "./SignInOAuthButtons";
import { useAuthStore } from "@/stores/useAuthStore";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import { Link } from "react-router-dom";

const Topbar = () => {
    const { isAdmin } = useAuthStore();

    return (
        <div className="flex items-center justify-between p-4 sticky top-0 bg-zinc-900/75 backdrop-blur-md z-10">
            <div className="flex gap-2 items-center">
                <img src="/spotify-logo.png" className="size-8" alt="spotify-logo" />
                Spotify
            </div>
            <div className="flex items-center gap-4">
                {isAdmin && (
                    <Link
                        to="/admin"
                        className={cn(buttonVariants({ variant: "outline" }))}>
                        <LayoutDashboardIcon className="w-4 h-4 mr-2" /> Admin dashboard
                    </Link>
                )}

                <SignedOut>
                    <SignInOAuthButtons />
                </SignedOut>

                <SignedIn>
                    <UserButton />
                </SignedIn>
            </div>
        </div>
    );
};

export default Topbar;