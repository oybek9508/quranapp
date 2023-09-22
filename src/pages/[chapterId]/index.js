/* eslint-disable react-hooks/rules-of-hooks */
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { getDefaultWordFields } from "src/api/api";
import { getChapterVerses } from "src/api/quran-chapter-api";
import { getPagesLookup } from "src/api/quran-page-api";
import ReadingPreferenceTab from "src/components/QuranReader/ReadingPreferenceTab";
import { QuranReaderDataType } from "src/constants/QuranReader";
import DataContext from "src/context/DataContext";
import { getQuranReaderStylesInitialState } from "src/redux/defaultSettings/util";
import { getMushafId } from "src/utils/api";
import { getAllChaptersData, getChapterData } from "src/utils/chapters";
import { formatStringNumber } from "src/utils/number";
import {
	ONE_WEEK_REVALIDATION_PERIOD_SECONDS,
	REVALIDATION_PERIOD_ON_ERROR_SECONDS,
} from "src/utils/staticPageGeneration";
import { isValidChapterId } from "src/utils/validator";
import { generateVerseKeysBetweenTwoVerseKeys } from "src/utils/verseKeys";
// import Error from "../_error";

const SurahDetail = (props) => {
	const state = useSelector((state) => state.theme);
	const { chapterData, chapterResponse, hasError, chaptersData, chapterId, isChapter, pagesLookupResponse } = props;

	if (hasError) {
		console.log("hasError", hasError);
		// return <Error statusCode={500} />;
	}

	return (
		<DataContext.Provider value={chaptersData}>
			<Grid sx={{ px: 3, mt: 4 }}>
				<ReadingPreferenceTab
					initialData={chapterData}
					id={chapterResponse.chapter.id}
					// singleChapter={{ ...chaptersData[chapterId], id: chapterId }}
					quranReaderType={isChapter ? QuranReaderDataType.Chapter : QuranReaderDataType.Verse}
				/>
			</Grid>
		</DataContext.Provider>
	);
};

export const getStaticProps = async ({ params, locale = "en" }) => {
	let chapterIdOrVerseKeyOrSlug = String(params.chapterId);
	let isChapter = isValidChapterId(chapterIdOrVerseKeyOrSlug);
	const chaptersData = await getAllChaptersData();

	// initialize the value as if it's chapter
	let chapterId = chapterIdOrVerseKeyOrSlug;
	if (!isValidChapterId(chapterId)) {
		return {
			notFound: true,
		};
	}

	const defaultMushafId = getMushafId(
		getQuranReaderStylesInitialState(locale).quranFont,
		getQuranReaderStylesInitialState(locale).mushafLines
	).mushaf;

	let apiParams = {
		...getDefaultWordFields(getQuranReaderStylesInitialState((locale = "en")).quranFont),
		mushaf: defaultMushafId,
	};
	let numberOfVerses = 1;
	let pagesLookupResponse = null;

	try {
		if (!isChapter) {
			pagesLookupResponse = await getPagesLookup({
				chapterNumber: Number(chapterId),
				mushaf: defaultMushafId,
				from: chapterIdOrVerseKeyOrSlug,
				to: chapterIdOrVerseKeyOrSlug,
			});
		} else {
			pagesLookupResponse = await getPagesLookup({
				chapterNumber: Number(chapterId),
				mushaf: 2,
			});
			numberOfVerses = generateVerseKeysBetweenTwoVerseKeys(
				chaptersData,
				pagesLookupResponse.lookupRange.from,
				pagesLookupResponse.lookupRange.to
			).length;

			const firstPageOfChapter = Object.keys(pagesLookupResponse.pages)[0];
			const firstPageOfChapterLookup = pagesLookupResponse.pages[firstPageOfChapter];
			apiParams = {
				...apiParams,
				...{
					perPage: "all",
					from: firstPageOfChapterLookup.from,
					to: firstPageOfChapterLookup.to,
				},
			};
		}
		const chapterData = await getChapterVerses(formatStringNumber(chapterId), locale, apiParams);

		const metaData = { numberOfVerses };
		chapterData.metaData = metaData;
		chapterData.pagesLookup = pagesLookupResponse;

		return {
			props: {
				pagesLookupResponse,
				chapterResponse: {
					chapter: {
						...getChapterData(chaptersData, chapterId),
						id: chapterId,
					},
				},
				chapterData,
				chaptersData,
				isChapter,
				chapterId,
			},
			revalidate: ONE_WEEK_REVALIDATION_PERIOD_SECONDS,
		};
	} catch (error) {
		return {
			props: {
				hasError: true,
			},
			revalidate: REVALIDATION_PERIOD_ON_ERROR_SECONDS,
		};
	}
};

export const getStaticPaths = async () => ({
	paths: [], // no pre-rendered chapters at build time.
	fallback: "blocking", // will server-render pages on-demand if the path doesn't exist.
});

export default SurahDetail;
