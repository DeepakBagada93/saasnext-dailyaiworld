import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen flex flex-col font-sans relative">
            <div className="fixed inset-0 -z-10 h-full w-full bg-black">
                <div className="absolute inset-0 bg-grid-white"></div>
                {/* Radiant gradient for premium feel */}
                <div className="absolute left-0 right-0 top-[-10%] h-[1000px] w-[1000px] rounded-full bg-orange-500/10 blur-[100px] mx-auto opacity-50 pointer-events-none"></div>
            </div>
            <Navbar />
            <main className="flex-1 container mx-auto px-4 pt-32 pb-12 relative z-10">
                {children}
            </main>
            <Footer />
        </div>
    );
}
