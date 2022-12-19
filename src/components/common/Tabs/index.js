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
        bgcolor: theme.palette.background.default,
      })}
    >
      <Box>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {lists.map((list) => (
            <Tab
              key={list.label}
              label={list.label}
              value={list.value}
              sx={{
                flex: 1,
              }}
            />
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
