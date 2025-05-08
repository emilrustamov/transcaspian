import React, { useEffect, lazy, Suspense } from 'react';
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';
import LoginPage from '../pages/Login/Login';
import Sidebar from '../components/layout/Sidebar';
import Loading from '../components/layout/Loading';
const TripTip = lazy(() => import('../pages/TripTip/TripTip'));
const AddTripTip = lazy(() => import('../pages/TripTip/AddTripTip'));
const EditTripTip = lazy(() => import('../pages/TripTip/EditTripTip'));
const Gallery = lazy(() => import('../pages/Gallery/Gallery'));
const DashboardPage = lazy(() => import('../pages/Dashboard/Dashboard'));
const Location1 = lazy(() => import('../pages/Map/Location1'));
const Location2 = lazy(() => import('../pages/Map/Location2'));
const Location3 = lazy(() => import('../pages/Map/Location3'));
const Location4 = lazy(() => import('../pages/Map/Location4'));
const Location5 = lazy(() => import('../pages/Map/Location5'));
const Location6 = lazy(() => import('../pages/Map/Location6'));
const Location7 = lazy(() => import('../pages/Map/Location7'));
const Location8 = lazy(() => import('../pages/Map/Location8'));
const AboutUs = lazy(() => import('../pages/AboutUs/AboutUs'));
const Useful = lazy(() => import('../pages/Useful/Useful'));
const AddUseful = lazy(() => import('../pages/Useful/AddUseful'));
const EditUseful = lazy(() => import('../pages/Useful/EditUseful'));
const Mails = lazy(() => import('../pages/Mails/Mails'));

const api = import.meta.env.VITE_API

const RoutesAdmin: React.FC = () => {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') navigate(api)
    if (location.pathname === '/login') navigate(api + '/login')
    if (!cookies.get('trans-user-token')) {
      navigate(api + '/login')
    }
  }, [navigate])

  if (!cookies.get('trans-user-token')) {
    return (
      <Routes>
        <Route path={api + '/login'} element={
          <Suspense fallback={<Loading />}>
            <LoginPage />
          </Suspense>
        } />
      </Routes>
    )
  }

  return (
    <Routes>
      <Route path={api + '/login'} element={<LoginPage />} />

      <Route path={api + "/"} element={<Sidebar />}>
        <Route index element={<DashboardPage />} />
        <Route path={api + '/Dashboard'} element={<DashboardPage />} />
        <Route path={api + '/Map/Yangykala_Canyons'} element={<Location1 />} />
        <Route path={api + '/Map/Darvaza_Gas_Crater'} element={<Location2 />} />
        <Route path={api + '/Map/Old_Nisa'} element={<Location3 />} />
        <Route path={api + '/Map/Ashgabat'} element={<Location4 />} />
        <Route path={api + '/Map/Gonur_Depe'} element={<Location5 />} />
        <Route path={api + '/Map/Ancient_Merv'} element={<Location6 />} />
        <Route path={api + '/Map/Dinosaur_Plateau'} element={<Location7 />} />
        <Route path={api + '/Map/Koneurgench'} element={<Location8 />} />
        <Route path={api + '/AboutUs'} element={<AboutUs />} />
        <Route path={api + '/Gallery'} element={<Gallery />} />
        <Route path={api + '/Trip-tips'} element={<TripTip />} />
        <Route path={api + '/Trip-tips/add'} element={<AddTripTip />} />
        <Route path={api + '/Trip-tips/edit/:id'} element={<EditTripTip />} />
        <Route path={api + '/Useful'} element={<Useful />} />
        <Route path={api + '/Useful/add'} element={<AddUseful />} />
        <Route path={api + '/Useful/edit/:id'} element={<EditUseful />} />
        <Route path={api + '/Mails'} element={<Mails />} />
      </Route>
    </Routes>
  );
};

export default RoutesAdmin;
