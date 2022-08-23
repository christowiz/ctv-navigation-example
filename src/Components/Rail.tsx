import React from "react";
// import { useStore } from "../Stores/Store";
import { Stack } from "framer";
import { Tile } from "../Components/Tile";

export function Rail(props) {
  const { localStore, focusDelay, episodesControl, ...rest } = props;
  const { id, content, page, type, sub_type, current_item } = localStore;

  let gap =
    props.gap !== undefined ? props.gap : type === "navigation" ? 8 : 15;

  const tiles = content.map((item, index) => {
    const { width, height, episode, state } = item;

    if (sub_type === "hero") {
      return (
        <Stack
          key={index}
          top={0}
          height={50}
          gap={10}
          direction={"horizontal"}
          alignment={"start"}
          background={"none"}
        >
          <Tile
            active={current_item === index ? true : false}
            state={state}
            page={page}
            width={100}
            height={28}
            borderRadius={sub_type === "network" ? 50 / 2 : undefined}
          >
            {page === "detail" && sub_type === "episode" ? "E" + episode : null}
          </Tile>
          <Tile
            active={false}
            width={85}
            height={28}
            borderRadius={sub_type === "network" ? 50 / 2 : undefined}
          >
            {page === "detail" && sub_type === "episode" ? "E" + episode : null}
          </Tile>
        </Stack>
      );
    } else {
      return (
        <Tile
          active={current_item === index ? true : false}
          key={index}
          state={state}
          page={page}
          type={type}
          sub_type={sub_type}
          width={width}
          height={height}
          focusDelay={focusDelay}
          borderRadius={sub_type === "network" ? 50 / 2 : undefined}
        >
          {page === "detail" && sub_type === "episode" ? "E" + episode : null}
        </Tile>
      );
    }
  });

  return (
    <Stack
      id={id}
      direction="horizontal"
      gap={gap}
      distribution="start"
      width="100%"
      height="auto"
      background="none"
      type={type}
      {...rest}
    >
      {tiles}
    </Stack>
  );
}

Rail.defaultProps = {
  type: "rail",
  localStore: {
    id: 1,
    type: "rail",
    sub_type: "show",
    current_item: 0,
    left: 0,
    content: [
      {
        state: "default",
        series: "Alaskan Bush People",
        description:
          "The Browns live in the Copper River Valley, where temperatures can drop to 60 degrees below zero ...",
        recommendation: "For lovers of Extreme Families"
      },
      {
        state: "default",
        series: "Iron Chef America",
        description:
          'Based upon the format of the original Japanese version of "Iron Chef," the series features a kitchen ...',
        recommendation: "For lovers of Food"
      },
      {
        state: "default",
        series: "Dr. Pimple Popper",
        description:
          "Her actual name is Sandra Lee, but she is so popular in her field of dermatology that she ...",
        recommendation: "For lovers of Medical Marvels"
      },
      {
        state: "default",
        series: "90 Day Fiancé",
        description:
          "Long-distance relationships have challenges that are sometimes difficult to overcome but ...",
        recommendation: "For lovers of Dating & Relationships"
      },
      {
        state: "default",
        series: "Chopped",
        description:
          "Four chefs call on their culinary skills as they face off against one another to prepare a spectacular ...",
        recommendation: "For lovers of Food"
      },
      {
        state: "default",
        series: "Crikey! It's the Irwins",
        description:
          "Carrying on late wildlife conservationist Steve Irwin's mission to bring people closer to animals ...",
        recommendation: "For lovers of Zoo's And Aquariums"
      },
      {
        state: "default",
        series: "Battlebots",
        description:
          "The epic robot-fighting series returns for Season 4. It features the biggest, baddest ...",
        recommendation: "For lovers of Science & Technology"
      }
    ]
  }
};
