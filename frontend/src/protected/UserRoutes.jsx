import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import ErrorPage from '../components/ErrorPage';

const UserRoutes = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();

    return user != null ? <Outlet /> : <ErrorPage />;

}

export default UserRoutes