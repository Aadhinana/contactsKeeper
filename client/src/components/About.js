import { PromiseProvider } from "mongoose";
import React from "react";

const About = (props) => {
  return (
    <React.Fragment>
      <h3 onClick={() => props.history.push("/")} style={{ cursor: "pointer" }}>
        Go back
      </h3>
      <hr />
      <h3>An application to manage your contacts</h3>
    </React.Fragment>
  );
};

export default About;
