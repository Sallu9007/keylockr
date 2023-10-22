import React from "react";
import Authenticate from "../Img/Authentication.png";
class Authentication extends React.Component {
  render() {
    return (
      <>
        <div className="col-lg-4 mt-5 ms-auto text-center">
          <img src={Authenticate} className="w-50 h-auto" alt="img"></img>
        </div>
      </>
    );
  }
}
export default Authentication;
