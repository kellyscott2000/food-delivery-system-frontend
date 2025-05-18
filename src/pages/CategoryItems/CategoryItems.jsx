import { useParams } from 'react-router-dom';
import './CategoryItems.css';
import { assets, food_list } from '../../assets/assets';
import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';

const CategoryItems = () => {
  const { category } = useParams();
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);


  // Filter items based on the category from the URL
  const filteredItems = food_list.filter(item => item.category === category);

  return (
    <div className="category-items">
      <h1>{category} Items</h1>
      <div className="item-list">
        {filteredItems.map((item, index) => (
          // 
          

          <div className="food-item" key={index}>
      <div className="food-item-img-container">
        <img className="food-item-image" src={item.image} alt="" />
        {!cartItems[item._id] ? (
          <img
            className="add"
            onClick={() => addToCart(item._id)}
            src={assets.add_icon_white}
            alt=""
          />
        ) : (
          <div className="food-item-counter">
            <img
              onClick={() => removeFromCart(item._id)}
              src={assets.remove_icon_red}
              alt=""
            />
            <p>{cartItems[item._id]}</p>
            <img
              onClick={() => addToCart(item._id)}
              src={assets.add_icon_green}
              alt=""
            />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{item.name}</p>
          <img src={assets.rating_starts} alt="" />
        </div>
        <p className="food-item-description">{item.description}</p>
        <p className="food-item-price">₵{item.price}</p>
      </div>
    </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryItems;
