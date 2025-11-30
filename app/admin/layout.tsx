import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-background font-sans">
            <AdminSidebar />
            <main className="flex-1 flex flex-col">
                <header className="h-16 border-b border-border flex items-center justify-between px-8 bg-background/80 backdrop-blur-sm sticky top-0 z-10">
                    <div className="text-sm text-muted-foreground">
                        Admin Panel
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center text-xs font-medium">
                            AD
                        </div>
                    </div>
                </header>
                <div className="flex-1 p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
