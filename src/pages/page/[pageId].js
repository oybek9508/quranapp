import { useRouter } from "next/router";
import { getDefaultWordFields } from "src/api/api";
import { getPagesLookup } from "src/api/quran-page-api";
import ReadingPreferenceTab from "src/components/QuranReader/ReadingPreferenceTab";
import { QuranReaderDataType } from "src/constants/QuranReader";
import DataContext from "src/context/DataContext";
import { getQuranReaderStylesInitialState } from "src/redux/defaultSettings/util";
import { getMushafId } from "src/utils/api";
import { getAllChaptersData } from "src/utils/chapters";
import {
	ONE_WEEK_REVALIDATION_PERIOD_SECONDS,
	REVALIDATION_PERIOD_ON_ERROR_SECONDS,
} from "src/utils/staticPageGeneration";
import { isValidPageId } from "src/utils/validator";
// import Error from "../_error";

const Page = ({ chaptersData, pageVerses, hasError }) => {
	const router = useRouter();
	const {
		query: { pageId },
	} = router;

	if (hasError) {
		console.log("hasError", hasError);
		// return <Error statusCode={500} />;
	}

	return (
		<DataContext.Provider value={chaptersData}>
			<ReadingPreferenceTab
				initialData={pageVerses}
				id={String(pageId)}
				quranReaderType={QuranReaderDataType.Page}
			/>
		</DataContext.Provider>
	);
};

// export const getStaticProps = async ({ params, locale }) => {
//   let pageId = String(params.pageId);

//   if (!isValidPageId(pageId)) {
//     return {
//       notFound: true,
//     };
//   }

//   const defaultMushafId = getMushafId(
//     getQuranReaderStylesInitialState(locale).quranFont,
//     getQuranReaderStylesInitialState(locale).mushafLines
//   ).mushaf;

//   try {
//     const chaptersData = await getAllChaptersData(locale);
//     const pageData = await getVersesByPage(pageId, locale, {
//       perPage: "all",
//       mushaf: defaultMushafId,
//       filterPageWords: true,
//       ...getDefaultWordFields(getQuranReaderStylesInitialState().quranFont),
//     });

//     const pagesLookupResponse = await getPagesLookup({
//       pageNumber: Number(pageId),
//       mushaf: defaultMushafId,
//     });

//     return {
//       props: {
//         chaptersData,
//         pageVerses: {
//           ...pageData,
//           pagesLookup: pagesLookupResponse,
//           metaData: { numberOfVerses: pageVersesResponse.verses.length },
//         },
//       },
//       revalidate: ONE_WEEK_REVALIDATION_PERIOD_SECONDS,
//     };
//   } catch (error) {
//     return {
//       props: {
//         hasError: true,
//       },
//       revalidate: REVALIDATION_PERIOD_ON_ERROR_SECONDS,
//     };
//   }
// };

// export const getStaticPaths = async () => ({
//   paths: [], // no pre-rendered chapters at build time.
//   fallback: "blocking", // will server-render pages on-demand if the path doesn't exist.
// });

export const getStaticProps = async ({ params, locale }) => {
	const pageId = String(params.pageId);
	// we need to validate the pageId first to save calling BE since we haven't set the valid paths inside getStaticPaths to avoid pre-rendering them at build time.
	if (!isValidPageId(pageId)) {
		return {
			notFound: true,
		};
	}
	const defaultMushafId = getMushafId(
		getQuranReaderStylesInitialState(locale).quranFont,
		getQuranReaderStylesInitialState(locale).mushafLines
	).mushaf;
	try {
		const pageVersesResponse = await getPageVerses(pageId, locale, {
			perPage: "all",
			mushaf: defaultMushafId,
			filterPageWords: true,
			...getDefaultWordFields(getQuranReaderStylesInitialState(locale).quranFont),
		});
		const pagesLookupResponse = await getPagesLookup({
			pageNumber: Number(pageId),
			mushaf: defaultMushafId,
		});
		const chaptersData = await getAllChaptersData();
		return {
			props: {
				chaptersData,
				pageVerses: {
					...pageVersesResponse,
					pagesLookup: pagesLookupResponse,
					metaData: { numberOfVerses: pageVersesResponse.verses.length },
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

export default Page;
