import TabsUnstyled from "@mui/base/TabsUnstyled";
import TabsListUnstyled from "@mui/base/TabsListUnstyled";
import TabPanelUnstyled from "@mui/base/TabPanelUnstyled";
import TabUnstyled, { tabUnstyledClasses } from "@mui/base/TabUnstyled";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import React, { useState } from "react";
import BasicTabs from "src/components/common/Tabs";
import SurahList from "./SurahList";
import { TabPanel } from "@mui/lab";
import SurahSelection from "./SurahSelection";
import JuzSelection from "./JuzSelection";
import PageSelection from "./PageSelection";

const navigations = ["Surah", "Pora", "Sahifa"].map((navigation) => ({
  value: navigation,
  label: navigation,
}));
const SearchTypeTabs = () => {
  const [nav, setNav] = useState("Surah");
  console.log("nav", nav);

  const handleChange = (event, newValue) => {
    setNav(newValue);
  };
  return (
    <TabContext value={nav}>
      <BasicTabs lists={navigations} value={nav} handleChange={handleChange} />
      <TabPanel value="Surah" sx={{ overflowY: "scroll", height: "inherit" }}>
        <SurahSelection />
      </TabPanel>
      <TabPanel value="Pora">
        <JuzSelection />
      </TabPanel>
      <TabPanel value="Sahifa">
        <PageSelection />
      </TabPanel>
    </TabContext>
  );
};

export default SearchTypeTabs;
