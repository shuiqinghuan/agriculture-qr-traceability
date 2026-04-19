import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import AdminPage from "./pages/AdminPage";
import { ConvexProvider } from "convex/react";
import convex from "./convex";

export default function App() {
  return (
    <ConvexProvider client={convex}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:productCode" element={<ProductPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </Router>
    </ConvexProvider>
  );
}