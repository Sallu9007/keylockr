import React from "react";
// import nav from './Navbar.css';
import style from "../../bootstrap/css/bootstrap.min.css";
import Header from "./Header";
import HomePage from "../Home Page/HomePage";
import OnboardingNavigators from "./OnboardingNavigators.js";
import { render } from "@testing-library/react";

const userloggedin=()=>{
  const loggedin = (localStorage.getItem("usersdatatoken") !==null)
  if(loggedin){
    return(<Header />)
  }
  else{
    return (<OnboardingNavigators/>) 
    }
}

class NavigationBar extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg bg-body-tertiary bg-primary">
        <div className="container-fluid overflow-hidden">
          <a className="navbar-brand fw-bold fs-2 text-light" href="#">
            KeyLockr
          </a>
          {/* <OnboardingNavigators/> */}
          {/* {console.log(HomePage)} */}
          {userloggedin()}
          {/* {HomePage? <Header /> : <OnboardingNavigators/>} */}
        </div>
      </nav>
    );
  }
}

export default NavigationBar;
