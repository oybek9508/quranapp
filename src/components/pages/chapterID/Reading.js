import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { BASE_URL } from "/src/api/api";
import { useSingleSurah } from "/src/api/quran-chapter-api";
import Header from "/src/components/Header";
import { Box, Grid, Typography } from "@mui/material";
import { useUthmaniScript, useUthmaniTajweedScript } from "/src/api/quran-api";
import { useChaperAudioForEachAyah } from "/src/api/quran-audio-api";
import Order from "/src/components/ayah/Order";
import SingleAyahPlayer from "/src/components/audio/SingleAyahPlayer";
import ReadingPreferenceTab from "./ReadingPreferenceTab";

const Reading = ({ initialData }) => {
  const [currentVerse, setCurrentVerse] = useState({ meta: {}, verses: [] });

  return (
    <Grid sx={{ px: 3, mt: 4 }}>
      {/* <Banner data={data} /> */}
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        <span style={{ wordBreak: "break-all" }}>
          {initialData?.verses?.map((verse, idx) => (
            <Typography
              variant="span"
              key={verse?.id}
              onClick={() => {
                console.log(
                  "audioData?.audio_files?[idx]"
                  // audioData?.audio_files[idx].url
                );
              }}
            >
              {/* <SingleAyahPlayer src={audioData?.audio_files[idx]?.url} /> */}
              <Typography
                variant="span"
                key={verse?.id}
                style={{ fontSize: "36px", fontFamily: "IndoPak" }}
              >
                {verse?.textUthmani}
              </Typography>
              <span>
                <Order number={verse?.verseNumber} />
              </span>
            </Typography>
          ))}
        </span>
      </Box>
    </Grid>
  );
};

export default Reading;
