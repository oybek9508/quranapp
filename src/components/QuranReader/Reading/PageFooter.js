import React from "react";
import Link from "next/link";
import { toLocalizedNumber } from "src/utils/locale";
import { getPageNavigationUrl } from "src/utils/navigation";
import { Grid } from "@mui/material";

const PageFooter = ({ page }) => {
  const pageUrl = getPageNavigationUrl(page);
  return (
    <Grid
      sx={{
        textAlign: "center",
        width: "fit-content",
        fontSize: "1.6vh",
        marginInlineStart: "auto",
        marginInlineEnd: "auto",
        paddingBlockStart: 0.5,
        paddingBlockEnd: 0.5,
      }}
    >
      <Link href={pageUrl} shouldPassHref shouldPrefetch={false}>
        {page}
      </Link>
    </Grid>
  );
};

export default PageFooter;
