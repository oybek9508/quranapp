import React from "react";
import DataContext from "src/context/DataContext";
import Info from ".";

const InfoPage = (props) => {
  const { chaptersData, chapterInfoResponse, chapterResponse } = props;
  return (
    <DataContext.Provider value={chaptersData}>
      <Info
        chapterInfo={chapterInfoResponse.chapterInfo}
        chapterResponse={chapterResponse}
      />
    </DataContext.Provider>
  );
};

export default InfoPage;
