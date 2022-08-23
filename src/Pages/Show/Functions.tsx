import { useState } from "react";

export const translateLeft = (component, value, sub_type) => {
  // step distance
  let step = 0;
  let offset = 0;
  let visible = 0;

  if (sub_type === "show") {
    step = 73.33 + 15;
    visible = 6;
  }

  if (sub_type === "show") {
    step = 81.33 + 15;
    visible = 6;
  }

  if (sub_type === "episode") {
    step = 162.67 + 15;
    visible = 3;
  }

  if (sub_type === "episode") {
    step = 152 + 15;
    visible = 3;
  }

  if (sub_type === "network") {
    step = 50 + 8;
    visible = 9;
  }

  if (sub_type === "tertiary") {
    visible = 6;
    // visible = calculateVisible(component.content);
    // console.log(visible);
  }

  // array length
  const length = component.content.length;

  // offset
  offset = length - visible - 1;

  // scroll index
  const scrollIndex =
    length > visible - 1
      ? value <= 0
        ? 0
        : value <= offset
        ? value
        : length - visible
      : 0;

  const left =
    sub_type === "tertiary"
      ? component.offsets[scrollIndex]
      : -step * scrollIndex;
  return left;
};

export const randomNumber = items => {
  const number = (items.length * Math.random()) | 0;
  return number;
};
