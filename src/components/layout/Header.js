import * as React from "react";
import { useRouter } from "next/router";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { ContactPageOutlined } from "@mui/icons-material";
import { ThemeTypes } from "src/styles/theme/modes";
import { amber, deepOrange } from "@mui/material/colors";
import SettingsIcon from "@mui/icons-material/Settings";
import SettingsDrawer from "../navbar/SettingsDrawer";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { selectNavbar, setToggleDrawer } from "src/redux/slices/navbar";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function Header({ type = "menu", singleChapter }) {
  const dispatch = useDispatch();
  const { open } = useSelector(selectNavbar, shallowEqual);
  const router = useRouter();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={(theme) => ({
          bgcolor:
            (theme.mode === ThemeTypes.Light && "#fff") ||
            (theme.mode === ThemeTypes.Dark && "#065a60") ||
            (theme.mode === ThemeTypes.Main && "#94C2A5"),
          color: "#000",
        })}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            {type === "back" && (
              <KeyboardBackspaceIcon
                color="primary"
                onClick={() => router.back()}
              />
            )}
            {type === "menu" && <MenuIcon color="primary" />}
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            color="primary"
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "block" },
              cursor: "pointer",
            }}
          >
            {router.pathname === "/[chapterId]"
              ? singleChapter?.transliteratedName
              : "Quran App"}
          </Typography>
          <SettingsDrawer />
          <SettingsIcon
            color="primary"
            onClick={() => dispatch(setToggleDrawer(!open))}
          />
          <Search>
            <SearchIconWrapper>
              <SearchIcon color="primary" />
            </SearchIconWrapper>
            <StyledInputBase
              color="primary"
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
