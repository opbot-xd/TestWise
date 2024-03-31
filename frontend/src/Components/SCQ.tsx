import React from "react";

const SCQ: React.FC = () => {
  return (
    <>
      <div className="container">
        <form>
          <div className="form-group">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
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

export default SCQ;
