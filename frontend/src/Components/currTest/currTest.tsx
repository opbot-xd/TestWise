import React from "react";
import "./currTest.css";

const CurrTest: React.FC = () => {
  const currTests = ["Test 1", "Test 2", "Test 3", "Test 4"];

  return (
    <div className="container">
      <h2 className="heading">Current Tests:</h2>
      <ul className="list">
        <br></br>
        <br></br>
        {currTests.map((test, index) => (
          <li key={index} className="item">
            {test}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CurrTest;
