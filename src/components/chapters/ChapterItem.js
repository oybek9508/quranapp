import { Box, CardMedia, MenuItem, Typography, useTheme } from "@mui/material";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ChapterIconContainer from "./ChapterIconContainer";
import AyahNumSvg from "../../../public/assets/icons/ayahNum.svg";
import CropSquareRoundedIcon from "@mui/icons-material/CropSquareRounded";

const ChapterItem = ({ chapter }) => {
  const theme = useTheme();
  const router = useRouter();
  return (
    <MenuItem
      onClick={() => router.push(`${chapter.id}`)}
      sx={{
        width: "100%",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ position: "relative" }}>
            <AyahNumSvg
              width={36}
              height={36}
              fill={theme.palette.text.secondary}
            />
            <Typography
              sx={{
                position: "absolute",
                top: "7px",
                left: chapter.id < 10 ? 15 : chapter.id > 99 ? "7px" : "11px",
                fontSize: "14px",
                color: theme.palette.text.primary,
                fontFamily: "Poppins",
              }}
            >
              {chapter.id}
            </Typography>
          </Box>
          <Box
            sx={{
              ml: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{
                fontSize: "16px",
                color: theme.palette.text.primary,
                fontFamily: "Poppins",
                fontWeight: 600,
              }}
            >
              {chapter.transliteratedName}
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: "12px",
                color: theme.palette.text.secondary,
                fontFamily: "Poppins",
                fontWeight: 500,
              }}
            >
              <Typography>{chapter.revelationPlace}</Typography>
              <Typography>-</Typography>
              <Typography>{chapter.versesCount} Verses</Typography>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{ display: "flex", flexDirection: "column", alignItems: "end" }}
        >
          <ChapterIconContainer
            id={String(chapter?.id)}
            hasSurahPrefix={false}
          />
          <Typography
            sx={{
              fontSize: "16px",
              color: theme.palette.text.secondary,
              fontFamily: "Poppins",
              fontWeight: 500,
            }}
          >
            {chapter.versesCount} Ayahs
          </Typography>
        </Box>
      </Box>
    </MenuItem>
  );
};

export default ChapterItem;
