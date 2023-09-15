import { TabPanel } from "@mui/lab";
import TabContext from "@mui/lab/TabContext";
import { useState } from "react";
import BasicTabs from "src/components/common/Tabs";
import JuzSelection from "./JuzSelection";
import PageSelection from "./PageSelection";
import SurahSelection from "./SurahSelection";

const navigations = ["Surah", "Pora", "Sahifa"].map((navigation) => ({
	value: navigation,
	label: navigation,
}));
const SearchTypeTabs = () => {
	const [nav, setNav] = useState("Surah");

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
