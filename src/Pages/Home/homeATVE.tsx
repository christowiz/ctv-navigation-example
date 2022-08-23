import React, { useState, useEffect } from "react";
import { orderBy } from "lodash-core";

import Gamepad from "react-gamepad";
import KeyboardEventHandler from "react-keyboard-event-handler";

import { updateValue } from "../../Helpers/Functions";

import { Frame, Stack, useAnimation } from "framer";
import { durations, transitions } from "../../Components/Animations";

import { Loader } from "../../Components/Loader";

import { HeroCarousel } from "../../Components/HeroCarousel";
import { Rail } from "../../Components/Rail";
import { MVPDLogo } from "../../Components/MVPDLogo";

import { pageStore } from "../../Stores/Store";

import { randomNumber, translateLeft } from "./Functions";

export default function HomeATVE(props) {
  const { id, name, ...rest } = props;
  const [store, setStore] = pageStore();

  const { params, current_page } = store;
  const { backgrounds } = params;

  const [focus, setFocus] = useState({
    component: 0,
    item: "watch"
  });

  const [components, setComponents] = useState([
    {
      name: "hero",
      items: ["watch"]
    },
    {
      name: "editorial",
      type: "rail",
      sub_type: "show",
      current_item: 0,
      left: 0,
      items: ["rail"],
      content: [
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
    },
    {
      name: "editorial",
      type: "rail",
      sub_type: "episode",
      current_item: 0,
      left: 0,
      items: ["rail"],
      content: [
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
  ]);

  const [heroContent, setHeroContent] = useState({
    current_item: 0,
    direction: "forward",
    content: [
      {
        logo:
          "https://us1-prod-images.disco-api.com/2020/06/30/2396b5f9-ba49-3c7e-88d8-22a9eb0f1113.png?bf=0&f=png&p=true&q=85&w=164",
        title: "Dr Pimple Popper",
        description:
          "Dr. Sandra Lee removes life-altering growths from her patients' skin.",
        image:
          "https://digitalstudiosproduct.discovery.com/prototypes/ATVE/assets/images/TLC/16x9%20Show%20Hero/16x9-hero-drpimplepopper.jpg"
      },
      {
        logo:
          "https://us1-prod-images.disco-api.com/2020/06/02/fc99cbd2-6548-3d90-a0f4-6a03462d759b.png?bf=0&f=png&p=true&q=85&w=168",
        title: "90 Day Fiance",
        description:
          "International couples will have just 90 days to decide to get married.",
        image:
          "https://digitalstudiosproduct.discovery.com/prototypes/ATVE/assets/images/TLC/16x9%20Show%20Hero/16x9-hero-90-day-fiance.jpg"
      },
      {
        logo:
          "https://us1-prod-images.disco-api.com/2020/07/14/78845fd0-8669-3649-a2a4-a2bec1130543.png?bf=0&f=png&p=true&q=85&w=168",
        title: "I Am Jazz",
        description:
          "Jazz is a transgender female and has lived as a girl since kindergarten.",
        image:
          "https://us1-prod-images.disco-api.com/2020/07/14/1018a4e5-8350-34a5-952d-da7fae67e262.jpeg?bf=0&f=jpg&p=true&q=85&w=640"
      },
      {
        logo:
          "https://us1-prod-images.disco-api.com/2020/07/14/d6f5ef37-250d-3a64-8d9b-940d3562f870.png?bf=0&f=png&p=true&q=85&w=168",
        title: "Say Yes To The Dress: America",
        description:
          "Designer Randy Fenoli officiates an epic group wedding extravaganza in NYC.",
        image:
          "https://digitalstudiosproduct.discovery.com/prototypes/ATVE/assets/images/TLC/16x9%20Show%20Hero/16x9-hero-syttdamerica.jpg"
      },

      {
        logo:
          "https://us1-prod-images.disco-api.com/2020/06/29/d0080654-8677-3dab-b5a3-748a4121cdad.png?bf=0&f=png&p=true&q=85&w=168",
        title: "My Big Fat Fabulous Life",
        description:
          "A woman's life changes when a self-choreographed video goes viral.",
        image:
          "https://digitalstudiosproduct.discovery.com/prototypes/ATVE/assets/images/TLC/16x9%20Show%20Hero/16x9-hero-mbffl.jpg"
      },
      {
        logo:
          "https://us1-prod-images.disco-api.com/2020/06/29/d0080654-8677-3dab-b5a3-748a4121cdad.png?bf=0&f=png&p=true&q=85&w=168",
        title: "Frenchies!",
        description:
          "Turpis egestas pretium aenean pharetra magna ac placerat.",
        image:
          "https://images.unsplash.com/photo-1583512603784-a8e3ea8355b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=640&q=80"
      },
      {
        logo:
          "https://us1-prod-images.disco-api.com/2020/06/29/d0080654-8677-3dab-b5a3-748a4121cdad.png?bf=0&f=png&p=true&q=85&w=168",
        title: "Frenchies!",
        description:
          "Turpis egestas pretium aenean pharetra magna ac placerat.",
        image:
          "https://images.unsplash.com/photo-1583511655805-3d0a917bd436?ixlib=rb-1.2.1&auto=format&fit=crop&w=1949&q=80"
      }
    ]
  });

  const [currentComponent, setCurrentComponent] = useState({});

  const verticalOffsets = [0, -220, -400, -544];

  const translateY = () => {
    return verticalOffsets[focus.component];
  };

  const navigateHero = (direction) => {
    let value = heroContent.current_item;
    if (direction === "forward") {
      value = value + 1 >= heroContent.content.length ? 0 : value + 1;
    } else {
      value = value - 1 < 0 ? 0 : value - 1;
    }

    setHeroContent({
      ...heroContent,
      current_item: value,
      direction: direction
    });
  };

  const navigateRail = (direction) => {
    let local = [...components];
    let component = { ...local[focus.component] };
    let { current_item, content, left, sub_type } = component;

    // update old
    content[current_item].state = "default";

    // update new
    let active = updateValue(
      current_item,
      content.length - 1,
      direction,
      current_page
    );
    content[active].state = "focus";

    component.left = translateLeft(component, active, component.sub_type);

    // update component
    component = {
      ...component,
      current_item: active
    };

    // replace component in page data
    local.splice(focus.component, 1, component);

    setComponents([...local]);
  };

  const navigateHorizontal = (direction) => {
    if (focus.component === 0) navigateHero(direction);
    if (focus.component > 0) navigateRail(direction);
  };

  const navigateVertical = (direction) => {
    updatePreviousComponent();

    let newIndex = updateValue(
      focus.component,
      components.length - 1,
      direction
    );

    setFocus({
      ...focus,
      component: newIndex,
      item: components[newIndex].items[0]
    });
  };

  const handleSubmit = (pressed) => {};

  const backNavigate = () => {
    updatePreviousComponent();

    setFocus({
      ...focus,
      component: 0,
      item: components[0].items[0]
    });
  };

  const buttonDownHandler = (buttonName) => {
    if (buttonName === "DPadUp") navigateVertical("up");
    if (buttonName === "DPadDown") navigateVertical("down");
    if (buttonName === "DPadLeft") navigateHorizontal("back");
    if (buttonName === "DPadRight") navigateHorizontal("forward");
  };

  const buttonChangeHandler = (buttonName, pressed) => {
    if (buttonName === "B" && pressed) backNavigate();
    if (buttonName === "A" && pressed) handleSubmit(pressed);
  };

  const updateActiveComponent = () => {
    let component = { ...components[focus.component] };
    let { name, type } = component;
    let { item } = focus;

    if (type === "rail") {
      let { current_item, content } = component;
      content[current_item].state = "focus";
    }

    setCurrentComponent(component);
  };

  const updatePreviousComponent = () => {
    let component = { ...components[focus.component] };
    let { name, type } = component;
    let { item } = focus;

    if (type === "rail") {
      let { current_item, content } = component;
      content[current_item].state = "previous";
    }
  };

  // load
  useEffect(() => {
    setStore({
      ...store,
      current_page: "home",
      global_nav: {
        ...store.global_nav,
        active: 0,
        current: 0,
        previous: 0
      }
    });

    updateActiveComponent();
  }, []);

  // focus changes
  useEffect(() => {
    updateActiveComponent();
  }, [focus]);

  // active component
  useEffect(() => {
    // let { name, type, page, sub_type, current_item, items } = currentComponent;
  }, [currentComponent]);

  return (
    <>
      <Frame
        center
        width={640}
        height={360}
        background={backgrounds.app}
        overflow={"hidden"}
        {...rest}
      >
        <Frame width={640} height={360} background={"none"}>
          <HeroCarousel
            content={heroContent.content}
            current_item={heroContent.current_item}
            focus={focus}
            direction={heroContent.direction}
          />

          <Frame
            id="content"
            width={"100%"}
            height={360}
            background="none"
            top={265}
          >
            <Stack
              height={"auto"}
              width={"auto"}
              padding={16}
              paddingTop={64}
              paddingLeft={36 + 18}
              paddingRight={16}
              overflow={"hidden"}
              direction="vertical"
              gap={store.params.railGap}
              animate={{
                y: translateY()
              }}
              transition={{
                ...transitions.slide,
                duration: durations.m
              }}
            >
              <Rail
                localStore={{ ...components[1] }}
                initial={{
                  opacity: 1,
                  left: 0
                }}
                animate={{
                  opacity: focus.component > 1 ? 0 : 1,
                  left: components[1].left
                }}
                transition={{
                  opacity:
                    focus.component > 1
                      ? {
                          ...transitions.fade
                        }
                      : { ...transitions.fade, delay: durations.s }
                }}
              />

              <Rail
                localStore={{ ...components[2] }}
                initial={{
                  opacity: 1,
                  left: 0
                }}
                animate={{
                  opacity: focus.component > 2 ? 0 : 1,
                  left: components[2].left
                }}
                transition={{
                  opacity:
                    focus.component > 2
                      ? {
                          ...transitions.fade
                        }
                      : { ...transitions.fade, delay: durations.s }
                }}
              />
            </Stack>
          </Frame>

          <MVPDLogo image={"../Assets/fios-logo-white.png"} />
          <Frame
            background=""
            width={181 / 2}
            height={"auto"}
            left={54}
            top={20}
          >
            <img
              src={"../Assets/tlc@2x.png"}
              alt="tlc logo"
              width={"auto"}
              height={"auto"}
              style={{
                maxWidth: "100%"
              }}
            />
          </Frame>
        </Frame>
      </Frame>

      <Gamepad
        onButtonDown={(buttonName) => {
          buttonDownHandler(buttonName);
        }}
        onButtonChange={(buttonName, pressed) => {
          buttonChangeHandler(buttonName, pressed);
        }}
      >
        <React.Fragment />
      </Gamepad>

      <KeyboardEventHandler
        handleKeys={[
          "up",
          "down",
          "left",
          "right",
          "space",
          "return",
          "b",
          "del",
          "backspace",
          "esc"
        ]}
        handleEventType="keydown"
        onKeyEvent={(key, e) => {
          if (key === "up") navigateVertical("up");
          if (key === "down") navigateVertical("down");
          if (key === "left") navigateHorizontal("back");
          if (key === "right") navigateHorizontal("forward");
          if (key === "space" || key === "return") {
            handleSubmit(true);
          }
          if (
            key === "b" ||
            key === "del" ||
            key === "backspace" ||
            key === "esc"
          ) {
            backNavigate();
          }
        }}
      />

      <KeyboardEventHandler
        handleKeys={["space", "return", "b", "del", "backspace", "esc"]}
        handleEventType="keyup"
        onKeyEvent={(key, e) => {
          if (key === "space" || key === "return") {
            handleSubmit(false);
          }
        }}
      />
    </>
  );
}

HomeATVE.defaultProps = {
  id: 2,
  name: "Show"
};
