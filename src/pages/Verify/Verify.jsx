/* eslint-disable react-hooks/exhaustive-deps */

import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import config from "../../config/config";
import "./Verify.css";
import { useEffect } from "react";

const Verify = () => {
  const [searchParams] = useSearchParams();
  const reference = searchParams.get("reference");
  const navigate = useNavigate();

  const verifyPayment = async () => {
    if (!reference) {
      console.error("No reference found in URL");
      navigate("/"); // Redirect to home or show an error
      return;
    }

    try {
      const response = await axios.post(`${config.url}/api/order/verify`, {
        reference,
      });

      if (response.data.success) {
        navigate("/myorders");
      } else {
        console.error("Payment verification failed:", response.data.message);
        navigate("/"); // Redirect to home or show an error
      }
    } catch (error) {
      console.error("Error verifying payment:", error);
      navigate("/"); // Redirect to home or show an error
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []); // Ensure this runs only once on mount

  return (
    <div className="verify">
      <div className="spinner"></div>
    </div>
  );
};

export default Verify;
