import React from "react";
import Display from "./Display";
import HomeImg from "./HomeImg";
import Navbar from "../Navbar/Navbar";

class Dashboard extends React.Component {
  render() {
    return (
      <>
        <Navbar />
        <Display />
      </>
    );
  }
}

export default Dashboard;
