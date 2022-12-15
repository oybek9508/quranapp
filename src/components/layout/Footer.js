import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { Paper, CardMedia } from "@mui/material";

export default function Footer() {
  const [value, setValue] = React.useState("quran");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper
      sx={(theme) => ({
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        boxShadow: theme.shadows[24],
      })}
    >
      <BottomNavigation sx={{}} value={value} onChange={handleChange}>
        <BottomNavigationAction
          label="Quran"
          value="quran"
          icon={
            <CardMedia
              component="img"
              alt="quran"
              src="/assets/icons/tab/book.png"
              sx={{ width: "32px", height: "32px" }}
            />
          }
        />
        <BottomNavigationAction
          label="Lamp"
          value="lamp"
          icon={
            <CardMedia
              component="img"
              alt="lamp"
              src="/assets/icons/tab/lamp.png"
              sx={{ width: "32px", height: "32px" }}
            />
          }
        />
        <BottomNavigationAction
          label="Prayer"
          value="prayer"
          icon={
            <CardMedia
              component="img"
              alt="prayer"
              src="/assets/icons/tab/prayer.png"
              sx={{ width: "32px", height: "32px" }}
            />
          }
        />
        <BottomNavigationAction
          label="Dua"
          value="dua"
          icon={
            <CardMedia
              component="img"
              alt="dua"
              src="/assets/icons/tab/dua.png"
              sx={{ width: "32px", height: "32px" }}
            />
          }
        />
        <BottomNavigationAction
          label="Bookmark"
          value="bookmark"
          icon={
            <CardMedia
              component="img"
              alt="bookmark"
              src="/assets/icons/tab/bookmark.png"
              sx={{ width: "32px", height: "32px" }}
            />
          }
        />
      </BottomNavigation>
    </Paper>
  );
}
