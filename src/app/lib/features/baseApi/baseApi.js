"use client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// initialize an empty api service that we'll inject endpoints into later as needed
export const baseApi = createApi({
  tagTypes: ["Post"],
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_DB }),
  endpoints: () => ({}),
});
