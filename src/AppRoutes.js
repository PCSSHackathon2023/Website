import React from "react";
import { Routes, Route } from "react-router-dom";

// pages
import Navbar from "./public/modules/navbar";
import Homepage from "./public/pages/Homepage";
import About from "./public/pages/About";
import UnknownPage from "./public/pages/UnknownPage";

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
    </Routes>
);

export default AppRoutes;
