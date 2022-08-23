import React, { useState, useEffect } from "react";
import { Frame, Stack, useAnimation } from "framer";
import { durations, transitions } from "./Animations";
import { pageStore } from "../Stores/Store";

export function HeroHomepage(props) {
  const {
    focus,
    previousComponentId,
    heroText,
    heroAnimation,
    lead,
    ...rest
  } = props;
  const { component } = focus;
  const { background, description, image, recommendation, title } = heroText;

  const scaleRatio = 3;
  const aspectRatio = 16 / 9;

  const heroLeadParams = {
    width: 1920 / 3 - 36,
    height: ((1920 / 3 - 36) * aspectRatio) / scaleRatio
  };

  const heroParams = {
    width: 1440 / 3,
    height: ((1440 / 3) * aspectRatio) / scaleRatio
  };

  let heroLeadImageMask = {
    WebkitMaskSize: `${heroLeadParams.width}px ${heroLeadParams.height}px`,
    maskSize: `${heroLeadParams.width}px ${heroLeadParams.height}px`,
    maxWidth: heroLeadParams.width
  };

  heroLeadImageMask = {
    ...heroLeadImageMask,
    WebkitMaskImage: `url("../Assets/ATVE-Theming-Hero-Series-Mask.png")`,
    maskImage: `url("../Assets/ATVE-Theming-Hero-Series-Mask.png")`
  };

  let heroImageMask = {
    WebkitMaskSize: `${heroParams.width}px ${heroParams.height}px`,
    maskSize: `${heroParams.width}px ${heroParams.height}px`,
    maxWidth: heroParams.width
  };

  heroImageMask = {
    ...heroImageMask,
    WebkitMaskImage: `url("../Assets/ATVE-Theming-Hero-Series-Mask.png")`,
    maskImage: `url("../Assets/ATVE-Theming-Hero-Series-Mask.png")`
  };

  const [currentSlide, setCurrentSlide] = useState({});
  const [currentImage, setCurrentImage] = useState({});
  const [nextImage, setNextImage] = useState({});

  // animation controllers
  // content
  // image
  // const contentController = useAnimation();
  const topImageController = useAnimation();
  const bottomImageController = useAnimation();

  async function updateImage() {
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
      image: image
    });
  }

  // function for animation
  async function changeSlide() {
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
    setCurrentImage({
      image: image
    });
    // console.log(currentImage);
  }, []);

  useEffect(() => {
    // update slide via animation
    changeSlide();
  }, [heroText]);

  return (
    <Frame width={"100%"} height={360} background="none">
      <Frame
        top={0}
        right={0}
        width={heroParams.width}
        height={heroParams.height}
        background="none"
        animate={{
          opacity: component !== 0 ? 1 : 0
        }}
        transition={{
          ...transitions.fade,
          duration: durations.m
        }}
      >
        <Frame
          top={0}
          right={0}
          width={heroParams.width}
          height={heroParams.height}
          background={"none"}
          overflow={"hidden"}
          animate={bottomImageController}
        >
          <img
            id="image-mask-png"
            src={currentImage.image}
            alt="show art"
            style={heroImageMask}
          />
        </Frame>

        <Frame
          top={0}
          right={0}
          width={heroParams.width}
          height={heroParams.height}
          background={"none"}
          overflow={"hidden"}
          animate={topImageController}
        >
          <img
            id="image-mask-png"
            src={nextImage.image}
            alt="show art"
            style={heroImageMask}
          />
        </Frame>
      </Frame>

      <Frame
        top={0}
        right={0}
        width={heroLeadParams.width}
        height={heroLeadParams.height}
        background="none"
        animate={{
          opacity:
            component === 0 ||
            (focus.item === "global-navigation" && previousComponentId === 0)
              ? 1
              : 0
        }}
        transition={{
          ...transitions.fade,
          duration: durations.m
        }}
      >
        <Frame
          top={0}
          right={0}
          width={heroLeadParams.width}
          height={heroLeadParams.height}
          background={"none"}
          overflow={"hidden"}
        >
          <img
            id="image-mask-png"
            src={lead.image}
            alt="show art"
            style={heroLeadImageMask}
          />
        </Frame>
      </Frame>

      <Frame
        bottom={190}
        left={48}
        width={"50%"}
        height={"auto"}
        background={"none"}
        style={{
          textAlign: "left",
          color: "#fff",
          fontSize: 13
        }}
        animate={heroAnimation}
      >
        <div style={{ marginBottom: 8, fontSize: 16, fontWeight: "bold" }}>
          {title}
        </div>
        <div style={{ marginBottom: 12, lineHeight: 1.35 }}>{description}</div>
        {recommendation ? (
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>
            {recommendation}
          </div>
        ) : null}
      </Frame>
    </Frame>
  );
}

HeroHomepage.defaultProps = {
  heroText: {
    title: "series",
    description: "description",
    recommendation: "recommendation"
  },
  focus: {
    component: 0
  }
};
