import React from 'react';

function AboutUsPage() {
  return (
    <div data-theme="daisy" className="min-h-screen bg-base-200">
    


      {/* Main Content */}
      <div className="container mx-auto px-6 py-12 max-w-6xl pt-25">
      <div className="container mx-auto px-6 py-8 max-w-6xl">
          <h1 className="text-4xl font-bold text-base-content">About Us</h1>
        </div>
        <div className="card bg-base-100 shadow-2xl">
          <div className="card-body p-8">
            
            {/* Introduction */}
            <div className="mb-8">
              <p className="text-base-content text-lg leading-relaxed mb-6">
                Welcome to the Online Booking Management System (OBMS), the official online ticket booking platform by the Government of Rajasthan, powered by DoIT&C (Department of Information Technology and Communication).
              </p>

              <p className="text-base-content text-lg leading-relaxed mb-6">
                OBMS serves as a comprehensive platform, bringing together captivating destinations across Tourism, Forest, Archaeology & Museums. Whether you're drawn to the stunning wildlife sanctuaries and exciting safaris, the historical significance of museums, forts, palaces, and monuments, or the charm of parks and cafeterias throughout Rajasthan, OBMS offers real-time availability and instant booking for all.
              </p>

              <p className="text-base-content text-lg leading-relaxed mb-6">
                Beyond booking, OBMS provides reliable and up-to-date information about each location, empowering you to make informed decisions and enrich your travel experiences. Our official OBMS Mobile App acts as your convenient travel companion, offering real-time availability, immediate confirmation, and detailed destination insights. With our QR-based ticketing system, you'll receive a unique QR code upon booking, allowing for direct entry at various points and eliminating the need for queues, so you can maximize your exploration time. We also facilitate online boarding passes generation, online boarding pass verification, entry/exit verification, tracking of vehicle movement etc.
              </p>

              <p className="text-base-content text-lg leading-relaxed mb-6">
                To further enhance your journey, OBMS offers thoughtfully designed Single Composite Packages for various cities. These packages combine multiple attractions into a single, seamless booking, providing an effortless way to experience the best of Rajasthan's culture, history, and wildlife.
              </p>

              <p className="text-base-content text-lg leading-relaxed mb-8">
                OBMS caters to diverse travelers with special pricing for Indian citizens, foreign nationals, and students. Bookings and transactions are ensured through the secured payment gateway, accepting both national and international payment methods for all transactions. Our transparent cancellation policy ensures prompt refund processing for any cancellations. Additionally, our dedicated helpdesk is available to assist travelers with any pre-booking and post-booking inquiries, ensuring a smooth and hassle-free experience.
              </p>
            </div>

            {/* Categories Section */}
            <div className="space-y-6">
              {/* Wildlife Sanctuaries */}
              <div>
                <h2 className="text-xl font-semibold text-base-content mb-3">
                  Wildlife Sanctuaries & National Parks:
                </h2>
                <p className="text-base-content opacity-80 leading-relaxed">
                  Ranthambore National Park in Sawai Madhopur, Sariska Wildlife Sanctuary in Alwar, Mount Abu Wildlife Sanctuary in the Aravalli Hills, Keoladeo Ghana National Park in Bharatpur, Jhalana Leopard Reserve in Jaipur, Kumbalgarh Wildlife Sanctuary in Rajsamand and 16 more.
                </p>
              </div>

              {/* Museums */}
              <div>
                <h2 className="text-xl font-semibold text-base-content mb-3">
                  Museums:
                </h2>
                <p className="text-base-content opacity-80 leading-relaxed">
                  Albert Hall Museum in Jaipur, Bangad Government Museum in Pali, Kishori Mahal in Bharatpur, Government Museum in Udaipur and 19 more.
                </p>
              </div>

              {/* Monuments */}
              <div>
                <h2 className="text-xl font-semibold text-base-content mb-3">
                  Monuments:
                </h2>
                <p className="text-base-content opacity-80 leading-relaxed">
                  Amber Fort in Jaipur, Gagron Fort in Jhalawar, Hawa Mahal in Jaipur, Nahargarh Fort in Jaipur, Patwa Haveliee in Jaisalmer and 8 more.
                </p>
              </div>

              {/* Parks and Cafeterias */}
              <div>
                <h2 className="text-xl font-semibold text-base-content mb-3">
                  Parks and Cafeterias:
                </h2>
                <p className="text-base-content opacity-80 leading-relaxed">
                  Sisodia Rani Garden & Palace, Sawan Bhado, and Kishan Bagh in Jaipur, RTDC Durg Cafeteria at Nahargarh Fort and Masala Chowk in Jaipur and 10 more.
                </p>
              </div>
            </div>

            {/* Key Features Section */}
            <div className="divider my-12"></div>
            <h2 className="text-2xl font-bold text-base-content mb-8">Key Features</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                <div className="badge badge-sm mt-2 text-white" style={{ backgroundColor: 'rgb(233, 30, 99)' }}></div>
                  <div>
                    <h3 className="font-semibold text-base-content mb-2">Real-time Booking System</h3>
                    <p className="text-base-content opacity-70">Instant availability checking and booking confirmation for all venues</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                <div className="badge badge-sm mt-2 text-white" style={{ backgroundColor: 'rgb(233, 30, 99)' }}></div>
                  <div>
                    <h3 className="font-semibold text-base-content mb-2">QR-Based Ticketing</h3>
                    <p className="text-base-content opacity-70">Skip queues with unique QR codes for direct entry</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                <div className="badge badge-sm mt-2 text-white" style={{ backgroundColor: 'rgb(233, 30, 99)' }}></div>
                  <div>
                    <h3 className="font-semibold text-base-content mb-2">Mobile App Integration</h3>
                    <p className="text-base-content opacity-70">Official OBMS mobile app for convenient travel companion</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                <div className="badge badge-sm mt-2 text-white" style={{ backgroundColor: 'rgb(233, 30, 99)' }}></div>
                  <div>
                    <h3 className="font-semibold text-base-content mb-2">Secure Payment Gateway</h3>
                    <p className="text-base-content opacity-70">National and international payment methods with secured transactions</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                <div className="badge badge-sm mt-2 text-white" style={{ backgroundColor: 'rgb(233, 30, 99)' }}></div>
                  <div>
                    <h3 className="font-semibold text-base-content mb-2">Composite Packages</h3>
                    <p className="text-base-content opacity-70">Single booking for multiple attractions in various cities</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                <div className="badge badge-sm mt-2 text-white" style={{ backgroundColor: 'rgb(233, 30, 99)' }}></div>
                  <div>
                    <h3 className="font-semibold text-base-content mb-2">24/7 Helpdesk Support</h3>
                    <p className="text-base-content opacity-70">Dedicated support for pre-booking and post-booking inquiries</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Statistics Section */}
            <div className="divider my-12"></div>
            <div className="stats stats-vertical lg:stats-horizontal shadow w-full">
              <div className="stat">
                <div className="stat-title">Wildlife Sanctuaries</div>
                <div className="stat-value text-primary">22+</div>
                <div className="stat-desc">Protected wildlife areas</div>
              </div>
              
              <div className="stat">
                <div className="stat-title">Museums</div>
                <div className="stat-value text-secondary">23+</div>
                <div className="stat-desc">Cultural heritage sites</div>
              </div>
              
              <div className="stat">
                <div className="stat-title">Monuments</div>
                <div className="stat-value text-accent">14+</div>
                <div className="stat-desc">Historical landmarks</div>
              </div>
              
              <div className="stat">
                <div className="stat-title">Parks & Cafeterias</div>
                <div className="stat-value text-warning">15+</div>
                <div className="stat-desc">Recreational facilities</div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="divider my-12"></div>
            <h2 className="text-2xl font-bold text-base-content mb-6">Contact Information</h2>
            <div className="alert">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <div>
                <h3 className="font-bold">Official Government Platform</h3>
                <div className="text-xs">
                  <p><span className="font-semibold">Department:</span> Department of Information Technology and Communication (DoIT&C)</p>
                  <p><span className="font-semibold">Government:</span> Government of Rajasthan</p>
                  <p><span className="font-semibold">Platform:</span> Online Booking Management System (OBMS)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUsPage;