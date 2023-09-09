import React from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';

import NavMenu from './NavMenu';
import Dashboard from '../../user/containers/Dashboard';
import Payments from '../../user/containers/Payments';
import authUser from "../../helpers/authUser";

export default function UserLayout() {
    let isAuthenticated = authUser.IsAuth();
    return (
        isAuthenticated ? <div>
            <NavMenu />
            <div className="container">
                <Routes>
                    <Route index element={<Dashboard />}></Route>
                    <Route path="payments" element={<Payments />}>
                    </Route>
                </Routes>
            </div>
        </div> : <Navigate to="/login" />
    )
}
