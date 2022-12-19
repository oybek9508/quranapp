import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function BasicTabs(props) {
  const { value, lists, handleChange } = props;

  console.log("value", value);
  console.log("lists", lists);

  return (
    <Box
      sx={(theme) => ({
        width: "100%",
        bgcolor: theme.palette.background.default,
      })}
    >
      <Box>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          {lists.map((list) => (
            <Tab key={list.label} label={list.label} value={list.value} />
          ))}
        </Tabs>
      </Box>
    </Box>
  );
}

{
  /* <Tab label="usmani" value="usmani" />
<Tab label="indopak" value="indopak" />
<Tab label="tajweed" value="tajweed" /> */
}
