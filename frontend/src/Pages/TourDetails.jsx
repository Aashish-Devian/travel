import React, { useState, useRef, useEffect, useContext } from "react";
import "../style/tour-details.css";
import {
  Container,
  Row,
  Col,
  Form,
  ListGroup,
  Nav,
  NavItem,
  NavLink,
  Button,
} from "reactstrap";
import { useParams } from "react-router-dom";
import calculateAvgRating from "../utils/avgRating";
import avatar from "../assets/images/avatar.jpg";
import Booking from "../components/Booking/Booking";
import Newsletter from "../shared/Newsletter";
import useFetch from "../hooks/useFetch";
import { BASE_URL } from "../utils/config";
import { AuthContext } from "../context/AuthContext";

const TourDetails = () => {
  const { id } = useParams();
  const reviewMsgRef = useRef("");
  const [tourRating, setTourRating] = useState(null);
  const { user } = useContext(AuthContext);

  const { data: tour, loading, error } = useFetch(`${BASE_URL}/tours/${id}`);
  const [expandedDays, setExpandedDays] = useState([]);
  const [allDaysExpanded, setAllDaysExpanded] = useState(false);
  const [floatingNav, setFloatingNav] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const navRef = useRef(null);

  const {
    photo,
    title,
    desc,
    price,
    reviews,
    city,
    address,
    distance,
    maxGroupSize,
    overview,
    include,
    itinerary,
    equipment,
    tripMap,
    video,
    faqs,
  } = tour || {};

  const { totalRating, avgRating } = calculateAvgRating(reviews);

  const options = { day: "numeric", month: "long", year: "numeric" };

  const submitHandler = async (e) => {
    e.preventDefault();
    const reviewText = reviewMsgRef.current.value;

    try {
      if (!user || user === undefined || user === null) {
        alert("Please sign in");
      }
      const reviewObj = {
        username: user?.username,
        reviewText,
        rating: tourRating,
      };

      const res = await fetch(`${BASE_URL}/review/${id}`, {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(reviewObj),
      });

      const result = await res.json();
      if (!res.ok) {
        return alert(result.message);
      }
      alert(result.message);
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [tour]);

  const toggleDay = (index) => {
    setExpandedDays((prevExpandedDays) => {
      if (prevExpandedDays.includes(index)) {
        return [];
      } else {
        return [index];
      }
    });
  };

  const toggleAllDays = () => {
    if (allDaysExpanded) {
      setExpandedDays([]);
    } else {
      const allIndexes = itinerary?.map((_, index) => index) || [];
      setExpandedDays(allIndexes);
    }
    setAllDaysExpanded(!allDaysExpanded);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "overview",
        "include",
        "itinerary",
        "equipment",
        "tripMap",
        "video",
        "faqs",
        "review",
      ];

      const overviewSection = document.getElementById("overview");
      const reviewSection = document.getElementById("review");

      if (overviewSection && reviewSection) {
        const overviewTop = overviewSection.getBoundingClientRect().top;
        const reviewTop = reviewSection.getBoundingClientRect().top;

        if (overviewTop <= 80 && reviewTop >= 80) {
          setFloatingNav(true);
        } else {
          setFloatingNav(false);
        }
      }

      const scrollPosition = window.scrollY + 100; // Adjust as needed for header height
      const buffer = 45; // Buffer value to highlight the section earlier

      const currentSection = sections.find((section, index) => {
        const element = document.getElementById(section);
        const nextSection = sections[index + 1];
        const nextElement = nextSection ? document.getElementById(nextSection) : null;
        return (
          element &&
          scrollPosition + buffer >= element.offsetTop &&
          (!nextElement || scrollPosition + buffer < nextElement.offsetTop)
        );
      });

      setActiveSection(currentSection || "");
    };

    const handleResize = () => {
      if (navRef.current) {
        navRef.current.style.width = `${navRef.current.parentElement.offsetWidth}px`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section>
      <Container>
        {loading && <h4 className="text-center pt-5">LOADING.........</h4>}
        {error && <h4 className="text-center pt-5">{error}</h4>}
        {!loading && !error && (
          <Row>
            <Col lg="8">
              <div className="tour__content">
                <div
                  id="tour-details-nav"
                  className={floatingNav ? "floating-nav" : "hidden-nav"}
                  ref={navRef}
                >
                  <Nav className="nav-tabs">
                    <NavItem className="nav-item">
                      <NavLink
                        href="#overview"
                        className={activeSection === "overview" ? "active" : ""}
                      >
                        <i className="ri-eye-line" />
                        Overview
                      </NavLink>
                    </NavItem>
                    <NavItem className="nav-item">
                      <NavLink
                        href="#include"
                        className={activeSection === "include" ? "active" : ""}
                      >
                        <i className="ri-secure-payment-line" />
                        Include
                      </NavLink>
                    </NavItem>
                    <NavItem className="nav-item">
                      <NavLink
                        href="#itinerary"
                        className={activeSection === "itinerary" ? "active" : ""}
                      >
                        <i className="ri-bar-chart-horizontal-line" />
                        Itinerary
                      </NavLink>
                    </NavItem>
                    <NavItem className="nav-item">
                      <NavLink
                        href="#equipment"
                        className={activeSection === "equipment" ? "active" : ""}
                      >
                        <i className="ri-hammer-line" />
                        Equipment
                      </NavLink>
                    </NavItem>
                    <NavItem className="nav-item">
                      <NavLink
                        href="#tripMap"
                        className={activeSection === "tripMap" ? "active" : ""}
                      >
                        <i className="ri-map-2-line" />
                        Trip Map
                      </NavLink>
                    </NavItem>
                    <NavItem className="nav-item">
                      <NavLink
                        href="#video"
                        className={activeSection === "video" ? "active" : ""}
                      >
                        <i className="ri-youtube-line" />
                        Video
                      </NavLink>
                    </NavItem>
                    <NavItem className="nav-item">
                      <NavLink
                        href="#faqs"
                        className={activeSection === "faqs" ? "active" : ""}
                      >
                        <i className="ri-question-line" />
                        FAQs
                      </NavLink>
                    </NavItem>
                    <NavItem className="nav-item">
                      <NavLink
                        href="#review"
                        className={activeSection === "review" ? "active" : ""}
                      >
                        <i className="ri-star-half-line" />
                        Reviews
                      </NavLink>
                    </NavItem>
                  </Nav>
                </div>
                <img src={photo} alt="" />

                <div className="tour__info">
                  <h2>{title}</h2>
                  <div className="d-flex align-items-center gap-5">
                    <span className="tour__rating d-flex align-items-center gap-1">
                      <i
                        className="ri-star-fill"
                        style={{ color: "var(--secondary-color)" }}
                      ></i>{" "}
                      {avgRating} ({reviews?.length})
                    </span>
                    <span>
                      <i className="ri-map-pin-user-fill"></i> {address}
                    </span>
                  </div>

                  <div className="tour__extra-details">
                    <span>
                      <i className="ri-map-pin-2-line"></i> {city}
                    </span>
                    <span>
                      <i className="ri-money-dollar-circle-line"></i> ${price} /
                      per person
                    </span>
                    <span>
                      <i className="ri-map-pin-time-line"></i> {distance} k/m
                    </span>
                    <span>
                      <i className="ri-group-line"></i> {maxGroupSize} people
                    </span>
                  </div>

                  <h5>Description</h5>
                  <p dangerouslySetInnerHTML={{ __html: desc }}></p>

                  <div className="tour__extra-info">
                    <h5 id="overview" className="scroll-offset">Overview</h5>
                    <ul>
                      {overview?.map((point, index) => (
                        <li key={index} dangerouslySetInnerHTML={{ __html: point }}></li>
                      ))}
                    </ul>

                    <h5 id="include" className="scroll-offset">What's Included</h5>
                    <ul>
                      {include?.map((include, index) => (
                        <li key={index} dangerouslySetInnerHTML={{ __html: include }}></li>
                      ))}
                    </ul>

                    <div className="d-flex justify-content-between align-items-center">
                      <h5 id="itinerary" className="scroll-offset">Itinerary</h5>
                      <div>
                        <Button
                          className="itinerary-toggle-button btn primary__btn text-white"
                          onClick={toggleAllDays}
                        >
                          {allDaysExpanded ? "Close All" : "Open All"}
                        </Button>
                      </div>
                    </div>
                    <div className="itinerary-content">
                      {itinerary?.map((item, index) => (
                        <div key={index} className="itinerary-item">
                          <header onClick={() => toggleDay(index)}>
                            {item.day}
                          </header>
                          {expandedDays.includes(index) && (
                            <div
                              dangerouslySetInnerHTML={{
                                __html: item.description,
                              }}
                            ></div>
                          )}
                        </div>
                      ))}
                    </div>

                    <h5 id="equipment" className="scroll-offset">Equipment</h5>
                    <ul>
                      {equipment?.map((equipment, index) => (
                        <li key={index} dangerouslySetInnerHTML={{ __html: equipment }}></li>
                      ))}
                    </ul>

                    <h5 id="tripMap" className="scroll-offset">Trip Map</h5>
                    <a
                      href={tripMap}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Map
                    </a>

                    <h5 id="video" className="scroll-offset">Video</h5>
                    <iframe
                      width="560"
                      height="315"
                      src={video}
                      allowFullScreen
                    ></iframe>

                    <div className="d-flex justify-content-between align-items-center">
                      <h5 id="faqs" className="scroll-offset">FAQs</h5>
                      <div>
                        <Button
                          className="itinerary-toggle-button btn primary__btn text-white"
                          onClick={toggleAllDays}
                        >
                          {allDaysExpanded ? "Close All" : "Open All"}
                        </Button>
                      </div>
                    </div>
                    <div className="itinerary-content">
                      {faqs?.map((item, index) => (
                        <div key={index} className="itinerary-item">
                          <header onClick={() => toggleDay(index)}>
                            {item.question}
                          </header>
                          {expandedDays.includes(index) && (
                            <div
                              dangerouslySetInnerHTML={{
                                __html: item.answer,
                              }}
                            ></div>
                          )}
                        </div>
                      ))}
                    </div>

                  </div>
                </div>

                <div className="tour__reviews mt-4">
                  <h4 id="review" className="scroll-offset">Reviews ({reviews?.length} reviews)</h4>
                  <Form onSubmit={submitHandler}>
                    <div className="d-flex align-items-center gap-3 mb-4 rating__group">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span key={star} onClick={() => setTourRating(star)}>
                          {star} <i className="ri-star-s-fill"></i>
                        </span>
                      ))}
                    </div>
                    <div className="review__input">
                      <input
                        type="text"
                        ref={reviewMsgRef}
                        placeholder="Share your thoughts"
                        required
                      />
                      <button
                        className="btn primary__btn text-white"
                        type="submit"
                      >
                        Submit
                      </button>
                    </div>
                  </Form>

                  <ListGroup className="user__reviews">
                    {reviews?.map((review) => (
                      <div className="review__item" key={review._id}>
                        <img src={avatar} alt="" />
                        <div className="w-100">
                          <div className="d-flex align-items-center justify-content-between">
                            <div>
                              <h5>{review.username}</h5>
                              <p>
                                {new Date(review.createdAt).toLocaleDateString(
                                  "en-US",
                                  options
                                )}
                              </p>
                            </div>
                            <span className="d-flex align-items-center">
                              {review.rating}{" "}
                              <i className="ri-star-s-fill"></i>
                            </span>
                          </div>
                          <h6>{review.reviewText}</h6>
                        </div>
                      </div>
                    ))}
                  </ListGroup>
                </div>
              </div>
            </Col>

            <Col lg="4">
              <Booking tour={tour} avgRating={avgRating} />
            </Col>
          </Row>
        )}
      </Container>
      <Newsletter />
    </section>
  );
};

export default TourDetails;
