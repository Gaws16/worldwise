import { BrowserRouter, Routes, Route } from "react-router-dom";
import Product from "./pages/Product";
import HomePage from "./pages/HomePage";
import Pricing from "./pages/Pricing";
import NotFoundPage from "./pages/NotFoundPage";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="product" element={<Product />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="app" element={<AppLayout />} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
