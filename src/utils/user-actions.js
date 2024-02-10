"use server";

import { useLoginMutation } from "@/app/lib/features/user/userApi";

export const createUser = async (userInfo) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DB}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userInfo),
    cache: "no-cache",
  });
  const user = await res.json();
  return user;
};
