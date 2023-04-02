import React, { useState } from 'react';
import './FAQ.css';

const questions = [
  {
    question: 'What are the delivery options?',
    answer: 'We offer standard, express, and same-day delivery options. Delivery charges may vary depending on your location and chosen delivery method.',
  },
  {
    question: 'Can I change my delivery address after placing an order?',
    answer: 'Yes, you can change your delivery address within a certain timeframe. Please contact our customer support as soon as possible to update your details.',
  },
  {
    question: 'What is the return policy?',
    answer: 'We accept returns within 30 days of purchase for most items. Please refer to our Return and Refund Policy section for more details.',
  },
  {
    question: 'How do I track my order?',
    answer: 'Once your order has been dispatched, you will receive a confirmation email with a tracking number. You can use this number to track your order on our website.',
  },
  {
    question: 'Which payment methods are accepted?',
    answer: 'We accept all major credit cards, PayPal, and various mobile payment options.',
  },
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(-1);

  const toggleQuestion = (index) => {
    if (activeIndex === index) {
      setActiveIndex(-1);
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <div className="faq">
      <h2>Frequently Asked Questions</h2>
      {questions.map((q, index) => (
        <div key={index} className="faq__item">
          <button
            className={`faq__question ${activeIndex === index ? 'faq__question--active' : ''}`}
            onClick={() => toggleQuestion(index)}
          >
            {q.question}
          </button>
          {activeIndex === index && <div className="faq__answer">{q.answer}</div>}
        </div>
      ))}
    </div>
  );
}
