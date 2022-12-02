import { Box, Card, CardMedia, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import toArabicNumber from "src/utils/toArabicNumber";

const Order = ({ number }) => {
  return (
    <span>
      <Image
        style={{ position: "relative", top: "5px" }}
        component="img"
        width={40}
        height={40}
        alt="ayah order"
        src="/assets/icons/ayahOrder.svg"
      />
      <Typography
        variant="span"
        sx={{ position: "relative", top: "-8px", left: "26px" }}
      >
        {toArabicNumber(number)}
      </Typography>
    </span>
  );
};

export default Order;
