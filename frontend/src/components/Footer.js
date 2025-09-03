// src/components/Footer.js
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaTiktok, FaEnvelope } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-green-500 text-white text-center py-6 mt-auto animate-fade-in">
            <div className="flex justify-center space-x-6 mb-3">
                {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaTiktok, FaEnvelope].map((Icon, i) => (
                    <a
                        key={i}
                        href=""
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-black transition"
                    >
                        <Icon size={20} />
                    </a>
                ))}
            </div>
            <p>© {new Date().getFullYear()} Municipal Committee Mamunkanjan. All rights reserved.</p>
        </footer>
    );
}
