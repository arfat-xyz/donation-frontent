import { Box, Container, Grid, Typography } from "@mui/material";
import Link from "next/link";

export const Footer = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "auto",
        backgroundColor: "rgb(0 0 0 / 14%)",
        paddingTop: "1rem",
        paddingBottom: "1rem",
      }}
    >
      <Container maxWidth="lg">
        <Grid container direction="column" alignItems="center">
          <Grid item xs={12}>
            <Typography color="black" variant="h5">
              Donation
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Link href={"https://arfat.app"}>
              {" "}
              <Typography color="textSecondary" variant="subtitle1">
                {`${new Date().getFullYear()} Arfatur Rahman`}
              </Typography>
            </Link>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
