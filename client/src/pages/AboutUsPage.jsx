import React from 'react';

function AboutUsPage() {
  const venues = [
    {
      icon: "🦎",
      title: "Wildlife Sanctuaries & National Parks",
      description: "Explore nature's wonders with seamless entry management"
    },
    {
      icon: "🏛️",
      title: "Museums",
      description: "Discover history and culture with hassle-free ticketing"
    },
    {
      icon: "🏰",
      title: "Monuments",
      description: "Visit iconic landmarks with quick digital access"
    },
    {
      icon: "🌳",
      title: "Parks",
      description: "Enjoy recreational spaces with convenient booking"
    },
    {
      icon: "☕",
      title: "Cafeterias",
      description: "Dine and relax with streamlined reservation system"
    }
  ];

  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
        </svg>
      ),
      title: "Digital Ticketing",
      description: "Skip the lines with instant digital tickets delivered to your device"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
        </svg>
      ),
      title: "Real-time Booking",
      description: "Check availability and book instantly, 24/7 from anywhere"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      ),
      title: "Secure Payments",
      description: "Safe and encrypted transactions with multiple payment options"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
        </svg>
      ),
      title: "Group Management",
      description: "Easy booking for families, groups, and corporate events"
    }
  ];

  return (
    <div className="min-h-screen ">
      {/* Hero Section */}
      <div className="hero min-h-[60vh] bg-gradient-to-br from-primary to-secondary ">
        <div className="hero-content text-center text-primary-content mt-15">
          <div className="max-w-4xl">
            {/* <div className="mb-8">
              <div className="w-20 h-20 mx-auto bg-base-100 bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
                </svg>
              </div>
            </div> */}
            <h1 className="text-5xl font-bold mb-6">About Our Platform</h1>
            <p className="text-xl opacity-90 leading-relaxed">
              Revolutionizing the way you discover, book, and experience amazing destinations. 
              From wildlife adventures to cultural journeys, we make every visit memorable.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        {/* Mission Section */}
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
          <p className="text-lg opacity-80 max-w-4xl mx-auto leading-relaxed">
            We believe that exploring the world's most beautiful and culturally significant places should be effortless. 
            Our online ticket management system connects millions of visitors with incredible experiences while helping 
            venues manage their operations efficiently and sustainably.
          </p>
        </div>

        {/* Venues We Serve */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center mb-12">Venues We Serve</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {venues.map((venue, index) => (
              <div key={index} className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="card-body text-center">
                  <div className="text-4xl mb-4">{venue.icon}</div>
                  <h4 className="card-title justify-center text-lg mb-3">
                    {venue.title}
                  </h4>
                  <p className="text-base-content opacity-70 leading-relaxed">
                    {venue.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center mb-12">Why Choose Us</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary text-primary-content rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h4 className="text-lg font-semibold mb-3">{feature.title}</h4>
                <p className="text-base-content opacity-70 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="card bg-gradient-to-r from-primary to-secondary text-primary-content mb-20">
          <div className="card-body">
            <div className="stats stats-vertical lg:stats-horizontal shadow-none bg-transparent text-primary-content">
              <div className="stat text-center">
                <div className="stat-value text-4xl font-bold">1M+</div>
                <div className="stat-title text-primary-content opacity-80">Happy Visitors</div>
              </div>
              <div className="stat text-center">
                <div className="stat-value text-4xl font-bold">500+</div>
                <div className="stat-title text-primary-content opacity-80">Partner Venues</div>
              </div>
              <div className="stat text-center">
                <div className="stat-value text-4xl font-bold">50+</div>
                <div className="stat-title text-primary-content opacity-80">Cities Covered</div>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center mb-12">Our Values</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-primary text-primary-content rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                </div>
                <h4 className="card-title justify-center text-lg mb-3">Customer First</h4>
                <p className="text-base-content opacity-70">
                  Every decision we make is centered around providing the best possible experience for our customers.
                </p>
              </div>
            </div>

            <div className="card bg-base-100 shadow-lg">
              <div className="card-body text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-secondary text-secondary-content rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
                <h4 className="card-title justify-center text-lg mb-3">Innovation</h4>
                <p className="text-base-content opacity-70">
                  We continuously innovate to make travel booking simpler, faster, and more enjoyable.
                </p>
              </div>
            </div>

            <div className="card bg-base-100 shadow-lg">
              <div className="card-body text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-accent text-accent-content rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h4 className="card-title justify-center text-lg mb-3">Trust & Safety</h4>
                <p className="text-base-content opacity-70">
                  Security and reliability are at the core of everything we build and every service we provide.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <h3 className="card-title justify-center text-3xl mb-6">Join Our Journey</h3>
              <p className="text-lg opacity-80 mb-8 max-w-2xl mx-auto">
                Experience the future of travel booking. Discover amazing destinations, 
                book instantly, and create memories that last a lifetime.
              </p>
              <div className="card-actions justify-center">
                <div className="join">
                  <button className="btn btn-primary join-item">Get Started</button>
                  <button className="btn btn-outline join-item">Learn More</button>
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