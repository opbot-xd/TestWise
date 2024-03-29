import React, { useState } from "react";

// handle mouseclick at 46:47

function HomeList() {
  let items = ["Previous Tests", "Current Tests", "Future Tests"];

  const [selectedIndex, setSelectedIndex] = useState(-1);
  return (
    <div>
      <h1>Hello User!</h1>
      <ul className="list-group">
        {items.map((item, index) => (
          <li
            className={
              selectedIndex === index
                ? "list-group-item active"
                : "list-group-item"
            }
            key={item}
            onClick={() => setSelectedIndex(index)}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomeList;
