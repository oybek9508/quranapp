import { Box, ThemeProvider, Typography } from "@mui/material";
import Head from "next/head";
import { useSelector } from "react-redux";
import ChapterJuzPage from "src/components/home/ChapterJuzPage";
import Header from "src/components/home/Header";
import DataContext from "src/context/DataContext";
import { getAllChaptersData } from "src/utils/chapters";

const Home = ({ chaptersData, chaptersResponse: { chapters } }) => {
	const state = useSelector((state) => state);

	return (
		<ThemeProvider>
			<Head>
				<title>main quran page</title>
			</Head>
			<DataContext.Provider value={chaptersData}>
				<Box sx={{ px: "20px", pt: "20px" }}>
					<Typography sx={{ fontSize: "18px" }}>Assalomu Alaykum</Typography>
					<Typography
						sx={{
							fontSize: "18px",
						}}
					>
						Oybek Toshmatov
					</Typography>
					<Header />
					{/* <MainBanner /> */}
					<ChapterJuzPage chapters={chapters} />
				</Box>
			</DataContext.Provider>
		</ThemeProvider>
	);
};

export const getStaticProps = async ({ params, locale }) => {
	const chaptersData = await getAllChaptersData(locale);

	return {
		props: {
			chaptersData,
			chaptersResponse: {
				chapters: Object.keys(chaptersData).map((chapterId) => {
					const chapterData = chaptersData[chapterId];
					return {
						...chapterData,
						id: Number(chapterId),
					};
				}),
			},
		},
	};
};

export default Home;
