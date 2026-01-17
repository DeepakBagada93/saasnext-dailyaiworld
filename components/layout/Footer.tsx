import Link from "next/link";
import { AnimatedFooterIcon } from "./AnimatedFooterIcon";
import { Home, Info, Mail, Shield, FileText } from "lucide-react";

export function Footer() {
    return (
        <footer className="fixed bottom-4 left-0 right-0 z-50 flex justify-center pointer-events-none">
            <div className="bg-background/80 backdrop-blur-md border border-border rounded-full px-6 py-2 shadow-2xl flex items-center gap-4 md:gap-6 pointer-events-auto transition-all duration-300">

                <Link href="/" className="group relative p-2 rounded-full hover:bg-primary/10 transition-colors">
                    <Home className="w-5 h-5 md:w-6 md:h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                    <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-popover border border-border px-2 py-1 rounded text-[10px] font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-sm">Home</span>
                </Link>

                <Link href="/about" className="group relative p-2 rounded-full hover:bg-primary/10 transition-colors">
                    <Info className="w-5 h-5 md:w-6 md:h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                    <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-popover border border-border px-2 py-1 rounded text-[10px] font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-sm">About</span>
                </Link>

                {/* Central Animated Icon */}
                <Link href="/" className="-mt-8 md:-mt-10 mx-2">
                    <div className="bg-background border border-border rounded-full p-1 shadow-xl hover:scale-110 transition-transform duration-300">
                        <AnimatedFooterIcon />
                    </div>
                </Link>

                <Link href="/contact" className="group relative p-2 rounded-full hover:bg-primary/10 transition-colors">
                    <Mail className="w-5 h-5 md:w-6 md:h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                    <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-popover border border-border px-2 py-1 rounded text-[10px] font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-sm">Contact</span>
                </Link>

                <Link href="/privacy-policy" className="group relative p-2 rounded-full hover:bg-primary/10 transition-colors">
                    <Shield className="w-5 h-5 md:w-6 md:h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                    <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-popover border border-border px-2 py-1 rounded text-[10px] font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-sm">Privacy</span>
                </Link>

                <Link href="/terms" className="group relative p-2 rounded-full hover:bg-primary/10 transition-colors hidden md:block">
                    <FileText className="w-5 h-5 md:w-6 md:h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                    <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-popover border border-border px-2 py-1 rounded text-[10px] font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-sm">Terms</span>
                </Link>
            </div>
        </footer>
    );
}
