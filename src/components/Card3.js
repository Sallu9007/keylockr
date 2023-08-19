import React from "react";
import Security from "./Img/Security.png";

class Card3 extends React.Component {
  render() {
    return (
      <div className="col-lg-4 text-center">
        <div className="container">

          <img src={Security} alt="Security" className="w-50 h-auto mt-4"></img>
          <h1 className="text-primary text-center mt-3">Encrypted</h1>
          <h3 className="text-dark text-center">at all times</h3>
        </div>
        </div>
    );
  }
}
export default Card3;
