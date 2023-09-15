import { useSelector } from "@xstate/react";
import Fuse from "fuse.js";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import QueryParam from "src/constants/QuranParam";
import { AudioPlayerMachineContext } from "src/xstate/AudioPlayerMachineContext";

const filterReciters = (reciters, searchQuery) => {
	const fuse = new Fuse(reciters, {
		keys: ["name", "languageName", "translatedName.name"],
		threshold: 0.3,
	});

	const filteredReciter = fuse.search(searchQuery).map((item) => item);

	return filteredReciter;
};

const DEFAULT_RECITATION_STYLE = "Murattal";

const ReciterSelection = () => {
	// const {
	//     isLoading,
	//     actions: { onXstateSettingsChange },
	//   } = usePersistPreferenceGroup();

	const router = useRouter();
	const [searchQuery, setSearchQuery] = useState("");

	const audioService = useContext(AudioPlayerMachineContext);
	const selectedReciterId = useSelector(audioService, (state) => state.context.reciterId);

	const onSelectedReciterChange = (reciterId, reciters) => {
		if (!reciterId) return;
		const reciter = reciters.find((r) => r.id === Number(reciterId));
		router.query[QueryParam.Reciter] = String(reciter.id);
		router.push(router, undefined, { shallow: true });

		const previousReciterId = selectedReciterId;
		onXstateSettingsChange(
			"reciter",
			reciter.id,
			() =>
				audioService.send({
					type: "CHANGE_RECITER",
					reciterId: Number(reciterId),
				}),
			() =>
				audioService.send({
					type: "CHANGE_RECITER",
					reciterId: previousReciterId,
				}),
			PreferenceGroup.AUDIO
		);
	};

	return <div>ReciterSelection</div>;
};

export default ReciterSelection;
