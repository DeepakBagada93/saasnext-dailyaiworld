import React from 'react';

export default function TermsPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <h1 className="text-4xl font-bold mb-8">Terms and Conditions</h1>
            <div className="prose dark:prose-invert max-w-none">
                <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>

                <h2 className="text-2xl font-semibold mt-8 mb-4">1. Agreement to Terms</h2>
                <p className="mb-4">
                    By accessing our website, you agree to be bound by these Terms and Conditions and agree that you are responsible for the agreement with any applicable local laws. If you disagree with any of these terms, you are prohibited from accessing this site.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4">2. Intellectual Property Rights</h2>
                <p className="mb-4">
                    Other than the content you own, under these Terms, Daily AI World and/or its licensors own all the intellectual property rights and materials contained in this Website. You are granted limited license only for purposes of viewing the material contained on this Website.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4">3. Restrictions</h2>
                <p className="mb-4">
                    You are specifically restricted from all of the following:
                </p>
                <ul className="list-disc pl-6 mb-4">
                    <li>publishing any Website material in any other media;</li>
                    <li>selling, sublicensing and/or otherwise commercializing any Website material;</li>
                    <li>publicly performing and/or showing any Website material;</li>
                    <li>using this Website in any way that is or may be damaging to this Website;</li>
                    <li>using this Website in any way that impacts user access to this Website;</li>
                </ul>

                <h2 className="text-2xl font-semibold mt-8 mb-4">4. Limitation of Liability</h2>
                <p className="mb-4">
                    In no event shall Daily AI World, nor any of its officers, directors and employees, be held liable for anything arising out of or in any way connected with your use of this Website whether such liability is under contract. Daily AI World, including its officers, directors and employees shall not be held liable for any indirect, consequential or special liability arising out of or in any way related to your use of this Website.
                </p>
            </div>
        </div>
    );
}
