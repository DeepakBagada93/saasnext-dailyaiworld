"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Schema } from "@/components/seo/Schema";

export function SEOContent() {
    const faqData = [
        {
            question: "What is the latest AI news today?",
            answer: "Daily AI World provides real-time updates on the latest AI news today, covering breakthroughs in machine learning, generative AI, ChatGPT developments, Google AI innovations, and enterprise AI adoption. Our team curates the most important AI technology news from around the world daily."
        },
        {
            question: "Where can I find AI news from India and Asia?",
            answer: "We cover comprehensive AI news from India and Asia, including AI startups, government AI initiatives, technology innovation hubs in Bangalore, Singapore, Tokyo, and Beijing. Our AI news Asia section focuses on regional developments in artificial intelligence and machine learning across Asian markets."
        },
        {
            question: "What are the top AI technology trends in 2026?",
            answer: "The latest AI technology trends include advanced large language models (LLMs), multimodal AI, AI agents for business automation, generative AI for creative industries, edge AI deployment, and ethical AI frameworks. Daily AI World tracks these trends with expert analysis and business impact assessments."
        },
        {
            question: "How can I stay updated with daily AI news?",
            answer: "Stay informed with Daily AI World - one of the leading AI news websites offering daily updates, in-depth articles, and expert commentary. Subscribe to our newsletter, follow our categories (AI Business, AI Design, Future of AI), and check our homepage for the latest AI news live updates."
        },
        {
            question: "What is the future of artificial intelligence?",
            answer: "The future of AI includes artificial general intelligence (AGI), human-AI collaboration, autonomous systems, AI-powered healthcare innovations, sustainable AI computing, and responsible AI governance. Our Future of AI news section explores these topics with insights from industry leaders and researchers."
        }
    ];

    return (
        <section className="py-20 relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto prose prose-invert prose-lg">
                    <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                        The Premier Destination for AI Insights
                    </h2>

                    <div className="grid gap-12">
                        {/* AI Business Section */}
                        <div className="space-y-4">
                            <h3 className="text-2xl font-semibold text-orange-500 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                                Transforming Business with Artificial Intelligence
                            </h3>
                            <p className="text-muted-foreground leading-relaxed">
                                In today's rapidly evolving digital landscape, <strong>Artificial Intelligence (AI)</strong> is not just a buzzword but a fundamental driver of business innovation. At <Link href="/" className="text-white hover:text-orange-400 transition-colors">Daily AI World</Link>, we provide in-depth analysis on how AI is reshaping industries, from <Link href="/category/ai-marketing" className="text-white hover:text-orange-400 transition-colors">automated marketing workflows</Link> to predictive analytics in finance. Our <Link href="/category/ai-business" className="text-white hover:text-orange-400 transition-colors">AI Business</Link> section offers actionable strategies for leaders looking to integrate LLMs and machine learning into their operations.
                            </p>
                        </div>

                        {/* AI Design Section */}
                        <div className="space-y-4">
                            <h3 className="text-2xl font-semibold text-purple-500 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                                Redefining Creativity through AI Design
                            </h3>
                            <p className="text-muted-foreground leading-relaxed">
                                The intersection of technology and art is more vibrant than ever. Our <Link href="/category/ai-design" className="text-white hover:text-orange-400 transition-colors">AI Design</Link> coverage explores the latest tools like Midjourney, DALL-E, and Stable Diffusion. Whether you're a UI/UX designer looking to speed up prototyping or a digital artist exploring generative art, we curate the best resources, tutorials, and <Link href="/tools/image-resizer" className="text-white hover:text-orange-400 transition-colors">image utility tools</Link> to enhance your creative workflow.
                            </p>
                        </div>

                        {/* Future of AI Section */}
                        <div className="space-y-4">
                            <h3 className="text-2xl font-semibold text-emerald-500 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                                Navigating the Future of AI
                            </h3>
                            <p className="text-muted-foreground leading-relaxed">
                                What does the future hold for AGI and human-AI collaboration? Our <Link href="/category/future-of-ai" className="text-white hover:text-orange-400 transition-colors">Future of AI</Link> articles dive deep into ethical considerations, emerging trends, and the societal impact of autonomous systems. Stay ahead of the curve with our expert commentary on the next generation of neural networks and cognitive computing.
                            </p>
                        </div>

                        {/* Tools & Utilities Section */}
                        <div className="space-y-4">
                            <h3 className="text-2xl font-semibold text-blue-500 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                                Essential AI & Developer Tools
                            </h3>
                            <p className="text-muted-foreground leading-relaxed">
                                Beyond news and analysis, Daily AI World offers a suite of powerful, free-to-use tools. From <Link href="/tools/qr-code-generator" className="text-white hover:text-orange-400 transition-colors">QR Code Generators</Link> and <Link href="/tools/password-generator" className="text-white hover:text-orange-400 transition-colors">Password Generators</Link> to advanced <Link href="/tools/json-formatter" className="text-white hover:text-orange-400 transition-colors">JSON Formatters</Link> and <Link href="/tools/image-compressor" className="text-white hover:text-orange-400 transition-colors">Image Compressors</Link>, our platform is designed to boost productivity for developers, marketers, and content creators alike.
                            </p>
                        </div>

                        {/* FAQ Section */}
                        <div className="space-y-6 mt-16 pt-12 border-t border-border">
                            <h3 className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-purple-500">
                                Frequently Asked Questions
                            </h3>
                            <div className="space-y-6">
                                {faqData.map((faq, index) => (
                                    <div
                                        key={index}
                                        className="bg-muted/20 border border-border/50 rounded-lg p-6 hover:border-orange-500/50 transition-colors"
                                    >
                                        <h4 className="text-xl font-semibold text-white mb-3 flex items-start gap-3">
                                            <span className="text-orange-500 text-2xl font-bold shrink-0">Q{index + 1}.</span>
                                            <span>{faq.question}</span>
                                        </h4>
                                        <p className="text-muted-foreground leading-relaxed ml-11">
                                            {faq.answer}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* FAQ Structured Data */}
            <Schema
                type="FAQPage"
                data={{
                    mainEntity: faqData.map(faq => ({
                        "@type": "Question",
                        name: faq.question,
                        acceptedAnswer: {
                            "@type": "Answer",
                            text: faq.answer
                        }
                    }))
                }}
            />
        </section>
    );
}
