import { useState } from "react";
import { styled } from "@mui/system";
import TabsUnstyled from "@mui/base/TabsUnstyled";
import TabsListUnstyled from "@mui/base/TabsListUnstyled";
import TabPanelUnstyled from "@mui/base/TabPanelUnstyled";
import { buttonUnstyledClasses } from "@mui/base/ButtonUnstyled";
import TabUnstyled, { tabUnstyledClasses } from "@mui/base/TabUnstyled";
import ChapterList from "../chapters/ChapterList";

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

const Tab = styled(TabUnstyled)`
  font-family: IBM Plex Sans, sans-serif;
  color: #8789a3;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: bold;
  background-color: transparent;
  width: 100%;
  padding: 12px;
  margin: 6px 6px;
  border: none;
  border-radius: 2px;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: ${grey[100]};
  }

  &:focus {
    color: #fff;
    border-bottom: 2px solid #672cbc;
  }

  &.${tabUnstyledClasses.selected} {
    background-color: #fff;
    color: #672cbc;
    border-bottom: 2px solid #672cbc;
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const TabPanel = styled(TabPanelUnstyled)`
  width: 100%;
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
`;

const TabsList = styled(TabsListUnstyled)(
  ({ theme }) => `
  min-width: 300px;
  // background-color: ${blue[500]};
  border-radius: 12px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: space-between;
  `
  // box-shadow: 0px 4px 8px ${
  //   theme.palette.mode === "dark" ? grey[900] : grey[200]
  // };
);

export default function QuranListTab() {
  return (
    <TabsUnstyled defaultValue={0}>
      <TabsList>
        <Tab>Surah</Tab>
        <Tab>Pora</Tab>
        <Tab>Page</Tab>
      </TabsList>
      <TabPanel value={0}>
        <ChapterList />
      </TabPanel>
      <TabPanel value={1}>Pora</TabPanel>
      <TabPanel value={2}>Sahifa</TabPanel>
    </TabsUnstyled>
  );
}
