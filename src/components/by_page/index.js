import { Grid, MenuItem, MenuList, Typography } from "@mui/material";
import React from "react";
import { ALL_QURAN_PAGES } from "src/constants";
import { useRouter } from "next/router";
import { getPageIdsByMushaf } from "src/utils/page";

let pagesArray = new Array(ALL_QURAN_PAGES);
const quranArr = pagesArray.fill(0);

const Pages = () => {
  const router = useRouter();
  // const pageIds = getPageIdsByMushaf(, , '15_lines');
  console.log("array length", pagesArray);
  return (
    <MenuList>
      <Grid container sx={{ width: "100%" }} justifyContent="center">
        {quranArr.map((page, idx) => (
          <Grid
            item
            container
            xs={6}
            sm={4}
            md={4}
            lg={3}
            xl={12 / 5}
            key={idx}
            sx={{ border: "1px solid olive", borderRadius: "5px", m: 1 }}
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
