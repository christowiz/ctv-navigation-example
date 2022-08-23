import React from "react";
import { Frame } from "framer";
import { CircularProgress } from "@material-ui/core";

export function Loader(props) {
  const { state, classes, ...rest } = props;
  const { isLoading } = state;

  return (
    <Frame
      center
      width={640}
      height={360}
      overflow={"hidden"}
      background={"none"}
      animate={isLoading ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: !isLoading ? 0.2 : 0 }}
    >
      <Frame center width={40} height={40} background={"none"}>
        <CircularProgress className={classes.loader} />
      </Frame>
    </Frame>
  );
}
