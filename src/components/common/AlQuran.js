import { Grid } from "@mui/material";
import { shallowEqual, useSelector } from "react-redux";
import { selectTheme } from "src/redux/slices/theme";
import { ThemeTypes } from "src/styles/theme/modes";
import AlQuranSVG from "../../../public/assets/images/alquranul-karim.svg";

const AlQuran = () => {
	const { type } = useSelector(selectTheme, shallowEqual);
	return (
		<Grid>
			<AlQuranSVG
				width={250}
				height={140}
				fill={(type === ThemeTypes.Dark || type === ThemeTypes.Blue) && "#fff"}
			/>
		</Grid>
	);
};

export default AlQuran;
