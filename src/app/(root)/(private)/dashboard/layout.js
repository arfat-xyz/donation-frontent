"use client";
import { useAppDispatch } from "@/app/lib/hook";
import { MenuItem, Typography } from "@mui/material";
import { getSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const DashboardLayout = ({ children }) => {
  const pathName = usePathname();
  const [token, setToken] = useState(null);
  useEffect(() => {
    get();
  }, []);
  const get = async () => {
    const x = await getSession();
    setToken(x);
  };
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4">
        <aside className="md:col-span-1">
          <MenuItem className="hover:bg-transparent">
            <Link href={"/dashboard"} className="text-gray-600 no-underline">
              <Typography
                color={pathName === "/dashboard" && "error"}
                className="border-b-2 border-transparent hover:border-red-500 transition-all duration-300 p-3 hover:pb-1"
                textAlign="center"
              >
                All donation
              </Typography>
            </Link>
          </MenuItem>
          {token?.role === "admin" ? (
            <>
              <MenuItem className="hover:bg-transparent">
                <Link
                  href={"/dashboard/admin/add-new"}
                  className="text-gray-600 no-underline"
                >
                  <Typography
                    color={pathName === "/dashboard/admin/add-new" && "error"}
                    className="border-b-2 border-transparent hover:border-red-500 transition-all duration-300 p-3 hover:pb-1"
                    textAlign="center"
                  >
                    Add new card
                  </Typography>
                </Link>
              </MenuItem>
              <MenuItem className="hover:bg-transparent">
                <Link
                  href={"/dashboard/admin/update"}
                  className="text-gray-600 no-underline"
                >
                  <Typography
                    color={pathName === "/dashboard/admin/update" && "error"}
                    className="border-b-2 border-transparent hover:border-red-500 transition-all duration-300 p-3 hover:pb-1"
                    textAlign="center"
                  >
                    update
                  </Typography>
                </Link>
              </MenuItem>{" "}
            </>
          ) : (
            <></>
          )}
        </aside>
        <main className="md:col-span-3">{children}</main>
      </div>
    </>
  );
};

export default DashboardLayout;
