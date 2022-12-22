import React from "react";
import Info from ".";

const InfoPage = (props) => {
  const { chaptersData, chapterInfoResponse, chapterResponse } = props;
  return (
    <div>
      <Info
        chapterInfo={chapterInfoResponse.chapterInfo}
        chapterResponse={chapterResponse}
      />
    </div>
  );
};

export default InfoPage;
