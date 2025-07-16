import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import {
    Sun,
    Moon,
    ChevronDown,
    Search,
    Layers,
    Repeat,
    Wallet,
    Upload,
    Coins,
    BarChart3,
    PlusCircle,
    Eye,
} from "lucide-react";

const Header = () => {
    const [isDark, setIsDark] = useState(false);
    const searchRef = useRef(null);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "/" && document.activeElement.tagName !== "INPUT") {
                e.preventDefault();
                searchRef.current?.focus();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <header className="relative flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-900 shadow-md dark:shadow-lg transition-colors duration-300">
            {/* Left: Logo & Menus */}
            <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-3">
                    <img src="/react.svg" alt="Logo" className="w-8 h-8" />
                    <span className="text-xl font-bold text-gray-800 dark:text-white">UniClone</span>
                </div>

                {/* Menus */}
                <nav className="flex items-center space-x-4">
                    {/* Trade Dropdown */}
                    <div className="relative group">
                        <div className="flex items-center space-x-1 text-gray-700 dark:text-gray-200 hover:text-blue-600 cursor-pointer">
                            <span>Trade</span>
                            <ChevronDown className="w-4 h-4" />
                        </div>
                        <div className="absolute z-10 hidden group-hover:flex flex-col mt-2 w-32 bg-white dark:bg-gray-800 text-white rounded-md shadow-lg">
                            <Link to="/swap" className="flex items-center px-4 py-2 space-x-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm">
                                <Repeat className="w-4 h-4" />
                                <span>Swap</span>
                            </Link>
                            <Link to="/buy" className="flex items-center px-4 py-2 space-x-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm">
                                <Wallet className="w-4 h-4" />
                                <span>Buy</span>
                            </Link>
                            <Link to="/sell" className="flex items-center px-4 py-2 space-x-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm">
                                <Upload className="w-4 h-4" />
                                <span>Sell</span>
                            </Link>
                        </div>
                    </div>

                    {/* Explore Dropdown */}
                    <div className="relative group">
                        <div className="flex items-center space-x-1 text-gray-700 dark:text-gray-200 hover:text-blue-600 cursor-pointer">
                            <Search className="w-4 h-4" />
                            <span>Explore</span>
                            <ChevronDown className="w-4 h-4" />
                        </div>
                        <div className="absolute z-10 hidden group-hover:flex flex-col mt-2 w-32 bg-white dark:bg-gray-800 text-white rounded-md shadow-lg">
                            <Link to="/tokens" className="flex items-center px-4 py-2 space-x-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm">
                                <Coins className="w-4 h-4" />
                                <span>Tokens</span>
                            </Link>
                            <Link to="/pools" className="flex items-center px-4 py-2 space-x-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm">
                                <BarChart3 className="w-4 h-4" />
                                <span>Pools</span>
                            </Link>
                        </div>
                    </div>

                    {/* Pool Dropdown */}
                    <div className="relative group">
                        <div className="flex items-center space-x-1 text-gray-700 dark:text-gray-200 hover:text-blue-600 cursor-pointer">
                            <Layers className="w-4 h-4" />
                            <span>Pool</span>
                            <ChevronDown className="w-4 h-4" />
                        </div>
                        <div className="absolute z-10 hidden group-hover:flex flex-col mt-2 w-48 bg-white dark:bg-gray-800 text-white rounded-md shadow-lg">
                            <Link to="/create-position" className="flex items-center px-4 py-2 space-x-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm">
                                <PlusCircle className="w-4 h-4" />
                                <span>Create Position</span>
                            </Link>
                            <Link to="/view-position" className="flex items-center px-4 py-2 space-x-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm">
                                <Eye className="w-4 h-4" />
                                <span>View Position</span>
                            </Link>
                        </div>
                    </div>
                </nav>
            </div>

            {/* Search Bar - Centered */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
                <input
                    ref={searchRef}
                    type="text"
                    placeholder="Search tokens or pools                    /"
                    className="w-64 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Right: Theme Toggle & Wallet */}
            <div className="flex items-center space-x-4">
                <button
                    onClick={() => setIsDark(!isDark)}
                    className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full"
                >
                    {isDark ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-800" />}
                </button>

                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">
                    Connect
                </button>
            </div>
        </header>
    );
};

export default Header;
