import { useContext, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import "./Cart.css";
import config from "../../config/config";

const Cart = () => {
  const {
    cartItems,
    food_list,
    removeFromCart,
    getTotalCartAmount,
    fetchCouponDetails,
    discountAmount,
  } = useContext(StoreContext);

  const [CouponCodeInput, setCouponCodeInput] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();


  const subtotal = getTotalCartAmount();



  const handleCouponSubmit = async () => {
    if (CouponCodeInput) {
      await fetchCouponDetails(CouponCodeInput);
      setError(""); // Clear any previous error
    } else {
      setError("Please enter a coupon code.");
    }
  };
  

  // const finalTotal = subtotal - (validCoupons[CouponCodeInput] || 0);


  const finalTotal = Math.max(
    0,
    subtotal - discountAmount
  ).toFixed(2);


  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={index}>
                <div className="cart-items-title cart-items-item">
                  <img src={`${config.url}/images/${item.image}`} alt="" />
                  <p>{item.name}</p>
                  {/* <p>₵{item.price}</p> */}
                  <p>₵{parseFloat(item.price).toFixed(2)}</p>

                  <p>{cartItems[item._id]}</p>
                  <p>₵{parseFloat(item.price * cartItems[item._id]).toFixed(2)}</p>
                  <p onClick={() => removeFromCart(item._id)} className="cross">
                    x
                  </p>
                </div>
                <hr />
              </div>
            );
          }
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₵{getTotalCartAmount().toFixed(2)}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Discount</p>
              <p>₵{discountAmount.toFixed(2)}</p>
            </div>
            <hr />

            <div className="cart-total-details">
              <b>Total </b>

              <b>₵{finalTotal}</b>
            </div>
          </div>
          <button onClick={() => navigate("/order")}>
            PROCEED TO CHECKOUT
          </button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>Got a discount? Enter your code here!</p>
            <div className="cart-promocode-input">
              <input
                value={CouponCodeInput}
                onChange={(e) => setCouponCodeInput(e.target.value)}
                type="text"
                placeholder="Enter Your Promo Code"
              />
              <button onClick={handleCouponSubmit}>Submit</button>
            </div>
            {error && <p className="error">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
