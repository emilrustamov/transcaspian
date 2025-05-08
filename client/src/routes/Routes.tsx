import React, { lazy } from 'react';
import { Route, Routes } from "react-router-dom";
import Loading from '../components/layout/Loading';
import Layout from '../components/layout/Layout';
const IndexPage = lazy(() => import('../pages/index'));
const OneMap = lazy(() => import('../pages/OneMap'));
const OneTrip = lazy(() => import('../pages/OneTrip'));

const api = import.meta.env.VITE_API

const RoutesAdmin: React.FC = () => {
  return (
    <Routes>
      <Route path={api + "/"} element={<Layout />}>
        <Route index element={<IndexPage />} />
        <Route path={api+"/map/Yangykala_Canyons/:id"} element={<OneMap />} />
        <Route path={api+"/map/Darvaza_Gas_Crater/:id"} element={<OneMap />} />
        <Route path={api+"/map/Old_Nisa/:id"} element={<OneMap />} />
        <Route path={api+"/map/Ashgabat/:id"} element={<OneMap />} />
        <Route path={api+"/map/Gonur_Depe/:id"} element={<OneMap />} />
        <Route path={api+"/map/Ancient_Merv/:id"} element={<OneMap />} />
        <Route path={api+"/map/Dinosaur_Plateau/:id"} element={<OneMap />} />
        <Route path={api+"/map/Koneurgench/:id"} element={<OneMap />} />
        <Route path={api+"/trip/:id"} element={<OneTrip />} />
      </Route>
    </Routes>
  );
};

export default RoutesAdmin;
