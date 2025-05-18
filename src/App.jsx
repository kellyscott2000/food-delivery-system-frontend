import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./components/Footer/Footer";
import { useState } from "react";
import LoginPopUp from "./components/LoginPopUp/LoginPopUp";
import Category from "./pages/Category/Category";
import CategoryItems from "./pages/CategoryItems/CategoryItems";
import Verify from "./pages/Verify/Verify";
import MyOrders from "./pages/MyOrders/MyOrders";
import MenuByCategory from "./pages/MenuByCategory/MenuByCategory";


const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {showLogin ? <LoginPopUp setShowLogin={setShowLogin} /> : <></>}
      <div className="app">
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/category" element={<Category />} />
          <Route path="/category/:category" element={<CategoryItems />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/myorders" element={<MyOrders />} />
          <Route path="/menu/:category" element={<MenuByCategory />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
