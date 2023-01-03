import { Grid } from "@mui/material";
import React, { useState } from "react";
import { getFootnote } from "src/api/quran-translation";

const Index = (props) => {
  const { translationFontScale, text, languageId, resourceName } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [showFootnote, setShowFootnote] = useState(true);
  const [footnote, setFootnote] = useState(null);
  const [subFootnote, setSubFootnote] = useState(null);

  const resetFootnote = () => {
    setFootnote(null);
    setSubFootnote(null);
    setIsLoading(false);
  };

  const resetSubFootnote = () => {
    setSubFootnote(null);
  };

  const hideFootnote = () => setShowFootnote(false);

  console.log("text", text);
  return (
    <Grid>
      <div
        style={{ fontSize: "18px" }}
        dangerouslySetInnerHTML={{ __html: text }}
      />
      {resourceName && <p>— {resourceName}</p>}
    </Grid>
  );
};

export default Index;
