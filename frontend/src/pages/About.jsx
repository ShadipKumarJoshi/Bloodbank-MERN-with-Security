import React from "react";
import { FiX } from "react-icons/fi";

const About = () => {

  return (
    <div className="flex flex-col items-center min-h-screen mb-3 bg-gray-50">
      <img
        src="assets/images/terms.png"
        alt="Background"
        className="w-full"
        style={{ height: "518px" }}
      />
      <div className="bg-white mt-[-145px] p-8 rounded-lg shadow-lg w-full max-w-[1062px] relative border border-black">
        <button className="absolute top-8 right-4" onClick={() => window.history.back()}>
          <FiX className="text-black-500" size={40} />
        </button>
        <h2 className="text-4xl font-semibold mb-[27px]" style={{ fontSize: '46px', fontFamily: 'Poppins', fontWeight: '600' }}>About Us</h2>
        <p className="text-2xl mb-[27px]" style={{ fontSize: '20px', fontWeight: '400', fontFamily: 'Poppins' }}>
          <strong>Welcome to 
            <span style={{ color: '#F24E1E' }}> Adoption</span>
            <span style={{ color: '#004AAD' }}>HUB!!</span>
          </strong>
        </p>
        <p className="text-lg mb-[27px]" style={{ fontSize: '20px', fontFamily: 'Poppins', fontWeight: '400' }}>
          At Adoption Hub, we believe every child deserves a loving and
          supportive home. We are dedicated to connecting prospective parents
          with children in need of a forever family, providing comprehensive
          support and guidance throughout the adoption journey.
        </p>
        <h3 className="text-xl font-bold mb-[27px]" style={{ fontWeight: '700' }}>Our Mission</h3>
        <p className="mb-[27px]" style={{ fontSize: '20px', fontFamily: 'Poppins', fontWeight: '400' }}>
          Our mission is to facilitate successful adoptions by offering
          compassionate, professional, and ethical services to both adoptive
          families and birth parents. We strive to ensure that every adoption is
          handled with the utmost care, respect, and dedication to the
          well-being of the child.
        </p>
        <h3 className="text-xl font-bold mb-[27px]" style={{ fontWeight: '700' }}>Our Services</h3>
        <ul className="list-disc pl-5 mb-[27px]" style={{ fontSize: '20px', fontFamily: 'Poppins', fontWeight: '400' }}>
          <li className="mb-1">
            Adoption Counseling: We provide personalized counseling services to
            help prospective parents understand the adoption process, explore
            their options, and prepare for the journey ahead.
          </li>
          <li className="mb-1">
            Matching Services: Our team works diligently to match children with
            the right families, taking into consideration the needs and
            preferences of both the child and the adoptive parents.
          </li>
          <li className="mb-1">
            Legal Assistance: We offer comprehensive legal support to navigate
            the complex legalities of adoption, ensuring a smooth and compliant
            process.
          </li>
          <li className="mb-1">
            Post-Adoption Support: Our commitment doesn't end with the
            placement. We provide ongoing support and resources to help families
            adjust and thrive post-adoption.
          </li>
        </ul>
        <h3 className="text-xl font-bold mb-[27px]" style={{ fontWeight: '700' }}>Why Choose Us?</h3>
        <ul className="list-disc pl-5 mb-[27px]" style={{ fontSize: '20px', fontFamily: 'Poppins', fontWeight: '400' }}>
          <li className="mb-1">
            Experience: With over 20 years in the field, our experienced team of
            adoption professionals has facilitated thousands of successful
            adoptions.
          </li>
          <li className="mb-1">
            Compassion: We approach every adoption with empathy and sensitivity,
            understanding the emotional journey that both adoptive families and
            birth parents undergo.
          </li>
          <li className="mb-1">
            Ethical Standards: We adhere to the highest ethical standards,
            ensuring that every step of the adoption process is transparent,
            fair, and in the best interest of the child.
          </li>
          <li className="mb-1">
            Support: From the initial consultation to post-adoption services, we
            are with you every step of the way, providing the support and
            guidance you need.
          </li>
        </ul>
        <h3 className="text-xl font-bold mb-[27px]" style={{ fontWeight: '700' }}>Our Team</h3>
        <p className="mb-[27px]" style={{ fontSize: '20px', fontFamily: 'Poppins', fontWeight: '400' }}>
          Our team is composed of dedicated professionals, including licensed
          social workers, counselors, legal experts, and support staff, all
          passionate about making a positive impact in the lives of children and
          families.
        </p>
      </div>
    </div>
  );
};

export default About;
