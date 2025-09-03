import React from 'react';

export default function Explore() {
  const images = [
    { src: '/media/explore1.jpg', alt: 'Explore 1' },
    { src: '/media/explore2.jpg', alt: 'Explore 2' },
    { src: '/media/explore3.jpg', alt: 'Explore 3' },
    { src: '/media/explore4.jpg', alt: 'Explore 4' },
    { src: '/media/explore5.jpg', alt: 'Explore 5' },
    { src: '/media/explore6.jpg', alt: 'Explore 6' },
    { src: '/media/explore7.jpg', alt: 'Explore 7' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow py-16 px-8 sm:px-4 md:px-16 bg-gray-100 text-gray-800">
        <h1 className="text-3xl font-bold text-center text-green-600 mb-16">
          Explore Mamunkanjan
        </h1>

        {/* Responsive Image Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {images.map((image, index) => (
            <div key={index} className="overflow-hidden rounded-lg break-inside-avoid shadow-md">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
