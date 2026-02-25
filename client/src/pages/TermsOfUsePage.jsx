import React from "react";

const TermsOfUsePage = () => {
  return (
    <div className="min-h-screen text-base-content px-6 py-12">
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-10">
          <h1 className="text-4xl text-pink-500 font-bold">
            Terms of Use
          </h1>
        </div>

        <div className="card">
          <div className="card-body space-y-10 text-lg leading-relaxed text-justify">

            {/* Introduction */}
            <section>
              <p>
                Welcome to the India Online Heritage Booking System (OTBSC).
                These Terms of Use govern your access to and use of our chatbot-based
                ticket booking platform. By accessing or using our services,
                you agree to comply with these terms.
              </p>
            </section>

            {/* Platform Usage */}
            <section>
              <h2 className="text-2xl text-pink-500 font-bold mb-3">
                1. Use of the Platform
              </h2>
              <p>
                Our platform allows users to browse heritage locations and
                book tickets through an AI-powered chatbot system.
                You agree to use the platform only for lawful purposes
                and in accordance with these Terms.
              </p>
            </section>

            {/* Account Responsibility */}
            <section>
              <h2 className="text-2xl text-pink-500 font-bold mb-3">
                2. User Responsibilities
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide accurate and complete information while booking.</li>
                <li>Maintain confidentiality of login credentials.</li>
                <li>Ensure correct date, time, and visitor details before payment.</li>
                <li>Comply with venue rules and regulations.</li>
              </ul>
            </section>

            {/* Booking & Payments */}
            <section>
              <h2 className="text-2xl text-pink-500 font-bold mb-3">
                3. Booking & Payments
              </h2>
              <p>
                All bookings are subject to availability and confirmation.
                Payments are processed through secure third-party payment
                gateways. We do not store complete debit/credit card details.
              </p>
              <p className="mt-3">
                Once payment is successfully completed, a digital ticket
                confirmation will be generated. Users are responsible for
                reviewing booking details before final submission.
              </p>
            </section>

            {/* Cancellation & Refund */}
            <section>
              <h2 className="text-2xl text-pink-500 font-bold mb-3">
                4. Cancellation & Refund
              </h2>
              <p>
                Refunds and cancellations are governed by our Refund Policy.
                Users are encouraged to review the Refund Policy before making
                a booking.
              </p>
            </section>

            {/* Prohibited Activities */}
            <section>
              <h2 className="text-2xl text-pink-500 font-bold mb-3">
                5. Prohibited Activities
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Fraudulent bookings or duplicate transactions.</li>
                <li>Attempting to bypass payment systems.</li>
                <li>Misuse of chatbot services or system manipulation.</li>
                <li>Unauthorized access to platform infrastructure.</li>
              </ul>
            </section>

            {/* Intellectual Property */}
            <section>
              <h2 className="text-2xl text-pink-500 font-bold mb-3">
                6. Intellectual Property
              </h2>
              <p>
                All content, design, system logic, and chatbot functionality
                on this platform are the intellectual property of OTBSC.
                Unauthorized reproduction or distribution is prohibited.
              </p>
            </section>

            {/* Limitation of Liability */}
            <section>
              <h2 className="text-2xl text-pink-500 font-bold mb-3">
                7. Limitation of Liability
              </h2>
              <p>
                We are not responsible for delays, cancellations, or changes
                caused by venue authorities, government restrictions, natural
                disasters, or technical disruptions beyond our control.
              </p>
              <p className="mt-3">
                Our liability is limited to the amount paid for the booking
                in dispute.
              </p>
            </section>

            {/* Account Suspension */}
            <section>
              <h2 className="text-2xl text-pink-500 font-bold mb-3">
                8. Account Suspension
              </h2>
              <p>
                We reserve the right to suspend or terminate access to the
                platform if any suspicious, fraudulent, or malicious activity
                is detected.
              </p>
            </section>

            {/* Changes to Terms */}
            <section>
              <h2 className="text-2xl text-pink-500 font-bold mb-3">
                9. Changes to Terms
              </h2>
              <p>
                These Terms of Use may be updated from time to time.
                Continued use of the platform after updates constitutes
                acceptance of the revised terms.
              </p>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-2xl text-pink-500 font-bold mb-3">
                10. Contact Information
              </h2>
              <p>
                For any questions regarding these Terms of Use, please contact us:
              </p>
              <p className="mt-3 font-medium">
                📧 support@otbsc.com
              </p>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}

export default TermsOfUsePage;