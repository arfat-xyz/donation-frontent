"use client";
import { createUser } from "@/utils/user-actions";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const Signup = () => {
  const navigate = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const res = await createUser(data);
    if (res.success) {
      toast.success("User created successfull");
      navigate.push("/login");
    } else {
      toast.error(res.message);
    }
  };
  return (
    <Box className="min-h-screen flex justify-center items-center ">
      <Container>
        <Box
          maxWidth={"500px"}
          sx={{
            margin: "0 auto",
            padding: "40px 20px",
          }}
          className="border rounded-lg shadow-md"
        >
          <Typography variant="h2" className="text-center py-8">
            Sign Up
          </Typography>
          <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
            <div className="my-5">
              <TextField
                className="w-full"
                id="filled-search"
                label="Name"
                type="text"
                variant="filled"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <p className="text-red-500 ">{errors.name.message}</p>
              )}
            </div>
            <div className="my-5">
              <TextField
                className="w-full"
                id="filled-search"
                label="Image"
                type="text"
                variant="filled"
                {...register("image", { required: "Image is required" })}
              />
              {errors.image && (
                <p className="text-red-500 ">{errors.image.message}</p>
              )}
            </div>
            <div className="my-5">
              <TextField
                className="w-full"
                id="filled-search"
                label="Email"
                type="email"
                variant="filled"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="my-5">
              <TextField
                className="w-full"
                id="filled-search"
                label="Password"
                type="password"
                variant="filled"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>
            <Button
              type="submit"
              className="text-black my-5"
              variant="outlined"
              color="primary"
            >
              Signup
            </Button>
          </form>
          Already signup ?{" "}
          <Link className="text-blue-500" href={"/login"}>
            Login
          </Link>
        </Box>
      </Container>
    </Box>
  );
};

export default Signup;
