import { useEffect, useState, lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from "axios";

import { City } from "./types/city.types";

import Homepage from "./pages/homepage";
import Product from "./pages/product";
import Pricing from "./pages/pricing";
import Login from "./pages/login";
import PageNotFound from "./pages/page-not-found";
import Spinner from "./components/spinner";

const AppLayout = lazy(() => import("./pages/app-layout"));
const CityList = lazy(() => import("./components/city-list"));
const CountryList = lazy(() => import("./components/country-list"));

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
        <Route
          path="app"
          element={
            <Suspense fallback={<Spinner />}>
              <AppLayout />
            </Suspense>
          }
        >
          <Route
            index
            element={
              <Suspense fallback={<Spinner />}>
                <CityList isLoading={isLoading} cities={cities} />
              </Suspense>
            }
          />
          <Route
            path="cities"
            element={
              <Suspense fallback={<Spinner />}>
                <CityList isLoading={isLoading} cities={cities} />
              </Suspense>
            }
          />
          <Route
            path="countries"
            element={
              <Suspense fallback={<Spinner />}>
                <CountryList isLoading={isLoading} cities={cities} />
              </Suspense>
            }
          />
          <Route path="form" element={<p>Form</p>} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
