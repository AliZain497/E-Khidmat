import React, { useEffect } from 'react';
import Navbar from '../components/Navbar'; // Assuming you already have a Navbar component
import Footer from '../components/Footer'; // Assuming you have the Footer component
import AOS from "aos";
import "aos/dist/aos.css";

export default function Functions() {
    useEffect(() => {
        AOS.init({ duration: 800, once: true });
        AOS.refresh(); // ensure it recalculates positions
    }, []);
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar /> {/* Navbar at the top */}

            <div className="flex-grow px-4 sm:px-8 md:px-16 py-6 bg-gray-50 text-gray-800" data-aos="fade-right">
                {/* Heading */}
                <h1 className="text-4xl font-semibold mb-2 text-green-600">Functions</h1> {/* Green color heading */}

                {/* Main paragraph */}
                <p className="text-lg mb-4 text-left">
                    This page describes the various functions available to manage and control various operations within the system.
                </p>

                {/* 3 Sub-headings */}
                <div className="space-y-4 px-2">
                    {/* Sub-heading 1 */}
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800 text-left">Policy Formulation</h2> {/* Left-aligned sub-heading */}
                        <p className="text-md mt-1 text-left">
                            The major functions and responsibilities of Local Government & Community Development Department are:
                        </p>
                    </div>

                    {/* Sub-heading 2 */}
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800 text-left">Coordination</h2> {/* Left-aligned sub-heading */}
                        <p className="text-md mt-1 text-left">
                            The department coordinates with federal/provincial government departments and allied agencies as well as all the three tiers of local governments on the issues pertaining to the new local government system.
                        </p>
                    </div>

                    {/* Sub-heading 3 */}
                    <div data-aos="fade-right">
                        <h2 className="text-2xl font-semibold text-gray-800 text-gray text-left">Administration</h2> {/* Left-aligned sub-heading */}
                        <p className="text-md mt-1 text-left">
                            The department is responsible for the recruitments and administration of service personnel working in its attached departments.
                        </p>

                        {/* List under Function 3 */}
                        <ul className="list-disc list-inside mt-2 text-left" data-aos="fade-right">
                            Our other functions include:
                            <li className='mt-2'>Provide, manage, operate, maintain and improve the municipal infrastructure and services</li>
                            <li>Manage properties and assets vested in local governments</li>
                            <li>Enforcement of municipal laws and regulations</li>
                            <li>Levy local taxes/fees to generate income</li>
                            <li>Frame bye-laws to regulate municipal services</li>
                            <li>Take cognizance of municipal offences and enforcement</li>
                            <li>Exercise general powers and procedures as are enumerated in Eighth Schedule</li>
                            <li>Perform functions within the provincial framework</li>
                        </ul>
                    </div>
                </div>
            </div>

            <Footer /> {/* Footer at the bottom */}
        </div>
    );
}
