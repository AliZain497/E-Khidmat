import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import React, { useEffect } from 'react';
import AOS from "aos";
import "aos/dist/aos.css";
const teamMembers = [
    {
        name: 'Ms. Azka Sahar',
        role: 'Administrator',
        description: 'Ms. Azka Sahar, serving as the Administrator and team leader, demonstrates exceptional professionalism, strategic vision, and a strong commitment to operational excellence.',
        email: 'abcxyz123@gmail.com',
        image: '/media/administrator.png', // only this and next one have image
    },
    {
        name: 'Mr. Muhammad Arshad Ghafoor',
        role: 'Chief Officer',
        description: 'Jane focuses on the server-side, ensuring data is handled efficiently and securely.',
        email: 'abcxyz123@gmail.com',
        image: '/media/CO.png'
    },
    {
        name: 'Mr. Usman Afzal',
        role: 'Municipal Officer Regulation',
        description: 'Alex works on the overall design of the site, from wireframes to final visuals, ensuring a sleek user interface.',
        email: 'abcxyz123@gmail.com'
    },
    {
        name: 'Mr. Adil Waseem',
        role: 'Municipal Officer Finance',
        description: 'Emma coordinates between the team and stakeholders, ensuring timely delivery of the project.',
        email: 'abcxyz123@gmail.com'
    },
];

export default function OurTeam() {
    useEffect(() => {
        AOS.init({ duration: 800, once: true });
        AOS.refresh();
    }, []);

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <div className="flex-grow px-4 sm:px-8 md:px-16 py-6 bg-gray-50 text-gray-800">
                <h1 className="text-4xl font-semibold mb-8 text-green-700" data-aos="fade-right">Our Team</h1>

                <div className="grid grid-cols-1 px-4 sm:grid-cols-2 gap-8" data-aos="fade-right">
                    {teamMembers.map((member, index) => (
                        <div
                            key={index}
                            className="border p-6 rounded-lg text-center"
                            data-aos="fade-up"
                        >
                            {/* ✅ Show image only for first 2 members */}
                            {index < 2 && member.image && (
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover  border-[1px] border-gray-300"
                                />
                            )}

                            <h2 className="text-xl font-semibold mb-2">{member.name}</h2>
                            <p className="text-lg font-medium text-gray-500 mb-4">{member.role}</p>
                            <p className="text-sm text-gray-700 mb-1">{member.description}</p>
                            <p className="text-sm text-gray-800 font-semibold">{member.email}</p>
                        </div>
                    ))}
                </div>
            </div>

            <Footer />
        </div>
    );
}
