import React, { useState, useEffect } from "react";
import Gamepad from "react-gamepad";
import KeyboardEventHandler from "react-keyboard-event-handler";
import { Frame, Stack, useAnimation } from "framer";

import { durations, transitions } from "../Components/Animations";
import { Rail } from "../Components/Rail";
import { HeroHomepage } from "../Components/HeroHomepage";
import { pageStore } from "../Stores/Store";

export default function TestHome(props) {
  const { id, name, ...rest } = props;
  const [isPressed, setIsPressed] = useState(false);
  const [focusDelay, setFocusDelay] = useState(false);
  const [store, setStore] = pageStore();
  const [contentLoading, setContentLoading] = useState(false);
  const [tertiaryLoading, setTertiaryLoading] = useState(false);

  const [heroText, setHeroText] = useState({});
  const heroAnimation = useAnimation();

  const { global_nav } = store;

  const page = store.pages.home;

  const {
    current_group,
    current_component,
    current_navigation,
    previous_group,
    current_id,
    navigation,
    components,
    verticalOffsets,
    contentHeight,
    key
  } = page;

  const curIndex =
    current_group === "components" ? current_component : current_navigation;

  const type =
    current_group === "components" ? components[curIndex].type : "shitfukc";

  const initialOffset = 100;

  async function heroSequence() {
    const { series, description, recommendation } = components[
      current_component
    ].content[components[current_component].current_item];
    await heroAnimation.start({
      opacity: 0,
      transition: { ...transitions.fade, duration: 0 }
    });

    await setHeroText({
      series: series,
      description: description,
      recommendation: recommendation
    });

    await heroAnimation.start({
      opacity: 1,
      transition: {
        opacity: {
          ...transitions.fade,
          delay: durations.m,
          duration: durations.xs
        }
      }
    });
  }

  // console.log("home rendering");

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

  const updateRail = () => {
    // copy local
    let local = { ...page };
    let { navigation, components } = local;

    if (navigation !== undefined) {
      // update old
      let oldNav = navigation[local.previous_navigation];
      oldNav.content[oldNav.current_item].state = "active";
    }

    let oldComponent = components[local.previous_component];
    oldComponent.content[oldComponent.current_item].state = "previous";

    if (current_group === "components") {
      let component = components[local.current_component];
      let content = component.content;
      let active = component.current_item;

      // update new
      content[active].state = "focus";

      // let { series, description, recommendation } = content[active];

      // setHeroText({
      //   series: series,
      //   description: description,
      //   recommendation: recommendation
      // });

      // push
      setStore({
        ...store,
        pages: {
          ...store.pages,
          [key]: {
            ...local,
            components: components
          }
        }
      });
    } else if (current_group === "navigation") {
      let components = local.navigation;
      let component = components[curIndex];
      let content = component.content;
      let active = component.current_item;

      // update old
      let curItem = content[active];

      curItem.state =
        curItem.state === "focus" && current_component === component.id
          ? "active"
          : "focus";

      // push
      setStore({
        ...store,
        pages: {
          ...store.pages,
          [key]: {
            ...local,
            navigation: components
          }
        }
      });
    } else if (current_group === "globalNav") {
      components[local.current_component].content[
        components[local.current_component].current_item
      ].state = "previous";

      if (navigation !== undefined) {
        navigation[local.current_navigation].content[
          navigation[local.current_navigation].current_item
        ].state = "active";
      }

      setStore({
        ...store,
        pages: {
          ...store.pages,
          [key]: {
            ...local,
            // navigation: navigation !== undefined ? navigation : undefined,
            components: components
          }
        }
      });
    }
  };

  const calculateHeights = initialOffset => {
    let local = { ...page };
    // local copy
    let offsets = [];
    let contentHeight = 0;

    // calculate vertical scroll position for each component
    local.components.map((item, index) => {
      const { sub_type } = item;
      const { params } = store;
      const { railGap, heights } = params;
      const height = heights[sub_type];

      const offsetHeight =
        offsets[index - 1] === undefined ? initialOffset : offsets[index - 1];

      offsets = [
        ...offsets,
        -Math.abs(height) + offsetHeight + -Math.abs(railGap)
      ];

      contentHeight =
        contentHeight + (height + Math.abs(offsetHeight) + railGap);
    });

    offsets.unshift(initialOffset);

    setStore({
      ...store,
      pages: {
        ...store.pages,
        [key]: {
          ...local,
          contentHeight: contentHeight,
          verticalOffsets: offsets
        }
      }
    });
  };

  const calculateWidths = () => {
    let local = { ...page };
    let navigation = [...local.navigation];
    let tertiary = navigation[1];

    tertiary.content.map((item, index) => {
      const offsetWidth =
        tertiary.offsets[index - 1] === undefined
          ? 0
          : tertiary.offsets[index - 1];
      tertiary.offsets = [
        ...tertiary.offsets,
        -Math.abs(item.width) + offsetWidth + -Math.abs(8)
      ];
    });
    tertiary.offsets.unshift(0);
    setStore({
      ...store,
      pages: {
        ...store.pages,
        [key]: {
          ...local
        }
      }
    });
  };

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

  const navigateRail = direction => {
    // copy local
    let local = { ...page };
    let components =
      local.current_group === "components"
        ? local.components
        : local.navigation;
    let component =
      components[
        local.current_group === "components"
          ? local.current_component
          : local.current_navigation
      ];
    let content = component.content;
    let active = component.current_item;

    // if left and first item, open primary navigation
    if (direction === "back" && active === 0) {
      updateRail();

      setStore({
        ...store,
        global_nav: {
          ...global_nav,
          current: global_nav.active
        },
        pages: {
          ...store.pages,
          [key]: {
            ...local,
            previous_group: local.current_group,
            current_group: "globalNav"
          }
        }
      });
    } else {
      // update old
      let curItem = content[active];
      curItem.state = "default";

      // set new value
      active = updateValue(active, content.length - 1, direction);
      component.current_item = active;

      // update new
      let newItem = content[active];
      newItem.state = "focus";

      setStore({
        ...store,
        pages: {
          ...store.pages,
          [key]: {
            ...local,
            current_id: component.content[active].id
          }
        }
      });

      // let { series, description, recommendation } = component.content[active];

      // setHeroText({
      //   series: series,
      //   description: description,
      //   recommendation: recommendation
      // });

      if (component.type === "navigation") {
        setContentLoading(true);
      }
      if (component.sub_type === "network") {
        setTertiaryLoading(true);
      }

      // set delay only of rail movement is required
      if (
        component.left !== translateLeft(component, active, component.sub_type)
      ) {
        setFocusDelay(true);
      } else {
        setFocusDelay(false);
      }
      // set scroll position
      component.left = translateLeft(component, active, component.sub_type);

      // push
      setStore({
        ...store,
        pages: {
          ...store.pages,
          [key]: {
            ...local,
            [local.current_group === "components"
              ? "components"
              : "navigation"]: components
          }
        }
      });
    }
  };

  const navigateHorizontal = direction => {
    if (current_group === "globalNav") {
      if (direction === "forward") {
        setStore({
          ...store,
          pages: {
            ...store.pages,
            [key]: {
              ...store.pages[key],
              current_group: previous_group
            }
          }
        });
      }
    } else {
      navigateRail(direction);
    }
  };

  const navigateVertical = direction => {
    setFocusDelay(0);
    let params = {};

    if (current_group === "components") {
      params = {
        ...params,
        index: current_component,
        arr: components
      };
    } else if (current_group === "navigation") {
      params = {
        ...params,
        index: current_navigation,
        arr: navigation
      };
    } else {
      params = {
        ...params,
        index: global_nav.current,
        arr: global_nav.items
      };
    }

    const { index, arr } = params;

    let newIndex = updateValue(index, arr.length - 1, direction);

    let local = { ...page };

    if (current_group === "navigation") {
      if (type === "rail") updateRail();

      // if on last nav component, move to components
      if (index === arr.length - 1 && direction === "down") {
        setStore({
          ...store,
          pages: {
            ...store.pages,
            [key]: {
              ...local,
              current_group: "components",
              previous_group: "navigation",
              previous_navigation: index
            }
          }
        });
      }
      if (newIndex !== index) {
        setStore({
          ...store,
          pages: {
            ...store.pages,
            [key]: {
              ...local,
              previous_navigation: index,
              current_navigation: newIndex
            }
          }
        });
      }
    }

    // moving through components
    if (current_group === "components") {
      if (type === "rail") updateRail();
      // if on first component, move to navigation
      if (index === 0 && direction === "up" && navigation !== undefined) {
        setStore({
          ...store,
          pages: {
            ...store.pages,
            [key]: {
              ...local,
              current_group: "navigation",
              previous_group: "components",
              previous_component: index
            }
          }
        });
      }
      if (newIndex !== index) {
        setStore({
          ...store,
          pages: {
            ...store.pages,
            [key]: {
              ...local,
              previous_component: index,
              current_component: newIndex
            }
          }
        });
      }
    }

    // move through primary navigation
    if (current_group === "globalNav") {
      if (newIndex !== index) {
        setStore({
          ...store,
          global_nav: {
            ...global_nav,
            current: newIndex,
            previous: index
          }
        });
      }
    }
  };

  const translateY = () => {
    let val;

    if (key === "home") {
      val = current_component > 0 ? verticalOffsets[current_component] : 0;
    }

    return val;
  };

  const resetContent = () => {
    let local = { ...page };
    let { components } = local;

    local.current_component = 0;
    local.current_id = 0;
    local.verticalOffsets = [];

    components.map(item => {
      let { content } = item;
      item.left = 0;
      item.current_item = 0;
      content.map(item => {
        let { state } = item;
        item.state = "default";
      });
    });
    components[0].content[0].state = "focus";

    setStore({
      ...store,
      pages: {
        ...store.pages,
        [key]: {
          ...local,
          current_component: 0,
          current_id: 0,
          verticalOffsets: [],
          components: components
        }
      }
    });
    calculateHeights(0);
  };

  const tilePress = pressed => {
    let local = { ...page };
    let component = { ...local.components[curIndex] };
    let content = component.content;
    let tile = content[component.current_item];
    tile.state = pressed ? "press" : "focus";

    local.components[curIndex] = component;

    setStore({
      ...store,
      pages: {
        ...store.pages,
        [key]: {
          ...local,
          components: local.components
        }
      }
    });
  };

  const handleSubmit = pressed => {
    setIsPressed(pressed);
    if (type === "rail") tilePress(pressed);
  };

  const backNavigate = () => {
    let local = { ...page };

    if (current_group === "components" && local.current_component >= 0) {
      let components = local.components;

      components[current_component].content[
        components[current_component].current_item
      ].state = "previous";

      // set to previous focus
      // set group to navigation
      setStore({
        ...store,
        pages: {
          ...store.pages,
          [key]: {
            ...local,
            current_group: "components",
            previous_group: "components",
            current_component: 0,
            previous_component: 0,
            components: components
          }
        }
      });
    }
    if (current_group === "components" && local.current_component === 0) {
      setStore({
        ...store,
        pages: {
          ...store.pages,
          [key]: {
            ...local,
            current_group: "globalNav",
            previous_group: "components",
            current_component: 0,
            previous_component: 0,
            components: components
          }
        }
      });
    } else if (
      current_group === "globalNav" &&
      previous_group === "components"
    ) {
      setStore({
        ...store,
        global_nav: {
          ...global_nav,
          current: store.global_nav.active
        },
        pages: {
          ...store.pages,
          [key]: {
            ...local,
            current_group: local.previous_group,
            previous_group: "globalNav"
          }
        }
      });
    }
  };

  function resetHome() {
    // reset home
    let home = { ...store.pages.home };
    setStore({
      ...store,
      pages: {
        ...store.pages,
        home: {
          ...home,
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
        }
      }
    });

    calculateHeights(0);
    updateRail();
  }

  const buttonDownHandler = buttonName => {
    if (buttonName === "DPadUp") navigateVertical("up");
    if (buttonName === "DPadDown") navigateVertical("down");
    if (buttonName === "DPadLeft") navigateHorizontal("back");
    if (buttonName === "DPadRight") navigateHorizontal("forward");
  };

  const buttonChangeHandler = (buttonName, pressed) => {
    if (buttonName === "B" && pressed) backNavigate();
    if (buttonName === "A") handleSubmit(pressed);
  };

  useEffect(() => {
    updateRail();
  }, [current_group, current_navigation, current_component]);

  if (navigation !== undefined) {
  }

  let loadTimeout;

  const showContent = () => {
    setContentLoading(false);
    setTertiaryLoading(false);
  };

  const setTimeouts = () => {
    if (tertiaryLoading) {
      let components = navigation;

      components[1].current_item = 0;
      components[1].content.map(item => {
        item.state = "default";
      });
      components[1].content[0].state = "active";
      components[1].left = 0;

      setStore({
        ...store,
        navigation: components
      });
    }
    loadTimeout = setTimeout(showContent, 500);
  };

  const clearTimeouts = () => {
    if (loadTimeout) clearTimeout(loadTimeout);
  };

  useEffect(() => {
    setTimeouts();

    return () => {
      clearTimeouts();
    };
  }, [current_id]);

  useEffect(() => {
    heroSequence();
  }, [current_id, current_component]);

  // single run
  useEffect(() => {
    if (store.current_page === "home") {
      // resetHome();
      // resetContent();
    }
    calculateHeights(0);
    heroSequence();
  }, [store.current_page]);

  return (
    <>
      <Frame
        center
        width={640}
        height={360}
        background={"rgba(255,255,255,0.0125)"}
        overflow={"hidden"}
        animate={{
          opacity: current_group === "globalNav" ? 0.25 : 1
        }}
        transition={{
          ...transitions.slide
        }}
        {...rest}
      >
        <HeroHomepage heroText={heroText} heroAnimation={heroAnimation} />
        {navigation !== undefined ? (
          <Frame
            id="navigation"
            width={"100%"}
            height={150}
            background="none"
            overflow="visible"
            animate={{
              y: translateY()
            }}
            transition={{
              duration: store.params.durations.verticalScroll,
              ease: "easeInOut"
            }}
          >
            <Stack
              width={"auto"}
              height={120}
              direction={"vertical"}
              padding={16}
              paddingLeft={35 + 16}
              center={"y"}
              gap={16}
            >
              {navigation !== undefined
                ? navigation.map((component, index) => {
                    return (
                      <Rail
                        key={index}
                        localStore={component}
                        animate={{
                          left: component.left,
                          opacity:
                            component.sub_type === "tertiary" && tertiaryLoading
                              ? 0
                              : 1
                        }}
                        focusDelay={focusDelay}
                        transition={{
                          ...transitions.slide,
                          duration:
                            component.sub_type === "network"
                              ? durations.s
                              : durations.m,
                          opacity: {
                            duration:
                              component.sub_type === "tertiary" &&
                              tertiaryLoading
                                ? 0
                                : durations.s
                          }
                        }}
                      />
                    );
                  })
                : null}
            </Stack>
          </Frame>
        ) : null}

        <Frame
          id="content"
          width={"100%"}
          height={360}
          top={initialOffset}
          background="none"
          animate={{
            opacity: contentLoading ? 0 : 1
          }}
          transition={{
            duration: contentLoading ? 0.125 : durations.s
          }}
        >
          <Stack
            height={contentHeight}
            width={"100%"}
            padding={16}
            paddingTop={64}
            paddingLeft={35 + 16}
            paddingRight={0}
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
            {components.map((component, index) => {
              return (
                <Rail
                  key={index}
                  id={id}
                  localStore={component}
                  focusDelay={focusDelay}
                  animate={{
                    opacity: index < current_component ? 0 : 1,
                    left: component.left
                  }}
                  transition={{
                    ...transitions.slide,
                    duration: durations.m,
                    opacity: {
                      ...transitions.fade
                    }
                  }}
                />
              );
            })}
          </Stack>
        </Frame>
      </Frame>

      <Gamepad
        onButtonDown={buttonName => {
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

TestHome.defaultProps = {
  id: 1,
  name: "Browse"
};
