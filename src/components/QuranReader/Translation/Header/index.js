import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import ReportGmailerrorredOutlinedIcon from "@mui/icons-material/ReportGmailerrorredOutlined";
import PlayCircleFilledOutlinedIcon from "@mui/icons-material/PlayCircleFilledOutlined";

const TranslationHeader = ({ initialData }) => {
  const translatorName = initialData?.verses[0]?.translations[0]?.resourceName;
  return (
    <Grid container alignItems="center" sx={{ width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          mb: 6,
        }}
      >
        <Box>
          <Typography>Translated By</Typography>
          <Typography>{translatorName}</Typography>
          <Typography>(Change)</Typography>
        </Box>
        <Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <ReportGmailerrorredOutlinedIcon />
            <Typography ml={1}> Chapter Info</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "end",
            }}
          >
            <PlayCircleFilledOutlinedIcon sx={{ mr: 1 }} />
            <Typography sx={{ textAlign: "end" }}>Play Audio</Typography>
          </Box>
        </Box>
      </Box>
    </Grid>
  );
};

export default TranslationHeader;
