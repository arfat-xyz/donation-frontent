"use client";
import { useAppDispatch } from "@/app/lib/hook";
import React from "react";

const StoreUser = ({ session }) => {
  const dispatch = useAppDispatch();
  dispatch(setUser(...session));

  return <></>;
};

export default StoreUser;
