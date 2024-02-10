"use client";
import {
  useGetDonationsCategoryQuery,
  usePostDonationPostMutation,
} from "@/app/lib/features/donation/donationApi";
import Loader from "@/components/shared/loader";
import {
  Button,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  TextareaAutosize,
} from "@mui/material";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";

const AddNew = () => {
  const navi = useRouter();
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [token, setToken] = useState({ role: "admin" });

  const {
    isLoading,
    isSuccess,
    isError,
    error,
    data: categories,
  } = useGetDonationsCategoryQuery();
  const [
    donationPost,
    {
      isLoading: postIsLoading,
      isSuccess: postIsSuccess,
      isError: postIsError,
      error: postError,
    },
  ] = usePostDonationPostMutation();
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
  if (isLoading || postIsLoading) <Loader />;
  if (isError) {
    toast.error(error?.data?.message || "Something went wrong");
  }
  if (postIsError) {
    toast.error(postError?.data?.message || "Something went wrong");
  }
  if (postIsSuccess) {
    toast.success("Donation posts created successfully");
    navi.push("/dashboard");
  }
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("file", data.image[0]);
    formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_PRESET);
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    ).then((res) => res.json());
    data.image = await response?.secure_url;
    donationPost(data);
  };
  return (
    <div className="flex justify-center items-center min-h-[70vh]">
      <form onSubmit={handleSubmit(onSubmit)} className=" min-w-[400px]">
        <div className="my-4">
          <TextField
            className=" w-full"
            {...register("heading", { required: "Heading is required" })}
            name="heading"
            id="standard-basic"
            label="Heading"
            variant="outlined"
          />{" "}
          {errors.heading && (
            <p className="text-red-700">{errors.heading.message}</p>
          )}
        </div>
        <div className="my-4">
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  hover:bg-gray-100"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
                {errors.image && (
                  <p className="text-red-700">{errors.image.message}</p>
                )}
              </div>
              <input
                id="dropzone-file"
                accept="image/png, image/gif, image/jpeg"
                type="file"
                className="hidden"
                {...register("image", { required: "Image is required" })}
              />
            </label>
          </div>
        </div>

        <div className="my-4">
          <InputLabel id="demo-simple-select-label">Select Option</InputLabel>
          <Controller
            name="category"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Select
                className="w-full"
                name="category"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                {...field}
              >
                {categories?.data?.map((c) => (
                  <MenuItem key={c?._id} value={c?.title}>
                    {c?.title}
                  </MenuItem>
                ))}
              </Select>
            )}
          />

          {errors.category && (
            <p className="text-red-700">{errors.category.message}</p>
          )}
        </div>
        <div className="my-4">
          <InputLabel id="">Details</InputLabel>
          <TextareaAutosize
            className="w-full p-4 border-gray-400 border rounded-md"
            minRows={5}
            aria-label="empty textarea"
            placeholder="Add details"
            {...register("details", { required: "Details is required" })}
          />

          {errors.details && (
            <p className="text-red-700">{errors.details.message}</p>
          )}
        </div>
        <div className="my-4">
          <TextField
            className=" w-full"
            {...register("totalCollection", {
              required: "Initial collection is required",
              min: {
                value: 0,
                message: "Minimum is 0",
              },
            })}
            type="number"
            name="totalCollection"
            id="standard-basic"
            label="Initial collection"
            variant="outlined"
          />{" "}
          {errors.totalCollection && (
            <p className="text-red-700">{errors.totalCollection.message}</p>
          )}
        </div>
        <Button variant="outlined" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default AddNew;
