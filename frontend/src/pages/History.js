import Navbar from '../components/Navbar'; // Assuming you already have a Navbar component
import Footer from '../components/Footer'; // Assuming you have the Footer component
import React, { useEffect } from 'react';
import AOS from "aos";
import "aos/dist/aos.css";
export default function History() {
    useEffect(() => {
        AOS.init({ duration: 500, once: true });
        AOS.refresh(); // ensure it recalculates positions
    }, []);
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar /> {/* Navbar at the top */}

            <div className="flex-grow px-4 sm:px-8 md:px-16 py-6 bg-gray-50 text-gray-800">
                {/* Heading */}
                <h1 className="text-4xl font-semibold mb-4 text-green-600" data-aos="fade-right">History of Mamunkanjan</h1>

                {/* Introduction paragraph */}
                <p className="text-lg mb-8 text-left" data-aos="fade-right">
                    The history of Mamunkanjan dates back centuries, with significant milestones that shaped the development of the region and its people.
                </p>

                {/* Timeline of Events */}
                <div className="space-y-6">
                    {/* Event 1 */}
                    <div className="flex items-center">
                        <div className='px-4' data-aos="fade-right">
                            <h2 className="text-xl font-semibold text-gray-800">The Founding of Mamunkanjan</h2>
                            <p className="text-md mt-2 text-left">
                                In the year 1700, Mamunkanjan was founded by the great leaders who sought to create a prosperous community.
                            </p>
                        </div>
                    </div>

                    {/* Event 2 */}
                    <div className="flex items-center" data-aos="fade-right">
                        <div className='px-4'>
                            <h2 className="text-xl font-semibold text-gray-800">The Industrial Revolution</h2>
                            <p className="text-md mt-2 text-left">
                                By 1850, the region saw rapid industrial growth, leading to advancements in technology and society.
                            </p>
                        </div>
                    </div>

                    {/* Event 3 */}
                    <div className="flex items-center" data-aos="fade-right">
                        <div className='px-4'>
                            <h2 className="text-xl font-semibold text-gray-800">The Modern Era</h2>
                            <p className="text-md mt-2 text-left">
                                Entering the 20th century, Mamunkanjan became a key player in the global economy and culture.
                            </p>
                        </div>
                    </div>

                    {/* Event 4 */}
                    <div className="flex items-center" data-aos="fade-right">
                        <div className='px-4'>
                            <h2 className="text-xl font-semibold text-gray-800">The Digital Transformation</h2>
                            <p className="text-md mt-2 text-left">
                                By 2020, Mamunkanjan embraced technology, revolutionizing industries and bringing new opportunities to its people.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <Footer /> {/* Footer at the bottom */}
        </div>
    );
}
