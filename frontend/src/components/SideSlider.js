import React, { useEffect, useState } from 'react';
import './sliderButtons.css'; // 🧠 Make sure this file exists
// import { ChevronLeftIcon, ChevronRightIcon, XMarkIcon } from '@heroicons/react/24/solid';

const slides = [
    { id: 1, image: "/media/explore1.jpg" },
    { id: 2, image: "/media/explore2.jpg" },
    { id: 3, image: "/media/explore3.jpg" },
];

export default function SideSlider() {
    const [visible, setVisible] = useState(true);
    const [current, setCurrent] = useState(0);

    const next = () => setCurrent((prev) => (prev + 1) % slides.length);
    const prev = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
    const closeSlider = () => setVisible(false);

    useEffect(() => {
        document.body.style.overflow = visible ? 'hidden' : 'auto';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [visible]);

    if (!visible) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
            <div className="relative w-[50%] h-[90vh] bg-white rounded-xl shadow-lg flex items-center justify-center overflow-hidden">

                {/* Close Button - top right */}
                <button
                    onClick={closeSlider}
                    className="absolute top-4 right-4 p-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition"
                    aria-label="Close"
                >
                    ✖
                </button>

                {/* Left Arrow - vertically centered left */}
                <button
                    onClick={prev}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition"
                    aria-label="Previous"
                >
                    ←
                </button>

                {/* Image */}
                <img
                    src={slides[current].image}
                    alt={`Slide ${current + 1}`}
                    className="max-w-full max-h-full object-contain transition-transform duration-500 ease-in-out group-hover:scale-105"
                />

                {/* Right Arrow - vertically centered right */}
                <button
                    onClick={next}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition"
                    aria-label="Next"
                >
                    →
                </button>
            </div>
        </div>

    );
}
