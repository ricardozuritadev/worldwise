import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/homepage";
import Product from "./pages/product";
import Pricing from "./pages/pricing";
import Login from "./pages/login";
import AppLayout from "./pages/app-layout";
import PageNotFound from "./pages/page-not-found";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="login" element={<Login />} />
        <Route path="app" element={<AppLayout />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
