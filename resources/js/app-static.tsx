import '../css/app.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Heading from './components/heading';
import AppLogo from './components/app-logo';

// Simple static app for GitHub Pages (no Inertia/backend required)
const App = (): JSX.Element => {
    return (
        <div className="flex flex-col h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
            {/* Navigation Bar */}
            <nav className="h-[5%] bg-slate-950 border-b border-slate-700 shadow-lg flex items-center px-6">
                <div className="flex items-center gap-8 w-full max-w-7xl mx-auto">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8">
                            <AppLogo />
                        </div>
                        <span className="text-lg font-bold">Test App</span>
                    </div>
                    <div className="flex gap-6 ml-auto">
                        <a href="#" className="hover:text-blue-400 transition-colors">Home</a>
                        <a href="#" className="hover:text-blue-400 transition-colors">About</a>
                        <a href="#" className="hover:text-blue-400 transition-colors">Features</a>
                        <a href="#" className="hover:text-blue-400 transition-colors">Contact</a>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="flex-1 flex flex-col items-center justify-center">
                <div className="text-center">
                    <div className="mb-8 flex justify-center">
                        <AppLogo />
                    </div>
                    <Heading>Welcome to Test</Heading>
                    <p className="text-xl text-slate-300 mt-4 mb-8">
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
