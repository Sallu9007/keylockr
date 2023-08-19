import React from "react";
import Cafe from "./Cafe.js";
import Relax from "./relax.js";

class Page3 extends React.Component {
  render() {
    return (
      <>
        <div className="d-flex bg-primary row mt-5">
          <Relax />
          <div className="col-lg-6 mt-5">
            <div className="container overflow-hidden">
              <h1 className=" text-light m-0">
                Hassle Free Passwords for Life
              </h1>
              <h4 className="m-0">
                <ul className="text-light ">
                  <li>
                    No need to remember passwords again with the help of the
                    password vault
                  </li>
                  <li>
                    Store all of your passwords in a safe, encrypted manner,
                    worry free
                  </li>
                  <li>Access your passwords quickly and easily </li>
                </ul>
              </h4>
              <div className="ms-auto">
                <button className=" btn bg-light text-dark text-center mt-3 mb-3 fw-bold">
                  Register Today
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-light row ">
            <div className="col-lg-6 mt-5">
              <div className="container ms-auto overflow-hidden">

              <h1 className="m-0 text-center">
                Make new Passwords at the click of a Button
              </h1>
              <h4>
                <ul className=" text-wrap">
                  <li>
                    Create smart, effective and powerful passwords with our pass
                    generator
                  </li>
                  <li>
                    Customize requirements for your passwords with a few simple
                    clicks
                  </li>
                  <li>Save those passwords to the vault</li>
                </ul>
              </h4>
              </div>
            </div>
            <Cafe />
          </div>
      </>
    );
  }
}
export default Page3;
