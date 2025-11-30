"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isToolsOpen, setIsToolsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);
    const toggleTools = () => setIsToolsOpen(!isToolsOpen);

    return (
        <nav className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="text-xl font-bold tracking-tighter">
                    Daily AI World
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
                    <Link href="/category/ai-business" className="hover:text-foreground transition-colors">
                        AI Business
                    </Link>
                    <Link href="/category/ai-design" className="hover:text-foreground transition-colors">
                        AI Design
                    </Link>
                    <Link href="/category/ai-marketing" className="hover:text-foreground transition-colors">
                        AI Marketing
                    </Link>
                    <Link href="/category/future-of-ai" className="hover:text-foreground transition-colors">
                        Future of AI
                    </Link>

                    {/* Tools Dropdown */}
                    <div className="relative group">
                        <button className="flex items-center gap-1 hover:text-foreground transition-colors">
                            Tools <ChevronDown size={14} />
                        </button>
                        <div className="absolute top-full right-0 w-56 bg-card border border-border rounded-md shadow-lg p-2 hidden group-hover:block">
                            <div className="flex flex-col gap-1">
                                <Link href="/tools/image-compressor" className="block px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground rounded-md transition-colors">
                                    Image Compressor
                                </Link>
                                <Link href="/tools/image-converter" className="block px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground rounded-md transition-colors">
                                    Image Converter
                                </Link>
                                <Link href="/tools/image-cropper" className="block px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground rounded-md transition-colors">
                                    Image Cropper
                                </Link>
                                <Link href="/tools/lorem-ipsum" className="block px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground rounded-md transition-colors">
                                    Lorem Ipsum Generator
                                </Link>
                                <Link href="/tools/calculator" className="block px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground rounded-md transition-colors">
                                    Basic Calculator
                                </Link>
                                <Link href="/tools/bmi-calculator" className="block px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground rounded-md transition-colors">
                                    BMI Calculator
                                </Link>
                                <Link href="/tools/color-picker" className="block px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground rounded-md transition-colors">
                                    Color Picker
                                </Link>
                                <Link href="/tools/spin-wheel" className="block px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground rounded-md transition-colors">
                                    Spin Wheel
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    {/* Mobile Menu Toggle */}
                    <button className="md:hidden p-2" onClick={toggleMenu}>
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden border-t border-border bg-background p-4 flex flex-col gap-4">
                    <Link
                        href="/category/ai-business"
                        className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                        onClick={() => setIsOpen(false)}
                    >
                        AI Business
                    </Link>
                    <Link
                        href="/category/ai-design"
                        className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                        onClick={() => setIsOpen(false)}
                    >
                        AI Design
                    </Link>
                    <Link
                        href="/category/ai-marketing"
                        className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                        onClick={() => setIsOpen(false)}
                    >
                        AI Marketing
                    </Link>
                    <Link
                        href="/category/future-of-ai"
                        className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                        onClick={() => setIsOpen(false)}
                    >
                        Future of AI
                    </Link>

                    <div className="border-t border-border pt-4">
                        <button
                            onClick={toggleTools}
                            className="flex items-center justify-between w-full text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-2"
                        >
                            Tools <ChevronDown size={14} className={cn("transition-transform", isToolsOpen && "rotate-180")} />
                        </button>

                        {isToolsOpen && (
                            <div className="flex flex-col gap-3 pl-4 border-l border-border ml-1">
                                <Link href="/tools/image-compressor" onClick={() => setIsOpen(false)} className="text-sm text-muted-foreground hover:text-foreground">
                                    Image Compressor
                                </Link>
                                <Link href="/tools/image-converter" onClick={() => setIsOpen(false)} className="text-sm text-muted-foreground hover:text-foreground">
                                    Image Converter
                                </Link>
                                <Link href="/tools/image-cropper" onClick={() => setIsOpen(false)} className="text-sm text-muted-foreground hover:text-foreground">
                                    Image Cropper
                                </Link>
                                <Link href="/tools/lorem-ipsum" onClick={() => setIsOpen(false)} className="text-sm text-muted-foreground hover:text-foreground">
                                    Lorem Ipsum
                                </Link>
                                <Link href="/tools/calculator" onClick={() => setIsOpen(false)} className="text-sm text-muted-foreground hover:text-foreground">
                                    Calculator
                                </Link>
                                <Link href="/tools/bmi-calculator" onClick={() => setIsOpen(false)} className="text-sm text-muted-foreground hover:text-foreground">
                                    BMI Calculator
                                </Link>
                                <Link href="/tools/color-picker" onClick={() => setIsOpen(false)} className="text-sm text-muted-foreground hover:text-foreground">
                                    Color Picker
                                </Link>
                                <Link href="/tools/spin-wheel" onClick={() => setIsOpen(false)} className="text-sm text-muted-foreground hover:text-foreground">
                                    Spin Wheel
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
