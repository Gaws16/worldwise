import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import Product from "./Pages/Product";
import Pircing from "./Pages/Pircing";
import PageNotFound from "./Pages/PageNotFound";
import Login from "./Pages/Login";
import "./index.css";
import AppLayout from "./Pages/AppLayout";
const EmptyComponent = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pircing />} />
        <Route path="/login" element={<Login />} />
        <Route path="app" element={<AppLayout />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default EmptyComponent;
