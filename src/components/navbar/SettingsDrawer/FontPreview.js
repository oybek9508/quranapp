import { Grid, useTheme } from "@mui/material";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import PlainVerseText from "src/components/verse/PlainVerseText";
import { QuranFont } from "src/constants/QuranReader";
import { selectQuranReaderStyles } from "src/redux/slices/QuranReader/styles";
import { selectTheme } from "src/redux/slices/theme";
import getSampleVerse from "src/utils/sampleVerse";
import useSWR from "swr";

const SWR_SAMPLE_VERSE_KEY = "sample-verse";

const fetcher = (url) => fetch(url).then((res) => res.json());

const FontPreview = (props) => {
	const theme = useTheme();
	const { type } = useSelector(selectTheme, shallowEqual);
	const dispatch = useDispatch();
	const quranReaderStyles = useSelector(selectQuranReaderStyles, shallowEqual);
	const { quranFont } = quranReaderStyles;
	const isTajweed = quranFont === QuranFont.Tajweed;
	const { data: sampleVerse } = useSWR(SWR_SAMPLE_VERSE_KEY, () => getSampleVerse());

	let verse;
	if (isTajweed) {
		verse = {
			...sampleVerse,
			words: sampleVerse.words.map((word) => ({
				...word,
				text: word.textImage,
			})),
		};
	} else {
		verse = sampleVerse;
	}

	return (
		<Grid mt={4} sx={{ bgcolor: theme.palette.background.default, p: 3 }}>
			<PlainVerseText words={verse?.words} />
		</Grid>
	);
};

export default FontPreview;
