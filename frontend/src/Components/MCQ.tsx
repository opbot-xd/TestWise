import React from "react";

const MCQ: React.FC = () => {
  return (
    <>
      <div className="container">
        <form>
          <div className="form-group">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="option"
                id="option1"
                value="option1"
              />
              <label className="form-check-label" htmlFor="option1">
                Paris
              </label>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default MCQ;
