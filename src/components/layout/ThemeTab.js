import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { selectTheme, setTheme } from "src/redux/slices/theme";
import { ThemeTypes } from "src/styles/theme/types";

const { Light, Dark, Main } = ThemeTypes;

export default function ThemeTab() {
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme, shallowEqual);
  console.log("theme", theme);

  const handleChange = (event, newValue) => {
    dispatch(setTheme(newValue));
  };
  console.log("theme.type", theme.type);

  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={theme.type}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label={Light} value={Light} />
          <Tab label={Dark} value={Dark} />
          <Tab label={Main} value={Main} />
        </Tabs>
      </Box>
    </Box>
  );
}
