import { Grid } from "@mui/material";
import Image from "next/image";
import React from "react";
import QuickLinks from "./QuickLinks";
import AlQuranSVG from "../../../public/assets/images/alquranul-karim.svg";

const Header = () => {
  return (
    <Grid>
      <Grid container justifyContent="center">
        <Image
          component="img"
          alt="al-Quran"
          src={AlQuranSVG}
          width={250}
          height={140}
        />
      </Grid>
      <Grid container justifyContent="center" mt={4}>
        <QuickLinks />
      </Grid>
    </Grid>
  );
};

export default Header;
