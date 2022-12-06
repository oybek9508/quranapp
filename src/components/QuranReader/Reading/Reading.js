import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { BASE_URL } from "/src/api/api";
import { useSingleSurah } from "/src/api/quran-chapter-api";
import Header from "/src/components/Header";
import { Box, Card, CardMedia, Grid, Typography } from "@mui/material";
import { useUthmaniScript, useUthmaniTajweedScript } from "/src/api/quran-api";
import { useChaperAudioForEachAyah } from "/src/api/quran-audio-api";
import Order from "/src/components/ayah/Order";
import SingleAyahPlayer from "/src/components/audio/SingleAyahPlayer";
import ReadingPreferenceTab from "../ReadingPreferenceTab";
import Image from "next/image";
import { VapeFreeSharp } from "@mui/icons-material";
import { Virtuoso } from "react-virtuoso";

const INCREASE_VIEWPORT_BY_PIXELS = 1200;

const Reading = ({ initialData }) => {
  const virtuosoRef = useRef(null);
  const [currentVerse, setCurrentVerse] = useState({ meta: {}, verses: [] });
  const [totalCount, setTotalCount] = useState(0);
  useEffect(() => {
    setTotalCount(initialData?.verses?.length);
  }, []);

  return (
    <Grid sx={{ px: { xs: 0, sm: 3 }, mt: 4 }}>
      {/* <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        <span style={{ wordBreak: "break-all" }}>
          {initialData?.verses?.map((verse, idx) => (
            <Typography
              variant="span"
              key={verse?.id}
              onClick={() => {
                console.log(
                  "audioData?.audio_files?[idx]"
              
                );
              }}
            >
             
              <Typography
                variant="span"
                key={verse?.id}
                sx={{
                  fontSize: { xs: "24px", sm: "36px" },
                  fontWeight: 600,
                  fontFamily: "UthmanicHafs",
                }}
              >
                {verse?.textUthmani}
              </Typography>
              <span>
                <Order number={verse?.verseNumber} />
               
              </span>
            </Typography>
          ))}
        </span>
      </Box> */}
      <Virtuoso
        totalCount={1}
        useWindowScroll
        increaseViewportBy={INCREASE_VIEWPORT_BY_PIXELS}
        initialItemCount={1}
        itemContent={() => (
          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            <span style={{ wordBreak: "break-all" }}>
              {initialData?.verses?.map((verse, idx) => (
                <Typography
                  variant="span"
                  key={verse?.id}
                  onClick={() => {
                    console.log("audioData?.audio_files?[idx]");
                  }}
                >
                  <Typography
                    variant="span"
                    key={verse?.id}
                    sx={{
                      fontSize: { xs: "24px", sm: "36px" },
                      fontWeight: 600,
                      fontFamily: "UthmanicHafs",
                    }}
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
        )}
      />
    </Grid>
  );
};

export default Reading;
