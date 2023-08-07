import * as React from "react";
import { Routes, Route } from "react-router-dom";
import BlankLayout from "../layouts/BlankLayout";
import MainLayout from "../layouts/MainLayout";
import MovieDetailPage from "../pages/MovieDetailPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import NotFoundPage from "../pages/NotFoundPage";
import AuthRequire from "./AuthRequire";
import FavoritePage from "../pages/FavoritePage";
import CategoryPage from "../pages/CategoryPage";
import SearchPage from "../pages/SearchPage";

function Router() {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route index element={<HomePage />} />
                <Route path="/movie/:movieId" element={<MovieDetailPage />} />
                <Route path="/category" element={<CategoryPage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route
                    path="/favorite"
                    element={
                        <AuthRequire>
                            <FavoritePage />
                        </AuthRequire>
                    }
                />
            </Route>

            <Route element={<BlankLayout />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Route>
        </Routes>
    );
}

export default Router;