import React from "react";
import AyahItem from "../AyahItem";

const AyahList = (props) => {
  const { initialData, value } = props;
  // console.log("uthmaniScripts", uthmaniScripts);

  return (
    <div>
      {initialData?.verses?.map((chapter) => (
        <AyahItem key={chapter.id} chapter={chapter} value={value} />
      ))}
    </div>
  );
};

export default AyahList;
