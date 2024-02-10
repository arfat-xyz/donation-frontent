"use client";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { Box, Modal, TextField } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getSession } from "next-auth/react";
import {
  useDeleteDonationMutation,
  usePostUserDonationMutation,
} from "@/app/lib/features/donation/donationApi";
import Loader from "../shared/loader";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
export default function DonationCard({ data }) {
  const [token, setToken] = useState(null);
  const navi = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [postUserDonation, { isLoading, isSuccess, isError, error }] =
    usePostUserDonationMutation();
  const [deletePost, { isLoading: deleteLoading }] =
    useDeleteDonationMutation();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const onSubmit = (submit) => {
    postUserDonation({
      token: token.token,
      user: token._id,
      donation: data?._id,
      amount: submit.value,
    });
  };
  if (isLoading) <Loader />;
  if (isError) {
    toast.error(error?.data?.message || "Something went wrong");
  }
  if (isSuccess) {
    toast.success("Thank you for doantion");
    navi.push("/dashboard");
  }
  useEffect(() => {
    const get = async () => {
      const x = await getSession();
      setToken(x);
    };
    get();
  }, []);
  const handleDelete = () => {
    deletePost({ id: data?._id });
  };
  return (
    <Card sx={{ width: "100%", borderRadius: "10px" }}>
      <Image
        className="w-full h-[240px]"
        src={data?.image}
        width={300}
        height={200}
        alt={data?.heading}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {data?.heading}
        </Typography>
        <Button className="bg-red-600 my-6 py-2 px-3 text-white hover:text-red-600 hover:bg-white border-2 border-transparent  hover:border-red-600">
          {data?.category}
        </Button>
        <span className="bg-green-500 rounded-lg float-end my-6 py-2 px-4">
          $ {data?.totalCollection}
        </span>
        <Typography variant="body2" color="text.secondary">
          {data?.details}
        </Typography>

        <>
          <div>
            {token?.role === "admin" && (
              <Button onClick={handleDelete} variant="outlined">
                Delete
              </Button>
            )}
            {token?.email && (
              <Button onClick={handleOpen} variant="outlined">
                Donate
              </Button>
            )}
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style} className="rounded-lg">
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Donation for : {data?.heading}
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <TextField
                    id="outlined-basic"
                    label="Amount"
                    type="number"
                    name="value"
                    className="w-full"
                    variant="outlined"
                    {...register("value", {
                      required: "This field is required",
                    })}
                  />{" "}
                  {errors.value && (
                    <p className="text-red-600">This field is required</p>
                  )}{" "}
                  <Button
                    type="submit"
                    className="text-black my-5"
                    variant="outlined"
                    color="primary"
                  >
                    Donate
                  </Button>
                </form>
              </Box>
            </Modal>
          </div>
        </>
      </CardContent>
    </Card>
  );
}
