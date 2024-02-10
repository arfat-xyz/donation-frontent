import {
  Box,
  Container,
  IconButton,
  MenuItem,
  Typography,
} from "@mui/material";
import Link from "next/link";
import logo from "@/assets/Logo.png";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Menu from "./Menu";
const Header = ({ session }) => {
  return (
    <Box
      sx={{
        backgroundColor: "rgb(0 0 0 / 14%)",
      }}
    >
      <Container className="flex justify-between items-center relative">
        <Box>
          <Link href={"/"}>
            <Image alt="Logo" src={logo} width={200} height={200} />
          </Link>
        </Box>

        <Menu session={session} />
      </Container>
    </Box>
  );
};

export default Header;
