import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// pages
import Navbar from "./public/modules/navbar";
import Homepage from "./public/pages/Homepage";
import FAQ from "./public/pages/FAQ";
import Dashboard from './auth/pages/dashboard'
import { pb } from './auth' 

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
                        <Dashboard />
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
