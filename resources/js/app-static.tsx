import '../css/app.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Heading from './components/heading';
import AppLogo from './components/app-logo';

// Simple static app for GitHub Pages (no Inertia/backend required)
const App = (): JSX.Element => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white flex flex-col items-center justify-center">
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
