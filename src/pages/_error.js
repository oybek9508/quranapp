import React from "react";
import { useRouter } from "next/router";
import { Button } from "@mui/material";

const Error = ({ statusCode }) => {
  const router = useRouter();
  const onBackButtonClicked = () => {
    if (document && document.referrer) {
      router.back();
      return;
    }
    router.push("/"); // go to home
  };
  return (
    <div>
      <div>No Page Found {statusCode} error</div>
      <Button onClick={onBackButtonClicked}>Go Back</Button>
    </div>
  );
};

export default Error;
