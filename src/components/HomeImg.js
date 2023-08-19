import React from "react";
import HomeIm from "./Img/HomeImg.png";
class HomeImg extends React.Component {
  render() {
    return (
      <>
          <div className="col-lg-6 mt-5 text-center ">
            <img
              src={HomeIm}
              className="img-fluid position-relative"
              alt="img"
            ></img>
          </div>
      </>
    );
  }
}
export default HomeImg;
