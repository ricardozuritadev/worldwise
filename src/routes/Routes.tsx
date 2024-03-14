import { lazy, Suspense } from 'react';
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes as RoutesComponent
} from 'react-router-dom';

import { ROUTES } from 'constants/components/routes.constants';

import Homepage from 'pages/homepage';
import Product from 'pages/product';
import Pricing from 'pages/pricing';
import Login from 'pages/login';
import PageNotFound from 'pages/page-not-found';
import Spinner from 'components/spinner';

const AppLayout = lazy(() => import('pages/app-layout'));
const CityList = lazy(() => import('components/city-list'));
const CountryList = lazy(() => import('components/country-list'));
const Form = lazy(() => import('components/form'));
const CityInfo = lazy(() => import('components/city'));

export default function Routes() {
  return (
    <BrowserRouter>
      <RoutesComponent>
        <Route index element={<Homepage />} />
        <Route path={ROUTES.PRODUCT} element={<Product />} />
        <Route path={ROUTES.PRICING} element={<Pricing />} />
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route
          path={ROUTES.APP}
          element={
            <Suspense fallback={<Spinner />}>
              <AppLayout />
            </Suspense>
          }
        >
          <Route index element={<Navigate replace to={ROUTES.CITIES} />} />
          <Route
            path={ROUTES.CITIES}
            element={
              <Suspense fallback={<Spinner />}>
                <CityList />
              </Suspense>
            }
          />
          <Route
            path={`${ROUTES.CITIES}/:${ROUTES.ID}`}
            element={
              <Suspense fallback={<Spinner />}>
                <CityInfo />
              </Suspense>
            }
          />
          <Route
            path={ROUTES.COUNTRIES}
            element={
              <Suspense fallback={<Spinner />}>
                <CountryList />
              </Suspense>
            }
          />
          <Route
            path={ROUTES.FORM}
            element={
              <Suspense fallback={<Spinner />}>
                <Form />
              </Suspense>
            }
          />
        </Route>
        <Route path={ROUTES.NO_ROUTE} element={<PageNotFound />} />
      </RoutesComponent>
    </BrowserRouter>
  );
}
