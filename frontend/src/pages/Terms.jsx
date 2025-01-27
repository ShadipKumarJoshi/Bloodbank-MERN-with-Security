import React from "react";
import { FiX } from "react-icons/fi";

const TermsAndConditions = () => {

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
          <FiX className="text-balck-500" size={40} />
        </button>
        <h2 className="text-4xl font-semibold mb-[27px]" style={{ fontSize: '46px', fontFamily: 'Poppins', fontWeight: '600' }}>Terms and Conditions</h2>
        <p className="text-2xl mb-[27px]" style={{ fontSize: '20px', fontWeight: '400', fontFamily: 'Poppins' }}>
          <strong>Welcome to
            <span style={{ color: '#F24E1E' }}> Adoption</span>
            <span style={{ color: '#004AAD' }}>HUB!!</span>
          </strong>
        </p>
        <p className="text-lg mb-[27px]" style={{ fontSize: '20px', fontFamily: 'Poppins', fontWeight: '400' }}>
          These terms and conditions outline the rules and regulations for the
          use of the Petadapt Website, located at
          <a href="https://www.petadapt.com" className="text-blue-500">
            https://www.petadapt.com
          </a>
          . By accessing this website we assume you accept these terms and
          conditions. Do not continue to use Petadapt if you do not agree to
          take all of the terms and conditions stated on this page.
        </p>
        <p className="mb-[27px]" style={{ fontSize: '20px', fontFamily: 'Poppins', fontWeight: '400' }}>
          The following terminology applies to these Terms and Conditions,
          Privacy Statement and Disclaimer Notice and all Agreements: "Client",
          "You" and "Your" refers to you, the person log on this website and
          compliant to the Company’s terms and conditions. "The Company",
          "Ourselves", "We", "Our" and "Us", refers to our Company. "Party",
          "Parties", or "Us", refers to both the Client and ourselves. All terms
          refer to the offer, acceptance and consideration of payment necessary
          to undertake the process of our assistance to the Client in the most
          appropriate manner for the express purpose of meeting the Client’s
          needs in respect of provision of the Company’s stated services, in
          accordance with and subject to, prevailing law of Nepal. Any use of
          the above terminology or other words in the singular, plural,
          capitalization and/or he/she or they, are taken as interchangeable and
          therefore as referring to same.
        </p>
        <h3 className="text-xl font-bold mb-[27px]" style={{ fontWeight: '700' }}>Cookies</h3>
        <p className="mb-[27px]" style={{ fontSize: '20px', fontFamily: 'Poppins', fontWeight: '400' }}>
          We employ the use of cookies. By accessing Petadapt, you agreed to
          use cookies in agreement with the Petadapt’s Privacy Policy. Most
          interactive websites use cookies to let us retrieve the user’s details
          for each visit. Cookies are used by our website to enable the
          functionality of certain areas to make it easier for people visiting
          our website. Some of our affiliate/advertising partners may also use
          cookies.
        </p>
        <h3 className="text-xl font-bold mb-[27px]" style={{ fontWeight: '700' }}>License</h3>
        <p className="mb-[27px]" style={{ fontSize: '20px', fontFamily: 'Poppins', fontWeight: '400' }}>
          Unless otherwise stated, Petadapt and/or its licensors own the
          intellectual property rights for all material on Petadapt. All
          intellectual property rights are reserved. You may access this from
          Petadapt for your own personal use subjected to restrictions set in
          these terms and conditions.
        </p>
        <h3 className="text-xl font-bold mb-[27px]" style={{ fontWeight: '700' }}>You must not:</h3>
        <ul className="list-disc list-inside mb-[27px]" style={{ fontSize: '20px', fontFamily: 'Poppins', fontWeight: '400' }}>
          <li>Republish material from Petadapt</li>
          <li>Sell, rent or sub-license material from Petadapt</li>
          <li>Reproduce, duplicate or copy material from Petadapt</li>
          <li>Redistribute content from Petadapt</li>
        </ul>
        <p className="mb-[27px]" style={{ fontSize: '20px', fontFamily: 'Poppins', fontWeight: '400' }}>This Agreement shall begin on the date hereof.</p>
        <p className="mb-[27px]" style={{ fontSize: '20px', fontFamily: 'Poppins', fontWeight: '400' }}>
          As long as the website and the information and services on the website
          are provided free of charge, we will not be liable for any loss or
          damage of any nature.
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditions;
