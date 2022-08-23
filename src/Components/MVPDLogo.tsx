import React from "react";
import { Frame } from "framer";

export function MVPDLogo(props) {
  const { image, ...rest } = props;

  return (
    <Frame
      width={"auto"}
      height={"auto"}
      right={16}
      top={26}
      background={"none"}
    >
      <img
        src={image}
        alt="television provider logo"
        style={{
          maxWidth: 70,
          maxHeight: 16
        }}
      />
    </Frame>
  );
}

MVPDLogo.defaultProps = {
  image: "./Assets/fios-logo-white.png"
};
