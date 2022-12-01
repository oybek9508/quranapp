import { Box, Card, CardMedia, Divider, Typography } from "@mui/material";
import React from "react";

const Banner = ({ data, value }) => {
  return (
    <Card
      sx={{
        mt: 3,
        p: "28px 56px",
        // height: "265px",
        position: "relative",
        borderRadius: "20px",
        backgroundImage: `url(${"/assets/icons/bg.png"})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Typography
        sx={{
          fontSize: "26px",
          fontFamily: "Poppins",
          color: "#fff",
          textAlign: "center",
        }}
      >
        {value === "translation"
          ? data?.chapter?.name_simple
          : data?.chapter?.name_arabic}
      </Typography>
      <Typography
        sx={{
          fontSize: "16px",
          fontFamily: "Poppins",
          color: "#fff",
          textAlign: "center",
        }}
      >
        {value === "translation" && data?.chapter?.translated_name.name}
      </Typography>
      <Divider sx={{ bgcolor: "#fff", my: 2 }} />
      <Box>
        {value === "translation" && (
          <Typography
            sx={{
              textTransform: "uppercase",
              fontSize: "14px",
              fontWeight: 600,
              fontFamily: "Poppins",
              color: "#fff",
              textAlign: "center",
            }}
          >
            {data?.chapter?.revelation_place} - {data?.chapter?.verses_count}{" "}
            verses
          </Typography>
        )}
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <CardMedia
          component="img"
          alt="basmala"
          src="/assets/icons/basmala.svg"
          sx={{
            objectFit: { xs: "none", sm: "cover" },
            mt: { xs: 4, sm: 8 },
            width: { xs: "100%", sm: "80%" },
          }}
        />
      </Box>
    </Card>
  );
};

export default Banner;
