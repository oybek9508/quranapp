import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import PlayCircleFilledWhiteOutlinedIcon from "@mui/icons-material/PlayCircleFilledWhiteOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";

const AyahItem = ({ chapter, props }) => {
  console.log("chapter", chapter);
  return (
    <Grid
      container
      flexWrap="nowrap"
      sx={{
        width: "100%",
        borderBottom: "1px solid gray",
        py: 4,
        px: 1,
      }}
    >
      {/* ayah player */}
      {/* ayah translated */}
      {/* ayah arabic  */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Typography>{chapter.verseKey}</Typography>
        <PlayCircleFilledWhiteOutlinedIcon />
        <MenuBookOutlinedIcon />
        <MoreHorizOutlinedIcon />
      </Box>
      <Grid sx={{ width: "100%", ml: 4 }}>
        <Typography sx={{ textAlign: "start", fontSize: "18px" }}>
          {chapter.translations[0].text.split("<sup")[0]}
        </Typography>
        <Typography
          sx={{
            textAlign: "end",
            fontSize: { xs: "28px", sm: "54px" },
            width: "100%",
          }}
        >
          {chapter?.textUthmani}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default AyahItem;
