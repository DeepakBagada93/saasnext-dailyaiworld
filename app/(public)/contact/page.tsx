import React from 'react';

export default function ContactPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
            <div className="prose dark:prose-invert max-w-none">
                <p className="text-lg mb-8">
                    We'd love to hear from you! Whether you have a question, feedback, or just want to say hello, feel free to reach out to us.
                </p>

                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-card p-6 rounded-lg border">
                        <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
                        <p className="mb-4">
                            <strong>Email:</strong> contact@dailyaiworld.com
                        </p>
                        <p className="mb-4">
                            <strong>Address:</strong><br />
                            123 AI Boulevard<br />
                            Tech City, TC 90210
                        </p>
                    </div>

                    <div className="bg-card p-6 rounded-lg border">
                        <h2 className="text-2xl font-semibold mb-4">Follow Us</h2>
                        <p className="mb-4">
                            Stay connected with us on social media for the latest updates.
                        </p>
                        <div className="flex gap-4">
                            {/* Add social media links here */}
                            <a href="#" className="text-primary hover:underline">Twitter</a>
                            <a href="#" className="text-primary hover:underline">LinkedIn</a>
                            <a href="#" className="text-primary hover:underline">Facebook</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
