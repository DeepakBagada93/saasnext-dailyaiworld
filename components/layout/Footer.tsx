import Link from "next/link";
import { AnimatedFooterIcon } from "./AnimatedFooterIcon";
import { Home, Info, Mail, Shield, FileText } from "lucide-react";

export function Footer() {
    return (
        <footer className="border-t border-border bg-background/80 backdrop-blur-md py-2 md:py-6 fixed bottom-0 w-full z-50 md:static transition-all duration-300">
            <div className="container mx-auto px-4 flex flex-row md:flex-col justify-between md:justify-center items-center gap-1 md:gap-4 text-center">

                {/* Mobile: Animated Icon is part of the dock or hidden/smaller? Let's keep it as a central highlight or separate. 
                    For a true dock, maybe we don't need the big animated icon on mobile if we have a Home icon. 
                    But user liked it. Let's keep it but maybe distinct. 
                    Actually, let's make the AnimatedFooterIcon the "Home" button on mobile? 
                    Or just keep it above/central. 
                    Let's try a layout where on mobile it's a row of icons.
                */}

                <div className="hidden md:block">
                    <AnimatedFooterIcon />
                </div>

                <div className="hidden md:flex flex-col gap-1 md:gap-2 items-center">
                    <Link href="/" className="text-base md:text-lg font-bold tracking-tighter bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
                        Daily AI World
                    </Link>
                    <p className="text-xs md:text-sm text-muted-foreground">
                        © {new Date().getFullYear()} Daily AI World. All rights reserved.
                    </p>
                    <p className="text-xs md:text-sm text-muted-foreground">
                        Managed by <Link href="https://saasnext.in/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">SaasNext</Link>
                    </p>
                </div>

                {/* Navigation Links - Dock Style on Mobile */}
                <div className="flex flex-row w-full md:w-auto justify-around md:justify-center items-center gap-2 md:gap-8 text-xs md:text-sm text-muted-foreground">

                    <Link href="/" className="flex flex-col items-center gap-1 hover:text-primary transition-colors group">
                        <div className="p-2 rounded-full group-hover:bg-primary/10 transition-colors">
                            <Home className="w-5 h-5 md:w-6 md:h-6" />
                        </div>
                        <span className="hidden md:block">Home</span>
                    </Link>

                    <Link href="/about" className="flex flex-col items-center gap-1 hover:text-primary transition-colors group">
                        <div className="p-2 rounded-full group-hover:bg-primary/10 transition-colors">
                            <Info className="w-5 h-5 md:w-6 md:h-6" />
                        </div>
                        <span className="hidden md:block">About</span>
                    </Link>

                    {/* Central Animated Icon for Mobile? Or just keep it separate. 
                        Let's put the AnimatedFooterIcon in the center for mobile as a "Home" or "Brand" button if desired.
                        But we have a Home link. 
                        Let's keep the AnimatedFooterIcon visible on mobile but maybe smaller or integrated?
                        Actually, the previous design had it at the top. 
                        Let's hide the big one on mobile and use a special one in the dock?
                        Or just stick to the requested icons.
                    */}
                    <div className="md:hidden -mt-8">
                        <Link href="/">
                            <div className="bg-background border border-border rounded-full p-1 shadow-lg">
                                <AnimatedFooterIcon />
                            </div>
                        </Link>
                    </div>

                    <Link href="/contact" className="flex flex-col items-center gap-1 hover:text-primary transition-colors group">
                        <div className="p-2 rounded-full group-hover:bg-primary/10 transition-colors">
                            <Mail className="w-5 h-5 md:w-6 md:h-6" />
                        </div>
                        <span className="hidden md:block">Contact</span>
                    </Link>

                    <Link href="/privacy-policy" className="flex flex-col items-center gap-1 hover:text-primary transition-colors group">
                        <div className="p-2 rounded-full group-hover:bg-primary/10 transition-colors">
                            <Shield className="w-5 h-5 md:w-6 md:h-6" />
                        </div>
                        <span className="hidden md:block">Privacy</span>
                    </Link>

                    {/* Terms link might be too much for mobile dock if we want 5 items balanced. 
                        We have Home, About, [Icon], Contact, Privacy. 
                        Let's add Terms or group it.
                    */}
                    <Link href="/terms" className="flex flex-col items-center gap-1 hover:text-primary transition-colors group hidden md:flex">
                        <div className="p-2 rounded-full group-hover:bg-primary/10 transition-colors">
                            <FileText className="w-5 h-5 md:w-6 md:h-6" />
                        </div>
                        <span className="hidden md:block">Terms</span>
                    </Link>
                </div>
            </div>
        </footer>
    );
}
