import React from 'react';

const sections = [
  {
    title: 'Introduction',
    content: (
      <p>
        At <span className="font-semibold text-green-400">Growatt InfoSystem</span> (“we”, “us”, or “our”), your privacy is our priority. We are dedicated to safeguarding your personal information and ensuring a secure, enjoyable experience on our platform.
      </p>
    ),
    icon: (
      <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M12 4v16m8-8H4" />
      </svg>
    ),
  },
  {
    title: '1. Information We Collect',
    content: (
      <ul className="list-disc list-inside space-y-2">
        <li>
          <strong>Personal Data:</strong> Name, email address, phone number, and any information you submit via forms.
        </li>
        <li>
          <strong>Usage Data:</strong> IP address, browser type, pages visited, and other analytics data.
        </li>
      </ul>
    ),
    icon: (
      <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M12 20l9-5-9-5-9 5 9 5z" />
        <path d="M12 12V4" />
      </svg>
    ),
  },
  {
    title: '2. How We Use Your Information',
    content: (
      <p>
        We use your information to enhance our services, communicate with you, process your requests, and comply with legal obligations.
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
    title: '3. Cookies and Tracking Technologies',
    content: (
      <p>
        We use cookies and similar technologies to analyze site activity and store certain information. You can manage your preferences via browser settings.
      </p>
    ),
    icon: (
      <svg className="w-8 h-8 text-pink-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    ),
  },
  {
    title: '4. Third‑Party Services',
    content: (
      <p>
        We may use trusted third‑party services like Google Analytics to monitor website performance, subject to their privacy policies.
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
    title: '5. Data Security',
    content: (
      <p>
        We implement robust administrative, technical, and physical safeguards to protect your data from unauthorized access.
      </p>
    ),
    icon: (
      <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <rect x="3" y="11" width="18" height="10" rx="2" />
        <path d="M7 11V7a5 5 0 0110 0v4" />
      </svg>
    ),
  },
  {
    title: '6. Children’s Privacy',
    content: (
      <p>
        Our services are not intended for individuals under 16. We do not knowingly collect data from minors.
      </p>
    ),
    icon: (
      <svg className="w-8 h-8 text-orange-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <circle cx="12" cy="7" r="4" />
        <path d="M5.5 21a7.5 7.5 0 0113 0" />
      </svg>
    ),
  },
  {
    title: '7. Changes to This Privacy Policy',
    content: (
      <p>
        We may update this policy periodically. The “Last updated” date at the top will indicate recent changes.
      </p>
    ),
    icon: (
      <svg className="w-8 h-8 text-teal-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M12 8v4l3 3" />
        <circle cx="12" cy="12" r="10" />
      </svg>
    ),
  },
  {
    title: '8. Contact Us',
    content: (
      <p>
        Questions? Email us at{' '}
        <a href="mailto:growattinfosystem@gmail.com" className="text-blue-400 underline font-semibold">
          growattinfosystem@gmail.com
        </a>
        .
      </p>
    ),
    icon: (
      <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M21 10.5V6a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2h5.5" />
        <path d="M21 10.5l-9 6-9-6" />
      </svg>
    ),
  },
];

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20 px-4">
      <div className="max-w-3xl mx-auto bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-14 border border-gray-700">
        {/* Header */}
        <div className="flex flex-col items-center mb-12">
          <div className="bg-green-500 rounded-full p-3 shadow-lg mb-4 animate-bounce">
            {/* Security icon */}
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <rect x="3" y="11" width="18" height="10" rx="2" />
              <path d="M7 11V7a5 5 0 0110 0v4" />
            </svg>
          </div>
          <h1 className="text-5xl font-extrabold text-white mb-2 text-center drop-shadow-lg">
            Privacy Policy
          </h1>
          <p className="text-gray-300 text-lg text-center max-w-xl">
            Your privacy matters to us. Please read below to learn how we handle your information.
          </p>
        </div>

        {/* Sections */}
          <div className="space-y-10">
            {sections.map((section, idx) => (
              <section
                key={section.title}
                className="flex flex-col md:flex-row items-start md:items-center gap-4 bg-gray-700/60 rounded-xl p-6 shadow-lg hover:scale-[1.02] transition-transform"
              >
                <div className="flex-shrink-0">{section.icon}</div>
                <div>
            <h2 className="text-2xl font-bold text-green-300 mb-2">{section.title}</h2>
            <div className="text-gray-200 text-base leading-relaxed">{section.content}</div>
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

export default PrivacyPolicy;
