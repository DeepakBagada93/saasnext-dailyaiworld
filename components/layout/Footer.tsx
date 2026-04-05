import Link from "next/link";
import { AnimatedFooterIcon } from "./AnimatedFooterIcon";
import { Home, Info, Mail, Shield } from "lucide-react";

export function Footer() {
    return (
        <footer className="fixed bottom-2 sm:bottom-4 left-2 sm:left-0 right-2 sm:right-0 z-50 flex justify-center pointer-events-none">
            <div className="bg-background/80 backdrop-blur-md border border-border rounded-full px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 shadow-2xl flex items-center gap-2 sm:gap-3 md:gap-6 pointer-events-auto transition-all duration-300 max-w-[calc(100vw-16px)] sm:max-w-none">

                <Link href="/" className="group relative p-1.5 sm:p-2 rounded-full hover:bg-primary/10 transition-colors">
                    <Home className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                    <span className="absolute -top-8 sm:-top-10 left-1/2 -translate-x-1/2 bg-popover border border-border px-2 py-1 rounded text-[8px] sm:text-[10px] font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-sm">Home</span>
                </Link>

                <Link href="/about" className="group relative p-1.5 sm:p-2 rounded-full hover:bg-primary/10 transition-colors">
                    <Info className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                    <span className="absolute -top-8 sm:-top-10 left-1/2 -translate-x-1/2 bg-popover border border-border px-2 py-1 rounded text-[8px] sm:text-[10px] font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-sm">About</span>
                </Link>

                <Link href="/" className="-mt-6 sm:-mt-8 md:-mt-10 mx-1 sm:mx-2">
                    <div className="bg-background border border-border rounded-full p-0.5 sm:p-1 shadow-xl hover:scale-110 transition-transform duration-300">
                        <AnimatedFooterIcon />
                    </div>
                </Link>

                <Link href="/contact" className="group relative p-1.5 sm:p-2 rounded-full hover:bg-primary/10 transition-colors">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                    <span className="absolute -top-8 sm:-top-10 left-1/2 -translate-x-1/2 bg-popover border border-border px-2 py-1 rounded text-[8px] sm:text-[10px] font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-sm">Contact</span>
                </Link>

                <Link href="/privacy-policy" className="group relative p-1.5 sm:p-2 rounded-full hover:bg-primary/10 transition-colors">
                    <Shield className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                    <span className="absolute -top-8 sm:-top-10 left-1/2 -translate-x-1/2 bg-popover border border-border px-2 py-1 rounded text-[8px] sm:text-[10px] font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-sm">Privacy</span>
                </Link>
            </div>
        </footer>
    );
}
