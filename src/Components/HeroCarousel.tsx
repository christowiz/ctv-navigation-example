import React, { useState, useEffect } from "react";
import { Frame, Stack, useAnimation } from "framer";

import { Tile } from "./Tile";
import { durations, transitions } from "./Animations";
import { pageStore } from "../Stores/Store";

export function HeroCarousel(props) {
  const { content, current_item, focus, direction, ...rest } = props;

  let imageSize = {
    width: 640 - 36,
    height: 330
  };

  let imageMask = {
    WebkitMaskSize: `${imageSize.width}px ${imageSize.height}px`,
    maskSize: `${imageSize.width}px ${imageSize.height}px`,
    maxWidth: imageSize.width
  };

  imageMask = {
    ...imageMask,
    WebkitMaskImage: `url("../Assets/ATVE-Theming-Hero-Carousel-Mask.png")`,
    maskImage: `url("../Assets/ATVE-Theming-Hero-Carousel-Mask.png")`
  };

  const [currentSlide, setCurrentSlide] = useState({});
  const [currentImage, setCurrentImage] = useState({});
  const [nextImage, setNextImage] = useState({});

  // const { title, image, description } = currentSlide;

  const pagination = {
    current_item: current_item,
    length: content.length
  };

  // animation controllers
  // content
  // image
  const contentController = useAnimation();
  const topImageController = useAnimation();
  const bottomImageController = useAnimation();

  async function updateText() {
    const { logo, title, description } = content[current_item];

    setCurrentSlide({
      ...currentSlide,
      logo: logo,
      title: title,
      description: description
    });
  }

  async function updateImage() {
    const { image } = content[current_item];

    setNextImage({
      image: image
    });

    setCurrentSlide({
      ...currentSlide,
      image: image
    });
  }

  async function updatetoCurrentImage() {
    setCurrentImage({
      image: content[current_item].image
    });
  }

  // function for animation
  async function changeSlide() {
    const offsetDistance = 8;
    const leftPos = 18;

    await contentController.start({
      opacity: [1, 0],
      left:
        direction === "forward" ? -offsetDistance : leftPos + offsetDistance,
      transition: {
        opacity: {
          ...transitions.fade,
          duration: durations.m
        },
        left: {
          ...transitions.exit,
          duration: durations.m
        }
      }
    });

    contentController.start({
      opacity: 1,
      left:
        direction === "forward"
          ? [leftPos + offsetDistance, leftPos]
          : [offsetDistance, leftPos],
      transition: {
        delay: durations.xs,
        opacity: {
          ...transitions.fade,
          duration: durations.m
        },
        left: {
          ...transitions.enter,
          duration: durations.m
        }
      }
    });

    // fade out bottom image from 1 to 0 opacity
    bottomImageController.start({
      opacity: 0,
      transition: {
        ...transitions.fade,
        duration: durations.m
      }
    });

    // at the same time update the top image and fade in from 0 to 1
    updateImage();
    updateText();

    await topImageController.start({
      opacity: 1,
      transition: {
        ...transitions.fade,
        duration: durations.m
      }
    });

    await updatetoCurrentImage();

    topImageController.start({
      opacity: 0,
      transition: {
        duration: 0
      }
    });

    await bottomImageController.start({
      opacity: 1,
      transition: {
        duration: 0
      }
    });
  }

  useEffect(() => {
    updateText();
    setCurrentImage({
      image: content[current_item].image
    });

    // console.log(currentImage);
  }, []);

  useEffect(() => {
    // update slide via animation
    changeSlide();
  }, [current_item]);

  useEffect(() => {
    // console.log("current image:", currentImage);
  }, [currentImage]);

  useEffect(() => {
    // console.log("next image:", nextImage);
  }, [nextImage]);

  return (
    <Frame
      right={0}
      top={0}
      width={imageSize.width}
      height={330}
      background={"none"}
      initial={{
        opacity: 1,
        y: 0
      }}
      animate={{
        opacity: focus.component > 0 ? 0 : 1,
        y: focus.component > 0 ? -36 : 0
      }}
      transition={{
        ...transitions.slide,
        duration: durations.m
      }}
    >
      <Frame
        top={0}
        right={0}
        width={imageSize.width}
        height={imageSize.height}
        background={"none"}
        overflow={"hidden"}
        animate={bottomImageController}
      >
        <img
          id="image-mask-png"
          src={currentImage.image}
          alt="show art"
          style={imageMask}
        />
      </Frame>

      <Frame
        top={0}
        right={0}
        width={imageSize.width}
        height={imageSize.height}
        background={"none"}
        overflow={"hidden"}
        animate={topImageController}
      >
        <img
          id="image-mask-png"
          src={nextImage.image}
          alt="show art"
          style={imageMask}
        />
      </Frame>

      <Frame
        id="background"
        width={"100%"}
        height={"100%"}
        background={"rgba(0,0,0,1)"}
        animate={{
          opacity: 0
        }}
        transition={{
          ...transitions.fade,
          duration: durations.m
        }}
      />

      <Stack
        id="pagination"
        center={"x"}
        bottom={25}
        width={"50%"}
        height={"auto"}
        distribution={"center"}
        direction={"horizontal"}
        gap={4}
      >
        {content.map((item, index) => {
          return (
            <Frame
              key={index}
              width={(1 / pagination.length) * 100 + "%"}
              height={2}
              background={"rgba(255,255,255,0.5)"}
              style={{
                maxWidth: 30
              }}
            >
              <Frame
                width={"100%"}
                height={2}
                background={"rgba(255,255,255,1)"}
                initial={{
                  scaleX: 0
                }}
                animate={{
                  scaleX: index === pagination.current_item ? 1 : 0
                }}
                transition={{
                  ...transitions.enter,
                  duration: durations.m
                }}
                style={{
                  transformOrigin:
                    index === pagination.current_item
                      ? direction === "forward"
                        ? "left center"
                        : "right center"
                      : direction === "forward"
                      ? "right center"
                      : "left center"
                }}
              />
            </Frame>
          );
        })}
      </Stack>

      <Frame
        id="content"
        bottom={220}
        left={18}
        width={"50%"}
        height={"auto"}
        background={"none"}
        style={{
          textAlign: "left",
          color: "#fff",
          fontSize: 13,
          justifyContent: "flex-end"
        }}
        initial={{
          left: 18
        }}
        animate={contentController}
      >
        <Frame
          width={"100%"}
          height={"100%"}
          background={"none"}
          initial={{
            opacity: 1,
            y: 0
          }}
          animate={{
            opacity: focus.component > 0 ? 0 : 1,
            y: focus.component > 0 ? -100 : 0
          }}
          transition={{
            ...transitions.slide,
            duration: durations.m
          }}
        >
          <Frame
            id="logo"
            width={492 / 3}
            height={180 / 3}
            borderRadius={4}
            style={{
              transformOrigin: "top left",
              backgroundColor: "transparent",
              backgroundImage: `url(${currentSlide.logo})`,
              backgroundOrigin: "content-box",
              backgroundPosition: "left bottom",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat"
            }}
          />

          <Stack
            top={70}
            width={265}
            height="auto"
            direction="vertical"
            left={0}
            distribution="start"
            gap={16}
            animate={{
              opacity: 1
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
              {/* {currentSlide.title} */}
              {currentSlide.description}
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
                state={focus.component === 0 ? "focus" : "default"}
                sub_type={"button"}
                width={115}
                height={35}
              >
                {"Watch Now"}
              </Tile>
            </Stack>
          </Stack>
        </Frame>
      </Frame>
    </Frame>
  );
}

HeroCarousel.defaultProps = {
  current_item: 7,
  content: [
    {
      title: "Dr Pimple Popper",
      description:
        "Dr. Sandra Lee removes life-altering growths from her patients' skin.",
      image:
        "https://digitalstudiosproduct.discovery.com/prototypes/ATVE/assets/images/TLC/16x9%20Show%20Hero/16x9-hero-drpimplepopper.jpg"
    },
    {
      title: "Long Island Medium",
      description:
        "Theresa speaks to the dead and helps clients find closure with loved ones.",
      image:
        "https://digitalstudiosproduct.discovery.com/prototypes/ATVE/assets/images/TLC/16x9%20Show%20Hero/16x9-hero-long-island-medium.jpg"
    },
    {
      title: "90 Day Fiance",
      description:
        "International couples will have just 90 days to decide to get married.",
      image:
        "https://digitalstudiosproduct.discovery.com/prototypes/ATVE/assets/images/TLC/16x9%20Show%20Hero/16x9-hero-90-day-fiance.jpg"
    },
    {
      title: "Say Yes To The Dress",
      description:
        "This show is bridal story, fashion makeover and family therapy in one.",
      image:
        "https://digitalstudiosproduct.discovery.com/prototypes/ATVE/assets/images/TLC/16x9%20Show%20Hero/16x9-hero-syttd.jpg"
    },

    {
      title: "Cake Boss",
      description:
        "Buddy Valastro works to make his New Jersey bakery a household name.",
      image:
        "https://digitalstudiosproduct.discovery.com/prototypes/ATVE/assets/images/TLC/16x9%20Show%20Hero/16x9-hero-cakeboss.jpg"
    },
    {
      title: "Sister Wives",
      description:
        "This is the story of Kody Brown, his three wives and extraordinary family.",
      image:
        "https://digitalstudiosproduct.discovery.com/prototypes/ATVE/assets/images/TLC/16x9%20Show%20Hero/16x9-hero-sisterwives.jpg"
    },
    {
      title: "Welcome to Plathville",
      description:
        "A Georgia family shares a love for music, religion and traditional roles.",
      image:
        "https://digitalstudiosproduct.discovery.com/prototypes/ATVE/assets/images/TLC/16x9%20Show%20Hero/16x9-hero-WTP.jpg"
    },
    {
      title: "Say Yes To The Dress: America",
      description:
        "Designer Randy Fenoli officiates an epic group wedding extravaganza in NYC.",
      image:
        "https://digitalstudiosproduct.discovery.com/prototypes/ATVE/assets/images/TLC/16x9%20Show%20Hero/16x9-hero-syttdamerica.jpg"
    },
    {
      title: "My Big Fat Fabulous Life",
      description:
        "A woman's life changes when a self-choreographed video goes viral.",
      image:
        "https://digitalstudiosproduct.discovery.com/prototypes/ATVE/assets/images/TLC/16x9%20Show%20Hero/16x9-hero-mbffl.jpg"
    },
    {
      title: "I Am Jazz",
      description:
        "Jazz is a transgender female and has lived as a girl since kindergarten.",
      image:
        "https://digitalstudiosproduct.discovery.com/prototypes/ATVE/assets/images/TLC/16x9%20Show%20Hero/16x9-hero-iamjazz-v3.jpg"
    }
  ]
};
