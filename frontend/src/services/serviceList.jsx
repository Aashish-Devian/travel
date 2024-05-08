
import React from 'react'
import serviceCard from "./serviceCard"
import { Col } from 'reactstrap'

import weatherImg from "../assets/images/weather.png"
import guideImg from "../assets/images/guide.png"
import customizationImg from "../assets/images/customization.png"

const servicesData = [
    {
        imgUrl: weatherImg,
        title:"calculate weather",
        desc: "Lorem ufhdsg fgsjgf jhhgbjhgfshgf jhbgfsdhgib sdhj fj.",
    },
    {
        imgUrl: guideImg,
        title:"Best tour guide.r",
        desc: "Lorem ufhdsg fgsjgf jhhgbjhgfshgf jhbgfsdhgib sdhj fj.",
    },
    {
        imgUrl: customizationImg,
        title:"customization",
        desc: "Lorem ufhdsg fgsjgf jhhgbjhgfshgf jhbgfsdhgib sdhj fj.",
    },
]

const serviceList = () => {
  return 
    <>
    {servicesData.map((item, index) => (
        <Col lg="3" key={index}>
        <serviceCard item={item} />
        </Col>
    ))}
    </>
  
}

export default serviceList