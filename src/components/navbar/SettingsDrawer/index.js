import * as React from "react";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { selectNavbar } from "src/redux/slices/navbar";
import { setToggleDrawer } from "src/redux/slices/navbar";
import { Divider, Grid, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import BasicTabs from "src/components/common/Tabs";
import QuranFontSection from "./QuranFontSection";
import ThemeSection from "./ThemeSection";
import AudioSection from "./AudioSection";

const Header = ({ toggleDrawer }) => {
  return (
    <Grid container justifyContent="space-between" px={2} py={2}>
      <Typography>Settings</Typography>
      <CloseIcon onClick={toggleDrawer(false)} />
    </Grid>
  );
};

export default function SettingsDrawer() {
  const dispatch = useDispatch();
  const { open } = useSelector(selectNavbar, shallowEqual);

  const toggleDrawer = () => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    dispatch(setToggleDrawer(!open));
  };

  return (
    <Grid>
      <React.Fragment>
        <SwipeableDrawer
          anchor="right"
          open={open}
          position="relative"
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
          transitionDuration={500}
          PaperProps={{
            sx: {
              width: "30%",
              zIndex: 999999,
            },
          }}
          BackdropProps={{ invisible: true }}
        >
          <Header toggleDrawer={toggleDrawer} />
          <Divider />
          <ThemeSection />
          <QuranFontSection />
          <AudioSection />
        </SwipeableDrawer>
      </React.Fragment>
    </Grid>
  );
}
