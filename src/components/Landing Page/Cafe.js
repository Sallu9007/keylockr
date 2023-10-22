import React from "react";
import Coffee from "../Img/Cafe.png";
class Cafe extends React.Component {
  render() {
    return (
      <>
        <div className="col-lg-6 mt-5 p-0 text-center">
          <img src={Coffee} className="w-50 h-auto" alt="img"></img>
        </div>
      </>
    );
  }
}
export default Cafe;
