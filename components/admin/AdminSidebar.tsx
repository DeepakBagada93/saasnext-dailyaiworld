"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, PlusCircle, Settings, LogOut } from "lucide-react";

const sidebarLinks = [
    {
        title: "Dashboard",
        href: "/admin/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "New Post",
        href: "/admin/editor",
        icon: PlusCircle,
    },
    {
        title: "Settings",
        href: "/admin/settings",
        icon: Settings,
    },
];

export function AdminSidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 border-r border-border bg-background min-h-screen flex flex-col">
            <div className="h-16 flex items-center px-6 border-b border-border">
                <Link href="/" className="text-lg font-bold tracking-tight">
                    Daily AI World
                </Link>
            </div>

            <div className="flex-1 py-6 px-4 space-y-1">
                {sidebarLinks.map((link) => {
                    const Icon = link.icon;
                    const isActive = pathname === link.href;

                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                                isActive
                                    ? "bg-primary text-primary-foreground"
                                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                            )}
                        >
                            <Icon size={18} />
                            {link.title}
                        </Link>
                    );
                })}
            </div>

            <div className="p-4 border-t border-border">
                <button className="flex items-center gap-3 px-3 py-2 w-full text-sm font-medium text-muted-foreground hover:text-destructive transition-colors rounded-md hover:bg-destructive/10">
                    <LogOut size={18} />
                    Logout
                </button>
            </div>
        </aside>
    );
}
