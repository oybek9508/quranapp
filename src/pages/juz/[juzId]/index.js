import { useRouter } from "next/router";
import { useState } from "react";
import { getDefaultWordFields } from "src/api/api";
import { getJuzVerses } from "src/api/quran-juz-api";
import { getPagesLookup } from "src/api/quran-page-api";
import ReadingPreferenceTab from "src/components/QuranReader/ReadingPreferenceTab";
import { QuranReaderDataType } from "src/constants/QuranReader";
import DataContext from "src/context/DataContext";
import Error from "src/pages/_error";
import { getQuranReaderStylesInitialState } from "src/redux/defaultSettings/util";
import { getMushafId } from "src/utils/api";
import { getAllChaptersData } from "src/utils/chapters";
import { formatStringNumber } from "src/utils/number";
import {
	ONE_WEEK_REVALIDATION_PERIOD_SECONDS,
	REVALIDATION_PERIOD_ON_ERROR_SECONDS,
} from "src/utils/staticPageGeneration";
import { isValidJuzId } from "src/utils/validator";
import { generateVerseKeysBetweenTwoVerseKeys } from "src/utils/verseKeys";

const JuzPage = ({ chaptersData, juzVerses, hasError }) => {
	const router = useRouter();
	const {
		query: { juzId },
	} = router;
	const [juzMappings, setJuzMappings] = useState([]);

	if (hasError) {
		return <Error statusCode={500} />;
	}
	return (
		<DataContext.Provider value={chaptersData}>
			<ReadingPreferenceTab
				initialData={juzVerses}
				id={String(juzId)}
				quranReaderType={QuranReaderDataType.Juz}
			/>
		</DataContext.Provider>
	);
};

export const getStaticProps = async ({ params, locale }) => {
	let juzId = String(params.juzId);
	if (!isValidJuzId(juzId)) {
		return {
			notFound: true,
		};
	}
	const chaptersData = await getAllChaptersData(locale);
	juzId = formatStringNumber(juzId);

	const defaultMushafId = getMushafId(
		getQuranReaderStylesInitialState(locale).quranFont,
		getQuranReaderStylesInitialState(locale).mushafLines
	).mushaf;

	let apiParams = {
		...getDefaultWordFields(getQuranReaderStylesInitialState(locale).quranFont),
		mushaf: defaultMushafId,
	};

	try {
		const pagesLookupResponse = await getPagesLookup({
			juzNumber: Number(juzId),
			mushaf: defaultMushafId,
		});
		const firstPageOfJuz = Object.keys(pagesLookupResponse.pages)[0];
		const firstPageOfJuzLookup = pagesLookupResponse.pages[firstPageOfJuz];

		const numberOfVerses = generateVerseKeysBetweenTwoVerseKeys(
			chaptersData,
			pagesLookupResponse.lookupRange.from,
			pagesLookupResponse.lookupRange.to
		).length;

		apiParams = {
			...apiParams,
			...{
				perPage: "all",
				from: firstPageOfJuzLookup.from,
				to: firstPageOfJuzLookup.to,
			},
		};

		const juzVersesResponse = await getJuzVerses(juzId, locale, apiParams);
		const metaData = { numberOfVerses };
		return {
			props: {
				chaptersData,
				juzVerses: {
					...juzVersesResponse,
					pagesLookup: pagesLookupResponse,
					metaData,
				},
			},
			revalidate: ONE_WEEK_REVALIDATION_PERIOD_SECONDS, // verses will be generated at runtime if not found in the cache, then cached for subsequent requests for 7 days.
		};
	} catch (error) {
		return {
			props: {
				hasError: true,
			},
			revalidate: REVALIDATION_PERIOD_ON_ERROR_SECONDS, // 35 seconds will be enough time before we re-try generating the page again.
		};
	}
};

export const getStaticPaths = async () => ({
	paths: [], // no pre-rendered chapters at build time.
	fallback: "blocking", // will server-render pages on-demand if the path doesn't exist.
});

export default JuzPage;
