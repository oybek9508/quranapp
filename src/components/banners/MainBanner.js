import { Paper, Box, CardMedia, Typography } from "@mui/material";
import React from "react";

const MainBanner = () => {
  return (
    <Paper
      sx={{
        my: 3,
        p: "20px",
        borderRadius: "10px",
        width: "100%",
        height: "130px",
        background: "linear-gradient(135deg, #DF98FA 0%, #9055FF 100%)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <CardMedia
              component="img"
              alt="book"
              src="/assets/icons/tinyBook.png"
              sx={{ width: "20px", height: "14px" }}
            />
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontSize: "14px",
                color: "#fff",
                ml: 1,
              }}
            >
              Last Read
            </Typography>
          </Box>
          <Box sx={{ mt: 3 }}>
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontSize: "18px",
                color: "#fff",
                fontWeight: 600,
              }}
            >
              Al-Fatiha
            </Typography>
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontSize: "14px",
                color: "#fff",
                fontWeight: 400,
              }}
            >
              Ayah No 1
            </Typography>
          </Box>
        </Box>
        <Box>
          <CardMedia
            component="img"
            alt="book"
            src="/assets/icons/quran.png"
            sx={{ width: "150px", height: "90px" }}
          />
        </Box>
      </Box>
    </Paper>
  );
};

export default MainBanner;
