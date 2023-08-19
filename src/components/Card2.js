import React from "react";
import Passwords from "./Img/Passwords.png";

class Card2 extends React.Component {
  render() {
    return (
      <div className="col-lg-4 text-center">
        <div className="container">

          <img src={Passwords} alt="Passwords" className="w-50 h-auto mt-4"></img>
          <h1 className="text-primary text-center align-bottom mt-3">500+ Password</h1>
          <h3 className="text-dark text-center">Stored safely</h3>
        </div>
        </div>
    );
  }
}
export default Card2;
