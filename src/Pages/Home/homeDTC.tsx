import React, { useState, useEffect } from "react";
import { shuffle } from "lodash-core";
import Gamepad from "react-gamepad";
import KeyboardEventHandler from "react-keyboard-event-handler";
import { Frame, Stack, useAnimation } from "framer";

import { durations, transitions } from "../../Components/Animations";
import { Rail } from "../../Components/Rail";
import { HeroHomepage } from "../../Components/HeroHomepage";
import { showsStore, pageStore } from "../../Stores/Store";

export default function HomeDTC(props) {
  const { id, name, ...rest } = props;
  const [initialLoad, setInitialLoad] = useState(true);
  const [store, setStore] = pageStore();
  const [shows] = showsStore();
  const [focusDelay, setFocusDelay] = useState(0);
  const [focus, setFocus] = useState({ component: 0, item: "rail" });
  const [verticalOffsets, setVerticalOffsets] = useState([]);
  const [verticalOffset, setVerticalOffset] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);
  const [previousComponentId, setPreviousComponentId] = useState({});
  const [previousComponent, setPreviousComponent] = useState({});
  const [currentComponent, setCurrentComponent] = useState({});
  const [components, setComponents] = useState([
    {
      id: 0,
      type: "rail",
      sub_type: "hero",
      locked: true,
      current_item: 0,
      left: 0,
      content: [{ state: "default" }]
    },
    {
      id: 1,
      type: "rail",
      sub_type: "episode",
      locked: true,
      current_item: 0,
      left: 0,
      content: [
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
      id: 2,
      type: "rail",
      sub_type: "show",
      locked: true,
      current_item: 0,
      left: 0,
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
        { state: "default" }
      ]
    },
    {
      id: 3,
      type: "rail",
      sub_type: "episode",
      locked: true,
      current_item: 0,
      left: 0,
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
        { state: "default" }
      ]
    },
    {
      id: 4,
      type: "rail",
      sub_type: "show",
      locked: true,
      current_item: 0,
      left: 0,
      content: [
        { state: "default" },
        { state: "default" },
        { state: "default" },
        { state: "default" },
        { state: "default" }
      ]
    },
    {
      id: 5,
      type: "rail",
      sub_type: "episode",
      locked: true,
      current_item: 0,
      left: 0,
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
        { state: "default" }
      ]
    },
    {
      id: 6,
      type: "rail",
      sub_type: "episode",
      locked: true,
      current_item: 0,
      left: 0,
      content: [
        { state: "default" },
        { state: "default" },
        { state: "default" },
        { state: "default" },
        { state: "default" },
        { state: "default" }
      ]
    },
    {
      id: 7,
      type: "rail",
      sub_type: "episode",
      locked: true,
      current_item: 0,
      left: 0,
      content: [
        { state: "default" },
        { state: "default" },
        { state: "default" }
      ]
    },
    {
      id: 8,
      type: "rail",
      sub_type: "show",
      locked: true,
      current_item: 0,
      left: 0,
      content: [
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
      id: 9,
      type: "rail",
      sub_type: "show",
      locked: true,
      current_item: 0,
      left: 0,
      content: [
        { state: "default" },
        { state: "default" },
        { state: "default" },
        { state: "default" },
        { state: "default" },
        { state: "default" }
      ]
    },
    {
      id: 10,
      type: "rail",
      sub_type: "episode",
      locked: true,
      current_item: 0,
      left: 0,
      content: [
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

  const [heroText, setHeroText] = useState({});
  const heroAnimation = useAnimation();

  const { global_nav } = store;

  const [page, setPage] = useState({
    name: "Home",
    key: "home",
    current_group: "components", //globalNav, navigation, components
    current_global: 0,
    current_navigation: 1,
    current_component: 0,
    previous_group: "components",
    previous_global: 0,
    previous_navigation: 1,
    previous_component: 0,
    current_id: 0,
    verticalOffsets: [],
    contentHeight: 0
  });

  const initialOffset = 100;

  const {
    // current_group,
    // current_component,
    // current_navigation,
    previous_group
  } = page;

  // const [isPressed, setIsPressed] = useState(false);
  // const [shows, setShowsStore] = showsStore();
  // const [contentLoading, setContentLoading] = useState(false);
  // const [tertiaryLoading, setTertiaryLoading] = useState(false);
  // const curIndex = current_group === "components" ? current_component : current_navigation;
  // const type = current_group === "components" ? components[curIndex].type : "";
  // const component = components[current_component];
  // const { current_item } = component;

  async function heroHide() {
    await heroAnimation.start({
      opacity: 0,
      transition: { duration: 0 }
    });
  }

  async function heroSequence() {
    let component = currentComponent;
    let { content, current_item } = component;
    let { showId } = content[current_item];

    const {
      image,
      background,
      title,
      description,
      recommendation
    } = shows.results[showId];

    if (focus.item !== "global-navigation") {
      await heroHide();
    }

    setHeroText({
      image: image,
      title: title,
      description: description,
      recommendation: recommendation,
      background: background
    });

    await heroAnimation.start({
      opacity: 1,
      transition: {
        opacity: {
          ...transitions.fade,
          delay: durations.m + focusDelay,
          duration: durations.xs
        }
      }
    });
  }

  const updateValue = (x, max, direction) => {
    let value = x;
    value =
      direction === "down" || direction === "forward"
        ? value < max
          ? value + 1
          : max
        : value > 0
        ? value - 1
        : 0;

    return value;
  };

  const randomItemArray = (arr) => {
    var item = arr[Math.floor(Math.random() * arr.length)];
    return item;
  };

  const randomNumberArray = (arr) => {
    return Math.floor(Math.random() * arr.length);
  };

  async function calculateHeights(initialOffset) {
    let offsets = [];
    let contentHeight = 0;

    // calculate vertical scroll position for each component
    components.map((item, index) => {
      const { type, sub_type } = item;
      const { params } = store;
      const { railGap, heights } = params;
      const height = heights[sub_type];

      // console.log(height);
      let offsetHeight =
        offsets[index - 1] === undefined ? 0 : offsets[index - 1];
      offsets = [
        ...offsets,
        -Math.abs(height) + offsetHeight + -Math.abs(railGap)
      ];
      contentHeight =
        contentHeight + (height + Math.abs(offsetHeight) + railGap);
    });

    offsets.unshift(initialOffset);
    offsets.pop();
    setContentHeight(contentHeight);
    setVerticalOffsets(offsets);
  }

  async function loader() {
    await setGlobalNavigation();
    await addGlobalNavigation();
    await calculateHeights(0);
  }

  const translateLeft = (component, value, sub_type) => {
    // console.log(arr, value, sub_type);

    // step distance
    let step = 0;
    let offset = 0;
    let visible = 0;

    if (sub_type === "show") {
      step = 73.33 + 15;
      visible = 6;
    }

    if (sub_type === "episode") {
      step = 162.67 + 15;
      visible = 3;
    }

    if (sub_type === "network") {
      step = 50 + 8;
      visible = 9;
    }

    if (sub_type === "tertiary") {
      visible = 5;
    }

    // array length
    const length = component.content.length;

    // offset
    offset = length - visible - 1;

    // scroll index
    let scrollIndex =
      length > visible - 1
        ? value <= 0
          ? 0
          : value <= offset
          ? value
          : length - visible
        : 0;

    if (component.locked) {
      scrollIndex = value;
    }

    const left =
      sub_type === "tertiary"
        ? component.offsets[scrollIndex]
        : -step * scrollIndex;
    return left;
  };

  const navigateRail = (direction) => {
    // create local component
    let component = { ...currentComponent };
    let { current_item, content, left, type, sub_type } = component;
    let active = current_item;

    // update component
    content[current_item].state = "default";

    if (type === "navigation" || type === "rail") {
      // update new
      let active = updateValue(current_item, content.length - 1, direction);
      content[active].state = "focus";
      component.left = translateLeft(component, active, component.sub_type);

      if (direction === "back" && current_item === 0) {
        content[active].state = "previous";
        globalFocus();
        return;
      }

      // update component
      component = {
        ...component,
        current_item: active
      };
    }

    // replace component
    setCurrentComponent(component);
  };

  const navigateHorizontal = (direction) => {
    if (focus.item === "global-navigation" && direction === "forward") {
      setStore({
        ...store,
        pages: {
          ...store.pages,
          home: {
            ...store.pages.home,
            current_group: previous_group
          }
        }
      });

      (async function anyNameFunction() {
        await updatePreviousComponent();
        await updateFocus(previousComponentId, "rail");
        await updateActiveComponent();
      })();
    }
    if (focus.item === "rail") navigateRail(direction);
  };

  const navigateVertical = (direction) => {
    const component = components[focus.component];
    const { type, sub_type } = component;
    const val = updateValue(focus.component, components.length - 2, direction);

    if (focus.component !== val) {
      if (focus.item === "rail") {
        (async function anyNameFunction() {
          await heroHide();
          await updatePreviousComponent();
          await updateFocus(val, "rail");
        })();
      }
    }

    if (focus.item === "global-navigation") {
      // copy the components
      let local = [...components];

      // create local component
      let component = { ...local[focus.component] };
      let {
        current_item,
        current_row,
        content,
        left,
        type,
        sub_type
      } = component;

      let active = current_item;

      // update component
      content[current_item].state = "default";
      // update new
      active = updateValue(current_item, content.length - 1, direction);
      content[active].state = "focus";

      setStore({
        ...store,
        global_nav: {
          ...global_nav,
          current: active,
          previous: current_item
        }
      });
    }
  };

  async function updateFocus(value, item) {
    setFocus({
      component: value,
      item: item
    });
  }

  async function updateComponents(val) {
    // replace component
    let local = [...components];
    local.splice(focus.component, 1, val);
    setComponents([...local]);
  }

  async function updateActiveComponent() {
    // console.log(focus);
    if (focus.item !== "global-navigation") {
      let component = { ...components[focus.component] };
      let { current_item, content, name, type } = component;
      let { item } = focus;

      content[current_item].state = "focus";
      setCurrentComponent(component);
    }
  }

  async function updatePreviousComponentid(val) {
    setPreviousComponentId(val);
  }

  async function updateSetPreviousComponent(val) {
    setPreviousComponent(val);
  }

  async function updatePreviousComponent() {
    let component = { ...currentComponent };
    let { current_item, content, name, type } = component;
    let { item } = focus;

    if (type === "rail") {
      content[current_item].state = "previous";
    }

    if (type === "navigation") {
      content[current_item].state = "active";
    }

    // Using an IIFE
    (async function anyNameFunction() {
      updatePreviousComponentid(focus.component);
      await updateSetPreviousComponent(component);
      await updateComponents(component);
    })();
  }

  async function setGlobalNavigation() {
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
  }

  async function addGlobalNavigation() {
    // add global nav to local components
    let local = [...components];

    local.push({
      name: "global-navigation",
      type: "navigation",
      sub_type: "globalNav",
      current_item: 0,
      content: [...global_nav.items]
    });

    // update components
    setComponents(() => [...local]);
  }

  const globalFocus = () => {
    setStore({
      ...store,
      global_nav: {
        ...global_nav,
        current: global_nav.active
      },
      pages: {
        ...store.pages,
        home: {
          ...store.pages.home,
          previous_group: "components",
          current_group: "globalNav"
        }
      }
    });

    (async function anyNameFunction() {
      await updatePreviousComponent();
      await updateFocus(components.length - 1, "global-navigation");
      let component = components[components.length - 1];
      setCurrentComponent(component);
    })();
  };

  const translateY = () => {
    let val = verticalOffsets[focus.component];
    return val;
  };

  const tilePress = (pressed) => {
    return;
  };

  const handleSubmit = (pressed) => {
    return;
  };

  const backNavigate = () => {
    // reset back to previous component if global navigation is exposed
    if (focus.item === "global-navigation") {
      setStore({
        ...store,
        pages: {
          ...store.pages,
          home: {
            ...store.pages.home,
            current_group: previous_group
          }
        }
      });
      (async function anyNameFunction() {
        await updatePreviousComponent();
        await updateFocus(previousComponentId, "rail");
        return;
      })();
    }
    // reset back to first item
    // also reset all rails to 'initial' state of left 0 & no item in focus
    if (focus.component > 0 && focus.component < components.length - 1) {
      // reset current component
      let component = currentComponent;
      component.left = 0;
      component.content[component.current_item].state = "default";
      component.current_item = 0;
      setCurrentComponent(component);

      // reset all components
      let local = components;
      local.map((item, index) => {
        if (index < components.length - 1) {
          item.left = 0;
          item.content[item.current_item].state = "default";
          item.current_item = 0;
        }
      });

      // set new current component
      setCurrentComponent(local[0]);

      // update components
      setComponents(local);

      // update focus
      updateFocus(0, "rail");
    }

    // reset first component
    if (focus.component === 0 && currentComponent.current_item > 0) {
      // let local = currentComponent;
      // local.left = 0;
      // local.content[local.current_item].state = "default";
      // local.current_item = 0;
      // setCurrentComponent(local);
    }

    // open global navigation
    if (focus.component === 0 && currentComponent.current_item === 0) {
      globalFocus();
      updatePreviousComponent(currentComponent);
      updatePreviousComponentid(0);
    }
  };

  const buttonDownHandler = (buttonName) => {
    if (buttonName === "DPadUp") navigateVertical("up");
    if (buttonName === "DPadDown") navigateVertical("down");
    if (buttonName === "DPadLeft") navigateHorizontal("back");
    if (buttonName === "DPadRight") navigateHorizontal("forward");
  };

  const buttonChangeHandler = (buttonName, pressed) => {
    if (buttonName === "B" && pressed) backNavigate();
    if (buttonName === "A") handleSubmit(pressed);
  };

  const [lead, setLead] = useState({});

  async function generateShowDetails() {
    let local = [...components];
    let showList = [];

    shows.results.map((item, index) => {
      showList.push(index);
    });

    local.map((rail, componentIndex) => {
      let list = shuffle(showList);

      rail.content.map((item, index) => {
        item.showId = componentIndex === 0 ? 0 : list[index];
      });
    });

    setComponents(local);
    setLead({
      image: shows.results[local[0].content[0].showId].image
    });
  }

  // single run
  useEffect(() => {
    // Using an IIFE
    (async function anyNameFunction() {
      await generateShowDetails();
      await updateActiveComponent();
      await loader();
    })();

    setInitialLoad(false);
  }, []);

  useEffect(() => {
    if (!initialLoad) {
      // Using an IIFE
      (async function anyNameFunction() {
        if (currentComponent.name !== "global-navigation") await heroSequence();
      })();
    }
  }, [currentComponent]);

  // focus changes
  useEffect(() => {
    if (!initialLoad) {
      // Using an IIFE
      (async function anyNameFunction() {
        await updateActiveComponent();
      })();

      let offsetVal =
        focus.item === "global-navigation"
          ? previousComponentId
          : focus.component;

      setVerticalOffset(verticalOffsets[offsetVal]);
    }
  }, [focus]);

  const genres = [
    "For You",
    "Adventure & Exploration",
    "Nature & Animals",
    "Lifestyle",
    "Home",
    "Food"
  ];

  return (
    <>
      <Frame
        center
        width={640}
        height={360}
        background={store.params.backgrounds.dtc}
        overflow={"hidden"}
        {...rest}
      >
        <HeroHomepage
          focus={focus}
          previousComponentId={previousComponentId}
          heroText={heroText}
          heroAnimation={heroAnimation}
          lead={lead}
        />

        <Frame
          top={0}
          width={"100%"}
          height={75}
          background={
            "linear-gradient(180deg, rgba(23,27,27,1) 0%, rgba(23,27,27,0) 100%)"
          }
        />

        <Frame
          id="tertiary-navigation"
          top={12}
          left={36}
          width={"85%"}
          height={36}
          background={"none"}
          style={{
            WebkitMaskImage: `-webkit-gradient(linear, left top, right top, from(rgba(0,0,0,1)), color-stop(0.75, rgba(0,0,0,1)), to(rgba(0,0,0,0)))`
          }}
        >
          <Stack
            top={0}
            height={30}
            width={"100%"}
            direction={"horizontal"}
            gap={4}
            background={"none"}
          >
            {genres.map((item, index) => {
              return (
                <Frame
                  key={index}
                  height={"auto"}
                  opacity={index === 0 ? 1 : 0.5}
                  background={"none"}
                  style={{
                    padding: "2px 12px",
                    width: "auto",
                    color: "#fff",
                    letterSpacing: 0.5,
                    fontSize: 14,
                    textShadow: "0 1px 1px rgba(18,19,23,0.5)"
                  }}
                >
                  {item}
                </Frame>
              );
            })}
          </Stack>
        </Frame>

        <Frame
          id="content"
          width={"100%"}
          height={180}
          bottom={0}
          background="none"
          overflow={"hidden"}
        >
          <Stack
            height={contentHeight}
            width={"100%"}
            padding={16}
            paddingTop={16}
            paddingLeft={35 + 16}
            paddingRight={0}
            overflow={"visible"}
            direction="vertical"
            gap={store.params.railGap}
            animate={{
              y: verticalOffset
            }}
            transition={{
              ...transitions.slide,
              duration: durations.m
            }}
          >
            {components.map((component, index) => {
              return index < components.length - 1 ? (
                index === currentComponent.id ? (
                  <Rail
                    key={index}
                    id={id}
                    localStore={currentComponent}
                    animate={{
                      left: currentComponent.left
                    }}
                    transition={{
                      ...transitions.slide,
                      duration: durations.m
                    }}
                  />
                ) : (
                  <Rail
                    key={index}
                    id={id}
                    localStore={component}
                    animate={{
                      left: component.left
                    }}
                    transition={{
                      ...transitions.slide,
                      duration: durations.m
                    }}
                  />
                )
              ) : null;
            })}
          </Stack>
        </Frame>

        <Frame
          id="overlay-scrim"
          width={"100%"}
          height={"100%"}
          initial={{
            background: "rgba(18,19,23,0)"
          }}
          animate={{
            background:
              focus.item === "global-navigation"
                ? "rgba(18,19,23,0.80)"
                : "rgba(18,19,23,0)"
          }}
        />
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

HomeDTC.defaultProps = {
  id: 0,
  name: "Home"
};
