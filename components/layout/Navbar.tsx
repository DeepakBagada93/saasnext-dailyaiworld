"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, Sparkles } from "lucide-react";
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
            { name: "Scientific Calculator", href: "/tools/scientific-calculator" },
            { name: "Percentage Calculator", href: "/tools/percentage-calculator" },
            { name: "Age Calculator", href: "/tools/age-calculator" },
            { name: "Date Difference", href: "/tools/date-difference-calculator" },
            { name: "Unit Converter", href: "/tools/unit-converter" },
        ],
        finance: [
            { name: "EMI Calculator", href: "/tools/emi-calculator" },
            { name: "SIP Calculator", href: "/tools/sip-calculator" },
            { name: "GST Calculator", href: "/tools/gst-calculator" },
            { name: "Currency Converter", href: "/tools/currency-converter" },
            { name: "Profit & Loss", href: "/tools/profit-loss-calculator" },
        ],
        health: [
            { name: "BMR Calculator", href: "/tools/bmr-calculator" },
            { name: "Calorie Calculator", href: "/tools/calorie-calculator" },
            { name: "Ideal Weight", href: "/tools/ideal-weight-calculator" },
            { name: "Water Intake", href: "/tools/water-intake-calculator" },
        ],
        developer: [
            { name: "Gradient Generator", href: "/tools/gradient-generator" },
            { name: "Color Palette", href: "/tools/color-palette-generator" },
            { name: "Color Converter", href: "/tools/color-converter" },
            { name: "Contrast Checker", href: "/tools/contrast-checker" },
            { name: "Box Shadow", href: "/tools/box-shadow-generator" },
            { name: "Border Radius", href: "/tools/border-radius-generator" },
            { name: "Favicon Generator", href: "/tools/favicon-generator" },
        ],
        image: [
            { name: "Image Resizer", href: "/tools/image-resizer" },
            { name: "Image Compressor", href: "/tools/image-compressor" },
            { name: "Image Converter", href: "/tools/image-converter" },
            { name: "Image Cropper", href: "/tools/image-cropper" },
            { name: "Image Filters", href: "/tools/image-filters" },
        ],
    };

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
                isScrolled ? "bg-black/95 backdrop-blur-xl border-white/10 shadow-lg" : "bg-transparent"
            )}
        >
            <div className="container mx-auto px-4 h-20 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <AnimatedLogo />
                    <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70 group-hover:to-orange-400 transition-all duration-300">
                        Daily AI World
                    </span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-sm font-medium text-white/70 hover:text-white transition-colors relative group"
                        >
                            {link.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full" />
                        </Link>
                    ))}

                    {/* Tools Dropdown */}
                    <div
                        className="relative"
                        onMouseEnter={() => setActiveDropdown("tools")}
                        onMouseLeave={() => setActiveDropdown(null)}
                    >
                        <button className="flex items-center gap-1 text-sm font-medium text-white/70 hover:text-white transition-colors py-2">
                            Tools <ChevronDown size={14} className={cn("transition-transform duration-300", activeDropdown === "tools" && "rotate-180")} />
                        </button>

                        <AnimatePresence>
                            {activeDropdown === "tools" && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute top-full right-0 w-[1000px] pt-2"
                                >
                                    <div className="glass-card rounded-xl p-6 shadow-2xl border border-white/10 bg-black/95 backdrop-blur-xl">
                                        <div className="grid grid-cols-5 gap-6">
                                            <div>
                                                <h4 className="text-xs font-semibold text-orange-500 mb-3 uppercase tracking-wider flex items-center gap-2">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                                                    Basic
                                                </h4>
                                                <div className="grid gap-1">
                                                    {toolsLinks.basic.map((tool) => (
                                                        <Link
                                                            key={tool.href}
                                                            href={tool.href}
                                                            className="block px-3 py-2 text-sm text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                                                        >
                                                            {tool.name}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                            <div>
                                                <h4 className="text-xs font-semibold text-orange-500 mb-3 uppercase tracking-wider flex items-center gap-2">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                                                    Finance
                                                </h4>
                                                <div className="grid gap-1">
                                                    {toolsLinks.finance.map((tool) => (
                                                        <Link
                                                            key={tool.href}
                                                            href={tool.href}
                                                            className="block px-3 py-2 text-sm text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                                                        >
                                                            {tool.name}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                            <div>
                                                <h4 className="text-xs font-semibold text-orange-500 mb-3 uppercase tracking-wider flex items-center gap-2">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                                                    Health
                                                </h4>
                                                <div className="grid gap-1">
                                                    {toolsLinks.health.map((tool) => (
                                                        <Link
                                                            key={tool.href}
                                                            href={tool.href}
                                                            className="block px-3 py-2 text-sm text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                                                        >
                                                            {tool.name}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                            <div>
                                                <h4 className="text-xs font-semibold text-orange-500 mb-3 uppercase tracking-wider flex items-center gap-2">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                                                    Developer
                                                </h4>
                                                <div className="grid gap-1">
                                                    {toolsLinks.developer.map((tool) => (
                                                        <Link
                                                            key={tool.href}
                                                            href={tool.href}
                                                            className="block px-3 py-2 text-sm text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                                                        >
                                                            {tool.name}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                            <div>
                                                <h4 className="text-xs font-semibold text-orange-500 mb-3 uppercase tracking-wider flex items-center gap-2">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                                                    Image
                                                </h4>
                                                <div className="grid gap-1">
                                                    {toolsLinks.image.map((tool) => (
                                                        <Link
                                                            key={tool.href}
                                                            href={tool.href}
                                                            className="block px-3 py-2 text-sm text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                                                        >
                                                            {tool.name}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Mobile Menu Toggle */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden text-white hover:bg-white/10"
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
                        className="md:hidden border-t border-white/10 bg-black/95 backdrop-blur-xl overflow-hidden"
                    >
                        <div className="container mx-auto px-4 py-6 flex flex-col gap-4 max-h-[80vh] overflow-y-auto">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-lg font-medium text-white/80 hover:text-orange-500 transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}

                            <div className="border-t border-white/10 pt-4 mt-2">
                                <div className="space-y-2">
                                    <div className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-2">Tools</div>
                                    {Object.entries(toolsLinks).map(([category, tools]) => (
                                        <div key={category} className="border border-white/5 rounded-lg overflow-hidden bg-white/5">
                                            <button
                                                onClick={() => setActiveDropdown(activeDropdown === category ? null : category)}
                                                className="w-full flex items-center justify-between p-3 text-left text-sm font-medium text-white hover:bg-white/5 transition-colors"
                                            >
                                                <span className="capitalize flex items-center gap-2">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                                                    {category}
                                                </span>
                                                <ChevronDown
                                                    size={16}
                                                    className={cn("transition-transform duration-200", activeDropdown === category ? "rotate-180" : "")}
                                                />
                                            </button>
                                            <AnimatePresence>
                                                {activeDropdown === category && (
                                                    <motion.div
                                                        initial={{ height: 0 }}
                                                        animate={{ height: "auto" }}
                                                        exit={{ height: 0 }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="p-2 pt-0 grid gap-1">
                                                            {tools.map((tool) => (
                                                                <Link
                                                                    key={tool.href}
                                                                    href={tool.href}
                                                                    className="block px-3 py-2 text-sm text-white/60 hover:text-white hover:bg-white/5 rounded-md transition-colors pl-6"
                                                                    onClick={() => setIsOpen(false)}
                                                                >
                                                                    {tool.name}
                                                                </Link>
                                                            ))}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
