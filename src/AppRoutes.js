import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// pages
import Navbar from "./public/modules/navbar";
import Homepage from "./public/pages/Homepage";

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
        {pb.authStore.isValid ?
            <Route path="user">
                <Route 
                    path="dashboard"
                    element={
                        <>TESTING</>
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
