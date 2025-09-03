// src/pages/Overview.js
import Navbar from "../components/Navbar";
import Footer from "../components/Footer"; // Make sure you have this component
import React, { useEffect } from 'react';
import AOS from "aos";
import "aos/dist/aos.css";

export default function Overview() {
    useEffect(() => {
        AOS.init({ duration: 500, once: true });
        AOS.refresh(); // ensure it recalculates positions
    }, []);
    return (
        <div className="flex flex-col min-h-screen">
            {/* Top Navbar */}
            <Navbar />

            {/* Page Content */}
            <main className="flex-grow px-4 sm:px-8 md:px-16 py-6 bg-gray-50 text-gray-800">
                <h1 className="text-4xl font-semibold mb-4 text-green-600" data-aos="fade-right">Overview</h1>

                <p className="text-base sm:text-lg leading-relaxed mb-8" data-aos="fade-right">
                    The Local Government and Community Development Department (LGCD) has been assigned the responsibility to implement Punjab Local Government Act (PLGA) 2022 to achieve the stated objectives of the Government. Moreover, the LGCD Department has an over-seeing role to ensure that the local governments perform their functions within the provincial framework and adhere to the federal and provincial laws. The Local Government and Community Development Department (LGCD) was created to respond to the specific needs of the mega cities and largely urban districts of Punjab for good governance.
                </p>

                <hr className="border-t border-gray-300 mb-8" data-aos="fade-right" />

                <p className="text-base sm:text-lg leading-relaxed mb-12" data-aos="fade-right">
                    LGCD is working with a mission to assist and guide local governments in creating an environment for autonomous and responsible decision making. This will improve service delivery in the social sectors and boost socio-economic development of the local area.
                </p>
            </main>

            {/* Bottom Footer */}
            <Footer />
        </div>
    );
}
