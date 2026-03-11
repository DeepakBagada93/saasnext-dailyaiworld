import React from 'react';
import { Metadata } from 'next';
import { Schema } from '@/components/seo/Schema';

export const metadata: Metadata = {
    title: 'Terms and Conditions | Daily AI World',
    description: 'Read the terms and conditions for using Daily AI World, including intellectual property rights, acceptable use, and limitations of liability.',
};

export default function TermsPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                Terms and Conditions
            </h1>

            <div className="prose prose-invert prose-lg max-w-none">
                <p className="mb-8 text-muted-foreground text-center">
                    Last updated: {new Date().toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>

                <section className="mb-10">
                    <h2 className="text-2xl font-semibold text-orange-500 mb-4">1. What are the rules for using this website?</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                        By accessing Daily AI World, you agree to be bound by these Terms and Conditions and acknowledge that you are responsible for compliance with any applicable local laws. If you disagree with any of these terms, you are prohibited from accessing or using this site.
                    </p>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-semibold text-orange-500 mb-4">2. Who owns the content on this website?</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                        Other than the content you own, under these Terms, Daily AI World and/or its licensors own all the intellectual property rights and materials contained in this Website. You are granted a limited license only for the purposes of viewing the material contained on this Website.
                    </p>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-semibold text-orange-500 mb-4">3. What actions are restricted?</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                        To maintain a safe and reliable platform, you are specifically restricted from all of the following:
                    </p>
                    <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
                        <li>Publishing any Website material in any other media without prior consent;</li>
                        <li>Selling, sublicensing, or otherwise commercializing any Website material;</li>
                        <li>Using this Website in any way that is or may be damaging to the Website or its infrastructure;</li>
                        <li>Using this Website in any way that impacts user access to data or AI tools provided here;</li>
                    </ul>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-semibold text-orange-500 mb-4">4. What is our limitation of liability?</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                        In no event shall Daily AI World, nor any of its officers, directors, and employees, be held liable for anything arising out of or in any way connected with your use of this Website or its AI tools. Daily AI World shall not be held liable for any indirect, consequential, or special liability arising out of or in any way related to your use of this Website.
                    </p>
                </section>
            </div>

            <Schema
                type="WebPage"
                data={{
                    name: "Terms and Conditions - Daily AI World",
                    description: "Terms of service agreements including intellectual property, user restrictions, and liability.",
                    url: "https://dailyaiworld.com/terms",
                    dateModified: new Date().toISOString()
                }}
            />
        </div>
    );
}
