import React from 'react';
import { Metadata } from 'next';
import { Schema } from '@/components/seo/Schema';

export const metadata: Metadata = {
    title: 'About Daily AI World | Our Mission & Vision',
    description: 'Learn about Daily AI World, your premier destination for the latest news, insights, and developments in Artificial Intelligence. Discover our mission to demystify AI.',
};

export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                About Daily AI World
            </h1>

            <div className="prose prose-invert prose-lg max-w-none">
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold text-orange-500 mb-4">Who is Daily AI World?</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        Daily AI World is a premier digital destination dedicated to providing the latest news, in-depth insights, and strategic developments in the world of Artificial Intelligence. We serve as a bridge between complex AI technologies and practical business applications.
                    </p>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-semibold text-orange-500 mb-4">What is our mission?</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        Our primary mission is to demystify Artificial Intelligence and make it accessible to everyone. We aim to empower our readers by breaking down complex concepts, tracking future trends like AGI, and highlighting practical AI tools that can revolutionize daily workflows and business operations.
                    </p>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-semibold text-orange-500 mb-4">Who is our audience?</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        Our content is tailored for a diverse audience including software developers, business leaders, digital marketers, designers, and AI enthusiasts. Whether you are seeking high-level AI business strategies or hands-on developer tools, Daily AI World curates content to help you stay ahead of the technological curve.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-orange-500 mb-4">Why follow us?</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        We believe in the transformative power of AI and its potential to shape a better future. By following Daily AI World, you gain access to vetted news, expert analysis, and a suite of free AI utilities designed to enhance your digital experience. Join us on this exciting journey as we explore the limitless possibilities of artificial intelligence.
                    </p>
                </section>
            </div>

            <Schema
                type="AboutPage"
                data={{
                    name: "About Daily AI World",
                    description: "Learn about Daily AI World's mission to demystify Artificial Intelligence and provide the latest AI news and insights.",
                    url: "https://dailyaiworld.com/about",
                    mainEntity: {
                        "@type": "Organization",
                        name: "Daily AI World",
                        description: "Premier destination for AI news, business strategies, design tools, and future trends."
                    }
                }}
            />
        </div>
    );
}
