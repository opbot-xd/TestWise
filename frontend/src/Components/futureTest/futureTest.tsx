import React from "react";
import "./futureTest.css";

const FutureTest: React.FC = () => {
  const futureTests = ["Test 1", "Test 2", "Test 3", "Test 4"];

  return (
    <div className="container">
      <h2 className="heading">Future Tests:</h2>
      <ul className="list">
        <br></br>
        <br></br>
        {futureTests.map((test, index) => (
          <li key={index} className="item">
            {test}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FutureTest;
