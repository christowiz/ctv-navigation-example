import React from "react";
import { Frame } from "framer";

export function Tile(props) {
  const {
    active,
    width,
    height,
    type,
    page,
    sub_type,
    borderRadius,
    state,
    focusDelay,
    animate,
    transition,
    ...rest
  } = props;

  const variants = {
    default: {
      background: "rgba(200, 200, 200, 0.5)",
      scale: 1
    },
    focus: {
      background: "rgba(0, 145, 255, 1)",
      scale: sub_type === "tertiary" || sub_type === "button" ? 1 : 1.1,
      transition: {
        delay: focusDelay ? 0.2 : 0
      }
    },
    previous: {
      background: "rgba(255, 255, 255, 0.8)",
      scale: 1
    },
    press: {
      background: "rgba(0, 145, 255, 1)",
      scale: 1
    },
    active: {
      background: "rgba(255, 255, 255, 0.9)",
      scale: 1
    }
  };

  let dimensions = {};

  if (width) {
    dimensions = {
      ...dimensions,
      width: width
    };
  }
  if (height) {
    dimensions = {
      ...dimensions,
      height: height
    };
  }
  if (sub_type === "network") {
    dimensions = {
      width: 50,
      height: 50
    };
  }
  if (sub_type === "tertiary") {
    dimensions = {
      width: width,
      height: 21
    };
  }
  if (sub_type === "episode") {
    dimensions = {
      width: 162.67,
      height: 90.96
    };
  }
  if (page === "detail" && sub_type === "episode") {
    dimensions = {
      width: 152,
      height: 85
    };
  }
  if (page === "detail" && sub_type === "show") {
    dimensions = {
      width: 81.33,
      height: 122
    };
  }

  return (
    <Frame {...dimensions} background="none">
      <Frame
        variants={variants}
        initial={"default"}
        animate={state}
        transition={transition}
        borderRadius={borderRadius}
        {...dimensions}
        style={{
          pointerEvents: "initial"
        }}
      />
      <Frame
        {...dimensions}
        background="none"
        style={{ fontSize: 12, color: state === "focus" ? "#fff" : "#000" }}
      >
        {props.children}
      </Frame>
    </Frame>
  );
}

Tile.defaultProps = {
  type: "tile",
  height: 110,
  width: 73.33,
  borderRadius: 4,
  background: "rgba(255, 255, 255, 0.25)",
  transition: {
    duration: 0.125,
    ease: "linear"
  }
};
