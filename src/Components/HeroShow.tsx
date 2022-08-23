import React, { useState, useEffect } from "react";
import { Frame, Stack, useAnimation } from "framer";

import { Tile } from "./Tile";
import { durations, transitions, timeouts } from "./Animations";
import { pageStore } from "../Stores/Store";

export function HeroShow(props) {
  const {
    initial,
    focus,
    state,
    translateY,
    heroText,
    logo,
    image,
    description,
    heroAnimation,
    showContent,
    product,
    ...rest
  } = props;
  const { saved, currentSeason, currentEpisode, hasWatched } = state;

  const [savedText, setSavedText] = useState("");

  const season = "S" + currentSeason;
  const episode = "E" + currentEpisode;
  const formattedSeason = season + " " + episode;

  const saveController = useAnimation();

  let imageSize = {
    width: 640,
    height: 360
  };

  if (product !== "DTC") {
    imageSize = {
      width: 589,
      height: 330
    };
  }

  let imageMask = {
    WebkitMaskSize: `${imageSize.width}px ${imageSize.height}px`,
    maskSize: `${imageSize.width}px ${imageSize.height}px`,
    width: imageSize.width,
    height: imageSize.height
  };

  imageMask = {
    ...imageMask,
    WebkitMaskImage: `url("./Assets/DTC-Theming-Hero-Series-Mask.png")`,
    maskImage: `url("./Assets/DTC-Theming-Hero-Series-Mask.png")`
  };

  if (product !== "DTC") {
    imageMask = {
      ...imageMask,
      WebkitMaskImage: `url("./Assets/ATVE-Theming-Hero-Series-Mask.png")`,
      maskImage: `url("./Assets/ATVE-Theming-Hero-Series-Mask.png")`
    };
  }

  async function saveSequence() {
    await saveController.start({
      opacity: 0,
      y: 4,
      transition: {
        ...transitions.exit
      }
    });

    if (!initial) {
      const text = saved ? "Added" : "Removed";

      await updateText(saved, text);

      await saveController.start({
        opacity: 1,
        y: 0,
        transition: {
          ...transitions.enter
        }
      });

      await saveController.start({
        opacity: 0,
        y: 4,
        transition: {
          ...transitions.exit,
          delay: timeouts.medium
        }
      });
    }

    await updateText(saved);

    await saveController.start({
      opacity: 1,
      y: 0,
      transition: {
        ...transitions.enter
      }
    });
  }

  async function updateText(saved, text) {
    const msg = text ? text : saved ? "- My List" : "+ My List";
    setSavedText(msg);
  }

  useEffect(() => {
    updateText(saved);
  }, []);

  useEffect(() => {
    saveSequence();
  }, [saved]);

  return (
    <Frame
      width={"100%"}
      height={360}
      background="none"
      animate={heroAnimation}
    >
      <Frame
        top={0}
        right={0}
        width={imageSize.width}
        height={imageSize.height}
        background={"none"}
        initial={{
          opacity: 1,
          y: 0
        }}
        animate={{
          opacity:
            product === "DTC"
              ? focus.component === 0
                ? 1
                : focus.component === 1
                ? 0.5
                : 0.5
              : focus.component === 0
              ? 1
              : 0,
          y: product === "DTC" ? 0 : focus.component > 0 ? -24 : 0
        }}
        transition={{
          ...transitions.slide,
          duration: durations.m
        }}
      >
        <img
          id="image-mask-png"
          src={image}
          alt="show art"
          style={{ ...imageMask }}
        />
      </Frame>

      <Frame
        id="background"
        width={"100%"}
        height={"100%"}
        background={"rgba(0,0,0,1)"}
        animate={{
          opacity:
            product === "DTC"
              ? focus.component === 0
                ? 0.1
                : focus.component === 1
                ? 0.4
                : 0.4
              : focus.component === 0
              ? 0
              : 0
        }}
        transition={{
          ...transitions.fade,
          duration: durations.m
        }}
      />

      {showContent ? (
        <Frame
          top={30}
          left={30}
          width={"50%"}
          height={"auto"}
          background={"none"}
          style={{
            textAlign: "left",
            color: "#fff",
            fontSize: 13
          }}
        >
          <Frame
            id="logo"
            width={400 / 3}
            height={126 / 3}
            style={{
              transformOrigin: "top left",
              backgroundColor: "transparent",
              backgroundImage: `url(${logo})`,
              backgroundOrigin: "content-box",
              backgroundPosition: "left bottom",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat"
            }}
            animate={{
              scale:
                product === "DTC"
                  ? focus.component === 0
                    ? 1
                    : 0.75
                  : focus.component === 0
                  ? 1
                  : 1
            }}
            transition={{
              ...transitions.slide,
              duration: durations.m
            }}
          />

          <Stack
            top={60}
            width={265}
            height="auto"
            direction="vertical"
            left={0}
            distribution="start"
            gap={16}
            animate={{
              // y: translateY(),
              opacity: focus.component > 0 ? 0 : 1
            }}
            transition={{
              y: {
                ...transitions.slide,
                duration: durations.m,
                delay: focus.component !== 0 ? durations.s : 0
              },
              opacity: {
                ...transitions.fade,
                duration: durations.xs,
                delay: focus.component === 0 ? durations.s : 0
              }
            }}
          >
            <Frame
              id="description"
              width={"100%"}
              height={"auto"}
              background="none"
              style={{
                justifyContent: "flex-start",
                textAlign: "left",
                fontSize: 14,
                lineHeight: 1.5
              }}
            >
              {hasWatched ? formattedSeason : description}
            </Frame>

            <Stack
              direction="horizontal"
              width="100%"
              height="auto"
              distribution="start"
              left={0}
            >
              <Tile
                id="watch"
                state={focus.item === "watch" ? "focus" : "default"}
                sub_type={"button"}
                width={115}
                height={35}
              >
                {hasWatched ? "Resume" : "Start Show"}
              </Tile>
              <Tile
                id="save"
                state={focus.item === "save" ? "focus" : "default"}
                sub_type={"button"}
                width={90}
                height={35}
              >
                <Frame
                  width={"100%"}
                  height={"auto"}
                  background={"none"}
                  center
                  animate={saveController}
                >
                  {savedText}
                </Frame>
              </Tile>
            </Stack>
          </Stack>
        </Frame>
      ) : null}
    </Frame>
  );
}

HeroShow.defaultProps = {
  heroText: {
    series: "series",
    description: "description",
    recommendation: "recommendation"
  },
  image:
    "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=640&q=80"
};
