import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import ErrorPage from '../components/ErrorPage';

const AdminRoutes = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();
    return user != null && user.isAdmin ? <Outlet /> : <ErrorPage />;
}

export default AdminRoutes
