import React from 'react';
import { Metadata } from 'next';
import { Schema } from '@/components/seo/Schema';

export const metadata: Metadata = {
    title: 'Privacy Policy | Daily AI World',
    description: 'Read the Daily AI World Privacy Policy to understand how we collect, use, and protect your personal data when you visit our website.',
};

export default function PrivacyPolicyPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                Privacy Policy
            </h1>

            <div className="prose prose-invert prose-lg max-w-none">
                <p className="mb-8 text-muted-foreground text-center">
                    Last updated: {new Date().toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>

                <section className="mb-10">
                    <h2 className="text-2xl font-semibold text-orange-500 mb-4">1. What is this Privacy Policy about?</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                        Welcome to Daily AI World. We respect your privacy and are committed to protecting your personal data. This privacy policy informs you how we handle and protect your personal data when you visit our website, and tells you about your privacy rights globally.
                    </p>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-semibold text-orange-500 mb-4">2. What Data Do We Collect?</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                        We may collect, use, store, and transfer different kinds of personal data about you. We group this data as follows:
                    </p>
                    <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
                        <li><strong>Identity Data:</strong> Includes first name, last name, username, or similar identifiers when you register or subscribe.</li>
                        <li><strong>Contact Data:</strong> Includes email address and telephone number for newsletters or support.</li>
                        <li><strong>Technical Data:</strong> Includes internet protocol (IP) address, browser type and version, time zone setting, location, browser plug-in types, operating system, and platform used to access this website.</li>
                    </ul>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-semibold text-orange-500 mb-4">3. How Do We Use Your Data?</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                        We will only use your personal data when the law allows us to. Most commonly, we use your personal data in the following circumstances:
                    </p>
                    <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
                        <li><strong>Service Delivery:</strong> Where we need to perform the contract we are about to enter into or have entered into with you (e.g., providing access to our AI tools).</li>
                        <li><strong>Legitimate Interests:</strong> Where it is necessary for our legitimate interests (or those of a third party), such as improving our website content, and your interests and fundamental rights do not override those interests.</li>
                        <li><strong>Legal Compliance:</strong> Where we need to comply with a legal or regulatory obligation.</li>
                    </ul>
                </section>
            </div>

            <Schema
                type="WebPage"
                data={{
                    name: "Privacy Policy - Daily AI World",
                    description: "Privacy Policy detailing data collection, usage, and protection practices for Daily AI World.",
                    url: "https://dailyaiworld.com/privacy-policy",
                    dateModified: new Date().toISOString()
                }}
            />
        </div>
    );
}
