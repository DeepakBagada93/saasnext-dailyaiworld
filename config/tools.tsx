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
import { ImageResizer } from "@/components/tools/ImageResizer";
import { ImageCompressor } from "@/components/tools/ImageCompressor";
import { ImageConverter } from "@/components/tools/ImageConverter";
import { ImageCropper } from "@/components/tools/ImageCropper";
import { ImageFilters } from "@/components/tools/ImageFilters";
import { QRCodeGenerator } from "@/components/tools/QRCodeGenerator";
import { PasswordGenerator } from "@/components/tools/PasswordGenerator";
import { WordCounter } from "@/components/tools/WordCounter";
import { JsonFormatter } from "@/components/tools/JsonFormatter";

export const toolsConfig = {
    "scientific-calculator": {
        title: "Scientific Calculator - Daily AI World",
        description: "Free online scientific calculator with sin, cos, tan, log, and advanced mathematical functions.",
        component: ScientificCalculator,
        content: (
            <div className="space-y-6">
                <section>
                    <h2 className="text-2xl font-bold mb-4">How to Use the Scientific Calculator</h2>
                    <p className="text-muted-foreground">
                        Our free online scientific calculator is a powerful tool designed to help students, engineers, and professionals solve complex mathematical problems.
                        Whether you need to perform basic arithmetic or advanced trigonometric and logarithmic calculations, this tool has you covered.
                    </p>
                </section>

                <section>
                    <h3 className="text-xl font-semibold mb-3">Key Features</h3>
                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                        <li><strong>Trigonometric Functions:</strong> Calculate sine (sin), cosine (cos), and tangent (tan) in both degrees and radians.</li>
                        <li><strong>Logarithmic Functions:</strong> Perform calculations using natural logarithm (ln) and base-10 logarithm (log).</li>
                        <li><strong>Exponents and Roots:</strong> Easily calculate squares, cubes, square roots, and arbitrary powers.</li>
                        <li><strong>Memory Functions:</strong> Store and recall values using Memory Plus (M+), Memory Minus (M-), and Memory Recall (MR).</li>
                        <li><strong>User-Friendly Interface:</strong> A clean, dark-mode optimized design that mimics a physical scientific calculator.</li>
                    </ul>
                </section>

                <section>
                    <h3 className="text-xl font-semibold mb-3">Common Uses</h3>
                    <p className="text-muted-foreground">
                        This calculator is ideal for:
                    </p>
                    <ul className="list-disc pl-6 mt-2 space-y-2 text-muted-foreground">
                        <li>High school and college math homework (Algebra, Calculus, Trigonometry).</li>
                        <li>Engineering calculations requiring precision.</li>
                        <li>Scientific research and data analysis.</li>
                        <li>Everyday calculations like splitting bills or estimating costs.</li>
                    </ul>
                </section>

                <section>
                    <h3 className="text-xl font-semibold mb-3">FAQ</h3>
                    <div className="space-y-4">
                        <div>
                            <h4 className="font-medium">Is this calculator free?</h4>
                            <p className="text-muted-foreground">Yes, this scientific calculator is 100% free to use online.</p>
                        </div>
                        <div>
                            <h4 className="font-medium">Does it support degrees and radians?</h4>
                            <p className="text-muted-foreground">Yes, you can toggle between Degree (Deg) and Radian (Rad) modes.</p>
                        </div>
                    </div>
                </section>
            </div>
        ),
    },
    "percentage-calculator": {
        title: "Percentage Calculator - Daily AI World",
        description: "Calculate percentages, percentage increase, decrease, and more with our free online percentage calculator.",
        component: PercentageCalculator,
        content: (
            <div className="space-y-6">
                <section>
                    <h2 className="text-2xl font-bold mb-4">Master Percentages with Our Free Calculator</h2>
                    <p className="text-muted-foreground">
                        Percentages are a part of daily life, from calculating discounts during a sale to determining the tip at a restaurant.
                        Our Percentage Calculator simplifies these tasks, giving you accurate results instantly.
                    </p>
                </section>

                <section>
                    <h3 className="text-xl font-semibold mb-3">What Can You Calculate?</h3>
                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                        <li><strong>Percentage of a Number:</strong> Find out what X% of Y is (e.g., "What is 20% of 150?").</li>
                        <li><strong>Percentage Increase/Decrease:</strong> Calculate the growth or decline between two values.</li>
                        <li><strong>Find the Whole:</strong> If you know the part and the percentage, find the total value.</li>
                        <li><strong>Fraction to Percentage:</strong> Convert any fraction into a percentage value.</li>
                    </ul>
                </section>

                <section>
                    <h3 className="text-xl font-semibold mb-3">Real-World Examples</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 bg-muted/50 rounded-lg">
                            <h4 className="font-medium mb-2">Shopping Discounts</h4>
                            <p className="text-sm text-muted-foreground">
                                A shirt costs $50 and is 30% off. <br />
                                Calculation: $50 * 0.30 = $15 discount. <br />
                                Final Price: $35.
                            </p>
                        </div>
                        <div className="p-4 bg-muted/50 rounded-lg">
                            <h4 className="font-medium mb-2">Exam Scores</h4>
                            <p className="text-sm text-muted-foreground">
                                You scored 45 out of 60. <br />
                                Calculation: (45 / 60) * 100 = 75%.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        ),
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
    "image-resizer": {
        title: "Image Resizer - Resize Images Online | Daily AI World",
        description: "Resize your images to exact dimensions or percentage. Free online image resizer tool.",
        component: ImageResizer,
    },
    "image-compressor": {
        title: "Image Compressor - Reduce Image Size | Daily AI World",
        description: "Compress images to reduce file size without losing quality. Free online image compressor.",
        component: ImageCompressor,
    },
    "image-converter": {
        title: "Image Converter - PNG to JPG, WEBP | Daily AI World",
        description: "Convert images between PNG, JPG, and WEBP formats. Free online image converter.",
        component: ImageConverter,
    },
    "image-cropper": {
        title: "Image Cropper - Crop & Rotate Images | Daily AI World",
        description: "Crop and rotate images online. Preset aspect ratios for social media. Free image cropper.",
        component: ImageCropper,
    },
    "image-filters": {
        title: "Image Filters - Apply Effects Online | Daily AI World",
        description: "Apply filters and effects to your images. Adjust brightness, contrast, and more.",
        component: ImageFilters,
    },
    "qr-code-generator": {
        title: "QR Code Generator - Create Custom QR Codes | Daily AI World",
        description: "Generate free QR codes for URLs, text, and more. Customize colors and size. Download as PNG.",
        component: QRCodeGenerator,
    },
    "password-generator": {
        title: "Password Generator - Create Secure Passwords | Daily AI World",
        description: "Generate strong, secure passwords instantly. Customize length and characters for maximum security.",
        component: PasswordGenerator,
    },
    "word-counter": {
        title: "Word Counter - Count Words & Characters | Daily AI World",
        description: "Free online word counter. Count words, characters, sentences, and paragraphs. Check reading time.",
        component: WordCounter,
    },
    "json-formatter": {
        title: "JSON Formatter - Validate & Beautify JSON | Daily AI World",
        description: "Format, validate, and minify JSON data. A developer-friendly tool for debugging and formatting JSON.",
        component: JsonFormatter,
    },
};
