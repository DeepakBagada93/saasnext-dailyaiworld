import Link from "next/link";

export function Footer() {
    return (
        <footer className="border-t border-border bg-background py-12">
            <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex flex-col gap-2">
                    <Link href="/" className="text-lg font-bold tracking-tighter bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
                        Daily AI World
                    </Link>
                    <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} Daily AI World. All rights reserved.
                    </p>
                    <p className="text-sm text-muted-foreground">
                        Managed by <Link href="https://saasnext.in/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">SaasNext</Link>
                    </p>
                </div>
                <div className="flex gap-6 text-sm text-muted-foreground">
                    <Link href="/about" className="hover:text-primary transition-colors">
                        About Us
                    </Link>
                    <Link href="/contact" className="hover:text-primary transition-colors">
                        Contact Us
                    </Link>
                    <Link href="/privacy-policy" className="hover:text-primary transition-colors">
                        Privacy Policy
                    </Link>
                    <Link href="/terms" className="hover:text-primary transition-colors">
                        Terms of Service
                    </Link>
                </div>
            </div>
        </footer>
    );
}
