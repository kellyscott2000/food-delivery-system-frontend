/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { getDistance } from "geolib";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import config from "../../config/config";
import {useNavigate} from "react-router-dom"

const PlaceOrder = () => {
  const { getTotalCartAmount, discountAmount, token, food_list, cartItems } =
    useContext(StoreContext);
  const [address, setAddress] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedLatitude, setSelectedLatitude] = useState(null);
  const [selectedLongitude, setSelectedLongitude] = useState(null);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [orderType, setOrderType] = useState("delivery");

  const [data, setData] = useState({
    name: "",
    email: "",
    // address: "",
    contact: "",
    // order_method: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  // useEffect(() => {
  //   console.log(data);
  // }, [data]);

  // useEffect(() => {
  //   console.log("Order Type:", orderType);
  //   console.log("Address:", address);
  // }, [orderType, address]);

  // Central Accra coordinates as the origin point
  const origin = { latitude: 5.6037, longitude: -0.187 };

  const handleAddressChange = async (e) => {
    const query = e.target.value;
    setAddress(query);

    if (query.length > 3) {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${query}&format=json&addressdetails=1&countrycodes=GH&viewbox=-0.3,5.9,-0.1,5.5&bounded=1`
      );
      const data = await response.json();
      setSuggestions(data);
    }
  };

  const handleSelectSuggestion = (suggestion) => {
    setAddress(suggestion.display_name);
    setSelectedLatitude(suggestion.lat);
    setSelectedLongitude(suggestion.lon);
    setSuggestions([]);

    // calculating delivery fee

    const destination = {
      latitude: parseFloat(suggestion.lat),
      longitude: parseFloat(suggestion.lon),
    };

    const fee = calculateDeliveryFee(origin, destination);
    setDeliveryFee(fee);
  };

  const calculateDeliveryFee = (origin, destination) => {
    const distance = getDistance(origin, destination); // Distance in meters
    const deliveryFee = (distance / 1000) * 10; // ₵10 per km
    return deliveryFee;
  };

  // const finalTotal = Math.max(0, getTotalCartAmount() - discountAmount + deliveryFee).toFixed(2);
  const finalTotal = Math.max(
    0,
    getTotalCartAmount() - discountAmount + deliveryFee
  ).toFixed(2);

  // useEffect(() => {
  //   // Debugging the discountAmount
  //   console.log("Discount Amount in PlaceOrder:", discountAmount);
  // }, [discountAmount]);

  const placeOrder = async (event) => {
    // console.log("Form submitted");
    event.preventDefault();
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });
    let orderData = {
      address: address,
      items: orderItems,
      amount: getTotalCartAmount() - discountAmount + deliveryFee,
      orderMethod: orderType,
      contact: data.contact,
      name: data.name,
      email: data.email,
      status: "pending"
    };
   


    try {
      let response = await axios.post(
        `${config.url}/api/order/place`,
        orderData,
        { headers: { token } }
      );
      // console.log("API Response:", response.data);
  
      if (response.data.success) {
        const { authorization_url } = response.data;
        // console.log("Payment URL:", authorization_url);
        window.location.replace(authorization_url);
      } else {
        alert("Error in placing order");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Error in placing order");
    }
  };


  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/cart')
      alert("You have to login to make an Order")
    }
    else if(getTotalCartAmount()===0) {
      navigate("/cart")
      alert("Kindly add item(s) to your cart to proceed")
    }
  }, [token])



  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Details</p>
        {/* selecting order type */}
        <div className="order-type">
          <p>Order Method</p>
          <label>
            <input
              type="radio"
              value="delivery"
              checked={orderType === "delivery"}
              onChange={() => setOrderType("delivery")}
            />
            Delivery
          </label>

          <label>
            <input
              type="radio"
              value="pickup"
              checked={orderType === "pickup"}
              onChange={() => setOrderType("pickup")}
            />
            Pickup
          </label>
        </div>
        <div className="multi-fields">
          <input
            name="name"
            onChange={onChangeHandler}
            type="text"
            placeholder="Enter Full Name"
            value={data.name}
            required
          />
        </div>
        <div className="multi-fields">
          {/* <input
            name="email"
            onChange={onChangeHandler}
            type="text"
            placeholder="Enter Email address"
            value={data.email}
            required
          /> */}
          <input
            name="email"
            onChange={onChangeHandler}
            type="text"
            placeholder="Enter Email address"
            value={data.email}
            required
          />

          <input
            name="contact"
            onChange={onChangeHandler}
            type="text"
            placeholder="Enter Phone Number"
            value={data.contact}
            required
          />
        </div>
        {orderType === "delivery" && (
          <>
            <input
              name="address"
              type="text"
              placeholder="Enter House Address"
              value={address}
              onChange={handleAddressChange}
              required
            />
            <ul className="suggestions">
              {suggestions.map((suggestion) => (
                <li
                  className="list"
                  key={suggestion.place_id}
                  onClick={() => handleSelectSuggestion(suggestion)}
                >
                  {suggestion.display_name}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
      <div className="place-order-right">
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
            {orderType === "delivery" && (
              <>
                <div className="cart-total-details">
                  <p>Delivery Fee</p>
                  <p>₵{deliveryFee.toFixed(2)}</p>
                </div>
                <hr />
              </>
            )}

            <div className="cart-total-details">
              <b>Total </b>
              {/* <b> */}
              {/* ₵{(getTotalCartAmount() + deliveryFee).toFixed(2)} */}
              {/* ₵{getTotalCartAmount() === 0 ? "0.00" : getTotalCartAmount() + deliveryFee.toFixed(2)} */}
              {/* </b> */}
              <b>₵{finalTotal}</b>
            </div>
          </div>
          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
