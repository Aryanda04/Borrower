import React from "react";
import Footer from "./Footer";
// import Footer from "./footer";
import Nav from "./Navbar";

const LayoutComponent = (props) => {
  return (
    <>
      <Nav />
      <div>{props.content}</div>
      {/* <Footer /> */}
    </>
  );
};

export default LayoutComponent;
