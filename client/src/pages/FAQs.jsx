import React, { useState } from 'react';

export default function FAQs() {
  const [searchTerm, setSearchTerm] = useState('');

  const faqCategories = [
    {
      category: "Booking Process",
      icon: "🎫",
      questions: [
        {
          id: 1,
          question: "How do I book tickets online?",
          answer: "1. Search for the desired location and view the details.\n2. Click the 'Book Now' button.\n3. Select the citizen type and quantity of tickets.\n4. Review the payment details. If everything looks correct, click the 'Make Payment' button.\n5. Once the payment is successful, you can find your ticket in the 'My Bookings' section of your account."
        },
        {
          id: 2,
          question: "Can I book tickets without creating an account?",
          answer: "Yes, you can book tickets using guest login with your mobile number or email address. However, creating an account helps you track your bookings easily and provides a better experience."
        },
        {
          id: 3,
          question: "How far in advance can I book tickets?",
          answer: "You can book tickets up to 60 days in advance for most venues. Some popular destinations like wildlife sanctuaries may have different advance booking periods. Check the specific venue details for exact booking windows."
        },
        {
          id: 4,
          question: "Is there a limit on the number of tickets I can book?",
          answer: "Yes, there is a maximum limit of 6 tickets per booking for individual bookings. For group bookings of more than 6 people, please contact our customer support or use the group booking option."
        }
      ]
    },
    {
      category: "Payment & Pricing",
      icon: "💳",
      questions: [
        {
          id: 5,
          question: "What payment methods are accepted?",
          answer: "We accept all major payment methods including:\n• Credit/Debit Cards (Visa, MasterCard, RuPay)\n• Net Banking\n• UPI (PhonePe, Google Pay, Paytm)\n• Digital Wallets\n• International payment cards are also accepted."
        },
        {
          id: 6,
          question: "Are there different pricing for citizens and foreigners?",
          answer: "Yes, we have different pricing structures:\n• Indian Citizens: Standard rates\n• Foreign Nationals: Higher rates as per government guidelines\n• Students: Discounted rates (with valid ID)\n• Senior Citizens: Special discounts available"
        },
        {
          id: 7,
          question: "What happens if payment fails but amount is deducted?",
          answer: "If your booking fails and the amount is deducted, it will be automatically refunded to the same payment method within 5-7 working days. If you don't receive the refund, please contact our helpdesk with your transaction details."
        }
      ]
    },
    {
      category: "Tickets & Entry",
      icon: "🎟️",
      questions: [
        {
          id: 8,
          question: "How do I get my tickets after booking?",
          answer: "After successful payment:\n• You'll receive a confirmation SMS and email\n• Digital tickets will be available in 'My Bookings' section\n• For certain venues, boarding passes are generated 1-2 hours before your scheduled visit\n• You can download and print tickets or show them on your mobile device"
        },
        {
          id: 9,
          question: "Do I need to print my tickets?",
          answer: "No, printing is not mandatory. You can show your digital ticket on your mobile device at the venue entrance. However, we recommend taking a screenshot or downloading the ticket offline in case of network issues."
        },
        {
          id: 10,
          question: "What should I carry for entry?",
          answer: "Please carry:\n• Valid photo ID proof (Aadhaar, PAN, Driving License, or Passport)\n• Digital or printed ticket\n• Student ID (if booked under student category)\n• Camera fees receipt (if applicable)"
        }
      ]
    },
    {
      category: "Cancellation & Refunds",
      icon: "🔄",
      questions: [
        {
          id: 11,
          question: "Can I cancel my booking?",
          answer: "Cancellation depends on the venue's policy:\n• Go to 'My Bookings' section\n• Click the three dots next to your booked ticket\n• Select 'Cancel Booking' option\n• Review the cancellation policy before proceeding\n• Some venues may not allow cancellations within 24 hours of visit"
        },
        {
          id: 12,
          question: "How long does it take to get a refund?",
          answer: "Refund processing time varies:\n• Online payments: 5-7 working days\n• Refund amount depends on the cancellation policy\n• Processing fees may be deducted as per terms\n• If you haven't received your refund, contact our helpdesk with booking details"
        },
        {
          id: 13,
          question: "What is the refund policy?",
          answer: "Standard refund policy:\n• Cancellation 48+ hours before visit: 85% refund\n• Cancellation 24-48 hours before: 50% refund\n• Cancellation within 24 hours: No refund\n• Processing fees of ₹25 per ticket may apply\n• Some venues may have different policies"
        }
      ]
    },
    {
      category: "Technical Issues",
      icon: "🔧",
      questions: [
        {
          id: 14,
          question: "I'm facing issues with the website. What should I do?",
          answer: "For technical issues:\n• Clear your browser cache and cookies\n• Try using a different browser or device\n• Check your internet connection\n• Disable ad-blockers if any\n• Contact our technical support if the issue persists"
        },
        {
          id: 15,
          question: "I can't find my booking. Where is it?",
          answer: "To find your booking:\n• Log in with the same account used for booking\n• Go to 'My Bookings' section\n• Use date filters to find your booking\n• If you booked as guest, use booking ID and mobile number\n• Contact support if you still can't locate it"
        }
      ]
    },
    {
      category: "Special Services",
      icon: "⭐",
      questions: [
        {
          id: 16,
          question: "Do you provide group booking services?",
          answer: "Yes, we offer special group booking services:\n• Groups of 15+ people get special rates\n• Dedicated customer support\n• Customized packages available\n• Corporate booking options\n• Contact our group booking team for assistance"
        },
        {
          id: 17,
          question: "Are there guided tour options?",
          answer: "Yes, guided tours are available for:\n• Museums and monuments\n• Wildlife sanctuaries\n• Heritage sites\n• Multi-language guides available\n• Advance booking required for guides\n• Additional charges apply"
        },
        {
          id: 18,
          question: "How can I provide feedback about my experience?",
          answer: "We value your feedback:\n• In 'My Bookings' section, click three dots and select 'Feedback'\n• Rate your experience regarding venue, facilities, and service\n• Write detailed reviews to help other visitors\n• Contact us directly for specific complaints or suggestions"
        }
      ]
    }
  ];

  const filteredFAQs = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(
      faq => 
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      {/* <div className="hero min-h-[40vh] bg-gray-100 from-primary to-secondary ">
        <div className="hero-content text-center text-primary-content">
          <div className="max-w-2xl">
            <div className="mb-8">
              <div className="w-20 h-20 mx-auto bg-base-100 bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <h1 className="text-5xl font-bold mb-6">Frequently Asked Questions</h1>
            <p className="text-xl opacity-90">
              Find answers to common questions about our online ticket booking system
            </p>
          </div>
        </div>
      </div> */}

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 max-w-6xl ">
        {/* Search Section */}
        <div className="mb-12">
          <div className="form-control max-w-2xl mx-auto">
            <div className="input-group justify-center mt-15 ">
              <input 
                type="text" 
                placeholder="Search questions..." 
                className="input input-bordered input-lg w-full max-w-lg" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="btn btn-square btn-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* FAQ Sections */}
        <div className="grid gap-8">
          {filteredFAQs.map((category, categoryIndex) => (
            <div key={categoryIndex} className="card bg-base-100 shadow-xl">
              <div className="card-body">
                {/* Category Header */}
                <div className="flex items-center mb-6 pb-4 border-b border-base-300">
                  <div className="text-4xl mr-4">{category.icon}</div>
                  <h2 className="card-title  text-2xl text-primary">{category.category}</h2>
                </div>
                
                {/* Questions */}
                <div className="space-y-3">
                  {category.questions.map((faq) => (
                    <div key={faq.id} className="collapse collapse-arrow bg- rounded-box">

                      <input type="checkbox" name={`faq-${faq.id}`} />
                      <div className="collapse-title  text-lg font-semibold">
                        {faq.question}
                      </div>
                      <div className="collapse-content">
                        <div className="pt-2 text-base-content opacity-80">
                          {faq.answer.split('\n').map((line, index) => (
                            <p key={index} className={`${index > 0 ? 'mt-2' : ''} leading-relaxed`}>
                              {line}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Support Section */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold mb-4">Still Need Help?</h3>
            <p className="text-lg opacity-70">Can't find what you're looking for? Our support team is here to help!</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Live Chat */}
            <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
              <div className="card-body items-center text-center">
                <div className="avatar mb-4">
                  <div className=" flex justify-center  p-4 rounded-full bg-primary text-primary-content object-cover">
                    <svg className="w-10 h-10 " fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                      <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                    </svg>
                  </div>
                </div>
                <h4 className="card-title">Live Chat</h4>
                <p className="text-sm opacity-70 mb-4">Chat with our support team</p>
                <div className="card-actions">
                  <button className="btn btn-primary">Start Chat</button>
                </div>
              </div>
            </div>

            {/* Phone Support */}
            <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
              <div className="card-body items-center text-center">
                <div className="avatar mb-4">
                  <div className="p-4 rounded-full bg-secondary text-secondary-content flex items-center justify-center">
                    <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                </div>
                <h4 className="card-title">Call Us</h4>
                <p className="text-sm opacity-70 mb-4">Mon-Fri, 9 AM - 6 PM</p>
                <div className="card-actions">
                  <a href="tel:+911234567890" className="btn btn-secondary">+91 12345 67890</a>
                </div>
              </div>
            </div>

            {/* Email Support */}
            <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
              <div className="card-body items-center text-center">
                <div className="avatar mb-4">
                  <div className="p-4 rounded-full bg-accent text-accent-content flex items-center justify-center">
                    <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                </div>
                <h4 className="card-title">Email Support</h4>
                <p className="text-sm opacity-70 mb-4">Get help via email</p>
                <div className="card-actions">
                  <a href="mailto:support@ticketbooking.com" className="btn btn-accent">Send Email</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Tips */}
        <div className="mt-16">
          <div className="alert alert-info">
            <svg className="stroke-current shrink-0 w-6 h-6" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h3 className="font-bold">Quick Tip!</h3>
              <div className="text-sm">
                For faster support, please have your booking ID ready when contacting us. You can find it in your confirmation email or in the 'My Bookings' section.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}