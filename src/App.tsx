import { useEffect, useState, lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
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
const Form = lazy(() => import("./components/form"));
const CityInfo = lazy(() => import("./components/city"));

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
          <Route index element={<Navigate replace to="cities" />} />
          <Route
            path="cities"
            element={
              <Suspense fallback={<Spinner />}>
                <CityList isLoading={isLoading} cities={cities} />
              </Suspense>
            }
          />
          <Route
            path="cities/:id"
            element={
              <Suspense fallback={<Spinner />}>
                <CityInfo />
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
          <Route
            path="form"
            element={
              <Suspense fallback={<Spinner />}>
                <Form />
              </Suspense>
            }
          />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
