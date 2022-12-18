import React from "react";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children, type, singleChapter }) => {
  return (
    <div>
      <Header type={type} singleChapter={singleChapter} />
      {children}
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
