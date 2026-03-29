import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = await createServerSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();

    return (
        <div className="flex min-h-screen bg-background font-sans">
            <AdminSidebar />
            <main className="flex-1 flex flex-col w-full lg:w-auto">
                <header className="h-16 border-b border-border flex items-center justify-between px-4 lg:px-8 bg-background/80 backdrop-blur-sm sticky top-0 z-10">
                    <div className="text-sm text-muted-foreground ml-12 lg:ml-0">
                        Admin Panel
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center text-xs font-medium">
                            {user?.email?.substring(0, 2).toUpperCase() || "AD"}
                        </div>
                    </div>
                </header>
                <div className="flex-1 p-4 lg:p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
