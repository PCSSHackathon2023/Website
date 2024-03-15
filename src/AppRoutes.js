import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// pages
import Navbar from "./public/modules/navbar";
import Homepage from "./public/pages/Homepage";
import FAQ from "./public/pages/FAQ";
import Dashboard from './auth/pages/dashboard'
import TermsOfService from './auth/pages/terms'
import { checkAuth, pb } from './auth' 
import DashboardNavbar from "./auth/modules/navbar";

function PrivateRoute({ children }) {
    checkAuth()
    return children;
}

const AppRoutes = () => (
    <Routes>
        <Route
            path="/"
            element={
                <>
                    <Navbar />
                    <Homepage />
                </>
            }
        />
        <Route
            path="faq"
            element={
                <>
                    <Navbar />
                    <FAQ />
                </>
            }
        />
        {pb.authStore.isValid ?
            <Route path="user">
                <Route 
                    path="dashboard"
                    element={
                        <PrivateRoute>
                            <DashboardNavbar />
                            <TermsOfService />
                            <Dashboard />
                        </PrivateRoute>
                    }
                />
                <Route path="*" element={<Navigate to="/" replace={true} />} />
            </Route>
            :
            <></>
        }
        <Route path="*" element={<Navigate to="/" replace={true} />} />
    </Routes>
);

export default AppRoutes;
