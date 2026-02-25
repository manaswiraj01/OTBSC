import React from "react";

const RefundPolicyPage = () => {
  return (
    <div className="min-h-screen text-base-content px-6 py-12">
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-10">
          <h1 className="text-4xl text-pink-500 font-bold">
            Refund Policy
          </h1>
        </div>

        <div className="card">
          <div className="card-body space-y-8 text-lg leading-relaxed text-justify">

            <section>
              <p>
                India Online Heritage Booking System strives to provide a smooth
                and transparent booking experience through our chatbot-based
                ticketing platform. This Refund Policy outlines the conditions
                under which refunds may be processed.
              </p>
            </section>

            <section>
              <h2 className="text-2xl text-pink-500 font-bold mb-3">
                1. Cancellation & Refund Eligibility
              </h2>
              <p>
                Refund requests can be made within 24 hours of booking,
                provided that the visit date has not passed and the ticket has
                not been used or scanned at the venue.
              </p>
              <p className="mt-3">
                If the booking is cancelled before the scheduled visit date,
                a refund may be initiated subject to applicable cancellation
                policies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl text-pink-500 font-bold mb-3">
                2. Non-Refundable Situations
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Tickets already used or scanned at entry.</li>
                <li>Cancellation after the scheduled visit date.</li>
                <li>Incorrect details entered by the user during booking.</li>
                <li>Fraudulent or suspicious activity detected.</li>
                <li>Government taxes or service fees (if applicable).</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl text-pink-500 font-bold mb-3">
                3. Payment Processing
              </h2>
              <p>
                All refunds are processed through the original mode of payment.
                Once approved, it may take 5–7 business days for the amount to
                reflect in your bank account or payment source, depending on
                your financial institution.
              </p>
            </section>

            <section>
              <h2 className="text-2xl text-pink-500 font-bold mb-3">
                4. Chatbot Booking Errors
              </h2>
              <p>
                In case of technical issues or duplicate transactions caused by
                system errors, users are requested to contact support within
                24 hours. After verification, eligible refunds will be processed.
              </p>
            </section>

            <section>
              <h2 className="text-2xl text-pink-500 font-bold mb-3">
                5. Partial Refunds
              </h2>
              <p>
                If multiple tickets are booked under a single transaction,
                refund eligibility may apply only to the unused tickets,
                subject to venue policies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl text-pink-500 font-bold mb-3">
                6. Contact for Refund Requests
              </h2>
              <p>
                To request a refund, please contact our support team with your
                booking ID and registered email address.
              </p>
              <p className="mt-3 font-medium">
                📧 support@otbsc.com
              </p>
            </section>

            <section>
              <h2 className="text-2xl text-pink-500 font-bold mb-3">
                7. Policy Updates
              </h2>
              <p>
                We reserve the right to modify this Refund Policy at any time.
                Changes will be updated on this page and will apply to future
                bookings.
              </p>
            </section>

          </div>
        </div>

      </div>
    </div>
  );
}

export default RefundPolicyPage;