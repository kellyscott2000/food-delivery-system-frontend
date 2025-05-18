/* eslint-disable react/prop-types */

import { useContext } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);

  // Filter items based on category
  const filteredItems = food_list.filter(
    (item) => category === "All" || category === item.category
  );

  // Limit the number of items to 8
  const displayedItems = filteredItems.slice(0, 8);

  return (
    <div className="food-display" id="food-display">
      <h2>
        Every dish is prepared with the freshest ingredients to bring you a
        delightful dining experience.
      </h2>
      <div className="food-display-list">
        {displayedItems.map((item, index) => (
          <FoodItem
            key={index}
            id={item._id}
            name={item.name}
            description={item.description}
            price={item.price}
            image={item.image}
          />
        ))}
      </div>
    </div>
  );
};

export default FoodDisplay;
