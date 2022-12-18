import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function BasicTabs(props) {
  const { value, handleChange } = props;
  // const [value, setValue] = React.useState("tajweed");

  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };
  console.log("value", value);

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="usmani" value="usmani" />
          <Tab label="indopak" value="indopak" />
          <Tab label="tajweed" value="tajweed" />
        </Tabs>
      </Box>
    </Box>
  );
}
