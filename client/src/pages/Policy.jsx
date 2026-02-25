import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen text-base-content px-6 py-12">
      <div className="max-w-6xl mx-auto">

        {/* Page Heading */}
        <div className="text-center mb-10">
          <h1 className="text-4xl text-pink-500 font-bold">
            Privacy Policy
          </h1>
          
        </div>

        {/* Main Content Card */}
        <div className="card ">
          <div className="card-body space-y-10 text-lg leading-relaxed text-justify">

            {/* Introduction */}
            <section>
              <h2 className="text-2xl mb-3">
                <span className="text-pink-500 font-bold">
                  Introduction
                </span>
              </h2>
              <p>
                India Online Heritage Booking System values the privacy and
                security of every user who accesses our platform. This Privacy
                Policy explains how we collect, use, store, and protect your
                personal information when you use our website and chat-based
                ticket booking services.
              </p>
              <p className="mt-4">
                By accessing our platform, you agree to the practices described
                in this policy. We are committed to maintaining transparency and
                ensuring that your personal information is handled responsibly.
              </p>
            </section>

            {/* Information We Collect */}
            <section>
              <h2 className="text-2xl mb-3">
                <span className="text-pink-500 font-bold">
                  Information We Collect
                </span>
              </h2>
              <p>
                To provide a seamless booking experience, we may collect certain
                personal information such as your name, email address, phone
                number, booking details, and payment-related information.
              </p>
              <p className="mt-4">
                We may also collect technical data including device information,
                browser type, IP address, and usage data to improve website
                functionality and enhance user experience.
              </p>
            </section>

            {/* How We Use Information */}
            <section>
              <h2 className="text-2xl mb-3">
                <span className="text-pink-500 font-bold">
                  How We Use Your Information
                </span>
              </h2>
              <p>
                The information collected is used to process ticket bookings,
                generate digital confirmations, provide customer support, and
                improve system performance. We use this data to ensure accurate
                ticket reservations and efficient service delivery.
              </p>
              <p className="mt-4">
                Your information may also be used for communication purposes,
                including sending booking confirmations and important service
                updates related to your reservation.
              </p>
            </section>

            {/* Payment Security */}
            <section>
              <h2 className="text-2xl mb-3">
                <span className="text-pink-500 font-bold">
                  Payment Security
                </span>
              </h2>
              <p>
                All financial transactions are processed through secure and
                trusted payment gateways. We do not store complete debit or
                credit card details on our servers. Our system is designed to
                maintain confidentiality and prevent unauthorized access to
                sensitive financial data.
              </p>
            </section>

            {/* Data Protection */}
            <section>
              <h2 className="text-2xl mb-3">
                <span className="text-pink-500 font-bold">
                  Data Protection & Security
                </span>
              </h2>
              <p>
                We implement appropriate technical and organizational measures
                to safeguard user data from unauthorized access, misuse, loss,
                or alteration. Access to personal information is restricted
                to authorized personnel only.
              </p>
              <p className="mt-4">
                While we strive to protect your data, users are also encouraged
                to maintain confidentiality of their login credentials to ensure
                additional security.
              </p>
            </section>

            {/* Data Sharing */}
            <section>
              <h2 className="text-2xl mb-3">
                <span className="text-pink-500 font-bold">
                  Data Sharing Policy
                </span>
              </h2>
              <p>
                We do not sell, trade, or rent personal information to third
                parties. Information may only be shared with authorized tourism
                authorities or payment processors strictly for the purpose of
                completing your booking or complying with legal requirements.
              </p>
            </section>

            {/* User Rights */}
            <section>
              <h2 className="text-2xl mb-3">
                <span className="text-pink-500 font-bold">
                  User Rights
                </span>
              </h2>
              <p>
                Users have the right to request access to their personal data,
                seek corrections, or request deletion where applicable. Any such
                requests may be submitted through official contact channels
                provided on our platform.
              </p>
            </section>

            {/* Updates */}
            <section>
              <h2 className="text-2xl mb-3">
                <span className="text-pink-500 font-bold">
                  Policy Updates
                </span>
              </h2>
              <p>
                This Privacy Policy may be updated periodically to reflect
                changes in system functionality, regulatory requirements,
                or operational practices. Users are encouraged to review this
                page regularly for any updates.
              </p>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}