import { Grid } from "@mui/material";
import { useMemo, useRef, useState } from "react";
import { Virtuoso } from "react-virtuoso";
import useFetchPagesLookup from "src/hooks/useFetchPagesLookup";
import PageContainer from "./PageContainer";

const INCREASE_VIEWPORT_BY_PIXELS = 1200;

const ReadingView = (props) => {
	const { quranReaderStyles, initialData, resourceId, quranReaderType, isReadingPreference } = props;
	const virtuosoRef = useRef(null);
	const [mushafPageToVersesMap, setMushafPageToVersesMap] = useState({
		[initialData.verses[0].pageNumber]: initialData.verses,
	});

	const verses = useMemo(() => Object.values(mushafPageToVersesMap).flat(), [mushafPageToVersesMap]);

	// useQcfFont(quranFont, verses);
	const { pagesCount, hasError, pagesVersesRange, isLoading } = useFetchPagesLookup(
		resourceId,
		quranReaderType,
		initialData,
		quranReaderStyles
		// isUsingDefaultFont
	);

	const { quranFont, mushafLines, quranTextFontScale } = quranReaderStyles;

	const itemContentRenderer = (pageIndex) => (
		<PageContainer
			isUsingDefaultFont={true}
			pagesVersesRange={pagesVersesRange}
			quranReaderStyles={quranReaderStyles}
			// reciterId={reciterId}
			// lang={lang}
			// wordByWordLocale={wordByWordLocale}
			pageIndex={pageIndex}
			setMushafPageToVersesMap={setMushafPageToVersesMap}
			initialData={initialData}
		/>
	);

	return (
		<Grid sx={{ px: { xs: 0, sm: 3 }, mt: 4 }}>
			<Virtuoso
				totalCount={pagesCount}
				useWindowScroll
				increaseViewportBy={INCREASE_VIEWPORT_BY_PIXELS}
				initialItemCount={1}
				itemContent={itemContentRenderer}
			/>
		</Grid>
	);
};

export default ReadingView;
