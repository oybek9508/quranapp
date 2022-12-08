import { Grid, MenuItem, MenuList, Typography } from "@mui/material";
import React from "react";
import { ALL_QURAN_PAGES } from "src/constants";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectQuranReaderStyles } from "src/redux/slices/QuranReader/styles";
import { getPageIdsByMushaf } from "src/utils/page";

const Pages = () => {
  const { quranFont, mushafLines } = useSelector(selectQuranReaderStyles);
  const router = useRouter();
  const pageIds = getPageIdsByMushaf("", quranFont, mushafLines);
  console.log("pageIds", pageIds);
  return (
    <MenuList>
      <Grid container sx={{ width: "100%" }} justifyContent="space-between">
        {pageIds.map((page, idx) => (
          <Grid
            item
            container
            xs={14}
            sm={3}
            md={12 / 5}
            lg={2}
            xl={2}
            key={idx}
            sx={{
              border: "1px solid olive",
              borderRadius: "5px",
              m: 1,
            }}
            onClick={() => router.push(`/page/${idx + 1}`)}
          >
            <MenuItem
              sx={{ width: "100%", display: "flex", justifyContent: "center" }}
            >
              <Typography>{idx + 1}-Sahifa</Typography>
            </MenuItem>
          </Grid>
        ))}
      </Grid>
    </MenuList>
  );
};

export default Pages;
