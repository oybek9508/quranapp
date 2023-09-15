import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import { shallowEqual } from "react-redux";
import { QuranReaderDataType, ReadingPreference } from "src/constants/QuranReader";
import { selectReadingPreferences, setReadingPreference } from "src/redux/slices/QuranReader/readingPreferences";
import { selectQuranReaderStyles } from "src/redux/slices/QuranReader/styles";
import { useDispatch, useSelector } from "src/redux/store";
import ReadingView from "./Reading/ReadingView";
import TranslationView from "./Translation/TranslationView";

export default function ReadingPreferenceTab(props) {
	const dispatch = useDispatch();
	const { singleChapter, id, initialData, quranReaderType = QuranReaderDataType.Chapter } = props;

	const quranReaderStyles = useSelector(selectQuranReaderStyles, shallowEqual);
	const { readingPreference } = useSelector(selectReadingPreferences);
	const isReadingPreference = readingPreference === ReadingPreference.Reading;
	const handleChange = (event, newValue) => dispatch({ type: setReadingPreference, payload: newValue });

	const { Translation, Reading } = ReadingPreference;
	return (
		<Box sx={{ width: "100%", typography: "body1" }}>
			<TabContext value={readingPreference}>
				<Box
					sx={{
						borderBottom: 1,
						borderColor: "divider",
						display: "flex",
						justifyContent: "center",
					}}
				>
					<TabList onChange={handleChange} aria-label="lab API tabs example">
						<Tab label={Translation} value={Translation} />
						<Tab label={Reading} value={Reading} />
					</TabList>
				</Box>
				{/* <Banner data={singleChapter} value={readingPreference} /> */}
				<TabPanel value={Translation}>
					<TranslationView
						initialData={initialData}
						resourceId={id}
						quranReaderType={quranReaderType}
						quranReaderStyles={quranReaderStyles}
					/>
				</TabPanel>
				<TabPanel value={Reading}>
					<ReadingView
						initialData={initialData}
						resourceId={id}
						quranReaderType={quranReaderType}
						quranReaderStyles={quranReaderStyles}
						isReadingPreference={isReadingPreference}
					/>
				</TabPanel>
			</TabContext>
		</Box>
	);
}
