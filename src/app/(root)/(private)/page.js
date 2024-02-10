"use client";
import { useGetDonationsQuery } from "@/app/lib/features/donation/donationApi";
import { useAppSelector } from "@/app/lib/hook";
import Loader from "@/components/shared/loader";
import Hero from "@/components/ui/Hero";
import DonationCard from "@/components/ui/card";
import { Box, Typography } from "@mui/material";
import React from "react";
import toast from "react-hot-toast";

const Home = () => {
  const { isLoading, isSuccess, isError, error, data } = useGetDonationsQuery({
    searchTerm: "",
  });
  if (isLoading) <Loader />;
  if (isError) {
    toast.error(error?.data?.message || "Something went wrong asdf");
  }
  const user = useAppSelector((state) => state.user);
  return (
    <Box>
      <Hero />
      <Typography className="text-center mt-28" variant="h3">
        All Donations
      </Typography>
      <div className="grid my-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.data?.map((d) => (
          <DonationCard data={d} key={d?._id} />
        ))}
      </div>
    </Box>
  );
};

export default Home;
