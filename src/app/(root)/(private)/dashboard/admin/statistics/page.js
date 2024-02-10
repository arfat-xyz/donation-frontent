"use client";
import { useGetStatisticsQuery } from "@/app/lib/features/donation/donationApi";
import React from "react";

const LineChart = () => {
  const { data: logics } = useGetStatisticsQuery();
  return <div>LineChart</div>;
};

export default LineChart;
