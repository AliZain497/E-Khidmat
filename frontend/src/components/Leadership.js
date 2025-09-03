// src/pages/Leadership.js
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

// Import images
import adminPic from "../media/administrator.png";
import chiefPic from "../media/CO.png";
// Add other images similarly...

const leadershipData = [
    {
        name: "Ms. Azka Sahar",
        title: "Administrator",
        image: adminPic,
        description: "Leading the municipal administration with integrity and service.",
    },
    {
        name: "Mr. M.Arshad Ghafoor",
        title: "Chief Officer",
        image: chiefPic,
        description: "Ensuring smooth delivery of services across all departments.",
    },
    {
        name: "Mr. Usman Afazl",
        title: "Municipal Officer Regulation",
        image: "", // add path if available
        description: "Ensuring smooth delivery of services across all departments.",
    },
    {
        name: "Mr. Adil Waseem",
        title: "Municipal Officer Finance",
        image: "",
        description: "Ensuring smooth delivery of services across all departments.",
    },
    {
        name: "Mr. Naveed-ul-Hassan",
        title: "Senior Sub Engineer",
        image: "",
        description: "Ensuring smooth delivery of services across all departments.",
    },
    {
        name: "Mr. Muhammad Nadeem",
        title: "Building Inspector",
        image: "",
        description: "Ensuring smooth delivery of services across all departments.",
    },
    {
        name: "Mr. M.Shahid Iqbal",
        title: "Accounts Clerk",
        image: "",
        description: "Ensuring smooth delivery of services across all departments.",
    },
];

export default function Leadership() {
    useEffect(() => {
        AOS.init({ duration: 500, once: true, mirror: true });
    }, []);

    return (
        <div className="min-h-screen flex flex-col" data-aos="fade-up">
            <section className="py-12 sm:py-16 bg-gray-100 px-8 sm:px-4">
                <div className="text-center mb-8 sm:mb-12 max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold mb-2 text-green-600">Our Leadership</h2>
                    <p className="text-gray-600 mt-2 text-sm sm:text-base">
                        Meet the dedicated leadership guiding Mamunkanjan's progress.
                    </p>
                </div>

                <div className="grid gap-6 max-w-7xl mx-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-2">
                    {leadershipData.map((member, index) => (
                        <div
                            key={index}
                            data-aos="zoom-in"
                            data-aos-delay={index * 100}
                            className="bg-white rounded-xl shadow p-6 text-center transform transition duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-lg hover:bg-green-100"
                        >
                            <img
                                src={member.image || "https://via.placeholder.com/150"}
                                alt={member.title}
                                className="mx-auto w-28 h-28 rounded-full object-cover mb-4 border-2 border-green-500"
                            />
                            <h3 className="text-xl font-semibold">{member.name}</h3>
                            <p className="text-green-700 font-medium">{member.title}</p>
                            <p className="text-sm mt-2 text-gray-600">{member.description}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
