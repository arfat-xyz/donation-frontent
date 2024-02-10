"use client";
import React from "react";
import StoreProvider from "../storeProvider";
import { Toaster } from "react-hot-toast";

const ProtectedRoot = ({ children }) => {
  return (
    <>
      <StoreProvider>{children}</StoreProvider>
      <Toaster />
    </>
  );
};

export default ProtectedRoot;
