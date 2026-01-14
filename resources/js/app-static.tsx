import '../css/app.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import Heading from './components/heading';
import AppLogo from './components/app-logo';

// Language translations
const translations: Record<string, Record<string, string | Record<string, string>>> = {
    EN: {
        home: 'Home',
        about: 'About',
        features: 'Features',
        contact: 'Contact',
        welcome: 'Welcome to Test',
        subtitle: 'This is a static version deployed to GitHub Pages',
        builtWith: 'Built with React, TypeScript, and Tailwind CSS',
        backendNote: '(Full-stack features require a Laravel backend)',
        timeline: 'Timeline',
        login: 'Login',
        register: 'Register',
        email: 'Email',
        password: 'Password',
        confirmPassword: 'Confirm Password',
        fullName: 'Full Name',
        emailPlaceholder: 'you@example.com',
        passwordPlaceholder: '••••••••',
        namePlaceholder: 'John Doe',
        dontHaveAccount: "Don't have an account?",
        haveAccount: 'Already have an account?',
        backToHome: 'Back to Home',
        timelineItems: {
            item1Date: 'January 2026',
            item1Title: 'Latest Achievement',
            item1Desc: 'Successfully deployed website to GitHub Pages with responsive design.',
            item2Date: 'December 2025',
            item2Title: 'Project Launch',
            item2Desc: 'Launched the new React and Tailwind CSS powered project.',
            item3Date: 'November 2025',
            item3Title: 'Design Finalization',
            item3Desc: 'Completed UI/UX design with modern dark theme styling.',
            item4Date: 'October 2025',
            item4Title: 'Development Start',
            item4Desc: 'Initiated development with Laravel and React integration.',
            item5Date: 'September 2025',
            item5Title: 'Project Planning',
            item5Desc: 'Planned architecture and technology stack selection.',
        },
    },
    ZH: {
        home: '首页',
        about: '关于',
        features: '功能',
        contact: '联系',
        welcome: '欢迎使用测试',
        subtitle: '这是一个部署到 GitHub Pages 的静态版本',
        builtWith: '使用 React、TypeScript 和 Tailwind CSS 构建',
        backendNote: '（全栈功能需要 Laravel 后端）',
        timeline: '时间线',
        login: '登录',
        register: '注册',
        email: '电子邮件',
        password: '密码',
        confirmPassword: '确认密码',
        fullName: '全名',
        emailPlaceholder: 'you@example.com',
        passwordPlaceholder: '••••••••',
        namePlaceholder: '张三',
        dontHaveAccount: '没有账户？',
        haveAccount: '已有账户？',
        backToHome: '返回首页',
        timelineItems: {
            item1Date: '2026年1月',
            item1Title: '最新成就',
            item1Desc: '成功部署网站到 GitHub Pages 并实现响应式设计。',
            item2Date: '2025年12月',
            item2Title: '项目启动',
            item2Desc: '推出新的 React 和 Tailwind CSS 项目。',
            item3Date: '2025年11月',
            item3Title: '设计完成',
            item3Desc: '完成了现代深色主题风格的 UI/UX 设计。',
            item4Date: '2025年10月',
            item4Title: '开发开始',
            item4Desc: '启动 Laravel 和 React 集成开发。',
            item5Date: '2025年9月',
            item5Title: '项目规划',
            item5Desc: '规划架构和技术栈选择。',
        },
    },
    ES: {
        home: 'Inicio',
        about: 'Acerca de',
        features: 'Características',
        contact: 'Contacto',
        welcome: 'Bienvenido a Test',
        subtitle: 'Esta es una versión estática implementada en GitHub Pages',
        builtWith: 'Construido con React, TypeScript y Tailwind CSS',
        backendNote: '(Las características de pila completa requieren un backend de Laravel)',
        timeline: 'Cronología',
        login: 'Iniciar sesión',
        register: 'Registrarse',
        email: 'Correo electrónico',
        password: 'Contraseña',
        confirmPassword: 'Confirmar contraseña',
        fullName: 'Nombre completo',
        emailPlaceholder: 'tu@ejemplo.com',
        passwordPlaceholder: '••••••••',
        namePlaceholder: 'Juan Pérez',
        dontHaveAccount: '¿No tienes cuenta?',
        haveAccount: '¿Ya tienes cuenta?',
        backToHome: 'Volver al inicio',
        timelineItems: {
            item1Date: 'Enero de 2026',
            item1Title: 'Logro más reciente',
            item1Desc: 'Se implementó exitosamente el sitio web en GitHub Pages con diseño responsivo.',
            item2Date: 'Diciembre de 2025',
            item2Title: 'Lanzamiento del proyecto',
            item2Desc: 'Lanzado el nuevo proyecto con React y Tailwind CSS.',
            item3Date: 'Noviembre de 2025',
            item3Title: 'Finalización del diseño',
            item3Desc: 'Completado el diseño de UI/UX con estilo de tema oscuro moderno.',
            item4Date: 'Octubre de 2025',
            item4Title: 'Inicio del desarrollo',
            item4Desc: 'Iniciado el desarrollo con integración de Laravel y React.',
            item5Date: 'Septiembre de 2025',
            item5Title: 'Planificación del proyecto',
            item5Desc: 'Planificación de arquitectura y selección de pila tecnológica.',
        },
    },
};

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
const AuthPage = ({ onBack, language }: { onBack: () => void; language: string }): JSX.Element => {
    const t = translations[language] || translations.EN;
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
        alert(`${isLogin ? t.login : t.register} submitted (Demo only)`);
    };

    return (
        <div className="flex-1 flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">
                <div className="bg-slate-800 p-8 rounded-lg border border-slate-700 shadow-xl">
                    <h2 className="text-3xl font-bold text-center mb-8">
                        {isLogin ? t.login : t.register}
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {!isLogin && (
                            <div>
                                <label className="block text-sm font-medium mb-2">{t.fullName}</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder={t.namePlaceholder as string}
                                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 transition-colors"
                                    required={!isLogin}
                                />
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium mb-2">{t.email}</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder={t.emailPlaceholder as string}
                                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 transition-colors"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">{t.password}</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder={t.passwordPlaceholder as string}
                                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 transition-colors"
                                required
                            />
                        </div>

                        {!isLogin && (
                            <div>
                                <label className="block text-sm font-medium mb-2">{t.confirmPassword}</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    placeholder={t.passwordPlaceholder as string}
                                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 transition-colors"
                                    required={!isLogin}
                                />
                            </div>
                        )}

                        <button
                            type="submit"
                            className="w-full py-2 bg-blue-500 hover:bg-blue-600 font-semibold rounded-lg transition-colors mt-6"
                        >
                            {isLogin ? t.login : t.register}
                        </button>
                    </form>

                    <div className="mt-6 text-center text-slate-300">
                        {isLogin ? t.dontHaveAccount : t.haveAccount}
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="ml-2 text-blue-400 hover:text-blue-300 font-semibold transition-colors"
                        >
                            {isLogin ? t.register : t.login}
                        </button>
                    </div>

                    <button
                        onClick={onBack}
                        className="w-full mt-6 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
                    >
                        {t.backToHome}
                    </button>
                </div>
            </div>
        </div>
    );
};

// Timeline Component
const Timeline = ({ language }: { language: string }): JSX.Element => {
    const t = translations[language] || translations.EN;
    const items = t.timelineItems as Record<string, string>;
    
    const timelineItems = [
        { date: items.item1Date, title: items.item1Title, desc: items.item1Desc },
        { date: items.item2Date, title: items.item2Title, desc: items.item2Desc },
        { date: items.item3Date, title: items.item3Title, desc: items.item3Desc },
        { date: items.item4Date, title: items.item4Title, desc: items.item4Desc },
        { date: items.item5Date, title: items.item5Title, desc: items.item5Desc },
    ];

    return (
        <div className="py-16 px-4">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl font-bold text-center mb-16">{t.timeline}</h2>
                
                {/* Desktop Timeline (hidden on mobile) */}
                <div className="hidden md:block">
                    <div className="relative">
                        {/* Center line */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-400 to-slate-600" />
                        
                        {/* Timeline items */}
                        <div className="space-y-12">
                            {timelineItems.map((item, index) => (
                                <div key={index} className={`flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                                    {/* Content */}
                                    <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12 text-left'}`}>
                                        <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 hover:border-blue-400 transition-colors">
                                            <p className="text-blue-400 font-semibold mb-2">{item.date}</p>
                                            <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                                            <p className="text-slate-300">{item.desc}</p>
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
                            {timelineItems.map((item, index) => (
                                <div key={index} className="relative">
                                    {/* Dot */}
                                    <div className="absolute -left-6 top-2 w-4 h-4 bg-blue-400 rounded-full border-4 border-slate-800" />
                                    
                                    {/* Content */}
                                    <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 hover:border-blue-400 transition-colors">
                                        <p className="text-blue-400 font-semibold mb-1 text-sm">{item.date}</p>
                                        <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                                        <p className="text-slate-300 text-sm">{item.desc}</p>
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
    const [language, setLanguage] = useState('EN');
    
    const t = translations[language] || translations.EN;

    const navLinks = [
        { label: t.home, href: '#', action: () => setCurrentPage('home') },
        { label: t.about, href: '#' },
        { label: t.features, href: '#' },
        { label: t.contact, href: '#', action: () => { setCurrentPage('auth'); setMobileMenuOpen(false); } },
    ];

    const languages = [
        { code: 'EN', label: 'English' },
        { code: 'ZH', label: '中文' },
        { code: 'ES', label: 'Español' },
    ];

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
            {/* Navigation Bar */}
            <nav className="sticky top-0 z-50 h-[5%] bg-slate-950 border-b border-slate-700 shadow-lg flex items-center px-4 md:px-6">
                <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
                    {/* Left Navigation Buttons - Desktop only */}
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

                    {/* Right Language Buttons - Desktop */}
                    <div className="hidden md:flex gap-3">
                        {languages.map((lang) => (
                            <button
                                key={lang.code}
                                onClick={() => setLanguage(lang.code)}
                                className={`px-3 py-1 rounded transition-colors ${
                                    language === lang.code
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                                }`}
                            >
                                {lang.label}
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
                            <div className="border-t border-slate-700 pt-4 flex gap-2">
                                {languages.map((lang) => (
                                    <button
                                        key={lang.code}
                                        onClick={() => {
                                            setLanguage(lang.code);
                                            setMobileMenuOpen(false);
                                        }}
                                        className={`px-3 py-1 rounded text-sm transition-colors ${
                                            language === lang.code
                                                ? 'bg-blue-500 text-white'
                                                : 'bg-slate-800 text-slate-300'
                                        }`}
                                    >
                                        {lang.label}
                                    </button>
                                ))}
                            </div>
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
                            <Heading>{t.welcome}</Heading>
                            <p className="text-lg md:text-xl text-slate-300 mt-4 mb-8">
                                {t.subtitle}
                            </p>
                            <div className="space-y-4">
                                <p className="text-slate-400">
                                    {t.builtWith}
                                </p>
                                <p className="text-sm text-slate-500">
                                    {t.backendNote}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Timeline Section */}
                    <Timeline language={language} />
                </>
            ) : (
                <AuthPage onBack={() => setCurrentPage('home')} language={language} />
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
