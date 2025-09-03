import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Centers() {
    useEffect(() => {
        AOS.init({ duration: 500, once: false, mirror: true });
    }, []);

    const centers = [
        {
            name: "Finance Branch",
            image: 'https://finance.punjab.gov.pk/logo.png',
            description: "Handles all financial matters of the municipal committee.",
            url: "https://finance.punjab.gov.pk"
        },
        {
            name: "NADRA Center",
            image: 'https://id.nadra.gov.pk/e-id/images/top-logo.png',
            description: "Identity card processing and related citizen services.",
            url: "https://www.nadra.gov.pk"
        },
        {
            name: "Arazi Record Center",
            image: 'https://www.punjab-zameen.gov.pk/assets/img/PLRA_Logo.gif',
            description: "Property and land records facilitation for locals.",
            url: "https://www.punjab-zameen.gov.pk"
        },
        {
            name: "Registration Branch",
            image: 'https://elgcd.punjab.gov.pk/assets/authv2/images/login-logo.svg',
            description: "Birth, death, and marriage registration services.",
            url: "https://elgcd.punjab.gov.pk"
        },
    ];



    return (
        <div className="flex flex-col" data-aos="fade-up">
            <main className="flex-grow text-center bg-white sm:py-20 px-8 sm:px-4" data-aos="fade-up">
                <div className="text-center mb-8 sm:mb-12 max-w-3xl mx-auto" data-aos="fade-up">
                    <h2 className="text-3xl font-bold mb-2 text-green-600">Facilitation Centers</h2>
                    <p className="text-gray-600 mt-2 text-sm sm:text-base">
                        Providing services to citizens with convenience and care
                    </p>
                </div>

                <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6" data-aos="fade-up">
                    {centers.map((center, i) => (
                        <div
                            key={i}
                            data-aos="zoom-in"
                            data-aos-delay={i * 100}
                            onClick={() => window.open(center.url, "_blank")}
                            className="bg-white text-gray-800 rounded-lg p-6 shadow-md transform transition-transform duration-300 ease-in-out hover:scale-105 hover:bg-green-100 hover:text-green-900 hover:shadow-2xl cursor-pointer"
                        >
                            <img
                                src={center.image}
                                alt={center.name}
                                className="w-[200px] h-12 object-contain mb-3 mx-auto"
                            />
                            <h3 className="text-xl font-bold mb-2">{center.name}</h3>
                            <p className="text-sm">{center.description}</p>
                        </div>
                    ))}

                </div>

            </main>
        </div>
    );
}
