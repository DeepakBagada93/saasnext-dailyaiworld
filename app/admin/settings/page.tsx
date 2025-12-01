"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Settings, Menu, X } from "lucide-react";

export default function SettingsPage() {
    const [loading, setLoading] = useState(true);
    const [userEmail, setUserEmail] = useState("");
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                router.push("/admin/login");
                return;
            }
            setUserEmail(user.email || "");
            setLoading(false);
        };

        checkAuth();
    }, [router, supabase]);

    const handleLogout = async () => {
        try {
            await supabase.auth.signOut();
            // Use window.location for a hard redirect to ensure session is cleared
            window.location.href = "/admin/login";
        } catch (error) {
            console.error("Logout error:", error);
            // Force redirect even if there's an error
            window.location.href = "/admin/login";
        }
    };

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-background font-sans">
            <nav className="border-b border-border bg-card">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <h1 className="text-lg sm:text-xl font-bold">Admin Settings</h1>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-4">
                        <Link href="/admin/dashboard" className="text-sm hover:underline">Dashboard</Link>
                        <Link href="/" className="text-sm hover:underline">View Site</Link>
                        <button onClick={handleLogout} className="text-sm text-destructive hover:underline">
                            Logout
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 hover:bg-muted rounded-md"
                    >
                        {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {mobileMenuOpen && (
                    <div className="md:hidden border-t border-border bg-card">
                        <div className="container mx-auto px-4 py-4 space-y-3">
                            <Link
                                href="/admin/dashboard"
                                className="block text-sm hover:underline py-2"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Dashboard
                            </Link>
                            <Link
                                href="/"
                                className="block text-sm hover:underline py-2"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                View Site
                            </Link>
                            <button
                                onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
                                className="text-sm text-destructive hover:underline py-2 w-full text-left"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                )}
            </nav>

            <main className="container mx-auto px-4 py-6 sm:py-8 max-w-4xl">
                <h2 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8">Settings</h2>

                <div className="space-y-6">
                    {/* Account Settings */}
                    <div className="bg-card border border-border rounded-xl p-6">
                        <h3 className="text-lg font-semibold mb-4">Account Information</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Email</label>
                                <input
                                    type="email"
                                    value={userEmail}
                                    disabled
                                    className="w-full px-4 py-2 bg-secondary border border-border rounded-md text-muted-foreground"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Publishing Goals */}
                    <div className="bg-card border border-border rounded-xl p-6">
                        <h3 className="text-lg font-semibold mb-4">Publishing Goals</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Monthly Blog Target</label>
                                <input
                                    type="number"
                                    defaultValue="50"
                                    className="w-full px-4 py-2 bg-background border border-border rounded-md"
                                />
                                <p className="text-sm text-muted-foreground mt-1">
                                    Set your monthly blog publishing target for motivation tracking
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Site Configuration */}
                    <div className="bg-card border border-border rounded-xl p-6">
                        <h3 className="text-lg font-semibold mb-4">Site Configuration</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Site Name</label>
                                <input
                                    type="text"
                                    defaultValue="Daily AI World"
                                    className="w-full px-4 py-2 bg-background border border-border rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Site Description</label>
                                <textarea
                                    rows={3}
                                    defaultValue="Your daily dose of AI Business, Design, and Future trends."
                                    className="w-full px-4 py-2 bg-background border border-border rounded-md"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Save Button */}
                    <div className="flex justify-end">
                        <button className="w-full sm:w-auto px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                            Save Changes
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
