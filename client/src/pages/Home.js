import React from "react";
import Announcement from "../components/Announcement";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Products from "../components/Products";
import Slider from "../components/Slider";
import styled from "styled-components";

const Container = styled.div``;
const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;
//rafce shortcut
const Home = () => {
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Slider />
      <Categories />
      <Products />
      <Newsletter />
      <Hr></Hr>
      <Footer />
    </Container>
  );
};

export default Home;
