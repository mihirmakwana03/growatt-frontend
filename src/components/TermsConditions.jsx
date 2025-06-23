import React from "react";

const terms = [
    {
        title: "Acceptance of Terms",
        desc: (
            <p>
                By accessing this website, you agree to comply with and be bound by these terms and conditions. If you disagree with any part of these terms, please do not use our website.
            </p>
        ),
        icon: (
            <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M12 4v16m8-8H4" />
            </svg>
        ),
    },
    {
        title: "Use of Services",
        desc: (
            <p>
                Our graphic design services are provided for creative and professional use only. Any unauthorized reproduction or distribution of our designs is strictly prohibited.
            </p>
        ),
        icon: (
            <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M12 20l9-5-9-5-9 5 9 5z" />
                <path d="M12 12V4" />
            </svg>
        ),
    },
    {
        title: "Intellectual Property",
        desc: (
            <p>
                All designs, logos, and creative assets produced by our company remain our intellectual property unless otherwise agreed upon in writing.
            </p>
        ),
        icon: (
            <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M16 3v4a1 1 0 001 1h4" />
            </svg>
        ),
    },
    {
        title: "Modifications",
        desc: (
            <p>
                We reserve the right to update or modify these terms at any time without prior notice. Your continued use of the website constitutes your acceptance of any changes.
            </p>
        ),
        icon: (
            <svg className="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
            </svg>
        ),
    },
    {
        title: "Contact Us",
        desc: (
            <p>
                If you have any questions about these Terms and Conditions, please contact us at{" "}
                <a href="mailto:growattinfosystem@gmail.com" className="text-blue-400 underline font-semibold">
                    growattinfosystem@gmail.com
                </a>
                .
            </p>
        ),
        icon: (
            <svg className="w-8 h-8 text-pink-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M21 10.5V6a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2h5.5" />
                <path d="M21 10.5l-9 6-9-6" />
            </svg>
        ),
    },
];

const TermsAndConditions = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20 px-4">
            <div className="max-w-3xl mx-auto bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-14 border border-gray-700">
                {/* Header */}
                <div className="flex flex-col items-center mb-12">
          <div className="bg-green-500 rounded-full p-3 shadow-lg mb-4 animate-bounce">
                        {/* Terms & Conditions Icon */}
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <rect x="4" y="4" width="16" height="16" rx="2" />
                            <path d="M8 8h8M8 12h8M8 16h4" />
                        </svg>
                    </div>
                    <h1 className="text-5xl font-extrabold text-white mb-2 text-center drop-shadow-lg">
                        Terms &amp; Conditions
                    </h1>
                    <p className="text-gray-300 text-lg text-center max-w-xl">
                        Welcome to our graphic design company! Please read these terms and conditions carefully before using our services.
                    </p>
                </div>

                {/* Terms Sections */}
                <div className="space-y-10">
                    {terms.map((term, idx) => (
                        <section
                            key={term.title}
                            className="flex flex-col md:flex-row items-start md:items-center gap-4 bg-gray-700/60 rounded-xl p-6 shadow-lg hover:scale-[1.02] transition-transform"
                        >
                            <div className="flex-shrink-0">{term.icon}</div>
                            <div>
                                <h2 className="text-2xl font-bold text-blue-300 mb-2">{term.title}</h2>
                                <div className="text-gray-200 text-base leading-relaxed">{term.desc}</div>
                            </div>
                        </section>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <a
                        href="/"
                        className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-bold text-lg shadow-lg hover:scale-105 transition-transform"
                    >
                        Back to Home
                    </a>
                </div>

                {/* Footer */}
                <div className="mt-14 text-center text-gray-500 text-sm">
                    &copy; {new Date().getFullYear()} Growatt InfoSystem. All rights reserved.
                </div>
            </div>
        </div>
    );
};

export default TermsAndConditions;
