import React from "react";
import { Col, Container, Row } from "reactstrap";
import experienceImg from "../assets/images/experience.png";
import heroImg from "../assets/images/hero-img01.jpg";
import heroImg2 from "../assets/images/hero-img02.jpg";
import heroImg3 from "../assets/images/hero-img03.jpg";
import worldImg from "../assets/images/world.png";
import MasonryImagesGallery from "../components/ImageGallery/MasonryImagesGallery";
import Testimonials from "../components/Testimonial/Testimonials";
import ServiceList from "../services/ServiceList";
import Newsletter from "../shared/Newsletter";
import ProductCard from "../shared/ProductCard";
import Subtitle from "../shared/Subtitle";
import "../styles/Home.css";

const Home = () => {
  return (
    <>
      {/* =============== hero section start =========== */}
      <section>
        <Container>
          <Row>
            <Col lg="6">
              <div className="hero__content">
                <div className="hero__subtitle d-flex align-items-center">
                  <Subtitle subtitle={"Know Before You Go"} />
                  <img src={worldImg} alt="" />
                </div>
                <h1>
                  <span className="highlight">Kirana</span> for the future.
                </h1>
                <p>
                Explore the marketplace tailored for modern convenience stores. Whether you're stocking up on everyday essentials, specialty items, or eco-friendly products, you'll find everything you need to enhance your business operations. Shop with confidence, knowing that each product is curated to support your store's success and customer satisfaction.
                </p>
              </div>
            </Col>

            <Col lg="2">
              <div className="hero__img-box">
                <img src={heroImg} alt="" />
              </div>
            </Col>
            <Col lg="2">
              <div className="hero__img-box mt-4">
                <img src={heroImg3} alt="" />
              </div>
            </Col>
            <Col lg="2">
              <div className="hero__img-box mt-5">
                <img src={heroImg2} alt="" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      {/* =============== hero section end =========== */}

      <section>
        <Container>
          <Row>
            <Col lg="3">
              <h5 className="services__subtitle">What we offer</h5>
              <h2 className="services__title">We offer our best services</h2>
            </Col>
            <ServiceList />
          </Row>
        </Container>
      </section>

      {/* ================== feature product section  start =================== */}
      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5">
              <Subtitle subtitle={"Explore"} />
              <h2 className="feature__product-title">Our Featured Produts</h2>
            </Col>
            <ProductCard />
          </Row>
        </Container>
      </section>
      {/* ================== feature product section  end =================== */}

      {/* ================== experience  section  start =================== */}
      <section>
        <Container>
          <Row>
            <Col lg="6">
              <div className="experience__content">
                <Subtitle subtitle={"Experience"} />
                <h2>
                  With all our experience <br /> we will servee you
                </h2>
                <p>
                  With decades of expertise in the e-commerce sector, <br />
                  we are committed to providing you with the best solutions and
                  services to help your farm thrive.
                </p>
              </div>

              <div className="counter__wrapper d-flex align-items-center gap-5">
                <div className="counter__box">
                  <span>89k+</span>
                  <h6>Products sold </h6>
                </div>
                <div className="counter__box">
                  <span>2k+</span>
                  <h6>Satisfied Customers </h6>
                </div>
                <div className="counter__box">
                  <span>5</span>
                  <h6>Years Experience</h6>
                </div>
              </div>
            </Col>
            <Col lg="6">
              <div className="experience__img">
                <img src={experienceImg} alt="" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      {/* ==================  experience section  end =================== */}

      {/* ==================  gallery section  end =================== */}
      <section>
        <Container>
          <Row>
            <Col lg="12">
              <Subtitle subtitle={"Gallery"} />
              <h2 className="gallery__title">Visit our customers gallery</h2>
            </Col>
            <Col lg="12">
              <MasonryImagesGallery />
            </Col>
          </Row>
        </Container>
      </section>
      {/* ==================  gallery section  end =================== */}

      {/* ==================  testimonial section  end =================== */}
      <section>
        <Container>
          <Row>
            <Col lang="12">
              <Subtitle subtitle={"Customer Love"} />
              <h2 className="testimonial__title">
                What our customers say about us
              </h2>
            </Col>
            <Col lg="12">
              <Testimonials />
            </Col>
          </Row>
        </Container>
      </section>
      {/* ==================  testimonial section  end =================== */}

      <Newsletter />
    </>
  );
};

export default Home;
