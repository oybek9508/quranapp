import { Box, Grid, Typography, useTheme } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";

const Info = ({ chapterInfo, chapterResponse }) => {
	const router = useRouter();
	const theme = useTheme();
	const { chapter } = chapterResponse;
	return (
		<Grid container sx={{ maxWidth: "80%", pt: 2, mx: "auto" }}>
			<Grid>
				<Box
					sx={{
						height: "50px",
						display: "grid",
						placeContent: "center",
						cursor: "pointer",
						mb: 2,
						"&:hover": {
							bgcolor: theme.palette.background.paper,
							borderRadius: "5px",
						},
					}}
					onClick={() => router.push(`/${chapterInfo.chapterId}`)}
				>
					<Typography> {"<-"} Go to Surah</Typography>
				</Box>
				<Box>
					<Image
						width={200}
						height={200}
						component="img"
						src={
							chapter?.revelationPlace === "makkah"
								? "/assets/images/makkah.jpeg"
								: "/assets/images/madina.jpeg"
						}
						alt={chapter?.revelationPlace}
					/>
				</Box>
			</Grid>
			<Grid sx={{ flex: 1, ml: 2 }}>
				<Box
					sx={{
						width: "100%",
						height: "60px",
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<Box>
						<Typography>Surah {chapter?.transliteratedName}</Typography>
					</Box>
					<Box>
						<Typography>Ayahs</Typography>
						<Typography>{chapter?.versesCount}</Typography>
					</Box>
					<Box>
						<Typography>Revelation Place</Typography>
						<Typography>
							{chapter?.revelationPlace.charAt(0).toUpperCase() +
								chapter?.revelationPlace.slice(1).toLowerCase()}
						</Typography>
					</Box>
				</Box>
				<div dangerouslySetInnerHTML={{ __html: chapterInfo.text }} />
			</Grid>
		</Grid>
	);
};

export default Info;
