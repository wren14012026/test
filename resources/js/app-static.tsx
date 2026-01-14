import '../css/app.css';
import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import Heading from './components/heading';
import AppLogo from './components/app-logo';

// Timeline data (newest first)
const timelineData = [
    {
        id: 1,
        date: 'January 2026',
        title: 'Latest Achievement',
        description: 'Successfully deployed website to GitHub Pages with responsive design.',
    },
    {
        id: 2,
        date: 'December 2025',
        title: 'Project Launch',
        description: 'Launched the new React and Tailwind CSS powered project.',
    },
    {
        id: 3,
        date: 'November 2025',
        title: 'Design Finalization',
        description: 'Completed UI/UX design with modern dark theme styling.',
    },
    {
        id: 4,
        date: 'October 2025',
        title: 'Development Start',
        description: 'Initiated development with Laravel and React integration.',
    },
    {
        id: 5,
        date: 'September 2025',
        title: 'Project Planning',
        description: 'Planned architecture and technology stack selection.',
    },
];

// Login/Register Component
const AuthPage = ({ onBack }: { onBack: () => void }): JSX.Element => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert(`${isLogin ? 'Login' : 'Register'} submitted (Demo only)`);
    };

    return (
        <div className="flex-1 flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">
                <div className="bg-slate-800 p-8 rounded-lg border border-slate-700 shadow-xl">
                    <h2 className="text-3xl font-bold text-center mb-8">
                        {isLogin ? 'Login' : 'Register'}
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {!isLogin && (
                            <div>
                                <label className="block text-sm font-medium mb-2">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="John Doe"
                                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 transition-colors"
                                    required={!isLogin}
                                />
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium mb-2">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="you@example.com"
                                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 transition-colors"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder="••••••••"
                                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 transition-colors"
                                required
                            />
                        </div>

                        {!isLogin && (
                            <div>
                                <label className="block text-sm font-medium mb-2">Confirm Password</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    placeholder="••••••••"
                                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 transition-colors"
                                    required={!isLogin}
                                />
                            </div>
                        )}

                        <button
                            type="submit"
                            className="w-full py-2 bg-blue-500 hover:bg-blue-600 font-semibold rounded-lg transition-colors mt-6"
                        >
                            {isLogin ? 'Login' : 'Register'}
                        </button>
                    </form>

                    <div className="mt-6 text-center text-slate-300">
                        {isLogin ? "Don't have an account?" : 'Already have an account?'}
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="ml-2 text-blue-400 hover:text-blue-300 font-semibold transition-colors"
                        >
                            {isLogin ? 'Register' : 'Login'}
                        </button>
                    </div>

                    <button
                        onClick={onBack}
                        className="w-full mt-6 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        </div>
    );
};

// Timeline Component
const Timeline = (): JSX.Element => {
    return (
        <div className="py-16 px-4">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl font-bold text-center mb-16">Timeline</h2>
                
                {/* Desktop Timeline (hidden on mobile) */}
                <div className="hidden md:block">
                    <div className="relative">
                        {/* Center line */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-400 to-slate-600" />
                        
                        {/* Timeline items */}
                        <div className="space-y-12">
                            {timelineData.map((item, index) => (
                                <div key={item.id} className={`flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                                    {/* Content */}
                                    <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12 text-left'}`}>
                                        <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 hover:border-blue-400 transition-colors">
                                            <p className="text-blue-400 font-semibold mb-2">{item.date}</p>
                                            <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                                            <p className="text-slate-300">{item.description}</p>
                                        </div>
                                    </div>
                                    
                                    {/* Dot */}
                                    <div className="w-0 flex justify-center">
                                        <div className="w-4 h-4 bg-blue-400 rounded-full border-4 border-slate-800 relative z-10" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                
                {/* Mobile Timeline (vertical stacking) */}
                <div className="md:hidden">
                    <div className="relative pl-8">
                        {/* Side line */}
                        <div className="absolute left-1.5 top-0 w-1 h-full bg-gradient-to-b from-blue-400 to-slate-600" />
                        
                        {/* Timeline items */}
                        <div className="space-y-8">
                            {timelineData.map((item) => (
                                <div key={item.id} className="relative">
                                    {/* Dot */}
                                    <div className="absolute -left-6 top-2 w-4 h-4 bg-blue-400 rounded-full border-4 border-slate-800" />
                                    
                                    {/* Content */}
                                    <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 hover:border-blue-400 transition-colors">
                                        <p className="text-blue-400 font-semibold mb-1 text-sm">{item.date}</p>
                                        <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                                        <p className="text-slate-300 text-sm">{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Simple static app for GitHub Pages (no Inertia/backend required)
const App = (): JSX.Element => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState<'home' | 'auth'>('home');

    const navLinks = [
        { label: 'Home', href: '#', action: () => setCurrentPage('home') },
        { label: 'About', href: '#' },
        { label: 'Features', href: '#' },
        { label: 'Contact', href: '#', action: () => { setCurrentPage('auth'); setMobileMenuOpen(false); } },
    ];

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
            {/* Navigation Bar */}
            <nav className="sticky top-0 z-50 h-[5%] bg-slate-950 border-b border-slate-700 shadow-lg flex items-center px-4 md:px-6">
                <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
                    {/* Logo & Title */}
                    <button onClick={() => setCurrentPage('home')} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                        <div className="w-8 h-8">
                            <AppLogo />
                        </div>
                        <span className="text-lg font-bold hidden sm:inline">Test App</span>
                    </button>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex gap-6">
                        {navLinks.map((link) => (
                            <button
                                key={link.label}
                                onClick={link.action}
                                className="hover:text-blue-400 transition-colors"
                            >
                                {link.label}
                            </button>
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
                    <div className="absolute top-[100%] left-0 right-0 bg-slate-950 border-b border-slate-700 md:hidden">
                        <div className="flex flex-col gap-4 p-4">
                            {navLinks.map((link) => (
                                <button
                                    key={link.label}
                                    onClick={link.action}
                                    className="hover:text-blue-400 transition-colors py-2 text-left"
                                >
                                    {link.label}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </nav>

            {/* Page Content */}
            {currentPage === 'home' ? (
                <>
                    {/* Hero Section */}
                    <div className="flex flex-col items-center justify-center px-4 py-20">
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

                    {/* Timeline Section */}
                    <Timeline />
                </>
            ) : (
                <AuthPage onBack={() => setCurrentPage('home')} />
            )}
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
