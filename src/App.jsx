import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Toaster } from 'sonner'
import { Route, BrowserRouter, Routes, Router } from 'react-router-dom'
import SignUp from './pages/SignUpPageEmp'
import LoginEmp from './pages/LoginPageEmp'
import NavbarComponent from "./components/NavbarHome.jsx";
import Home from './pages/Home.jsx'
import Dashboard from './pages/dashboard/dashboard.jsx'
import Customer from './pages/dashboard/CustomerPage.jsx'
import ProductList from './pages/dashboard/Product.jsx'
import { Navigate } from "react-router-dom";
import Transaction from './pages/dashboard/TransactionPage.jsx'
import CustomerManagement from './pages/dashboard/CustomerPage.jsx'



function App() {
  
  
  // const handleLogin = () => {
    //   setIsAuthenticated(true); // Update state saat login
    // };
    // const handleLogout = () => {
      //   setIsAuthenticated(false); // Update state saat logout
      // };


      // Login things nih
      const PrivateRoute = ({ element, ...rest }) => {
        const isAuthenticated = Boolean(localStorage.getItem("authToken"));
        return isAuthenticated ? element : <Navigate to="/login" />;
      };
      
  return (
    <>
    <Toaster />
    <Routes>
      <Route element={<Home />} path="/"/>
      <Route element={<SignUp />} path="/sign-up"/>
      <Route element={<LoginEmp />} path="/login"/>
      <Route element={<PrivateRoute element={<Dashboard />} />} path="/dashboard"  />
      <Route element={<PrivateRoute element={<Customer />} />} path="/customer"/>
      <Route element={<PrivateRoute element={<ProductList />} />} path="/product"/>
      <Route element={<PrivateRoute element={<Transaction />} />} path="/transaction"/>
    </Routes>

    </>
  )
}

export default App
