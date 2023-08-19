import React from "react";
import User from "./Img/User.png";

class Card1 extends React.Component {
  render() {
    return (
      <div className="col-lg-4 text-center">
        <div className="container">
            <img src={User} alt="user" className="w-50 h-auto mt-4 "></img>
            <h1 className="text-primary text-center mt-3">More than 150</h1>
            <h3 className="text-dark text-center">Secure Customers</h3>
        </div>
        </div>
    );
  }
}
export default Card1;
