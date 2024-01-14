"use client";
import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Provider } from "react-redux";
import { store } from "@/rtk/app/store";


function provider({ children }) {
  return (
    <div className="wrapper">
      <h1 className="visually-hidden">Filmoteka</h1>
      <Provider store={store}>
        <Header />
          
           <main>{children}</main> 
    
          
    
        <Footer />
      </Provider>
    </div>
  );
}

export default provider;
