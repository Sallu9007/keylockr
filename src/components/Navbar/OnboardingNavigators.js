import React from "react";

class OnboardingNavigators extends React.Component {
  render() {
    return (
      <>
        <button
          className="navbar-toggler overflow-hidden"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav ms-auto">
            <a className="nav-link active" aria-current="page" href="#">
              <button className="btn btn-secondary fw-bold  me-3">
                Sign In
              </button>
            </a>
            <a className="nav-link active" aria-current="page" href="#">
              <button className="btn btn-light fw-bold me-3">Sign Up</button>
            </a>
          </div>
        </div>
      </>
    );
  }
}
export default OnboardingNavigators;
