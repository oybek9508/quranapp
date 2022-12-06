import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import PlayCircleFilledWhiteOutlinedIcon from "@mui/icons-material/PlayCircleFilledWhiteOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";

const AyahItem = ({ chapter, value }) => {
  // console.log("chapter", chapter);
  // console.log({ value });
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
      {value === "translation" ? (
        <Typography>{chapter.verseNumber}</Typography>
      ) : (
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
      )}
      <Grid sx={{ width: "100%", ml: 4 }}>
        {value !== "translation" && (
          <Typography
            sx={{
              mt: 1,
              textAlign: "end",
              fontSize: { xs: "28px", sm: "32px" },
              fontWeight: "bold",
              fontFamily: "UthmanicHafs",
              width: "100%",
            }}
          >
            {chapter?.textUthmani}
          </Typography>
        )}
        <Typography
          sx={{ textAlign: "start", fontSize: { xs: "16px", sm: "20px" } }}
        >
          {chapter.translations[0].text.split("<sup")[0]}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default AyahItem;
