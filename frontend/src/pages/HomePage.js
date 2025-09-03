import React, { useState, useEffect } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Explore from "../components/Explore";
import Centers from "../components/Centers";
import ServicesSection from "../components/Services";
import Leadership from "../components/Leadership";
import Statistics from "../components/Statistics";
import Initiatives from "../components/Initiatives";
import Loader from "../components/Loader";
import DynamicSlider from '../components/Slider.js';
import SideSlider from '../components/SideSlider.js';

export default function HomePage() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1000); // 2.5 seconds delay
        return () => clearTimeout(timer);
    }, []);

    if (loading) return <Loader message="Please wait..." color="green" size={40} />;
    return (
        <div className="bg-gray-50 text-gray-800 min-h-screen flex flex-col">
            <Navbar />

            <SideSlider />

            {/* Hero Slider Section */}
                <DynamicSlider />

            {/* Leadership Section */}
            <section className="relative bg-white"><Leadership /></section>

            {/* Initiatives Taken */}
            <section className="relative bg-white"><Initiatives /></section>

            {/* Explore Section */}
            <section className="relative bg-white"><Explore /></section>

            {/* Centers Section */}
            <section id="centers">
                <Centers />
            </section>

            {/* Services Section */}
            <section id="services">
                <ServicesSection />
            </section>

            {/* Statistics Section */}
            <section className="relative bg-white"><Statistics /></section>

            <Footer />

        </div >
    );
}
