import { Box } from "@mui/material";
import heroImage from "@/assets/banner.png";
import Image from "next/image";

const Hero = () => {
  return (
    <Box
      //   style={{
      //     backgroundImage: "url('../../assets/Rectangle-4288.png')",
      //   }}

      sx={{
        backgroundImage: `url('${heroImage.src}')`,
        background: `linear-gradient(0deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('${heroImage.src}')`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        height: "500px",
        borderRadius: "5px",
      }}
    >
      <div className="flex flex-col justify-center items-center w-full h-full">
        <h1 className="text-red-500 text-8xl">Donation</h1>
        <p className="text-white text-4xl">
          {`You Can be the Hero of a Person's Life`}
        </p>
      </div>
    </Box>
  );
};

export default Hero;
