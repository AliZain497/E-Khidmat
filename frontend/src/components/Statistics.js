import React from "react";
import { FaHistory, FaGlobe, FaChartLine, FaUsers, FaSuitcaseRolling, FaMapMarkedAlt, } from "react-icons/fa";

const stats = [
    { name: "Quick Stats", icon: <FaChartLine size={28} className="text-green-700" /> },
    { name: "History", icon: <FaHistory size={28} className="text-green-700" /> },
    { name: "Geography", icon: <FaMapMarkedAlt size={28} className="text-green-700" /> },
    { name: "Economy", icon: <FaSuitcaseRolling size={28} className="text-green-700" /> },
    { name: "People", icon: <FaUsers size={28} className="text-green-700" /> },
    { name: "Tourism", icon: <FaGlobe size={28} className="text-green-700" /> },
];

export default function Statistics() {
    return (
        <section
            id="statistics"
            className="max-w-7xl bg-white py-16 mx-auto my-10 px-8 sm:px-4 md:flex md:items-center md:justify-between"
            data-aos="fade-up"
        >
            {/* Left Section */}
            <div className="md:w-1/2 sm:px-4 px-8 mb-8 md:mb-0">
                <h2 className="text-3xl font-bold mb-4 text-green-600">
                    Mamunkanjan at a Glance
                </h2>
                <p className="text-gray-700 text-sm sm:text-lg">
                    Discover key insights and vital information about our town's rich history, geography, economy, and more. Stay informed and connected with the latest statistics and facts.
                </p>
            </div>

            {/* Stats Cards */}
            <div className="md:w-1/2 grid grid-cols-2 gap-4 sm:gap-6">
                {stats.map(({ name, icon }, index) => (
                    <div
                        key={name}
                        data-aos="fade-up"
                        data-aos-delay={index * 100}
                        className="flex items-center space-x-4 p-3 sm:p-4 bg-white rounded-lg shadow hover:bg-green-100 transition cursor-pointer"
                    >
                        <div className="p-2 sm:p-3 bg-green-200 rounded-full">
                            {icon}
                        </div>
                        <span className="font-semibold text-sm sm:text-lg text-green-900">{name}</span>
                    </div>
                ))}
            </div>
        </section>
    );
}
