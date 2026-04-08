"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, Search, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { AnimatedLogo } from "@/components/ui/AnimatedLogo";

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleMenu = () => setIsOpen(!isOpen);

    const navLinks = [
        { name: "AI Business", href: "/category/ai-business" },
        { name: "AI Design", href: "/category/ai-design" },
        { name: "AI Marketing", href: "/category/ai-marketing" },
        { name: "Future of AI", href: "/category/future-of-ai" },
    ];

    const toolsLinks = {
        basic: [
            { name: "BMI Calculator", href: "/tools/bmi-calculator" },
            { name: "Color Picker", href: "/tools/color-picker" },
            { name: "Lorem Ipsum", href: "/tools/lorem-ipsum" },
            { name: "Spin Wheel", href: "/tools/spin-wheel" },
        ],
        image: [
            { name: "Image Compressor", href: "/tools/image-compressor" },
            { name: "Image Converter", href: "/tools/image-converter" },
            { name: "Image Cropper", href: "/tools/image-cropper" },
        ],
        text_utility: [
            { name: "Word Counter", href: "/tools/word-counter" },
            { name: "JSON Formatter", href: "/tools/json-formatter" },
        ],
    };

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b w-full",
                isScrolled 
                    ? "bg-black/90 backdrop-blur-2xl border-white/10 shadow-2xl shadow-orange-500/5" 
                    : "bg-gradient-to-b from-black/80 to-transparent border-transparent"
            )}
        >
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-18 md:h-20 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group relative">
                    <div className="relative">
                        <AnimatedLogo />
                        <div className="absolute inset-0 blur-xl bg-orange-500/20 group-hover:bg-orange-500/40 transition-all duration-500 rounded-full" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-orange-200 to-orange-400 group-hover:to-orange-300 transition-all duration-300">
                            Daily AI World
                        </span>
                        <span className="text-[10px] text-orange-500/60 tracking-widest uppercase hidden sm:block">
                            Your AI Companion
                        </span>
                    </div>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden lg:flex items-center gap-1">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="px-4 py-2 text-sm font-medium text-white/70 hover:text-orange-400 transition-all duration-200 relative group"
                        >
                            {link.name}
                            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-orange-400 transition-all duration-300 group-hover:w-full rounded-full" />
                        </Link>
                    ))}

                    {/* Tools Dropdown */}
                    <div
                        className="relative"
                        onMouseEnter={() => setActiveDropdown("tools")}
                        onMouseLeave={() => setActiveDropdown(null)}
                    >
                        <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-white/70 hover:text-orange-400 transition-colors">
                            <Sparkles size={14} className="text-orange-500" />
                            Tools 
                            <ChevronDown size={14} className={cn("transition-transform duration-300", activeDropdown === "tools" && "rotate-180")} />
                        </button>

                        <AnimatePresence>
                            {activeDropdown === "tools" && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute top-full right-0 w-[800px] pt-3"
                                >
                                    <div className="rounded-2xl p-6 shadow-2xl border border-white/10 bg-black/95 backdrop-blur-2xl relative overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-transparent" />
                                        <div className="relative grid grid-cols-3 gap-8">
                                            {Object.entries(toolsLinks).map(([category, tools]) => (
                                                <div key={category}>
                                                    <h4 className="text-xs font-bold text-orange-500 mb-4 uppercase tracking-wider flex items-center gap-2">
                                                        <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                                                        {category.replace("_", " ")}
                                                    </h4>
                                                    <div className="grid gap-2">
                                                        {tools.map((tool) => (
                                                            <Link
                                                                key={tool.href}
                                                                href={tool.href}
                                                                className="group/item flex items-center gap-3 px-3 py-2.5 text-sm text-white/60 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200"
                                                            >
                                                                <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover/item:bg-orange-500 transition-colors" />
                                                                {tool.name}
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Right Side Actions */}
                <div className="hidden lg:flex items-center gap-3">
                    <button className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 hover:border-orange-500/30 transition-all duration-200 group">
                        <Search size={18} className="group-hover:scale-110 transition-transform" />
                    </button>
                    <Button 
                        variant="glass"
                        size="sm"
                        className="px-5 border-orange-500/20 hover:border-orange-500/40"
                    >
                        Subscribe
                    </Button>
                </div>

                {/* Mobile Menu Toggle */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden text-white hover:bg-white/10 rounded-xl"
                    onClick={toggleMenu}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </Button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden border-t border-white/10 bg-black/98 backdrop-blur-2xl overflow-hidden"
                    >
                        <div className="container mx-auto px-4 py-6 flex flex-col gap-4 max-h-[85vh] overflow-y-auto">
                            {/* Search Bar Mobile */}
                            <div className="relative">
                                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                                <input 
                                    type="text" 
                                    placeholder="Search..."
                                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-orange-500/50 transition-colors"
                                />
                            </div>

                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-lg font-medium text-white/80 hover:text-orange-400 transition-colors flex items-center gap-2"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <span className="w-1 h-1 rounded-full bg-orange-500" />
                                    {link.name}
                                </Link>
                            ))}

                            <div className="border-t border-white/10 pt-4 mt-2">
                                <div className="flex items-center gap-2 text-sm font-semibold text-orange-500 mb-4 px-2">
                                    <Sparkles size={14} />
                                    Tools
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    {Object.entries(toolsLinks).flatMap(([category, tools]) =>
                                        tools.map((tool) => (
                                            <Link
                                                key={tool.href}
                                                href={tool.href}
                                                className="p-3 text-sm text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200"
                                                onClick={() => setIsOpen(false)}
                                            >
                                                {tool.name}
                                            </Link>
                                        ))
                                    )}
                                </div>
                            </div>

                            <Button 
                                variant="glass"
                                className="mt-4 border-orange-500/20 hover:border-orange-500/40"
                            >
                                Subscribe
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}