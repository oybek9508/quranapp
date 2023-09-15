import { useMemo } from "react";
import { useSelector } from "react-redux";
import { selectLastReadVerseKey } from "src/redux/slices/QuranReader/readingTracker";
import { getJuzIds, getJuzNavigationUrl, getJuzNumberByHizb } from "src/utils/juz";
import ScrollableSelection from "./ScrollableSelection";

const JuzSelection = () => {
	const juzIds = getJuzIds();
	const lastReadVerseKey = useSelector(selectLastReadVerseKey);

	const selectedJuz = useMemo(() => getJuzNumberByHizb(Number(lastReadVerseKey.hizb)), [lastReadVerseKey.hizb]);

	return (
		<ScrollableSelection
			items={juzIds}
			getHref={getJuzNavigationUrl}
			searchPlaceholder="Search Juz"
			renderItem={(juz) => `Juz ${juz.label}`}
			selectedItem={selectedJuz}
		/>
	);
};

export default JuzSelection;
