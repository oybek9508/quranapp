import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Reading from "./Reading/ReadingView";
import ReadingAndTranslation from "./Translation/ReadingAndTranslation";
import Banner from "src/components/banners/chapterId/Banner";
import Translation from "./Translation/Translation";

export default function ReadingPreferenceTab(props) {
  const { singleChapter, id, initialData, quranReaderType } = props;
  const [value, setValue] = React.useState("reading");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  console.log({ value });
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
            <Tab
              label="reading and translation"
              value="reading_and_translation"
            />
          </TabList>
        </Box>
        <Banner data={singleChapter} value={value} />
        <TabPanel value="translation">
          <Translation value={value} initialData={initialData} id={id} />
        </TabPanel>
        <TabPanel value="reading">
          <Reading
            initialData={initialData}
            resourceId={id}
            quranReaderType={quranReaderType}
          />
        </TabPanel>
        <TabPanel value="reading_and_translation">
          <ReadingAndTranslation
            value={value}
            initialData={initialData}
            id={id}
          />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
