import { Grid, Typography, useTheme } from "@mui/material";
import React, { useCallback, useContext, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { useSelector as useXstateSelector } from "@xstate/react";
import ReadingViewWordPopover from "src/components/QuranReader/Reading/ReadingViewWordPopover";
import ReadingPreferenceTab from "src/components/QuranReader/ReadingPreferenceTab";
import {
	QuranFont,
	ReadingPreference,
	WordClickFunctionality,
} from "src/constants/QuranReader";
import { CharType } from "src/constants/word";
import {
	selectReadingPreferences,
	selectWordClickFunctionality,
} from "src/redux/slices/QuranReader/readingPreferences";
import { selectQuranReaderStyles } from "src/redux/slices/QuranReader/styles";
import { QURANCDN_AUDIO_BASE_URL } from "src/utils/audio";
import { milliSecondsToSeconds } from "src/utils/datetime";
import { isQCFFont } from "src/utils/fontFaceHelper";
import { getChapterNumberFromKey, makeWordLocation } from "src/utils/verse";
import { getWordTimeSegment } from "src/xstate/actors/audioPlayer/audioPlayerMachineHelper";
import { AudioPlayerMachineContext } from "src/xstate/AudioPlayerMachineContext";
import GlyphWord from "./GlyphWord";
import playWordAudio from "./playWordAudio";
import TajweedWord from "./TajweedWordImage";
import TextWord from "./TextWord";

const Wrapper = ({ children, shouldWrap, wrapper }) =>
	shouldWrap ? wrapper(children) : children;

const QuranWord = (props) => {
	const theme = useTheme();
	const {
		word,
		font,
		isFontLoaded,
		isHighlighted,
		isAudioHighlightingAllowed = true,
		shouldShowSecondaryHighlight,
	} = props;
	const quranReaderStyles = useSelector(selectQuranReaderStyles, shallowEqual);
	const { quranFont } = quranReaderStyles;

	const readingPreference = useSelector(selectReadingPreferences);
	const wordClickFunctionality = useSelector(
		selectWordClickFunctionality,
		shallowEqual
	);
	const wordLocation = makeWordLocation(word.verseKey, word.position);
	let wordText = null;

	const audioService = useContext(AudioPlayerMachineContext);

	// Determine if the audio player is currently playing the word
	const isAudioPlayingWord = useXstateSelector(audioService, (state) => {
		const { surah, ayahNumber, wordLocation: wordPosition } = state.context;
		return `${surah}:${ayahNumber}:${wordPosition}` === wordLocation;
	});

	const shouldHightlightWord =
		isHighlighted || (isAudioHighlightingAllowed && isAudioPlayingWord);

	if (quranFont === QuranFont.QPCHafs) {
		wordText = (
			<GlyphWord
				font={font}
				qpcUthmaniHafs={word.qpcUthmaniHafs}
				pageNumber={word.pageNumber}
				textCodeV1={word?.codeV1}
				textCodeV2={word?.codeV2}
				isFontLoaded={isFontLoaded}
			/>
		);
	} else if (quranFont === QuranFont.Tajweed) {
		wordText = <TajweedWord path={word.text} alt={word.textUthmani} />;
	} else if (quranFont === QuranFont.IndoPak) {
		wordText = (
			<TextWord font={font} text={word.text} charType={word.charTypeName} />
		);
	}

	const onClick = useCallback(() => {
		if (wordClickFunctionality === WordClickFunctionality.PlayAudio) {
			const currentState = audioService.getSnapshot();
			const isPlaying = currentState.matches(
				"VISIBLE.AUDIO_PLAYER_INITIATED.PLAYING"
			);
			const currentSurah = getChapterNumberFromKey(word.verseKey);
			const isSameSurah = currentState.context.surah === Number(currentSurah);
			const shouldSeekTo = isPlaying && isSameSurah;
			if (shouldSeekTo) {
				const wordSegment = getWordTimeSegment(
					currentState.context.audioData.verseTimings,
					word
				);
				if (!wordSegment) return;
				const [startTime] = wordSegment;
				audioService.send({
					type: "SEEK_TO",
					timestamp: milliSecondsToSeconds(startTime),
				});
			} else {
				playWordAudio(word);
			}
		} else {
		}
	}, [audioService, word, wordClickFunctionality]);

	const shouldHandleWordClicking =
		readingPreference.readingPreference === ReadingPreference.Translation &&
		word.charTypeName !== CharType.End;

	const handleAudioPlayForSingleWord = (word) => {
		playWordAudio(word);
	};

	return (
		<Grid
			tabIndex={0}
			role="button"
			{...(shouldHandleWordClicking && {
				onClick: () => handleAudioPlayForSingleWord(word),
			})}
			{...(shouldHandleWordClicking && { onClick, onKeyPress: onClick })}
			sx={{
				"&:focus": {
					bgcolor: theme.palette.background.paper,
				},
				bgcolor:
					shouldHightlightWord && quranFont === QuranFont.Tajweed && "#596381",
				color:
					shouldHightlightWord && quranFont !== QuranFont.Tajweed && "#35bcbf",
			}}
		>
			<Wrapper
				// shouldWrap
				wrapper={(children) =>
					readingPreference.readingPreference ===
					ReadingPreference.Translation ? (
						<div>{children}</div>
					) : (
						<ReadingViewWordPopover word={word}>
							{children}
						</ReadingViewWordPopover>
					)
				}
			>
				{wordText}
			</Wrapper>
		</Grid>
	);
};

export default QuranWord;
