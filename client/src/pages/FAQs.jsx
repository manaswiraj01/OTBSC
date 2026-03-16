import { faqData } from "@/data/faqData";

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-base-200 py-10 px-4">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-3xl md:text-4xl font-bold text-pink-500 mb-8">
          Frequently Asked Questions
        </h1>

        <div className="space-y-4">

          {faqData.map((faq, index) => (
            <div
              key={index}
              className="collapse collapse-arrow bg-base-100 border border-base-300 rounded-xl"
            >
              <input type="checkbox" name="faq-accordion" />

              <div className="collapse-title  font-normal text-base-content">
                {faq.question}
              </div>

              <div className="collapse-content  font-normal text-base-content">
                <p>{faq.answer}</p>
              </div>

            </div>
          ))}

        </div>

      </div>
    </div>
  );
}