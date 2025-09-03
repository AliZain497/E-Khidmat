// src/components/ServicesSection.js
import React from "react";

export default function ServicesSection() {
    const services = [
        { name: "Network of Water Supply", icon: "/Icons/network-of-water-supply.png" },
        { name: "Urban or Rural Infrastructure", icon: "/Icons/urban-rural-infra.png" },
        { name: "Maintenance and Development", icon: "/Icons/maintenance-dev.png" },
        { name: "Land Use Control", icon: "/Icons/land-use-control.png" },
        { name: "Sanitation and Conservancy", icon: "/Icons/sanitaionandconservance.png" },
        { name: "Enforcement of Any Law or Rule", icon: "/Icons/enforcementoflaworrule.png" },
        { name: "Environment and Construction", icon: "/Icons/env-and-construction.png" },
        { name: "Housing", icon: "/Icons/housing.png" },
        { name: "CRVS", icon: "/Icons/crvs.png" },
        { name: "Tree Plantation", icon: "/Icons/tree.png" },
    ];

    return (
        <section
            id="services"
            className="bg-gray-50 py-12 px-4 bg-gray-100 sm:px-8"
        >
            <div className="max-w-6xl mx-auto text-center mb-10">
                <h2 className="text-3xl font-bold text-green-600">Our Services</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {services.map((service, i) => (
                    <div
                        key={i}
                        className="bg-white shadow-md rounded-lg p-6 text-center hover:shadow-lg hover:bg-green-100 transition duration-300"
                        data-aos="zoom-in"
                        data-aos-delay={i * 100}
                    >
                        <img
                            src={service.icon}
                            alt={service.name}
                            className="mx-auto mb-4 h-16 w-16 object-contain"
                        />
                        <h3 className="text-lg font-bold text-gray-800">{service.name}</h3>
                    </div>
                ))}
            </div>
        </section>
    );
}
