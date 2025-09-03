import { useState } from "react";
import { Link } from "react-router-dom";
import { HiMenu, HiX, HiChevronDown } from "react-icons/hi";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => setMenuOpen(!menuOpen);

    const dropdowns = [
        {
            title: "About Us",
            items: [
                { text: "Overview", link: "/overview" },
                { text: "History", link: "/history" },
                { text: "Functions", link: "/functions" },
                { text: "Our Team", link: "/team" },
                { text: "Ongram", link: "/ongram" },
                { text: "Rules & Regulations", link: "/rules" },
            ],
        },
        {
            title: "Initiatives",
            items: [
                { text: "Initiatives Taken", link: "#initiatives" },
            ],
        },
        {
            title: "News & Events",
            items: [
                { text: "Awareness Campaigns", link: "/campaigns" },
                { text: "Highlights", link: "/highlights" },
                { text: "Gallery", link: "/gallery" },
            ],
        },
        {
            title: "Centers",
            items: [
                { text: "Registration Branch", link: "https://crms.nadra.gov.pk/Authentication/Login", external: true },
                { text: "Finance Branch", link: "https://finance.punjab.gov.pk/", external: true },
                { text: "NADRA Center", link: "https://id.nadra.gov.pk/e-id/", external: true },
                { text: "Arazi Record Center", link: "https://www.punjab-zameen.gov.pk/ERegistration", external: true },
            ],
        },
    ];

    // Added Admin Panel here as a static link to keep theme consistent
    const staticLinks = ["Services", "Statistics", "Admin Panel"];

    return (
        <nav className="bg-green-500 shadow-md sticky top-0 z-50" data-aos="fade-down" data-aos-once="true">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4">
                {/* Logo */}
                <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
                    <img
                        src={require("../media/mc-logo.jpg")}
                        alt="logo"
                        className="w-[60px] h-[60px] rounded-full"
                    />
                    <div className="leading-tight hidden sm:block">
                        <h1 className="text-xl font-bold text-white">Municipal Committee Mamunkanjan</h1>
                        <p className="text-xs text-white mt-1">Government of Punjab</p>
                    </div>
                </Link>

                {/* Toggle Button (Mobile) */}
                <button
                    className="custom:hidden text-green-800 hover:text-green-600 focus:outline-none"
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    {menuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
                </button>

                {/* Desktop Menu */}
                <ul className="hidden custom:flex items-center space-x-6 font-semibold relative">
                    {dropdowns.map(({ title, items }) => (
                        <li key={title} className="group relative cursor-pointer">
                            <div className="flex items-center space-x-1 text-white transition">
                                <span>{title}</span>
                                <HiChevronDown className="transition-transform duration-200 group-hover:rotate-180" />
                            </div>
                            <ul className="absolute left-0 mt-2 w-56 bg-white rounded-md shadow-md opacity-0 group-hover:opacity-100 transform -translate-y-2 group-hover:translate-y-0 transition-all duration-200 invisible group-hover:visible z-50">
                                {items.map(({ text, link, external }) => (
                                    <li key={text}>
                                        {external ? (
                                            <a
                                                href={link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="block px-4 py-2 hover:bg-green-100 text-sm text-gray-800"
                                            >
                                                {text}
                                            </a>
                                        ) : link.startsWith("#") ? (
                                            <a
                                                href={link}
                                                className="block px-4 py-2 hover:bg-green-100 text-sm text-gray-800"
                                            >
                                                {text}
                                            </a>
                                        ) : (
                                            <Link
                                                to={link}
                                                className="block px-4 py-2 hover:bg-green-100 text-sm text-gray-800"
                                            >
                                                {text}
                                            </Link>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}

                    {/* Static Links + Admin Panel */}
                    {staticLinks.map((item) => (
                        item === "Admin Panel" ? (
                            <li key={item}>
                                <Link
                                    to="/admin"
                                    className="text-white transition font-semibold hover:underline"
                                >
                                    {item}
                                </Link>
                            </li>
                        ) : (
                            <li key={item}>
                                <a href={`#${item.toLowerCase()}`} className="text-white transition">
                                    {item}
                                </a>
                            </li>
                        )
                    ))}
                </ul>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="custom:hidden bg-white shadow-md px-4 py-2 space-y-2">
                    {dropdowns.map(({ title, items }) => (
                        <details key={title} className="group">
                            <summary className="flex items-center justify-between font-medium text-gray-800 cursor-pointer">
                                <span>{title}</span>
                                <HiChevronDown className="transition-transform group-open:rotate-180 duration-200" />
                            </summary>
                            <ul className="pl-4 mt-1 space-y-1">
                                {items.map(({ text, link, external }) => (
                                    <li key={text}>
                                        {external ? (
                                            <a
                                                href={link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={() => setMenuOpen(false)}
                                                className="block text-sm text-gray-700 hover:text-green-700"
                                            >
                                                {text}
                                            </a>
                                        ) : link.startsWith("#") ? (
                                            <a
                                                href={link}
                                                onClick={() => setMenuOpen(false)}
                                                className="block text-sm text-gray-700 hover:text-green-700"
                                            >
                                                {text}
                                            </a>
                                        ) : (
                                            <Link
                                                to={link}
                                                onClick={() => setMenuOpen(false)}
                                                className="block text-sm text-gray-700 hover:text-green-700"
                                            >
                                                {text}
                                            </Link>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </details>
                    ))}

                    {/* Static Links + Admin Panel */}
                    {staticLinks.map((item) =>
                        item === "Admin Panel" ? (
                            <Link
                                key={item}
                                to="/admin"
                                onClick={() => setMenuOpen(false)}
                                className="block text-gray-800 font-medium hover:text-green-700 transition"
                            >
                                {item}
                            </Link>
                        ) : (
                            <a
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                onClick={() => setMenuOpen(false)}
                                className="block text-gray-800 font-medium hover:text-green-700 transition"
                            >
                                {item}
                            </a>
                        )
                    )}
                </div>
            )}
        </nav>
    );
}
