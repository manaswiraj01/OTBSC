import React from 'react'

const Footer = () => {
  return (
    <footer className="w-full bg-base-200 border-t-2 border-pink-500 text-base-content pt-10 pb-6 px-4 sm:px-8 md:px-16 mt-8">
      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-y-8 gap-x-4 md:gap-x-8">
        <nav className="flex flex-col">
          <h6 className="footer-title mb-2 font-semibold text-pink-500 uppercase">Services</h6>
          <a className="link link-hover mb-1">Branding</a>
          <a className="link link-hover mb-1">Design</a>
          <a className="link link-hover mb-1">Marketing</a>
          <a className="link link-hover mb-1">Advertisement</a>
        </nav>
        <nav className="flex flex-col">
          <h6 className="footer-title mb-2 font-semibold text-pink-500 uppercase">Company</h6>
          <a className="link link-hover mb-1">About us</a>
          <a className="link link-hover mb-1">Contact</a>
          <a className="link link-hover mb-1">Jobs</a>
          <a className="link link-hover mb-1">Press kit</a>
        </nav>
        <nav className="flex flex-col">
          <h6 className="footer-title mb-2 font-semibold text-pink-500 uppercase">Legal</h6>
          <a className="link link-hover mb-1">Terms of use</a>
          <a className="link link-hover mb-1">Privacy policy</a>
          <a className="link link-hover mb-1">Cookie policy</a>
        </nav>
        <nav className="flex flex-col">
          <h6 className="footer-title mb-2 font-semibold text-pink-500 uppercase">Social</h6>
          <a className="link link-hover mb-1">Twitter</a>
          <a className="link link-hover mb-1">Instagram</a>
          <a className="link link-hover mb-1">Facebook</a>
          <a className="link link-hover mb-1">GitHub</a>
        </nav>
        <nav className="flex flex-col">
          <h6 className="footer-title mb-2 font-semibold text-pink-500 uppercase">Explore</h6>
          <a className="link link-hover mb-1">Features</a>
          <a className="link link-hover mb-1">Enterprise</a>
          <a className="link link-hover mb-1">Security</a>
          <a className="link link-hover mb-1">Pricing</a>
        </nav>
        <nav className="flex flex-col">
          <h6 className="footer-title mb-2 font-semibold text-pink-500 uppercase">Apps</h6>
          <a className="link link-hover mb-1">Mac</a>
          <a className="link link-hover mb-1">Windows</a>
          <a className="link link-hover mb-1">iPhone</a>
          <a className="link link-hover mb-1">Android</a>
        </nav>
      </div>
      <div className="max-w-7xl mx-auto mt-8 text-center text-xs text-gray-500 dark:text-gray-400">
        &copy; {new Date().getFullYear()} OTBSC. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer