import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/ui/Header";
import Footer from "./components/ui/Footer";
import ProductList from "./components/ui/ProductList";
import ProductDetail from "./components/pages/ProductDetail";
import About from "./components/pages/About";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Home from "./components/pages/Home";
import Cart from "./components/pages/Cart";
import AdminPage from "./components/pages/AdminPage";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const handleLogin = (username, isAdmin) => {
    setUsername(username);
    setIsLoggedIn(true);
    setIsAdmin(isAdmin);
  };

  const handleLogout = () => {
    setUsername("");
    setIsLoggedIn(false);
    setIsAdmin(false);
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header isLoggedIn={isLoggedIn} username={username} isAdmin={isAdmin} onLogout={handleLogout} />
        <main className="flex-grow p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            {!isLoggedIn && <Route path="/register" element={<Register />} />}
            <Route path="/cart" element={<Cart />} />
            <Route path="/admin" element={isAdmin ? <AdminPage /> : <Navigate to="/" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;