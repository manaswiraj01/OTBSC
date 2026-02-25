import React from "react";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-base-100 text-base-content px-6 py-12">
      <div className="max-w-6xl mx-auto">

        {/* Page Heading */}
        <div className="text-center mb-10">
          <h1 className="text-4xl text-pink-500 font-bold">About Us</h1>
         
        </div>

        {/* Main Content Card */}
        <div className="card bg-base-100 shadow-l">
          <div className="card-body space-y-10 text-lg leading-relaxed text-justify">

            {/* Who We Are */}
            <section>
              <h2 className="text-2xl mb-3">
                <span className="text-pink-500 font-bold">Who We Are</span>
              </h2>
              <p>
                India Online Heritage Booking System is a centralized digital
                platform designed to simplify and modernize ticket booking for
                museums, monuments, wildlife sanctuaries, national parks, and
                heritage destinations across India. Our system replaces traditional
                offline ticket counters with a structured and accessible digital
                interface that enhances convenience, transparency, and efficiency.
              </p>
              <p className="mt-4">
                We aim to bridge the gap between tourism infrastructure and modern
                technology by offering a seamless booking experience that is easy
                to use for visitors of all age groups. Whether a traveler is planning
                a family visit to a historical monument or exploring a wildlife reserve,
                our platform ensures that the booking process remains smooth and reliable.
              </p>
            </section>

            {/* Our Purpose */}
            <section>
              <h2 className="text-2xl mb-3">
                <span className="text-pink-500 font-bold">Our Purpose</span>
              </h2>
              <p>
                Many popular tourist destinations in India face challenges such
                as overcrowding, long queues, limited ticket availability, and
                time-consuming manual booking procedures. These issues often
                affect visitor satisfaction and operational efficiency.
              </p>
              <p className="mt-4">
                Our purpose is to eliminate these barriers by introducing a
                structured chat-based booking assistant that guides users
                step-by-step through the ticket reservation process. By doing so,
                we reduce waiting time, improve crowd management, and create a
                more organized and stress-free tourism experience.
              </p>
            </section>

            {/* How It Works */}
            <section>
              <h2 className="text-2xl mb-3">
                <span className="text-pink-500 font-bold">How It Works</span>
              </h2>
              <p>
                The system operates through a guided chatbot interface that
                interacts with users in a structured manner. Visitors can select
                their desired destination, choose preferred visit dates, confirm
                the number of tickets required, and proceed with secure online payment.
              </p>
              <p className="mt-4">
                Upon successful booking, users receive instant confirmation along
                with a QR-based digital ticket. This digital ticket can be scanned
                at the destination for quick and hassle-free entry, minimizing
                congestion at physical ticket counters and improving overall site management.
              </p>
            </section>

            {/* Benefits */}
            <section>
              <h2 className="text-2xl mb-3">
                <span className="text-pink-500 font-bold">Key Benefits</span>
              </h2>
              <p>
                Our platform ensures real-time ticket availability, transparent
                pricing, and instant confirmation to provide visitors with a
                dependable booking experience. By reducing dependency on manual
                processes, we enhance operational efficiency for tourism authorities
                while improving convenience for travelers.
              </p>
              <p className="mt-4">
                The system also supports better crowd distribution by allowing
                pre-scheduled visits, thereby contributing to improved safety,
                environmental protection, and sustainable tourism development.
              </p>
            </section>

            {/* Nationwide Coverage */}
            <section>
              <h2 className="text-2xl mb-3">
                <span className="text-pink-500 font-bold">Nationwide Coverage</span>
              </h2>
              <p>
                Our platform is designed for India-level implementation, covering
                archaeological monuments, wildlife reserves, national parks,
                museums, forts, palaces, and culturally significant heritage sites.
              </p>
              <p className="mt-4">
                By providing a unified booking ecosystem, we simplify travel
                planning for domestic as well as international visitors. The
                platform promotes organized tourism practices while supporting
                digital transformation initiatives across the country.
              </p>
            </section>

            {/* Security & Reliability */}
            <section>
              <h2 className="text-2xl mb-3">
                <span className="text-pink-500 font-bold">Security & Reliability</span>
              </h2>
              <p>
                We prioritize user data protection and secure financial transactions.
                All payments are processed through trusted and secure gateways to
                ensure safety, privacy, and confidentiality.
              </p>
              <p className="mt-4">
                The system provides real-time updates, instant confirmation,
                and transparent booking records, ensuring reliability and trust
                for every visitor using the platform.
              </p>
            </section>

            {/* Future Goals */}
            <section>
              <h2 className="text-2xl mb-3">
                <span className="text-pink-500 font-bold">Future Goals</span>
              </h2>
              <p>
                In the future, we aim to expand our system by integrating
                multilingual support, advanced analytics for tourism authorities,
                and enhanced digital services that further improve visitor
                convenience and operational efficiency.
              </p>
            </section>

            {/* Vision */}
            <section>
              <h2 className="text-2xl mb-3">
                <span className="text-pink-500 font-bold">Our Vision</span>
              </h2>
              <p>
                Our vision is to build a reliable, efficient, and technology-driven
                tourism booking infrastructure that enhances visitor experience
                while promoting organized and sustainable tourism management.
              </p>
              <p className="mt-4">
                By combining digital innovation with heritage preservation, we
                aspire to contribute to the modernization of India’s tourism
                ecosystem and make access to cultural and natural destinations
                simpler, faster, and more accessible for everyone.
              </p>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}