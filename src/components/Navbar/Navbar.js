import React from "react";
// import nav from './Navbar.css';
import style from "../../bootstrap/css/bootstrap.min.css";
import OnboardingNavigators from "./OnboardingNavigators.js";


class NavigationBar extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg bg-body-tertiary bg-primary">
        <div className="container-fluid overflow-hidden">
          <a className="navbar-brand fw-bold fs-2 text-light" href="#">
            KeyLockr
          </a>
          <OnboardingNavigators />
        </div>
      </nav>
    );
  }
}

export default NavigationBar;
