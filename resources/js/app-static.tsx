import '../css/app.css';
import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import Heading from './components/heading';
import AppLogo from './components/app-logo';

// Simple static app for GitHub Pages (no Inertia/backend required)
const App = (): JSX.Element => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navLinks = [
        { label: 'Home', href: '#' },
        { label: 'About', href: '#' },
        { label: 'Features', href: '#' },
        { label: 'Contact', href: '#' },
    ];

    return (
        <div className="flex flex-col h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
            {/* Navigation Bar */}
            <nav className="h-[5%] bg-slate-950 border-b border-slate-700 shadow-lg flex items-center px-4 md:px-6">
                <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
                    {/* Logo & Title */}
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8">
                            <AppLogo />
                        </div>
                        <span className="text-lg font-bold hidden sm:inline">Test App</span>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex gap-6">
                        {navLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                className="hover:text-blue-400 transition-colors"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden flex flex-col gap-1.5 focus:outline-none"
                        aria-label="Toggle mobile menu"
                    >
                        <div
                            className={`w-6 h-0.5 bg-white transition-transform ${
                                mobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                            }`}
                        />
                        <div
                            className={`w-6 h-0.5 bg-white transition-opacity ${
                                mobileMenuOpen ? 'opacity-0' : ''
                            }`}
                        />
                        <div
                            className={`w-6 h-0.5 bg-white transition-transform ${
                                mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                            }`}
                        />
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="absolute top-[5%] left-0 right-0 bg-slate-950 border-b border-slate-700 md:hidden">
                        <div className="flex flex-col gap-4 p-4">
                            {navLinks.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    className="hover:text-blue-400 transition-colors py-2"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    </div>
                )}
            </nav>

            {/* Main Content */}
            <div className="flex-1 flex flex-col items-center justify-center px-4">
                <div className="text-center">
                    <div className="mb-8 flex justify-center">
                        <AppLogo />
                    </div>
                    <Heading>Welcome to Test</Heading>
                    <p className="text-lg md:text-xl text-slate-300 mt-4 mb-8">
                        This is a static version deployed to GitHub Pages
                    </p>
                    <div className="space-y-4">
                        <p className="text-slate-400">
                            Built with React, TypeScript, and Tailwind CSS
                        </p>
                        <p className="text-sm text-slate-500">
                            (Full-stack features require a Laravel backend)
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const appElement = document.getElementById('app');
if (appElement) {
    const root = createRoot(appElement);
    root.render(
        <StrictMode>
            <App />
        </StrictMode>,
    );
}
