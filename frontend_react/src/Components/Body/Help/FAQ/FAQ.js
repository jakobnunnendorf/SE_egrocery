
import React, { useState } from 'react';
import './FAQ.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

library.add(faQuestionCircle);

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
  const [activeIndices, setActiveIndices] = useState([]);

  const toggleQuestion = (index) => {
    if (activeIndices.includes(index)) {
      setActiveIndices(activeIndices.filter((i) => i !== index));
    } else {
      setActiveIndices([...activeIndices, index]);
    }
  };

  return (
    <div className="faq">
      <h2 className="heading_faq"> Frequently Asked Questions <FontAwesomeIcon icon="question-circle" /> </h2>
      {questions.map((q, index) => (
        <div key={index} className="faq__item">
          <div className="faq__question-wrapper">
            <button
              className={`faq__question ${activeIndices.includes(index) ? 'faq__question--active' : ''}`}
              onClick={() => toggleQuestion(index)}
            >
              {q.question}
            </button>
            <span className={`faq__arrow ${activeIndices.includes(index) ? 'faq__arrow--active' : ''}`} onClick={() => toggleQuestion(index)}>&#9660;</span>
          </div>
          {activeIndices.includes(index) && <div className="faq__answer">{q.answer}</div>}
        </div>
      ))}
    </div>
  );
}
