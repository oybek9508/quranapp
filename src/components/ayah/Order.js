import { Box, Card, Typography } from "@mui/material";
import React from "react";
import toArabicNumber from "src/utils/toArabicNumber";

const Order = ({ number }) => {
  return (
    <span>
      <Card
        component="img"
        alt="ayah order"
        src="/assets/icons/ayahOrder.png"
      />
      <Typography
        variant="span"
        sx={{ position: "relative", top: "-18px", left: "30px" }}
      >
        {toArabicNumber(number)}
      </Typography>
    </span>
  );
};

export default Order;
