import { MenuItem, Typography, Box, CardMedia } from "@mui/material";
import React from "react";
import { useRouter } from "next/router";

const JuzItem = ({ juz }) => {
  const router = useRouter();
  return (
    <MenuItem
      onClick={() => router.push(`/juz/${juz.id}`)}
      sx={{
        cursor: "pointer",
        width: "100%",
        borderRadius: 2,
        border: "1px solid rgba(187, 196, 206, 0.35)",
        mb: 1,
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: "20px",
              color: "#863ED5",
              fontFamily: "Poppins",
              fontWeight: 700,
            }}
          >
            {juz.id}-
          </Typography>
          <Typography
            sx={{
              fontSize: "20px",
              color: "#863ED5",
              fontFamily: "Poppins",
              fontWeight: 700,
            }}
          >
            pora
          </Typography>
        </Box>
        <Box sx={{ position: "relative" }}>
          <CardMedia
            component="img"
            alt="surah-order"
            src="/assets/icons/ayahNum.png"
            sx={{ width: "36px", height: "36px" }}
          />
          <Typography
            sx={{
              position: "absolute",
              top: "7px",
              left: juz.id < 10 ? 15 : juz.id > 99 ? "7px" : "11px",
              fontSize: "14px",
              color: "#240F4F",
              fontFamily: "Poppins",
            }}
          >
            {juz.id}
          </Typography>
        </Box>
      </Box>
    </MenuItem>
  );
};

export default JuzItem;
