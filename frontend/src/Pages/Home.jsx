import React from 'react'
import '../style/home.css'

import { Container, Row, Col } from 'reactstrap'
import heroImg from '../assets/images/hero-img01.jpg'
import heroImg02 from '../assets/images/hero-img02.jpg'
import heroVideo from '../assets/images/hero-video.mp4'
import Subtitle from '../shared/Subtitle'
import worldImg from '../assets/images/world.png'

import SearchBar from '../shared/SearchBar'
import ServiceList from '../services/serviceList'

const Home = () => {
  return <>
  {/* ============hero section start======== */}
  <section>
    <Container>
      <Row>
        <Col lg='6'>
          <div className="hero__content">
            <div className="hero__subtitle d-flex align-items-center">
              <Subtitle subtitle={'knows before you go'} />
              <img src={worldImg} alt="image world" />
            </div>
            <h1>
              travelling opens the door to creating{" "}
              <span className="hightlight">Memories</span>
            </h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing 
              elit. Dolores ipsam obcaecati veniam quod, consectetur 
              error recusandae esse natus, explicabo enim cupiditate 
              assumenda dicta culpa numquam corporis ex dolorem repellat 
              temporibus?
              </p>
          </div>
        </Col>

          <Col lg='2'>
            <div className="hero__img-box">
                <img src={heroImg} alt="" />
            </div>
          </Col>
          <Col lg='2'>
            <div className="hero__img-box mt-4">
              <img src={heroVideo} alt="" />
            </div>
          </Col>
          <Col lg='2'>
            <div className="hero__img-box mt-5">
              <img src={heroImg02} alt="" />
            </div>
          </Col>
          <SearchBar />

      </Row>
    </Container>
  </section>
  {/* ============hero section end======== */}
  <section>
    <Container>
      <Row>
        <Col lg='3'>
        <h5 className="services__subtitle">What we serve</h5>
        <h2 className="services__title">We offer our best services</h2>
        </Col>
        <ServiceList />
      </Row>
    </Container>
  </section>

  </>
}

export default Home