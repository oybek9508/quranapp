import { Grid, useTheme } from "@mui/material";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import Fuse from "fuse.js";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import DataContext from "src/context/DataContext";
import { selectLastReadVerseKey } from "src/redux/slices/QuranReader/readingTracker";

const filterSurah = (surah, searchQuery) => {
	const fuse = new Fuse(surah, {
		threshold: 0.3,
		keys: ["id", "transliteratedName"],
	});

	const filteredSurah = fuse.search(searchQuery).map(({ item }) => item);
	if (!filteredSurah.length) return;
	return filteredSurah;
};

const SurahList = () => {
	const theme = useTheme();
	const lastReadVerseKey = useSelector(selectLastReadVerseKey);
	const currentChapterId = lastReadVerseKey.chapterId;

	const router = useRouter();
	const chaptersData = useContext(DataContext);

	const [searchQuery, setSearchQuery] = useState("");

	const chapterDataArray = useMemo(
		() =>
			Object.entries(chaptersData).map(([id, chapter]) => {
				return {
					...chapter,
					id,
					localizedId: Number(id),
				};
			}),
		[chaptersData]
	);

	const filteredChapters = searchQuery ? filterSurah(chapterDataArray, searchQuery) : chapterDataArray;

	// Handle when user press `Enter` in input box
	const handleSurahInputSubmit = (e) => {
		e.preventDefault();
		const firstFilteredChapter = filteredChapters[0];
		if (firstFilteredChapter) {
			router.push(getSurahNavigationUrl(firstFilteredChapter.id));
		}
	};

	return (
		<Grid container direction="column" sx={{ flex: 1, height: "100%" }}>
			<form onSubmit={handleSurahInputSubmit}>
				<input
					style={{
						boxSizing: "border-box",
						border: "none",
						// width: "100%",
						height: "40px",
						paddingLeft: "16px",
						paddingRight: "16px",
						color: theme.palette.text.primary,
						backgroundColor: theme.palette.background.default,
						outline: "none",
						"&::placeholder": {
							fontSize: "18px",
						},
					}}
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					placeholder="Search surah"
				/>
			</form>
			<Grid sx={{ flex: 1, position: "relative", mt: 2 }}>
				<List
					sx={{
						overflowY: "scroll",
						position: "relative",
						height: "inherit",
						width: "100%",
					}}
				>
					{filteredChapters?.map((chapter) => (
						<Link key={chapter.id} href={`/${chapter.id}`} shouldPrefetch={false}>
							<ListItemButton
								sx={{ display: "flex", flex: 1, px: 2 }}
								selected={chapter.id.toString() === router.query.chapterId}
							>
								{/* ref = {chapter.id.toString() === currentChapterId ? selectedChapterRef : null} */}

								<span>{chapter.localizedId}</span>
								<span style={{ marginLeft: "24px" }}>{chapter.transliteratedName}</span>
							</ListItemButton>
						</Link>
					))}
				</List>
			</Grid>
		</Grid>
	);
};

export default SurahList;
