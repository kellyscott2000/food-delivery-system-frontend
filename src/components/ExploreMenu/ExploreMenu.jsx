



import "./ExploreMenu.css";

import { useNavigate } from 'react-router-dom';
import { StoreContext } from "../../context/StoreContext";
import { useContext } from "react";
import config from "../../config/config";

// eslint-disable-next-line react/prop-types
const ExploreMenu = ({ category, setCategory}) => {
  const {category_list} = useContext(StoreContext);


  // const displayedCategories = category_list.slice(0, 8);

  const navigate = useNavigate();
  
  const handleSeeAllClick = () => {
    navigate("/category");
  };

  // Limit the number of menu items to 8
  // const displayedMenuItems = menu_list.slice(0, 8);
  const displayedMenuItems = category_list.slice(0, 8);
  // console.log(category_list, "list")

  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Discover Our Dishes</h1>
      <p className="explore-menu-text">
        Our menu is packed with fresh, tasty options for every craving. Scroll
        through and find something that speaks to your appetite, your next meal
        is just a tap away!
      </p>
      <p className="all-menu" onClick={handleSeeAllClick}>See All</p>
      <div className="explore-menu-list">
        {displayedMenuItems.map((item, index) => (
          <div
            onClick={() => setCategory(prev => prev === item.name ? "All" : item.name)}
            className="explore-menu-list-item"
            key={index}
          >
            
            <img className={category === item.name ? "active" : ""} src={`${config.url}/images/${item.image}`} alt="" />
            <p>{item.name}</p>
          </div>
        ))}
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;
