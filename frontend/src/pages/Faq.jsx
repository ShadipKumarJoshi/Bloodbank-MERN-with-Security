import React, { useState } from "react";
import { FiChevronDown, FiChevronUp, FiX } from "react-icons/fi";

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    "Where does the money of the donation go?",
    "Where does the money of the donation go?",
    "Where does the money of the donation go?",
    "Where does the money of the donation go?",
    "Where does the money of the donation go?",
    "Where does the money of the donation go?",
    "Where does the money of the donation go?",
    "Where does the money of the donation go?",
    "Where does the money of the donation go?",
  ];

  const toggleFaq = (index) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  const handleClose = () => {
    window.history.back();
  };

  return (
    <div className="flex flex-col items-center min-h-screen mb-3 bg-gray-50">
      <img
        src="assets/images/terms.png"
        alt="Background"
        className="w-full"
        style={{ height: "518px" }}
      />
      <div className="bg-white mt-[-145px] p-8 rounded-lg shadow-lg w-full max-w-[1062px] relative border border-black">
        <button className="absolute top-8 right-4" onClick={handleClose}>
          <FiX className="text-black-500" size={40} />
        </button>
        <h2 className="text-3xl font-semibold mb-[40px]" style={{ fontSize: '46px', fontFamily: 'Poppins', fontWeight: '600', paddingLeft: '20px' }}>Frequently Asked Questions</h2>
        {faqs.map((faq, index) => (
          <div key={index} className="mb-4">
            <button
              onClick={() => toggleFaq(index)}
              className={`flex justify-between items-center w-full p-4 border rounded-lg bg-gray-100 hover:bg-gray-200 focus:outline-none ${
                openIndex === index ? "text-blue-500" : "text-black"
              }`}
              style={{ height: "97px", fontSize: "25px", fontFamily: "Poppins", maxWidth: "945px", margin: "0 auto" }}
            >
              <span>{faq}</span>
              <span>
                {openIndex === index ? <FiChevronUp /> : <FiChevronDown />}
              </span>
            </button>
            {openIndex === index && (
              <div className="p-4 bg-white border-l-2 border-b-2 border-r-2 border-gray-200 rounded-b-lg" style={{ maxWidth: "945px", margin: "0 auto", fontSize: "20px", fontFamily: "Poppins" }}>
                <p>
                  The money of the donation goes in the betterment of the pet.
                  They get better care, materials and food. The money of the
                  donation goes in the betterment of the pet. They get better
                  care, materials and food. The money of the donation goes in
                  the betterment of the pet. They get better care, materials and
                  food. The money of the donation goes in the betterment of the
                  pet. They get better care, materials and food. The money of
                  the donation goes in the betterment of the pet. They get
                  better care, materials and food. The money of the donation
                  goes in the betterment of the pet. They get better care,
                  materials and food.
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
