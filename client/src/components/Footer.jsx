import React from "react"
import jalmahal from "../assets/jalmahal.jpg"
import { Link } from "react-router-dom"

const Footer = () => {

  const footerSections = [
    {
      title: "Explore",
      links: [
        { name: "Museums", path: "/explore?category=Museum" },
        { name: "Monuments", path: "/explore?category=Monument" },
        { name: "Wildlife", path: "/explore?category=Wildlife" }
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About us", path: "/about" },
        { name: "Help center", path: "/help" },
        { name: "FAQs", path: "/faqs" }
      ]
    },
    {
      title: "Legal",
      links: [
        { name: "Terms of use", path: "/terms-of-use" },
        { name: "Privacy policy", path: "/privacy-policy" },
        { name: "Refund policy", path: "/refund-policy" },
      ]
    },
  ]

  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  return (
    <footer className="relative w-full border-t-2 border-pink-500 overflow-hidden">

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center brightness-110 contrast-110 dark:brightness-125"
        style={{ backgroundImage: `url(${jalmahal})` }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-white/80 dark:bg-black/60"></div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-14 text-gray-800 dark:text-gray-200">

        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 text-center md:text-left">

          {/* Dynamic Sections */}
          {footerSections.map((section, index) => (
            <nav key={index} className="flex flex-col space-y-3">

              <h6 className="text-pink-500 font-semibold uppercase text-sm tracking-wide">
                {section.title}
              </h6>

              {section.links.map((link, i) => (
                <Link
                  key={i}
                  to={link.path}
                  onClick={handleScrollTop}
                  className="hover:text-pink-500 transition-colors duration-200"
                >
                  {link.name}
                </Link>
              ))}

            </nav>
          ))}

          {/* Contact Us Column */}
          <div className="flex flex-col space-y-3">
            <h6 className="text-pink-500 font-semibold uppercase text-sm tracking-wide">
              Contact Us
            </h6>

            {/* No Redirect – Simple Text */}
            <p className="hover:text-pink-500 transition-colors duration-200 cursor-default">
              quickbook.support@gmail.com
            </p>

            <p className="hover:text-pink-500 transition-colors duration-200 cursor-default">
              +91 7597892322
            </p>
          </div>

        </div>

        {/* Bottom Line */}
        <div className="mt-14 text-center text-xs text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} OTBSC. All rights reserved.
        </div>

      </div>
    </footer>
  )
}

export default Footer