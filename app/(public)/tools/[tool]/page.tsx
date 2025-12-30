import { Metadata } from "next";
import { ScientificCalculator } from "@/components/tools/ScientificCalculator";
import { PercentageCalculator } from "@/components/tools/PercentageCalculator";
import { AgeCalculator } from "@/components/tools/AgeCalculator";
import { DateDifferenceCalculator } from "@/components/tools/DateDifferenceCalculator";
import { UnitConverter } from "@/components/tools/UnitConverter";
import { EMICalculator } from "@/components/tools/EMICalculator";
import { SIPCalculator } from "@/components/tools/SIPCalculator";
import { GSTCalculator } from "@/components/tools/GSTCalculator";
import { CurrencyConverter } from "@/components/tools/CurrencyConverter";
import { ProfitLossCalculator } from "@/components/tools/ProfitLossCalculator";
import { BMRCalculator } from "@/components/tools/BMRCalculator";
import { CalorieCalculator } from "@/components/tools/CalorieCalculator";
import { IdealWeightCalculator } from "@/components/tools/IdealWeightCalculator";
import { WaterIntakeCalculator } from "@/components/tools/WaterIntakeCalculator";
import { GradientGenerator } from "@/components/tools/GradientGenerator";
import { ColorPaletteGenerator } from "@/components/tools/ColorPaletteGenerator";
import { ColorConverter } from "@/components/tools/ColorConverter";
import { ContrastChecker } from "@/components/tools/ContrastChecker";
import { BoxShadowGenerator } from "@/components/tools/BoxShadowGenerator";
import { BorderRadiusGenerator } from "@/components/tools/BorderRadiusGenerator";
import { FaviconGenerator } from "@/components/tools/FaviconGenerator";

const toolsConfig = {
    "scientific-calculator": {
        title: "Scientific Calculator - Daily AI World",
        description: "Free online scientific calculator with sin, cos, tan, log, and advanced mathematical functions.",
        component: ScientificCalculator,
    },
    "percentage-calculator": {
        title: "Percentage Calculator - Daily AI World",
        description: "Calculate percentages, percentage increase, decrease, and more with our free online percentage calculator.",
        component: PercentageCalculator,
    },
    "age-calculator": {
        title: "Age Calculator - Calculate Your Exact Age | Daily AI World",
        description: "Calculate your age in years, months, days, and more. Find out when your next birthday is with our free age calculator.",
        component: AgeCalculator,
    },
    "date-difference-calculator": {
        title: "Date Difference Calculator - Daily AI World",
        description: "Calculate the difference between two dates in days, weeks, months, years, and more.",
        component: DateDifferenceCalculator,
    },
    "unit-converter": {
        title: "Unit Converter - Length, Weight, Temperature, Speed | Daily AI World",
        description: "Convert between units of length, weight, temperature, and speed with our comprehensive unit converter.",
        component: UnitConverter,
    },
    "emi-calculator": {
        title: "EMI Calculator - Loan EMI Calculator | Daily AI World",
        description: "Calculate your loan EMI (Equated Monthly Installment) with our free EMI calculator. Plan your loans effectively.",
        component: EMICalculator,
    },
    "sip-calculator": {
        title: "SIP Calculator - Mutual Fund SIP Returns Calculator | Daily AI World",
        description: "Calculate your SIP (Systematic Investment Plan) returns and plan your investments with our free SIP calculator.",
        component: SIPCalculator,
    },
    "gst-calculator": {
        title: "GST Calculator - Calculate CGST & SGST | Daily AI World",
        description: "Free online GST calculator for India. Calculate CGST, SGST, and total GST on your products and services.",
        component: GSTCalculator,
    },
    "currency-converter": {
        title: "Currency Converter - Convert Currencies Online | Daily AI World",
        description: "Convert between different currencies with live exchange rates. Free online currency converter.",
        component: CurrencyConverter,
    },
    "profit-loss-calculator": {
        title: "Profit & Loss Calculator - Calculate P&L Percentage | Daily AI World",
        description: "Calculate profit or loss percentage on your sales. Free online profit and loss calculator.",
        component: ProfitLossCalculator,
    },
    "bmr-calculator": {
        title: "BMR Calculator - Basal Metabolic Rate Calculator | Daily AI World",
        description: "Calculate your BMR (Basal Metabolic Rate) and daily calorie needs. Free online BMR calculator with activity levels.",
        component: BMRCalculator,
    },
    "calorie-calculator": {
        title: "Calorie Calculator - Track Daily Calorie Intake | Daily AI World",
        description: "Track your daily calorie intake from different foods. Free online calorie calculator.",
        component: CalorieCalculator,
    },
    "ideal-weight-calculator": {
        title: "Ideal Weight Calculator - Find Your Ideal Body Weight | Daily AI World",
        description: "Calculate your ideal body weight using multiple formulas (Hamwi, Devine, Miller, Robinson). Free online calculator.",
        component: IdealWeightCalculator,
    },
    "water-intake-calculator": {
        title: "Water Intake Calculator - Daily Water Requirement | Daily AI World",
        description: "Calculate your daily water intake requirement based on body weight, activity level, and climate.",
        component: WaterIntakeCalculator,
    },
    "gradient-generator": {
        title: "CSS Gradient Generator - Create Beautiful Gradients | Daily AI World",
        description: "Create stunning CSS gradients with our free online generator. Copy CSS code instantly for your projects.",
        component: GradientGenerator,
    },
    "color-palette-generator": {
        title: "Color Palette Generator - Random Color Schemes | Daily AI World",
        description: "Generate beautiful color palettes for your designs. Lock colors, generate random schemes, and copy HEX codes.",
        component: ColorPaletteGenerator,
    },
    "color-converter": {
        title: "Color Converter - HEX to RGB to HSL | Daily AI World",
        description: "Convert colors between HEX, RGB, and HSL formats instantly. Free online color converter tool.",
        component: ColorConverter,
    },
    "contrast-checker": {
        title: "Contrast Checker - WCAG Accessibility Testing | Daily AI World",
        description: "Check color contrast ratios and ensure WCAG accessibility compliance for your designs.",
        component: ContrastChecker,
    },
    "box-shadow-generator": {
        title: "CSS Box Shadow Generator - Visual Shadow Editor | Daily AI World",
        description: "Create custom CSS box shadows visually. Adjust offsets, blur, spread, and color with real-time preview.",
        component: BoxShadowGenerator,
    },
    "border-radius-generator": {
        title: "CSS Border Radius Generator - Visual Border Editor | Daily AI World",
        description: "Visually generate CSS border-radius code. Adjust corners independently or linked.",
        component: BorderRadiusGenerator,
    },
    "favicon-generator": {
        title: "Favicon Generator - Create Website Favicons | Daily AI World",
        description: "Convert images to favicons (ICO, PNG) for your website. Preview how it looks in browser tabs.",
        component: FaviconGenerator,
    },
};

export async function generateMetadata({ params }: { params: Promise<{ tool: string }> }): Promise<Metadata> {
    const resolvedParams = await params;
    const config = toolsConfig[resolvedParams.tool as keyof typeof toolsConfig];

    if (!config) {
        return {
            title: "Tool Not Found - Daily AI World",
        };
    }

    return {
        title: config.title,
        description: config.description,
        openGraph: {
            title: config.title,
            description: config.description,
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: config.title,
            description: config.description,
        },
    };
}

export default async function ToolPage({ params }: { params: Promise<{ tool: string }> }) {
    const resolvedParams = await params;
    console.log("DEBUG: ToolPage params:", resolvedParams);
    console.log("DEBUG: Available keys:", Object.keys(toolsConfig));
    console.log("DEBUG: Checking key:", resolvedParams.tool);
    console.log("DEBUG: Match found:", Object.keys(toolsConfig).includes(resolvedParams.tool));

    const config = toolsConfig[resolvedParams.tool as keyof typeof toolsConfig];
    console.log("DEBUG: ToolPage config found:", !!config, "for tool:", resolvedParams.tool);

    if (!config) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-12 text-center">
                <h1 className="text-4xl font-bold mb-4">Tool Not Found</h1>
                <p className="text-muted-foreground">The requested tool does not exist.</p>
            </div>
        );
    }

    const ToolComponent = config.component;

    return <ToolComponent />;
}

export async function generateStaticParams() {
    return Object.keys(toolsConfig).map((tool) => ({
        tool,
    }));
}
