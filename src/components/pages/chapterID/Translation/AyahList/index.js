import React from "react";
import AyahItem from "../AyahItem";

const AyahList = (props) => {
  const { initialData } = props;
  // console.log("uthmaniScripts", uthmaniScripts);

  return (
    <div>
      {initialData?.verses?.map((chapter) => (
        <AyahItem key={chapter.id} chapter={chapter} />
      ))}
    </div>
  );
};

export default AyahList;
