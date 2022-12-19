import { Button, Grid, useTheme } from "@mui/material";
import React from "react";
import { useRouter } from "next/router";

const QUICK_LINKS = [
  {
    slug: "67",
    key: "mulk",
  },
  {
    slug: "36",
    key: "yaseen",
  },
  {
    slug: "ayatul-kursi",
    key: "ayat-ul-kursi",
  },
  {
    slug: "18",
    key: "kahf",
  },
  {
    slug: "56",
    key: "waqiah",
  },
  {
    slug: "55",
    key: "rahman",
  },
  {
    slug: "73",
    key: "muzzammil",
  },
];

const QuickLinks = () => {
  const theme = useTheme();
  const router = useRouter();
  return (
    <Grid>
      {QUICK_LINKS.map((qLinks) => (
        <Button
          sx={{
            bgcolor: theme.palette.background.paper,
            mx: 1,
            px: 4,
            "&:hover": {
              bgcolor: theme.palette.background.paper,
              opacity: 0.8,
            },
          }}
          key={qLinks.key}
          onClick={() => {
            router.push(`/${qLinks.slug}`);
          }}
        >
          {qLinks.key}
        </Button>
      ))}
    </Grid>
  );
};

export default QuickLinks;
