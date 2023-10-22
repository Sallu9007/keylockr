import React from "react";
import HomeImg from "./HomeImg.js";

class Page1 extends React.Component {
  render() {
    return (
      <div className="container overflow-hidden">
        <div className="row">
          <div className="col-lg-6 mt-5">
            <h1 className="ms-auto mt-auto fs-1 navbar-brand text-dark text-wrap text-justify">
              One <span className="text-primary">Pass</span> to <br /> Rule them
              all!
            </h1>
            <h2 className="ms-auto">
              Your smartest move <br />
              to a Password[less] Future
            </h2>
            <button className="btn bg-primary text-dark text-center ms-auto mt-3 fw-bold">
              Try For Free!
            </button>
          </div>
          <HomeImg />
        </div>
      </div>
    );
  }
}
export default Page1;
