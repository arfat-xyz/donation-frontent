"use client";

import { useGetDonationsQuery } from "@/app/lib/features/donation/donationApi";
import DonationCard from "@/components/ui/card";
import { Button } from "@mui/base";
import { Box, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";

const Donation = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = async (data) => {
    setSearchTerm(data?.searchTerm);
  };
  const { isLoading, isSuccess, isError, error, data } = useGetDonationsQuery(
    {
      searchTerm,
      page,
    },
    { pollingInterval: 30000 }
  );

  return (
    <>
      <div className="my-16">
        <Typography variant="h5" className="text-center">
          I Grow By Helping People In Need
        </Typography>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-6 gap-4 my-5"
        >
          <TextField
            className="col-span-4 md:col-span-5 rounded-[50%]"
            id="outlined-basic"
            label="Search"
            variant="outlined"
            {...register("searchTerm", {
              required: "Value required",
            })}
          />
          <Button
            className="bg-red-600 col-span-2 md:col-span-1 text-white rounded-xl"
            variant="contained"
            type="submit"
          >
            Search
          </Button>
          {errors.searchTerm && (
            <p role="alert" className="text-red-500">
              {errors.searchTerm.message}
            </p>
          )}
        </form>
        <Box>
          <Typography className="text-center mt-28" variant="h3">
            All Donations
          </Typography>
          <div className="grid my-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data?.data?.map((d) => (
              <DonationCard data={d} key={d?._id} />
            ))}
          </div>
        </Box>
      </div>
    </>
  );
};

export default Donation;
