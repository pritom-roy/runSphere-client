import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            question: "What are the requirements for participation?",
            answer: "Participants must be at least 18 years old and in good health. Some events may require a medical certificate."
        },
        {
            question: "Can I register for multiple marathons at once?",
            answer: "Yes! You can register for multiple events through your dashboard."
        },
        {
            question: "Can I transfer my registration to another person?",
            answer: "Transfers depend on the event’s policy. Check with the event organizer."
        },
        {
            question: "What is the ideal running gear?",
            answer: "Wear comfortable running shoes, moisture-wicking clothes, and avoid new gear on race day."
        },
        {
            question: "Can I run with headphones?",
            answer: "Some marathons allow them, but it’s best to stay alert and listen to race instructions."
        },
        {
            question: "What happens if I can’t finish the race?",
            answer: "Medical and support teams will assist you if you’re unable to complete the race."
        },
    ];

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="bg-run2 lg:bg-faq bg-cover flex flex-col items-center py-12 px-6 lg:px-20">
            <h1 className="text-3xl font-bold text-Primary mb-6">Frequently Asked Questions</h1>
            <div className="w-full max-w-2xl bg-white/85 p-6 rounded-lg shadow-md">
                {faqs.map((faq, index) => (
                    <div key={index} className="mb-4 border-b border-gray-300 pb-2">
                        <button
                            className="flex justify-between items-center w-full text-left font-medium text-lg text-Primary focus:outline-none"
                            onClick={() => toggleFAQ(index)}
                        >
                            {faq.question}
                            <FaChevronDown className={`text-Primary transition-transform ${openIndex === index ? "rotate-180" : ""}`} />
                        </button>
                        {openIndex === index && <p className="mt-2 text-gray-600">{faq.answer}</p>}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQ;
