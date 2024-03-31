import React, { useState } from 'react';

const Inte: React.FC = () => {
  const [inputValue, setInputValue] = useState<number | ''>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim();
    setInputValue(value === '' ? '' : parseInt(value));
  };

  return (
    <div className="container">
      <form>
        <div className="form-group">
          <input
            type="number"
            className="form-control"
            id="integerInput"
            value={inputValue}
            onChange={handleChange}
            required
          />
        </div>
      </form>
    </div>
  );
};

export default Inte;