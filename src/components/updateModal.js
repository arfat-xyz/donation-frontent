"use client";
import {
  useGetDonationsCategoryQuery,
  useGetSingleDonationsQuery,
  useUpdateDonationPostMutation,
} from "@/app/lib/features/donation/donationApi";
import {
  Button,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  TextareaAutosize,
} from "@mui/material";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Loader from "./shared/loader";

const UpdateModal = ({ id }) => {
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();
  const {
    isLoading,
    isSuccess,
    isError,
    error,
    data: categories,
  } = useGetDonationsCategoryQuery();
  const [isOpen, setIsOpen] = useState(false);
  const { data: getData, isSuccess: getIsSuccess } = useGetSingleDonationsQuery(
    { id }
  );
  const [updatePost, { isSuccess: updateSuccess }] =
    useUpdateDonationPostMutation();
  const handleClose = () => {
    setIsOpen(false);
  };
  if (getIsSuccess) {
    setValue("heading", getData?.data?.heading);
    setValue("details", getData?.data?.details);
    setValue("category", getData?.data?.category);
    setValue("totalCollection", getData?.data?.totalCollection);
  }
  const handleOpen = () => {
    setIsOpen(true);
  };
  const onSubmit = async (data) => {
    data.id = getData?.data?._id;
    await updatePost(data);
    setIsOpen(false);
  };

  if (isLoading) <Loader />;
  if (isError) {
    toast.error(error?.data?.message || "Something went wrong");
  }
  return (
    <>
      <Button onClick={handleOpen} variant="outlined">
        update
      </Button>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className=" max-w-[400px] mx-auto h-[600px]"
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" bg-white min-w-[400px] p-6"
        >
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
      </Modal>
    </>
  );
};

export default UpdateModal;
