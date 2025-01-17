import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { Box, Container } from "@mui/material";
import { getServerSession } from "next-auth";
import { authOptions } from "./utils/authOption";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Donation",
  description: "Donate us",
};
export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header session={session ? true : false} />
        <Box className="min-h-screen">
          <Container>{children}</Container>
        </Box>
        <Footer />
      </body>
    </html>
  );
}
