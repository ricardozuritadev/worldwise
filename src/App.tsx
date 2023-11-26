import { BrowserRouter, Route, Routes } from "react-router-dom";

import Product from "./pages/product";
import Homepage from "./pages/homepage";
import Pricing from "./pages/pricing";
import AppLayout from "./pages/app-layout";
import NotFound from "./pages/not-found";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="app" element={<AppLayout />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
