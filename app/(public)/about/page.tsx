import React from 'react';

export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <h1 className="text-4xl font-bold mb-8">About Us</h1>
            <div className="prose dark:prose-invert max-w-none">
                <p className="text-lg mb-6">
                    Welcome to Daily AI World, your premier destination for the latest news, insights, and developments in the world of Artificial Intelligence.
                </p>
                <p className="mb-6">
                    Our mission is to demystify AI and make it accessible to everyone. Whether you're a developer, a business leader, or simply an AI enthusiast, we provide curated content that helps you stay ahead of the curve.
                </p>
                <p>
                    We believe in the transformative power of AI and its potential to shape a better future. Join us on this exciting journey as we explore the limitless possibilities of artificial intelligence.
                </p>
            </div>
        </div>
    );
}
