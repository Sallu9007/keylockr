import React from "react";
import Authentication from "./Authentication.js";
import Card1 from "./Card1.js";
import Card2 from "./Card2.js";
import Card3 from "./Card3.js";


class Page2 extends React.Component{
    render(){
        return(
        <>
            <div className="d-flex row bg-light mt-5">
          <Card1 />
          <Card2 />
          <Card3 />
        </div>

        <div className="container overflow-hidden">
            <div className=" row">
              <div className="col-lg-8 mt-5">
                <h1 className="ms-auto">
                  <span className="text-primary">Protect</span> your accounts with <br />
                  better password management
                </h1>
                <h4>
                  <ul>
                    <li>Avoid Reusing passwords for improved safety</li>
                    <li>Create longer passwords with randomized text</li>
                    <li>Reduce the stress of forgetting old passwords</li>
                    <li>Find digital security and confidence</li>
                  </ul>
                </h4>
              </div>

              <Authentication />
            </div>
        </div>
        </>
        );
    }
}
export default Page2;