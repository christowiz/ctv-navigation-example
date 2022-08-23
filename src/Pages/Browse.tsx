import React, { useState, useEffect } from "react";
import { chunk } from "lodash-core";
import Gamepad from "react-gamepad";
import KeyboardEventHandler from "react-keyboard-event-handler";
import { Frame, Stack } from "framer";

import { durations, transitions } from "../Components/Animations";

import { Rail } from "../Components/Rail";
import { Grid } from "../Components/Grid";

import { pageStore } from "../Stores/Store";

export default function Browse(props) {
  const { id, name, ...rest } = props;
  const [isPressed, setIsPressed] = useState(false);
  const [focusDelay, setFocusDelay] = useState(false);
  const [store, setStore] = pageStore();
  const [contentLoading, setContentLoading] = useState(true);
  const [tertiaryLoading, setTertiaryLoading] = useState(true);

  const { global_nav } = store;

  const page = store.pages.browse;

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
    current_group === "components"
      ? components[curIndex].type
      : navigation[curIndex].type;
  const initialOffset = 100;

  let loadTimeout;
  const component = components[current_component];
  const { current_item, current_row } = component;

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

    // update old
    let oldNav = navigation[local.previous_navigation];
    oldNav.content[oldNav.current_item].state = "active";

    let oldComponent = components[local.previous_component];
    let type = oldComponent.type;

    if (type !== "grid") {
      oldComponent.content[oldComponent.current_item].state = "previous";
    } else {
      oldComponent.local.content[oldComponent.current_item].state = "previous";
    }

    if (current_group === "components") {
      let component = components[local.current_component];
      let content =
        type === "grid" ? component.local.content : component.content;
      let active = component.current_item;

      // update new
      content[active].state = "focus";

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
      if (type === "rail") {
        components[local.current_component].content[
          components[local.current_component].current_item
        ].state = "previous";
      }

      if (type === "grid") {
        components[local.current_component].local.content[
          components[local.current_component].current_item
        ].state = "previous";
      }

      navigation[local.current_navigation].content[
        navigation[local.current_navigation].current_item
      ].state = "active";
      setStore({
        ...store,
        pages: {
          ...store.pages,
          [key]: {
            ...local,
            navigation: navigation,
            components: components
          }
        }
      });
    }
  };

  const calculateGridHeight = (content, height) => {
    let rows = chunk(content, 6);
    let gridHeight = 0;
    let gridOffsets = [];

    rows.map((item, index) => {
      const offsetHeight =
        gridOffsets[index - 1] === undefined ? -65 : gridOffsets[index - 1];

      gridOffsets = [
        ...gridOffsets,
        -Math.abs(height) + offsetHeight + -Math.abs(16)
      ];

      gridHeight = gridHeight + (height + Math.abs(offsetHeight) + 16);

      gridHeight = gridHeight + height;
    });

    return { gridHeight, gridOffsets };
  };

  async function calculateHeights(initialOffset) {
    let local = { ...page };
    // local copy
    let offsets = [];
    let contentHeight = 0;

    // calculate vertical scroll position for each component
    local.components.map((item, index) => {
      const { type, sub_type } = item;
      const { params } = store;
      const { railGap, heights } = params;
      const height = heights[sub_type];

      // console.log(height);

      if (type === "grid") {
        let { gridHeight, gridOffsets } = calculateGridHeight(
          item.local.content,
          123
        );
        contentHeight = gridHeight;
        offsets = gridOffsets;
      } else {
        let offsetHeight =
          offsets[index - 1] === undefined ? -55 : offsets[index - 1];

        offsets = [
          ...offsets,
          -Math.abs(height) + offsetHeight + -Math.abs(railGap)
        ];

        contentHeight =
          contentHeight + (height + Math.abs(offsetHeight) + railGap);
      }

      // console.log(type, sub_type);
      // console.log();
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
  }

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
      visible = 6;

      const calculateVisible = arr => {
        let width = 0;
        let visible = 0;

        arr.map((item, index) => {
          width = width < 500 ? width + item.width : width;
          visible = width < 500 ? visible + index : visible;
        });

        return visible;
      };

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

  const translateY = () => {
    let val;

    if (key === "browse") {
      val = current_component >= 0 ? verticalOffsets[current_row] : 0;
    } else {
      val = current_component > 0 ? verticalOffsets[current_component] : 0;
    }
    return val;
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
    let content =
      component.type === "grid" ? component.local.content : component.content;
    let active = component.current_item;

    // if left and first item, open primary navigation
    if (direction === "back" && active === 0 && type !== "grid") {
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
      if (type === "grid") {
        if (direction === "forward") {
          let row = current_row + 1;
          let max = row * 6 - 1;
          active =
            active + 1 >= content.length
              ? content.length - 1
              : updateValue(active, max, direction);
        } else {
          let lowVal = 6 * current_row;

          // if first item in row, open menu
          if (active === current_row * 6) {
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

            return;
          } else {
            active = active - 1 > lowVal - 1 ? active - 1 : active;
          }
        }
      } else {
        active = updateValue(active, content.length - 1, direction);
      }

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
            current_id: content[active].id
          }
        }
      });

      if (component.type === "navigation") {
        setContentLoading(true);
        resetGrid(false);
      }
      if (component.sub_type === "network") {
        setTertiaryLoading(true);
        components[1].left = 0;
        components[1].current_item = 0;
        components[1].content.map((item, index) => {
          item.state = index === 0 ? "active" : "default";
        });
      }

      if (component.left !== undefined) {
        // set delay only of rail movement is required
        if (
          component.left !==
          translateLeft(component, active, component.sub_type)
        ) {
          // setFocusDelay(true);
        } else {
          // setFocusDelay(false);
        }

        // set scroll position
        component.left = translateLeft(component, active, component.sub_type);
      }

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
              ...store.pages.browse,
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
    setFocusDelay(false);
    let params = {};
    let local = { ...page };
    let component = components[current_component];

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
      // set up conditions for grid
      if (type === "grid") updateGrid(direction);
      // else navigate between components
      // if on first component, move to navigation
      if (index === 0 && direction === "up") {
        if (type === "grid" && current_row === 0) {
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
        if (type !== "grid") {
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
      } else if (newIndex !== index) {
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

  const updateGrid = direction => {
    // copy local
    let local = { ...page };
    let { components } = local;
    let component = components[0];
    let { current_item, current_row } = component;

    // update old
    component.local.content[current_item].state = "default";

    // update new
    let newItem;
    let contentArr = chunk(component.local.content, 6);

    if (direction === "down") {
      newItem =
        current_item + 6 < component.local.content.length
          ? current_item + 6
          : component.local.content.length - 1;

      component.current_row =
        component.current_row + 1 < contentArr.length
          ? component.current_row + 1
          : contentArr.length - 1;
    }

    if (direction === "up") {
      newItem = current_item - 6 >= 0 ? current_item - 6 : current_item;
      component.current_row =
        component.current_row !== 0 ? component.current_row - 1 : 0;
    }

    component.current_item = newItem;
    component.local.content[newItem].state = "focus";

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
  };

  const resetGrid = (focus: false) => {
    let local = { ...page };
    let { components, navigation } = local;
    let component = components[0];
    let { current_item, current_row } = component;

    component.current_row = 0;
    component.current_item = 0;

    component.local.content[current_item].state = "default";
    component.local.content[0].state = focus ? "focus" : "previous";

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

    calculateHeights(0);
  };

  const resetNavigation = () => {
    let local = { ...page };
    let { navigation } = local;

    navigation.map((item, index) => {
      item.current_item = 0;
      item.left = 0;
      if (index === 1) {
        item.offsets = [];
      }
      item.content.map(item => {
        item.state = item.state === "active" ? "default" : "default";
      });
      item.content[0].state = "active";
    });
  };

  const showContent = () => {
    setContentLoading(false);
    setTertiaryLoading(false);
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
      // reset grid
      let component = local.components[0];
      component.local.content[current_item].state = "default";
      component.current_item = 0;
      component.current_row = 0;

      // set to previous focus
      // set group to navigation
      setStore({
        ...store,
        pages: {
          ...store.pages,
          [key]: {
            ...local,
            current_group: "navigation",
            previous_group: "components",
            current_component: 0,
            previous_component: 0,
            components: components
          }
        }
      });
    } else if (
      current_group === "navigation" &&
      local.current_component === 0 &&
      (local.navigation[0].current_item > 0 ||
        local.navigation[1].current_item > 0)
    ) {
      let navigation = local.navigation;
      navigation.map((item, index) => {
        item.content[item.current_item].state = "default";
        item.current_item = 0;
        item.left = 0;
        item.content[0].state = "active";
      });
      navigation[current_navigation].content[0].state = "focus";
      setStore({
        ...store,
        pages: {
          ...store.pages,
          [key]: {
            ...local,
            current_group: "navigation",
            previous_group: "navigation"
          }
        }
      });
    } else if (
      current_group === "navigation" &&
      local.current_component === 0 &&
      local.navigation[current_navigation].current_item === 0
    ) {
      let navigation = local.navigation;
      navigation[current_navigation].content[0].state = "previous";

      setStore({
        ...store,
        pages: {
          ...store.pages,
          [key]: {
            ...local,
            current_group: "globalNav",
            previous_group: "navigation"
          }
        }
      });
    } else if (
      current_group === "globalNav" &&
      local.navigation[current_navigation].current_item === 0
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

  // single run
  useEffect(() => {}, []);

  // when the page changes
  // for content y position scrolling
  useEffect(() => {
    resetNavigation();
    resetGrid(true);
    // calculateHeights(0);

    // resetHome();

    setContentLoading(false);
    setTertiaryLoading(false);

    if (navigation.filter(item => item.sub_type === "tertiary").length) {
      calculateWidths();
    }

    calculateHeights(0);

    const resetTimer = setTimeout(() => {
      return () => {
        clearTimeout(resetTimer);
      };
    }, 100);
  }, [store.current_page]);

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
  }

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
            {navigation.map((component, index) => {
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
                        component.sub_type === "tertiary" && tertiaryLoading
                          ? 0
                          : durations.s
                    }
                  }}
                />
              );
            })}
          </Stack>
        </Frame>
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
            width={"auto"}
            padding={16}
            paddingTop={64}
            paddingLeft={35 + 16}
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
            <Grid local={component.local} current_row={current_row} />
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

Browse.defaultProps = {
  id: 1,
  name: "Browse"
};
