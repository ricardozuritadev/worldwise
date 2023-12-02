import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from "axios";

import { City } from "./types/city.types";

import Homepage from "./pages/homepage";
import Product from "./pages/product";
import Pricing from "./pages/pricing";
import Login from "./pages/login";
import AppLayout from "./pages/app-layout";
import PageNotFound from "./pages/page-not-found";
import CityList from "./components/city-list";

const App = () => {
  const [cities, setCities] = useState<City[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getCities = async () => {
    const res = await axios.get("http://localhost:8000/cities");
    return res.data;
  };

  useEffect(() => {
    setIsLoading(true);
    getCities()
      .then((data) => setCities(data))
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="login" element={<Login />} />
        <Route path="app" element={<AppLayout />}>
          <Route
            index
            element={<CityList isLoading={isLoading} cities={cities} />}
          />
          <Route
            path="cities"
            element={<CityList isLoading={isLoading} cities={cities} />}
          />
          <Route path="countries" element={<p>Countries</p>} />
          <Route path="form" element={<p>Form</p>} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
