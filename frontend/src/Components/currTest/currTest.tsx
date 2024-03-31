import React from "react";
import "./currTest.css";

const CurrTest: React.FC = () => {
  return (
    <>
      <h1>Current Test</h1>
      <div className="container text-center">
        <div className="row">
          <div className="col-3">Title</div>
          <div className="col-6">Description</div>
          <div className="col-3">Time</div>
        </div>
      </div>
    </>
  );
};

export default CurrTest;
