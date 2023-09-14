import { Grid } from "@mui/material";
import React, { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { makeAvailableRecitersUrl } from "src/api/apiPaths";
import SelectionCard from "src/components/common/SelectionCard";
import DataFetcher from "src/components/DataFetcher";
import { useSelector as useXstateSelector } from "@xstate/react";
import { setSettingsView, SettingsView } from "src/redux/slices/navbar";
import Section from "./Section";
import { AudioPlayerMachineContext } from "src/xstate/AudioPlayerMachineContext";

const AudioSection = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const dispatch = useDispatch();
	const onSelectionCardClicked = () => {
		dispatch(setSettingsView(SettingsView.Reciter));
	};
	const audioService = useContext(AudioPlayerMachineContext);
	const selectedReciterId = useXstateSelector(
		audioService,
		(state) => state.context.reciterId
	);

	return (
		<Grid>
			<Section>
				<Section.Title>Audio</Section.Title>
				<Section.Raw>
					<DataFetcher
						queryKey={makeAvailableRecitersUrl("en")}
						render={(data) => {
							const selectedReciter = data.reciters.find(
								(reciter) => reciter.id === selectedReciterId
							);
							return (
								<SelectionCard
									label="Selected Reciter"
									value={
										selectedReciter.translatedName
											? selectedReciter.translatedName.name
											: selectedReciter.name
									}
									onClick={onSelectionCardClicked}
								/>
							);
						}}
					/>
				</Section.Raw>
			</Section>
		</Grid>
	);
};

export default AudioSection;
