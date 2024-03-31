import React from "react";
import "./prevTest.css";

const PrevTest: React.FC = () => {
  return (
    <>
      <h1>Previous Test</h1>
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

export default PrevTest;
