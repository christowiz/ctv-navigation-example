import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { chunk } from "lodash-core";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  Paper
} from "@material-ui/core";

import Gamepad from "react-gamepad";
import KeyboardEventHandler from "react-keyboard-event-handler";

import { Frame, Stack } from "framer";

import { durations, transitions } from "../../Components/Animations";

import { Rail } from "../../Components/Rail";
import { Grid } from "../../Components/Grid";

import { pageStore } from "../../Stores/Store";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 100,
      maxWidth: 200
    },
    themes: {
      margin: theme.spacing(1),
      minWidth: 100,
      maxWidth: 150
    },
    selectEmpty: {
      marginTop: theme.spacing(2)
    },
    loader: {
      color: "#fff"
    }
  })
);

// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function NavPatternSecondary(props) {
  const { id, name, ...rest } = props;
  const classes = useStyles();

  const query = useQuery();
  const history = useHistory();

  const [isPressed, setIsPressed] = useState(false);
  const [focusDelay, setFocusDelay] = useState(false);
  const [store, setStore] = pageStore();
  const [initialLoad, setInitialLoad] = useState(true);
  const [contentLoading, setContentLoading] = useState(false);
  const [tertiaryLoading, setTertiaryLoading] = useState(false);

  const [activeCase, setActiveCase] = useState("scrolling"); //scrolling, visible

  const { global_nav } = store;

  const cases = ["scrolling", "visible"];

  // const page = store.pages.browse;

  const [verticalOffsets, setVerticalOffsets] = useState([]);

  const [focus, setFocus] = useState({
    component: 0,
    item: "navigation"
  });
  const [currentComponent, setCurrentComponent] = useState({});
  const [components, setComponents] = useState([
    {
      name: "network",
      items: ["navigation"],
      type: "navigation",
      sub_type: "network",
      current_item: 0,
      left: 0,
      content: [
        { id: "sec-0", name: "nav item 1", state: "focus" },
        { id: "sec-1", state: "default" },
        { id: "sec-2", state: "default" },
        { id: "sec-3", state: "default" },
        { id: "sec-4", state: "default" },
        { id: "sec-5", state: "default" },
        { id: "sec-6", state: "default" },
        { id: "sec-7", state: "default" },
        { id: "sec-8", state: "default" },
        { id: "sec-9", state: "default" },
        { id: "sec-10", state: "default" },
        { id: "sec-11", state: "default" },
        { id: "sec-12", state: "default" },
        { id: "sec-13", state: "default" },
        { id: "sec-14", state: "default" },
        { id: "sec-15", state: "default" }
      ]
    },
    {
      id: 1,
      name: "topics",
      items: ["navigation"],
      type: "navigation",
      sub_type: "tertiary",
      current_item: 0,
      left: 0,
      offsets: [],
      content: [
        {
          id: "ter-0",
          state: "focus",
          name: "nav item 1",
          width: 100,
          height: 35
        },
        { id: "ter-1", state: "default", width: 150 },
        { id: "ter-2", state: "default", width: 75 },
        { id: "ter-3", state: "default", width: 50 },
        { id: "ter-4", state: "default", width: 165 },
        { id: "ter-5", state: "default", width: 90 },
        { id: "ter-6", state: "default", width: 135 },
        { id: "ter-7", state: "default", width: 85 },
        { id: "ter-8", state: "default", width: 200 },
        { id: "ter-8", state: "default", width: 100 },
        { id: "ter-10", state: "default", width: 115 },
        { id: "ter-11", state: "default", width: 175 },
        { id: "ter-12", state: "default", width: 80 },
        { id: "ter-13", state: "default", width: 115 },
        { id: "ter-14", state: "default", width: 65 },
        { id: "ter-15", state: "default", width: 95 }
      ]
    },
    {
      id: 0,
      name: "editorial",
      page: "browse",
      items: ["grid"],
      type: "grid",
      sub_type: "show",
      current_item: 0,
      current_row: 0,
      gap: 16,
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
  ]);

  const fullNav = [
    { id: "sec-0", name: "nav item 1", state: "focus" },
    { id: "sec-1", state: "default" },
    { id: "sec-2", state: "default" },
    { id: "sec-3", state: "default" },
    { id: "sec-4", state: "default" },
    { id: "sec-5", state: "default" },
    { id: "sec-6", state: "default" },
    { id: "sec-7", state: "default" },
    { id: "sec-8", state: "default" },
    { id: "sec-9", state: "default" },
    { id: "sec-10", state: "default" },
    { id: "sec-11", state: "default" },
    { id: "sec-12", state: "default" },
    { id: "sec-13", state: "default" },
    { id: "sec-14", state: "default" },
    { id: "sec-15", state: "default" }
  ];

  // components

  const [page, setPage] = useState({
    name: "Browse Shows",
    key: "browse",
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

  const {
    current_group,
    current_component,
    current_navigation,
    previous_group,
    current_id,
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
    let offsets = [...verticalOffsets];
    let contentHeight = 0;

    // calculate vertical scroll position for each component
    components.map((item, index) => {
      const { type, sub_type } = item;
      const { params } = store;
      const { railGap, heights } = params;
      const height = heights[sub_type];
      // console.log(height);
      if (type === "grid") {
        let { gridHeight, gridOffsets } = calculateGridHeight(
          item.content,
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
    });

    offsets.unshift(initialOffset);

    setVerticalOffsets(offsets);
  }

  async function calculateWidths() {
    if (components.filter((item) => item.sub_type === "network").length) {
      // copy the components
      let local = [...components];

      // create local component
      let component = { ...local[0] };

      if (activeCase === "scrolling") {
        component.content = fullNav;
      }

      if (activeCase === "visible") {
        let contentArr = fullNav.slice(0, 8);
        component.content = contentArr;
      }

      component = {
        ...component
      };

      return component;
    }
  }

  const translateLeft = (component, value, sub_type) => {
    // step distance
    let step = 0;
    let offset = 0;
    let visible = 0;

    if (sub_type === "show") {
      step = 73.33 + 15;
      visible = 6;
    }

    if (sub_type === "network") {
      step = 50 + 8;
      visible = 10;
    }

    if (sub_type === "tertiary") {
      visible = 6;
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
    return focus.component > 1 ? verticalOffsets[components[2].current_row] : 0;
  };

  const globalFocus = () => {
    updatePreviousComponent();

    setStore({
      ...store,
      global_nav: {
        ...global_nav,
        current: global_nav.active
      },
      pages: {
        ...store.pages,
        browse: {
          ...store.pages.browse,
          previous_group: "components",
          current_group: "globalNav"
        }
      }
    });

    setFocus({
      component: components.length - 1,
      item: "global-navigation"
    });
  };

  const navigateRail = (direction) => {
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

    // handle conditionals for component type(s)
    if (type === "grid") {
      if (direction === "forward") {
        let row = current_row + 1;
        let max = row * 6 - 1;
        active =
          active >= content.length - 1
            ? content.length - 1
            : updateValue(active, max, direction);
      } else {
        let lowVal = 6 * current_row;
        // if first item in row, open menu
        if (active === current_row * 6) {
          globalFocus();
        } else {
          active = active - 1 > lowVal - 1 ? active - 1 : active;
        }
      }

      // update new
      content[active].state =
        direction === "back" && current_item === current_row * 6
          ? "previous"
          : "focus";

      component = {
        ...component,
        current_item: active
      };
    }

    if (type === "navigation" || type === "rail") {
      // update new
      let active = updateValue(current_item, content.length - 1, direction);
      content[active].state = "focus";
      component.left = translateLeft(component, active, component.sub_type);

      if (direction === "back" && current_item === 0) {
        content[active].state = "previous";
        globalFocus();
      }

      // update component
      component = {
        ...component,
        current_item: active
      };
    }

    // replace component
    local.splice(focus.component, 1, component);
    setComponents([...local]);
  };

  const navigateHorizontal = (direction) => {
    if (focus.item === "global-navigation" && direction === "forward") {
      setStore({
        ...store,
        pages: {
          ...store.pages,
          browse: {
            ...store.pages.browse,
            current_group: previous_group
          }
        }
      });
      setFocus(previousComponent);
    }
    if (focus.item === "grid") navigateRail(direction);
    if (focus.item === "navigation") navigateRail(direction);
  };

  const navigateVertical = (direction) => {
    const component = components[focus.component];
    const { type, sub_type } = component;
    const val = updateValue(focus.component, components.length - 1, direction);

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
    } else {
      return;
    }
  };

  const updateActiveComponent = () => {
    if (focus.item !== "global-navigation") {
      let component = { ...components[focus.component] };
      let { current_item, content, name, type } = component;
      let { item } = focus;

      content[current_item].state = "focus";

      setCurrentComponent(component);
    }
  };

  const [previousComponent, setPreviousComponent] = useState({});

  const updatePreviousComponent = () => {
    let component = { ...components[focus.component] };
    let { current_item, content, name, type } = component;
    let { item } = focus;

    if (type === "grid") {
      content[current_item].state = "previous";
    }

    if (type === "navigation") {
      content[current_item].state = "active";
    }

    setPreviousComponent(focus);
  };

  const updateGrid = (direction) => {
    // copy the components
    let local = [...components];

    // create local component
    let component = { ...local[focus.component] };
    let { current_item, current_row, content } = component;

    // // update old
    content[current_item].state = "default";

    // // update new
    let newItem;
    let contentArr = chunk(content, 6);

    if (direction === "down") {
      newItem =
        current_item + 6 < content.length
          ? current_item + 6
          : content.length - 1;

      current_row =
        current_row + 1 < contentArr.length
          ? current_row + 1
          : contentArr.length - 1;
    } else {
      newItem = current_item - 6 >= 0 ? current_item - 6 : current_item;
      current_row = current_row !== 0 ? current_row - 1 : 0;
    }

    current_item = newItem;
    content[newItem].state = "focus";

    component = {
      ...component,
      current_item: newItem,
      current_row: current_row
    };

    // replace component
    local.splice(focus.component, 1, component);
    setComponents([...local]);
  };

  const resetGrid = (focus: false) => {
    // copy the components
    let local = [...components];

    // create local component
    let component = { ...local[2] };
    let { current_item, content } = component;

    // // update old
    content[current_item].state = "default";
    content[0].state = focus ? "focus" : "previous";

    component = {
      ...component,
      current_item: 0,
      current_row: 0
    };

    // replace component
    local.splice(2, 1, component);
    setComponents([...local]);
  };

  const showContent = () => {
    setContentLoading(false);
    setTertiaryLoading(false);
  };

  const tilePress = (pressed) => {};

  const handleSubmit = (pressed) => {
    // setIsPressed(pressed);
  };

  const backNavigate = () => {
    // global navigation
    if (focus.item === "global-navigation") {
      setStore({
        ...store,
        pages: {
          ...store.pages,
          browse: {
            ...store.pages.browse,
            current_group: previous_group
          }
        }
      });
      setFocus(previousComponent);
    }
    // reset navigation
    if (focus.component === 1 || focus.component === 0) {
      resetNav(0);
      resetNav(1);

      // and put focus on the currently focused navigation
      setFocus({
        component: focus.component,
        item: components[focus.component].items[0]
      });

      // open global navigation
      if (components[focus.component].current_item === 0) {
        globalFocus();
      }
    }
    // reset grid
    if (focus.component === 2) {
      // and put focus on the first item in the gird
      setFocus({
        component: 1,
        item: components[0].items[0]
      });
      resetGrid(false);
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

  useEffect(() => {
    // updateRail();
  }, [current_group, current_navigation, current_component]);

  const setTimeouts = () => {
    loadTimeout = setTimeout(showContent, 750);
  };

  const resetNav = (item) => {
    // copy the components
    let local = [...components];

    // create local component
    let component = { ...local[item] };
    let { current_item, content } = component;

    // // update old
    content[current_item].state = "default";
    content[0].state = "active";

    component = {
      ...component,
      left: 0,
      current_item: 0
    };

    // replace component
    local.splice(item, 1, component);
    setComponents([...local]);
  };

  const clearTimeouts = () => {
    if (loadTimeout) clearTimeout(loadTimeout);
  };

  useEffect(() => {
    if (!initialLoad) {
      setContentLoading(true);
      setTertiaryLoading(true);
      resetGrid(false);
      resetNav(1);
    }
  }, [components[0].current_item]);

  useEffect(() => {
    if (!initialLoad) {
      setContentLoading(true);
      resetGrid(false);
    }
  }, [components[1].current_item]);

  useEffect(() => {
    clearTimeouts();
    if (contentLoading) {
      setTimeouts();
    }
  }, [contentLoading]);

  async function addGlobalNavigation() {
    // add global nav to local components
    let local = [...components];

    local.push({
      name: "global-navigation",
      type: "navigation",
      sub_type: "globalNav",
      current_item: 1,
      content: [...global_nav.items]
    });

    // add the width offsets for tertiary navigation scrolling
    let secondary = await calculateWidths();

    // splice in the updated secondary nav component
    local.splice(0, 0, secondary);

    // update components
    setComponents(() => [...local]);
  }

  async function loader() {
    await addGlobalNavigation();
    await calculateHeights(0);
  }

  const handleCaseSelect = (event) => {
    const value = event.target.value;
    setActiveCase(value);
    // update history
    history.push(`/patterns/secondary-navigation?case=${value}`);
  };

  // single run
  useEffect(() => {
    clearTimeouts();

    // set case
    // check query if available, else fallback to 'scrolling'
    if (query) {
      let useCase = query.get("case");
      if (useCase) {
        if (useCase === "scrolling" || useCase === "visible") {
          setActiveCase(useCase);
        } else {
          return;
        }
      } else {
        return;
      }
    } else {
      setActiveCase("scrolling");
    }

    // resetGrid(true);

    // Using an IIFE
    (async function anyNameFunction() {
      await loader();
    })();

    setInitialLoad(false);
  }, []);

  useEffect(() => {
    // Using an IIFE
    (async function anyNameFunction() {
      // add global nav to local components
      let local = [...components];

      // add the width offsets for tertiary navigation scrolling
      let secondary = await calculateWidths();

      secondary = {
        ...secondary,
        left: 0,
        current_item: 0
      };

      // splice in the updated secondary nav component
      local.splice(0, 0, secondary);

      // update components
      setComponents(() => [...local]);
    })();
  }, [activeCase]);

  // focus changes
  useEffect(() => {
    updateActiveComponent();
  }, [focus]);

  return (
    <>
      <Paper style={{ top: -100, width: "auto", position: "absolute" }}>
        <FormControl className={classes.formControl}>
          <InputLabel id="show-select-helper-label">Use Cases</InputLabel>
          <Select
            labelId="show-select-helper-label"
            id="show-select-helper"
            value={activeCase}
            onChange={handleCaseSelect}
          >
            {cases.map((item, index) => {
              return (
                <MenuItem key={index} value={item}>
                  {item}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Paper>

      <Frame
        center
        width={640}
        height={360}
        background={"rgba(255,255,255,0.0125)"}
        overflow={"hidden"}
        animate={{
          opacity: focus.item === "global-navigation" ? 0.25 : 1
        }}
        transition={{
          ...transitions.slide
        }}
        {...rest}
      >
        <Frame
          width={"100%"}
          height={"auto"}
          background="none"
          animate={{
            y: translateY()
          }}
          transition={{
            ...transitions.slide,
            duration: durations.m * 1.5
          }}
        >
          <Frame
            id="navigation"
            width={"100%"}
            height={150}
            background="none"
            overflow="visible"
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
              <Rail
                localStore={components[0]}
                animate={{
                  left: components[0].left
                }}
                transition={{
                  ...transitions.slide,
                  duration: durations.m
                }}
              />

              {/* <Rail
                localStore={components[1]}
                animate={{
                  left: components[1].left,
                  opacity: tertiaryLoading ? 0 : 1
                }}
                transition={{
                  ...transitions.slide,
                  duration: durations.m,
                  opacity: {
                    duration: tertiaryLoading ? 0 : durations.s
                  }
                }}
              /> */}
            </Stack>
          </Frame>

          {/* <Frame
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
              height={"auto"}
              width={"auto"}
              padding={16}
              paddingTop={32}
              paddingLeft={35 + 16}
              paddingRight={16}
              overflow={"hidden"}
              direction="vertical"
              gap={store.params.railGap}
            >
              <Grid
                local={components[2]}
                current_row={components[2].current_row}
              />
            </Stack>
          </Frame> */}
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

NavPatternSecondary.defaultProps = {
  id: 1,
  name: "Browse"
};
