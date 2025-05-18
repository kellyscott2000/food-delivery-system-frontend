import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import StoreContextPovider from "./context/StoreContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StoreContextPovider>
      <App />
    </StoreContextPovider>
  </BrowserRouter>
);
