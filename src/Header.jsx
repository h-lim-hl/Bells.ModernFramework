import React from "react";

function Header(prop) {
  return (<>
    <header className="bg-dark py-5 header-background">
      <div className="container px-4 px-lg-5 my-5 header-textarea-bg">
        <div className="text-center text-white">
          <h1 className="display-4 fw-bolder">{prop.title}</h1>
          <p className="lead fw-normal text-white-50 mb-0">{prop.subtitle}</p>
        </div>
      </div>
    </header>
  </>);
}

export default Header;