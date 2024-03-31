import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HomeList.css";

const HomeList: React.FC = () => {
  const navigate = useNavigate();
  let items = ["Previous Tests", "Current Tests", "Future Tests"];

  const [selectedIndex, setSelectedIndex] = useState(-1);

  const handleItemClick = (index: number) => {
    switch (index) {
      case 0:
        navigate("/previous-tests");
        break;
      case 1:
        navigate("/current-tests");
        break;
      case 2:
        navigate("/future-tests");
        break;
      case 3:
        navigate("/");
        break;
      default:
        index = -1;
    }
  };

  return (
    <>
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
            onClick={() => handleItemClick(index)}
          >
            {item}
          </li>
        ))}
      </ul>
      <div className="logout" onClick={() => handleItemClick(3)}>
        Logout
      </div>
    </>
  );
};

export default HomeList;
