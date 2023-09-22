import { Grid } from "@mui/material";
import { useMemo, useRef, useState } from "react";
import { Virtuoso } from "react-virtuoso";
import QueryParam from "src/constants/QuranParam";
import useGetQueryParamOrReduxValue from "src/hooks/useGetQueryParamOrReduxValue";
import { getNumberOfPages } from "../utils/page";
import TranslationPage from "./TranslationPage";
// import { useSingleChapterTranslation } from "src/api/quran-translation";

const INCREASE_VIEWPORT_BY_PIXELS = 1000;

const TranslationView = ({ initialData, resourceId, quranReaderType, quranReaderStyles, wordByWordLocale = false }) => {
	const [apiPageToVersesMap, setApiPageToVersesMap] = useState({
		1: initialData?.verses,
	});

	const virtuosoRef = useRef(null);

	const numberOfPages = useMemo(
		() => getNumberOfPages(initialData?.metaData?.numberOfVerses, initialData?.pagination?.perPage),
		[initialData?.metaData?.numberOfVerses, initialData?.pagination?.perPage]
	);

	const {
		value: selectedTranslations,
		// isQueryParamDifferent: translationsQueryParamDifferent,
	} = useGetQueryParamOrReduxValue(QueryParam.Translations);

	const verses = useMemo(() => Object.values(apiPageToVersesMap).flat(), [apiPageToVersesMap]);

	const itemContentRenderer = (currentPageIndex) => {
		return (
			<TranslationPage
				pageNumber={currentPageIndex + 1}
				quranReaderType={quranReaderType}
				quranReaderStyles={quranReaderStyles}
				setApiPageToVersesMap={setApiPageToVersesMap}
				selectedTranslations={selectedTranslations}
				wordByWordLocale={wordByWordLocale}
				reciterId={1}
				initialData={initialData}
				resourceId={resourceId}
			/>
		);
	};

	return (
		<Grid sx={{ width: "100%" }}>
			{/* <TranslationHeader initialData={initialData} />
      <AyahList initialData={initialData} value={value} /> */}
			<Grid>
				<Virtuoso
					ref={virtuosoRef}
					useWindowScroll
					totalCount={numberOfPages}
					increaseViewportBy={INCREASE_VIEWPORT_BY_PIXELS}
					initialItemCount={1} // needed for SSR.
					itemContent={itemContentRenderer}
					// components={{
					//   Footer: () => (
					//     <EndOfScrollingControls
					//       quranReaderDataType={quranReaderDataType}
					//       lastVerse={verses[verses.length - 1]}
					//       initialData={initialData}
					//     />
					//   ),
					// }}
				/>
			</Grid>
		</Grid>
	);
};

export default TranslationView;
