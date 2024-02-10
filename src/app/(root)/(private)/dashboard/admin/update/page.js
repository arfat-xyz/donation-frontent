"use client";
import {
  useGetDonationsCategoryQuery,
  useGetDonationsQuery,
  usePostDonationPostMutation,
  useUpdateDonationPostMutation,
} from "@/app/lib/features/donation/donationApi";
import Loader from "@/components/shared/loader";
import UpdateModal from "@/components/updateModal";
import {
  Button,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  TextareaAutosize,
} from "@mui/material";
import { getSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";

const UpdatePage = () => {
  const navi = useRouter();

  const [token, setToken] = useState({ role: "admin" });
  const [isOpen, setIsOpen] = useState(false);

  const { isLoading: postLoading, data } = useGetDonationsQuery({
    limit: 3000,
  });
  
  useEffect(() => {
    if (token?.role !== "admin") {
      navi.push("/dashboard");
    }
  }, [token]);
  useEffect(() => {
    const get = async () => {
      const x = await getSession();

      setToken(x);
    };
    get();
  }, []);

  // if (postIsError) {
  //   toast.error(postError?.data?.message || "Something went wrong");
  // }
  // console.log(postIsError, postError, "post eerrro");
  // if (postIsSuccess) {
  //   toast.success("Donation posts created successfully");
  //   navi.push("/dashboard");
  // }

  return (
    <div className="flex justify-center items-center min-h-[70vh]">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell align="right">Post Name</TableCell>
              <TableCell align="right">Total collection</TableCell>
              <TableCell align="right">Update</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.data.map((row) => (
              <TableRow
                key={row?.heading}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="right">
                  <Image
                    width={100}
                    height={100}
                    src={row?.image}
                    alt={row?.heading}
                  />
                </TableCell>
                <TableCell component="th" scope="row">
                  {row?.heading}
                </TableCell>{" "}
                <TableCell component="th" scope="row">
                  {row?.totalCollection}
                </TableCell>
                <TableCell align="right">
                  <UpdateModal id={row?._id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default UpdatePage;
