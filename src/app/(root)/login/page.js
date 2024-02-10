"use client";
import { useAppDispatch, useAppSelector } from "@/app/lib/hook";
import { useLoginMutation } from "@/app/lib/features/user/userApi";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    signIn("donation", { ...data, callbackUrl: "/" });
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
              Login
            </Button>
          </form>
          New here ?{" "}
          <Link className="text-blue-500" href={"/signup"}>
            Signup
          </Link>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;
