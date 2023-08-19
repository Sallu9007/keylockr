import React from "react";

import Page1 from "./Page1.js";
import Page2 from "./Page2.js";
import Page3 from "./Page3.js";
class Display extends React.Component {
  render() {
    return (
      <>
        <Page1 />
        <Page2 />
        <Page3 />
      </>
    );
  }
}
export default Display;
