"use client";
import { Box, IconButton, MenuItem, Typography } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { signOut } from "next-auth/react";

const Menu = ({ session }) => {
  const pathName = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const pages = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Donations",
      path: "/donation",
    },
    {
      name: "Statistics",
      path: "/statistics",
    },
    {
      name: "Dashboard",
      path: "/dashboard",
    },
  ];
  return (
    <>
      <Box className="cursor-pointer">
        {" "}
        <IconButton
          onClick={() => setMenuOpen(!menuOpen)}
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          className="md:hidden"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Box
          className={` ${
            menuOpen ? "block" : "hidden"
          } absolute md:relative right-0 bg-gray-300 md:bg-transparent md:flex md:items-center`}
        >
          {session ? (
            <>
              {pages.map((p) => (
                <MenuItem className="hover:bg-transparent" key={p.path}>
                  <Link href={p.path}>
                    <Typography
                      className="border-b-2 border-transparent hover:border-red-500 transition-all duration-300 p-3 hover:pb-1"
                      textAlign="center"
                      color={pathName === p.path && "error"}
                    >
                      {p.name}
                    </Typography>
                  </Link>
                </MenuItem>
              ))}
              <MenuItem className="hover:bg-transparent">
                <Typography
                  onClick={() => signOut()}
                  className="border-b-2 border-transparent hover:border-red-500 transition-all duration-300 p-3 hover:pb-1"
                  textAlign="center"
                >
                  Sign Out
                </Typography>
              </MenuItem>
            </>
          ) : (
            <>
              <MenuItem className="hover:bg-transparent">
                <Link href={"/login"}>
                  <Typography
                    color={pathName === "/login" && "error"}
                    className="border-b-2 border-transparent hover:border-red-500 transition-all duration-300 p-3 hover:pb-1"
                    textAlign="center"
                  >
                    Login
                  </Typography>
                </Link>
              </MenuItem>
              <MenuItem className="hover:bg-transparent">
                <Link href={"/signup"}>
                  <Typography
                    color={pathName === "/signup" && "error"}
                    className="border-b-2 border-transparent hover:border-red-500 transition-all duration-300 p-3 hover:pb-1"
                    textAlign="center"
                  >
                    Signup
                  </Typography>
                </Link>
              </MenuItem>
            </>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Menu;
