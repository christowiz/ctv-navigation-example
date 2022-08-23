import React from "react";
import { chunk } from "lodash-core";
import { Frame, Stack } from "framer";
import { Rail } from "../Components/Rail";

import { transitions, durations } from "./Animations";

export function Grid(props) {
  const { local, focusDelay, current_item, current_row, gap, ...rest } = props;
  const { id, type, sub_type, content } = local;

  let rows = chunk(content, 6);

  rows = rows.map((row, index) => {
    let dimens = {};
    if (sub_type === "show") {
      dimens = {
        width: 82,
        height: 123
      };
    }

    row = row.map((item, index) => {
      return { width: dimens.width, height: dimens.height, state: item.state };
    });
    return { id: index, type: type, sub_type: sub_type, content: row };
  });

  return (
    <Stack
      id={id}
      direction="vertical"
      gap={gap}
      distribution="start"
      width="100%"
      height="auto"
      type={type}
      {...rest}
    >
      {rows.map((component, index) => {
        return (
          <Rail
            key={index}
            id={index}
            localStore={component}
            focusDelay={focusDelay}
            gap={gap}
            animate={index < current_row ? { opacity: 0 } : { opacity: 1 }}
            transition={{
              ...transitions.slide,
              duration: durations.m
            }}
          />
        );
      })}
    </Stack>
  );
}

Grid.defaultProps = {
  type: "grid",
  focusDelay: 0,
  gap: 16,
  local: {
    id: 0,
    type: "rail",
    sub_type: "show",
    current_item: 0,
    content: [
      { state: "focus" },
      { state: "default" },
      { state: "default" },
      { state: "default" },
      { state: "default" },
      { state: "default" },
      { state: "default" },
      { state: "default" },
      { state: "default" },
      { state: "default" },
      { state: "default" },
      { state: "default" },
      { state: "default" },
      { state: "default" },
      { state: "default" },
      { state: "default" },
      { state: "default" },
      { state: "default" },
      { state: "default" },
      { state: "default" },
      { state: "default" },
      { state: "default" },
      { state: "default" },
      { state: "default" },
      { state: "default" }
    ]
  }
};
