"use client";
import { useGetUserDonationsQuery } from "@/app/lib/features/donation/donationApi";
import Loader from "@/components/shared/loader";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { getSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const DashboardPage = () => {
  const [token, setToken] = useState(null);
  const { isLoading, isError, error, data } = useGetUserDonationsQuery({
    token: token?.token,
    id: token?._id,
  });
  if (isLoading) <Loader />;
  if (isError) {
    console.log(error);
    toast.error(error?.data?.message || "Something went wrong");
  }
  useEffect(() => {
    const get = async () => {
      const x = await getSession();
      setToken(x);
    };
    get();
  }, []);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell align="right">Post Name</TableCell>
              <TableCell align="right">Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.data.map((row) => (
              <TableRow
                key={row?.donation?.heading}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="right">
                  <Image
                    width={100}
                    height={100}
                    src={row?.donation?.image}
                    alt={row?.donation?.heading}
                  />
                </TableCell>
                <TableCell component="th" scope="row">
                  {row?.donation?.heading}
                </TableCell>
                <TableCell align="right">{row?.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default DashboardPage;
