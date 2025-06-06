import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Music } from "lucide-react";
import SongsTable from "./SongsTable";
import AddSongDialog from "./AddSongDialog";
import ErrorBoundary from "@/components/ErrorBoundary";

const SongsTabContent = () => {
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="flex items-center gap-2">
                            <Music className="size-5 text-emerald-500" />
                            Songs library
                        </CardTitle>
                        <CardDescription>Manage your music tracks</CardDescription>
                    </div>
                    <AddSongDialog />
                </div>
            </CardHeader>
            <CardContent>
                <ErrorBoundary fallback={<div className="text-red-500">Could not load songs.</div>}>
                    <SongsTable />
                </ErrorBoundary>
            </CardContent>
        </Card>
    );
};

export default SongsTabContent;