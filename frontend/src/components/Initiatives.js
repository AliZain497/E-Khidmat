import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Initiatives() {
    useEffect(() => {
        AOS.init({ duration: 500, once: false, mirror: true });
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-white" data-aos="fade-up">
            <section
                id="initiatives"
                className="py-12 sm:py-20 px-8 sm:px-4 flex-grow"
                data-aos="fade-up"
            >
                <div className="text-center mb-8 sm:mb-12 max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold mb-2 text-green-600">
                        Initiatives Taken
                    </h2>
                    <p className="text-gray-600 mt-2 text-sm sm:text-base">
                        See what we’ve been doing to improve Mamunkanjan
                    </p>
                </div>

                <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
                    {[1, 2, 3].map((id) => (
                        <div
                            key={id}
                            data-aos="flip-up"
                            data-aos-delay={id * 100}
                            className="bg-gray-100 p-5 rounded-lg shadow-md"
                        >
                            <img
                                src={`/work${id}.jpg`} // Images should be in /public folder
                                alt={`Work ${id}`}
                                className="w-full h-40 sm:h-48 object-cover rounded-md mb-3"
                            />
                            <h3 className="text-lg sm:text-xl font-semibold text-green-700 mb-1">
                                Project {id}
                            </h3>
                            <p className="text-gray-600 text-xs sm:text-sm">
                                This project was completed to benefit the local community and improve infrastructure.
                            </p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
