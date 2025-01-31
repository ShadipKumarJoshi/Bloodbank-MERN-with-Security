import React from "react";
import Slider from "react-slick";
import ava01 from "../../assets/images/kirana1.jpg";
import ava02 from "../../assets/images/kirana2.jpg";
import ava03 from "../../assets/images/kirana3.jpg";

const Testimonials = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1000,
    swipeToSlide: true,
    autoplaySpeed: 2000,
    slidesToShow: 3,

    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <Slider {...settings}>
      <div className="testimonial py-4 px-3">
        <div>
          <h6 className="mb-0 mt-3">"Kirana has completely transformed the way we run our store!"</h6>
        </div>
        <p className="fst-italic">
          "Their wide range of products and seamless ordering process have saved us so much time and effort. We’re now able to offer our customers a better variety and quality. Highly recommended for every convenience store owner!"
        </p>
        <div className="d-flex align-items-center gap-4 mt-3">
          <img src={ava01} className="w-25 h-25 rounded-2" alt="" />
          <div>
            <h6 className="mb-0 mt-3">Ram Bahadur</h6>
            <p>– Rajesh Gupta, Store Owner, Kathmandu</p>
          </div>
        </div>
      </div>
      <div className="testimonial py-4 px-3">
        <div>
          <h6 className="mb-0 mt-3">"Kirana has made managing my store so much easier!"</h6>
        </div>
        <p className="fst-italic">
          "With their efficient platform and curated products, I can focus on growing my business instead of worrying about sourcing inventory. A must-try for every store owner!"
        </p>
        <div className="d-flex align-items-center gap-4 mt-3">
          <img src={ava02} className="w-25 h-25 rounded-2" alt="" />
          <div>
            <h6 className="mb-0 mt-3">Hari Sharma, Vegetable Shop Owner</h6>
            <p>– Store Owner, Janakpur</p>
          </div>
        </div>
      </div>
      <div className="testimonial py-4 px-3">
  <div>
    <h6 className="mb-0 mt-3">"Exceptional service and reliable products!"</h6>
  </div>
  <p className="fst-italic">
    "Kirana has become my go-to platform for restocking my store. Their support team is always available, and their commitment to quality is unmatched."
  </p>
  <div className="d-flex align-items-center gap-4 mt-3">
    <img src={ava02} className="w-25 h-25 rounded-2" alt="" />
    <div>
      <h6 className="mb-0 mt-3">Vikram Singh</h6>
      <p>– Store Owner, Bhaktapur</p>
    </div>
  </div>
</div>
<div className="testimonial py-4 px-3">
  <div>
    <h6 className="mb-0 mt-3">"Kirana simplifies everything for us!"</h6>
  </div>
  <p className="fst-italic">
    "Their extensive product range and easy-to-use platform have streamlined my operations. I can now serve my customers better with less hassle."
  </p>
  <div className="d-flex align-items-center gap-4 mt-3">
    <img src={ava03} className="w-25 h-25 rounded-2" alt="" />
    <div>
      <h6 className="mb-0 mt-3">Anjali Verma</h6>
      <p>– Store Owner, Biratnagar</p>
    </div>
  </div>
</div>
<div className="testimonial py-4 px-3">
  <div>
    <h6 className="mb-0 mt-3">"A lifesaver for small businesses!"</h6>
  </div>
  <p className="fst-italic">
    "Kirana provides everything I need in one place. Their eco-friendly options and competitive prices help me cater to my customers more effectively."
  </p>
  <div className="d-flex align-items-center gap-4 mt-3">
    <img src={ava02} className="w-25 h-25 rounded-2" alt="" />
    <div>
      <h6 className="mb-0 mt-3">Rahul Kumar</h6>
      <p>– Fruit Store Owner, Sindhuli</p>
    </div>
  </div>
</div>
<div className="testimonial py-4 px-3">
  <div>
    <h6 className="mb-0 mt-3">"Great products, great service!"</h6>
  </div>
  <p className="fst-italic">
    "With Kirana, I have access to high-quality products that my customers love. Their fast delivery ensures my shelves are always stocked."
  </p>
  <div className="d-flex align-items-center gap-4 mt-3">
    <img src={ava03} className="w-25 h-25 rounded-2" alt="" />
    <div>
      <h6 className="mb-0 mt-3">Priya Sinha</h6>
      <p>– Store Owner, Patan</p>
    </div>
  </div>
</div>



    </Slider>
  );
};

export default Testimonials;
