import CloseIcon from "@mui/icons-material/Close";
import { Divider, Grid, Toolbar, Typography, useTheme } from "@mui/material";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import React, { useContext } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import DataContext from "src/context/DataContext";
import { selectNavbar, setIsSearchDrawerOpen } from "src/redux/slices/navbar";
import SearchTypeTabs from "./SearchTypeTabs";

const Header = ({ toggleDrawer }) => {
	return (
		<Grid container justifyContent="space-between" px={2} py={2}>
			<Typography>Settings</Typography>
			<CloseIcon onClick={toggleDrawer(false)} />
		</Grid>
	);
};

const SearchDrawer = () => {
	const dispatch = useDispatch();
	const theme = useTheme();
	const chaptersData = useContext(DataContext);

	const { isSearchDrawerOpen } = useSelector(selectNavbar, shallowEqual);

	const toggleDrawer = () => (event) => {
		if (event && event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
			return;
		}
		dispatch(setIsSearchDrawerOpen(!isSearchDrawerOpen));
	};

	return (
		<Grid>
			<React.Fragment>
				<SwipeableDrawer
					anchor="left"
					open={isSearchDrawerOpen}
					onClose={toggleDrawer(false)}
					onOpen={toggleDrawer(true)}
					transitionDuration={500}
					sx={{ zIndex: theme.zIndex.appBar - 200 }}
					PaperProps={{
						sx: {
							width: "450px",
							//   overflow: "hidden",
						},
					}}
					BackdropProps={{ invisible: true }}
				>
					<Toolbar />
					<Toolbar />
					{/* <Box sx={{ height: "40px" }} /> */}
					<Header toggleDrawer={toggleDrawer} />
					<Divider />
					<SearchTypeTabs />
				</SwipeableDrawer>
			</React.Fragment>
		</Grid>
	);
};

export default SearchDrawer;
