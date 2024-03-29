import { useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

export default function BasicTabs(props) {
	const theme = useTheme();
	const { value, lists, handleChange } = props;

	return (
		<Box
			sx={(theme) => ({
				bgcolor: theme.palette.background.default,
			})}
		>
			<Box>
				<Tabs
					indicatorColor={""}
					value={value}
					onChange={handleChange}
					aria-label="basic tabs example"
					sx={{
						width: "100%",
						display: "flex",
						justifyContent: "space-between",
						bgcolor: theme.palette.background.default,
						p: 1,
					}}
				>
					{lists.map((list) => (
						<Tab
							key={list.label}
							label={list.label}
							value={list.value}
							sx={{
								flex: 1,

								// "&:hover": { backgroundColor: "blue" },
								// "&:focus": { backgroundColor: "yellow" },
								// "&:active": { bgcolor: theme.palette.background.paper },
								"&.MuiTab-root.Mui-selected": {
									bgcolor: theme.palette.background.paper,
								},
							}}
						/>
					))}
				</Tabs>
			</Box>
		</Box>
	);
}

{
	/* <Tab label="usmani" value="usmani" />
<Tab label="indopak" value="indopak" />
<Tab label="tajweed" value="tajweed" /> */
}
