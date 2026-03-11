import React from 'react';
import { Metadata } from 'next';
import { Schema } from '@/components/seo/Schema';

export const metadata: Metadata = {
    title: 'Contact Daily AI World | Get in Touch',
    description: 'Contact Daily AI World for inquiries, feedback, or partnerships. Find our email, address, and social media links here.',
};

export default function ContactPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                Contact Us
            </h1>

            <div className="prose prose-invert prose-lg max-w-none">
                <section className="mb-12 text-center">
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        We'd love to hear from you! Whether you have a question about our content, want to provide feedback on our AI tools, or are interested in partnership opportunities, feel free to reach out to us.
                    </p>
                </section>

                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-white/5 p-8 rounded-xl border border-white/10 backdrop-blur-sm">
                        <h2 className="text-2xl font-semibold mb-6 text-orange-500">How can I contact Daily AI World?</h2>
                        <div className="space-y-4 text-muted-foreground">
                            <p>
                                <strong className="text-white">Email for General Inquiries:</strong><br />
                                <a href="mailto:contact@dailyaiworld.com" className="text-orange-400 hover:text-orange-300 transition-colors">contact@dailyaiworld.com</a>
                            </p>
                            <p>
                                <strong className="text-white">Email for Partnerships:</strong><br />
                                <a href="mailto:partners@dailyaiworld.com" className="text-orange-400 hover:text-orange-300 transition-colors">partners@dailyaiworld.com</a>
                            </p>
                            <p>
                                <strong className="text-white">Phone Support:</strong><br />
                                +1 (555) 123-4567
                            </p>
                        </div>
                    </div>

                    <div className="bg-white/5 p-8 rounded-xl border border-white/10 backdrop-blur-sm">
                        <h2 className="text-2xl font-semibold mb-6 text-orange-500">Where are we located?</h2>
                        <div className="space-y-4 text-muted-foreground">
                            <p>
                                <strong className="text-white">Headquarters:</strong><br />
                                123 AI Boulevard<br />
                                Innovation District<br />
                                Tech City, TC 90210<br />
                                United States
                            </p>
                            <div className="pt-4">
                                <strong className="text-white block mb-2">Connect Given Socials:</strong>
                                <div className="flex gap-4">
                                    <a href="#" className="text-orange-400 hover:text-orange-300 transition-colors">Twitter (X)</a>
                                    <a href="#" className="text-orange-400 hover:text-orange-300 transition-colors">LinkedIn</a>
                                    <a href="#" className="text-orange-400 hover:text-orange-300 transition-colors">Facebook</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Schema
                type="ContactPage"
                data={{
                    name: "Contact Daily AI World",
                    description: "Contact information for Daily AI World, including email, phone, and address.",
                    url: "https://dailyaiworld.com/contact",
                    mainEntity: {
                        "@type": "Organization",
                        name: "Daily AI World",
                        contactPoint: {
                            "@type": "ContactPoint",
                            telephone: "+1-555-123-4567",
                            contactType: "customer service",
                            email: "contact@dailyaiworld.com",
                            availableLanguage: "en"
                        }
                    }
                }}
            />
        </div>
    );
}
