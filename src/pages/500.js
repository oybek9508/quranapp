import React from "react";
import { useRouter } from "next/router";
import { Button } from "@mui/material";

const Custom500 = () => {
  const router = useRouter();
  return (
    <div>
      <div>No Page Found 500 error</div>
      <Button onClick={() => router.push("/")}>Go to Home</Button>
    </div>
  );
};

export default Custom500;
