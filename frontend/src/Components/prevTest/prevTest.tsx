import React from "react";
import "./prevTest.css";

const PrevTest: React.FC = () => {
  const prevTests = ["Test 1", "Test 2", "Test 3", "Test 4"];

  return (
    <div className="container">
      <h2 className="heading">Previous Tests:</h2>
      <ul className="list">
        <br></br>
        <br></br>
        {prevTests.map((test, index) => (
          <li key={index} className="item">
            {test}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PrevTest;
