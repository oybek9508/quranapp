import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Reading from "./Reading";
import Translation from "./Translation";
import Banner from "src/components/banners/chapterId/Banner";

export default function ReadingPreferenceTab(props) {
  const { singleChapter, chapterId, initialData } = props;
  const [value, setValue] = React.useState("reading");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="translation" value="translation" />
            <Tab label="reading" value="reading" />
          </TabList>
        </Box>
        <Banner data={singleChapter} value={value} />
        <TabPanel value="translation">
          <Translation initialData={initialData} chapterId={chapterId} />
        </TabPanel>
        <TabPanel value="reading">
          <Reading initialData={initialData} chapterId={chapterId} />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
