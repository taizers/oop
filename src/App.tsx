import React, { useEffect, FC } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
// import { Toaster } from 'react-hot-toast';

import Login from './components/Login';
import SignUp from './containers/SignUp';
import Employees from './containers/Employees';
import Employee from './components/Employee';
import Companies from './containers/Companies';
import Company from './components/Company';
import { getToken } from './utils/index';
import LayOut from './components/Layout';
import RequireAuth from './components/RequireAuth';
import { authApiSlice } from './store/reducers/AuthApiSlice';
import PublicRoute from './components/PublicRoute';
import Profile from './components/Profile';
import { setUserData, setUserToken } from './store/reducers/AuthSlice';
import { useAppDispatch, useShowErrorToast } from './hooks';
import NotFound from './components/NotFound';
import Users from './containers/Users';

const App: FC = () => {
  const dispatch = useAppDispatch();
  const { data, error, isLoading } = authApiSlice.useProfileQuery('');

  useShowErrorToast(error);

  useEffect(() => {
    if (data?.id) {
      dispatch(setUserData(data));
    }
  }, [data]);

  useEffect(() => {
    const localToken = getToken();

    if (localToken) {
      dispatch(setUserToken(localToken));
    }
  }, []);

  return (
    <Routes>
      <Route path={'/'} element={<LayOut />}>
        {/* public routes */}

        <Route element={<PublicRoute />}>
          <Route path={'login'} element={<Login />} />
          <Route path={'signup'} element={<SignUp />} />
        </Route>

        {/* protected routes */}
        <Route element={<RequireAuth />}>
          <Route path={'profile'} element={<Profile />} />
          <Route path={'users'} element={<Users />} />
        </Route>

        <Route path={'companies'} element={<Companies />} />
        <Route path={'companies/:id'} element={<Company />} />
        <Route index path={'employees'} element={<Employees />} />
        <Route path={'employees/:id'} element={<Employee />} />

        {/* Not Found route */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
