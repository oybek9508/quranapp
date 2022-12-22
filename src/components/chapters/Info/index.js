import { Box, Grid, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

const Info = ({ chapterInfo, chapterResponse }) => {
  console.log("chapterInfo", chapterInfo);
  return (
    <Grid>
      <Grid>
        <Grid>
          <Box>
            <Typography> {"<-"} go to surah</Typography>
          </Box>
          <Box>
            <Image
              width={100}
              height={100}
              component="img"
              src={
                chapterResponse?.chapter?.revelationPlace === "makkah"
                  ? "/assets/images/makkah.jpeg"
                  : "/assets/images/madina.jpeg"
              }
              alt={chapterResponse?.chapter?.revelationPlace}
            />
          </Box>
        </Grid>
        <Grid>
          <Box>Header</Box>
          <Box>Body</Box>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Info;
