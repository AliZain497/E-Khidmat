import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Rules() {
  useEffect(() => {
    AOS.init({ duration: 500, once: true });
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow px-4 sm:px-8 md:px-16 py-6 bg-gray-50 text-gray-800">
        <h1 className="text-4xl font-semibold mb-4 text-green-700" data-aos="fade-right">
          Rules & Regulations
        </h1>

        {/* Intro Paragraph */}
        <p className="mb-4 max-w-4xl" data-aos="fade-up">
          The following rules and regulations are established to ensure smooth operation and discipline
          within the Municipal Committee Mamunkanjan. All staff and visitors are expected to comply.
        </p>

        <div className='px-4'>
          {/* Section 1 */}
          <h2 className="text-2xl font-semibold text-gray-800 mb-2" data-aos="fade-right">
            General Conduct
          </h2>
          <p className="mb-4 max-w-3xl" data-aos="fade-up">
            All staff members are expected to maintain a professional demeanor, uphold respect for peers
            and the public, and ensure ethical standards in all municipal duties.
          </p>

          {/* Section 2 */}
          <h2 className="text-2xl font-semibold text-gray-800 mb-2" data-aos="fade-right">
            Office Timings
          </h2>
          <p className="mb-4 max-w-3xl" data-aos="fade-up">
            The official working hours are from 9:00 AM to 5:00 PM, Monday through Saturday. Punctuality
            and regular attendance are mandatory for all staff members.
          </p>

          {/* Section 3 + List */}
          <h2 className="text-2xl font-semibold text-gray-800 mb-2" data-aos="fade-right">
            Compliance & Violations
          </h2>
          <p className="mb-2 max-w-3xl" data-aos="fade-up">
            The following rules must be followed at all times. Violation of these rules may result in
            disciplinary actions:
          </p>

          <ul className="list-disc list-inside pl-4 text-gray-700 space-y-2 mb-10" data-aos="fade-up">
            <li>All documents must be handled with confidentiality.</li>
            <li>Unauthorized absence from duty will not be tolerated.</li>
            <li>Misuse of government property is strictly prohibited.</li>
            <li>No political activities are allowed within the office premises.</li>
            <li>Visitors must be logged and accompanied at all times.</li>
          </ul>
        </div>
      </main>

      <Footer />
    </div>
  );
}
