/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import config from "../config/config";

export const StoreContext = createContext(null);

const StoreContextPovider = (props) => {
  const [cartItems, setCartItems] = useState({});
  // const [couponCode, setCouponCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);
  const [category_list, setCategoryList] = useState([]);
  const [couponDetails, setCouponDetails] = useState(null);
  // const [error, setError] = useState();

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      await axios.post(
        `${config.url}/api/cart/add`,
        { itemId },
        { headers: { token } }
      );
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      await axios.post(
        `${config.url}/api/cart/remove`,
        { itemId },
        { headers: { token } }
      );
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const fetchFoodList = async () => {
    const response = await axios.get(`${config.url}/api/menu/getFoods`);
    setFoodList(response.data.data);
  };

  const fetchCategoryList = async () => {
    try {
      const response = await axios.get(`${config.url}/api/category/get`);
      setCategoryList(response.data.data);
    } catch (error) {
      console.error("Error fetching category list:", error);
    }
  };
  const loadCartData = async (token) => {
    const response = await axios.post(
      `${config.url}/api/cart/get`,
      {},
      { headers: { token } }
    );
    setCartItems(response.data.cartData);
  };


  const fetchCouponDetails = async (couponCode) => {
    try {
      const response = await axios.get(
        `${config.url}/api/coupon/code/${couponCode}`
      );
      if (response.data.success) {
        const coupon = response.data.data;
        const currentDate = new Date();
        const couponEndDate = new Date(coupon.endDate);

        if (couponEndDate < currentDate) {
          setCouponDetails(null);
          setDiscountAmount(0);
          window.alert("This coupon has expired.");
        } else {
          setCouponDetails(coupon);
          setDiscountAmount(calculateDiscountAmount(coupon));
        }
      } else {
        setCouponDetails(null);
        setDiscountAmount(0);
        window.alert("Invalid coupon code.");
      }
    } catch (error) {
      console.error("Error fetching coupon details:", error);
      setCouponDetails(null);
      setDiscountAmount(0);
      window.alert("An error occurred while fetching coupon details.");
    }
  };

  const calculateDiscountAmount = (coupon) => {
    const total = getTotalCartAmount();
    let discount = 0;

    if (coupon.discountType === "percentage") {
      discount = (total * coupon.discountValue) / 100;
    } else if (coupon.discountType === "fixed") {
      discount = coupon.discountValue;
    }

    return Math.min(discount, total); // Ensure discount does not exceed total amount
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      await fetchCategoryList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"));
      }
    }
    loadData();
  }, []);

  const clearCart = () => {
    setCartItems({});
  };

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    couponDetails,
    // setCouponDetails,
    fetchCouponDetails,
    discountAmount,
    setDiscountAmount,
    token,
    setToken,
    clearCart,
    fetchCategoryList,
    category_list,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextPovider;
