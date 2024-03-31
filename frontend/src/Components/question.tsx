import React from "react";

const question: React.FC = () => {
  return (
    <>
      <div className="container">
        <form>
          <div className="form-group">
            <label htmlFor="question">Question:</label>
            <p id="question">What is the capital of France?</p>
          </div>
        </form>
      </div>
    </>
  );
};

export default question;
