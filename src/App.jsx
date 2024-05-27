import React from "react";
import { useMediaQuery } from "react-responsive";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header.jsx";
import MobileHeader from "./components/MobileHeader.jsx";
import ViewProducts from "./components/ViewProducts.jsx";
import DetailView from "./components/DetailView.jsx";
import Login from "./components/Login.jsx";
import Cart from "./components/Cart.jsx";
import MainPageView from "./components/MainPageView.jsx";
import Footer from "./components/Footer.jsx";
import AdminPanel from "./components/AdminPanel.jsx";

export default function App() {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <React.Fragment>
      {!isHomePage && (isMobile ? <MobileHeader /> : <Header />)}
      <Routes>
        <Route path='/' element={<MainPageView />} />
        <Route path='/store' element={<ViewProducts />} />
        <Route path='/store/:id' element={<DetailView />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/login' element={<Login />} />
        <Route path='/admin' element={<AdminPanel />} />
      </Routes>
      <Footer />
    </React.Fragment>
  );
}
