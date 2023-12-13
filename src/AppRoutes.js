import React from "react";
import { Routes, Route } from "react-router-dom";

// pages
import Navbar from "./app/public/modules/navbar";
import Homepage from "./app/public/pages/Homepage";
import Signin from "./app/public/pages/Signin";
import About from "./app/public/pages/About";
import UnknownPage from "./app/public/pages/UnknownPage";

const AppRoutes = () => (
    <Routes>
        <Route path="*" element={<UnknownPage />} />
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
            path="about"
            element={
                <>
                    <Navbar />
                    <About />
                </>
            }
        />
        <Route
            path="signin"
            element={
                <>
                    <Navbar />
                    <Signin />
                </>
            }
        />
    </Routes>
);

export default AppRoutes;
