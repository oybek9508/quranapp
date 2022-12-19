import { useState } from "react";
import { styled } from "@mui/system";
import TabsUnstyled from "@mui/base/TabsUnstyled";
import TabsListUnstyled from "@mui/base/TabsListUnstyled";
import TabPanelUnstyled from "@mui/base/TabPanelUnstyled";
import { buttonUnstyledClasses } from "@mui/base/ButtonUnstyled";
import TabUnstyled, { tabUnstyledClasses } from "@mui/base/TabUnstyled";
import ChapterList from "../chapters/ChapterList";
import JuzList from "../juzs/JuzList";
import Pages from "../by_page";
import { Grid } from "@mui/material";

const blue = {
  50: "#F0F7FF",
  100: "#C2E0FF",
  200: "#80BFFF",
  300: "#66B2FF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  700: "#0059B2",
  800: "#004C99",
  900: "#003A75",
};

const grey = {
  50: "#f6f8fa",
  100: "#eaeef2",
  200: "#d0d7de",
  300: "#afb8c1",
  400: "#8c959f",
  500: "#6e7781",
  600: "#57606a",
  700: "#424a53",
  800: "#32383f",
  900: "#24292f",
};

const Tab = styled(TabUnstyled)(
  ({ theme }) =>
    `
  font-family: IBM Plex Sans, sans-serif;
  color: ${theme.palette.text.secondary};
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: bold;
  background-color:  transparent; 
  width: 100%;
  padding: 12px;
  margin: 6px 6px;
  border: none;
  border-radius: 2px;
  display: flex;
  justify-content: center;

  // &:hover {
  //   background-color: ${theme.palette.background.default};
  //   opacity: 0.2
  // }

  &:focus {
    color: ${theme.palette.text.primary};
    // border-bottom: 2px solid #672cbc;
  }

  &.${tabUnstyledClasses.selected} {
    background-color: ${theme.palette.background.default};
     color: ${theme.palette.text.primary};
     opacity: 0.6
    // border-bottom: 2px solid #672cbc
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`
);

export const TabPanel = styled(TabPanelUnstyled)`
  width: 100%;
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
`;

const TabsList = styled(TabsListUnstyled)(
  ({ theme }) => `
  min-width: 300px;
  // background-color: transparent;
  border-radius: 12px;
  margin-bottom: 16px;
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: space-between;
  `
  // box-shadow: 0px 4px 8px ${
  //   theme.palette.mode === "dark" ? grey[900] : grey[200]
  // };
);

export default function ChapterJuzPage({ chapters }) {
  return (
    <TabsUnstyled defaultValue={0}>
      <Grid
        sx={(theme) => {
          return { bgcolor: theme.palette.background.paper };
        }}
      >
        <TabsList color="primary">
          <Tab>Sura</Tab>
          <Tab>Pora</Tab>
          <Tab>Sahifa</Tab>
        </TabsList>
      </Grid>
      <TabPanel value={0}>
        <ChapterList chapters={chapters} />
      </TabPanel>
      <TabPanel value={1}>
        <JuzList chapters={chapters} />
      </TabPanel>
      <TabPanel value={2}>
        <Pages chapters={chapters} />
      </TabPanel>
    </TabsUnstyled>
  );
}
