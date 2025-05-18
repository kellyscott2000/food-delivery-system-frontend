/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import config from "../../config/config";
import "./MenuByCategory.css";
import { StoreContext } from "../../context/StoreContext";
import { assets } from "../../assets/assets";

const MenuByCategory = () => {
  const { category } = useParams();
  const [menuItems, setMenuItems] = useState([]);
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);

  const fetchMenuItems = async () => {
    try {
      const encodedCategory = encodeURIComponent(category);
      const response = await axios.get(
        `${config.url}/api/menu/get/${encodedCategory}`
      );
      setMenuItems(response.data.data);
    } catch (error) {
      console.error("Error fetching menu items:", error);
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, [category]);

  return (
    <div className="menu-by-category">
      <div className="menu-list">
        {menuItems.map((item) => (
          <div className="menu-item" key={item._id}>
            <div className="image-container">
              <img
                src={`${config.url}/images/${item.image}`}
                alt={item.name}
                className="food-item-image"
              />

              {item.status === "Available" ? ( // Check if the item is available
                !cartItems[item._id] ? (
                  <img
                    onClick={() => addToCart(item._id)}
                    src={assets.add_icon_white}
                    alt="Add to Cart"
                    className="add"
                  />
                ) : (
                  <div className="food-item-counter">
                    <img
                      onClick={() => removeFromCart(item._id)}
                      src={assets.remove_icon_red}
                      alt="Remove"
                    />
                    <p>{cartItems[item._id]}</p>
                    <img
                      onClick={() => addToCart(item._id)}
                      src={assets.add_icon_green}
                      alt="Add"
                    />
                  </div>
                )
              ) : (
                <p className="unavailable-label">Unavailable</p> // Show "Unavailable" if status is not available
              )}
            </div>
            <div className="info">
              <p>{item.name}</p>
              <img src={assets.rating_starts} alt="" />
            </div>
            <p className="description">{item.description}</p>
            <p className="price">₵{item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuByCategory;
