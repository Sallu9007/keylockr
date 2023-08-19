import React from "react";
import Relaxing from "./Img/Relax.png";
class Relax extends React.Component {
  render() {
    return (
      <>
      {/* <div className="text-center"> */}

        <div className="col-lg-6 mt-5 mb-3 text-center">
          <img src={Relaxing} className="w-75 h-auto" alt="img"></img>
        </div>
      {/* </div> */}
      </>
    );
  }
}
export default Relax;
