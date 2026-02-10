import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts';
import AdminLayout from './layouts/AdminLayout';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ProductsPage from './pages/ProductsPage';
import ArticlesPage from './pages/ArticlesPage';
import ReviewsPage from './pages/ReviewsPage';
import UsersPage from './pages/UsersPage';
import OrdersPage from './pages/OrdersPage';
import { getToken } from '../services/api';
import { getAdminAuth } from '../utils/cookies';
import './i18n/config';

function ProtectedRoute({ children }) {
  const isAuthenticated = getAdminAuth();
  const hasToken = getToken();
  if (!isAuthenticated && !hasToken) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default function Admin() {
  return (
    <ThemeProvider>
      <Routes>
        {/* Redirect old admin-login to new combined login */}
        <Route path="/admin-login" element={<Navigate to="/login" replace />} />
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="articles" element={<ArticlesPage />} />
          <Route path="reviews" element={<ReviewsPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="orders" element={<OrdersPage />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}
