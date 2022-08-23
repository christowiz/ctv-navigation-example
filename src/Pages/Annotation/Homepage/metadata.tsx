import React, { useState, useEffect } from "react";
import { shuffle } from "lodash-core";
import Gamepad from "react-gamepad";
import KeyboardEventHandler from "react-keyboard-event-handler";
import { Frame, Stack, useAnimation } from "framer";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  Paper
} from "@material-ui/core";

import { durations, transitions } from "../../../Components/Animations";
import { Rail } from "../../../Components/Rail";
import { HeroHomepage } from "../../../Components/HeroHomepage";
import { showsStore, pageStore } from "../../../Stores/Store";

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

export default function HomeMeteadata(props) {
  const { id, name, ...rest } = props;
  const [initialLoad, setInitialLoad] = useState(true);
  const [store, setStore] = pageStore();
  const [shows] = showsStore();
  const [focusDelay, setFocusDelay] = useState(0);
  const [focus, setFocus] = useState({ component: 0, item: "rail" });
  const [verticalOffsets, setVerticalOffsets] = useState([]);
  const [verticalOffset, setVerticalOffset] = useState(35);
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

  const randomItemArray = (arr) => {
    var item = arr[Math.floor(Math.random() * arr.length)];
    return item;
  };

  const randomNumberArray = (arr) => {
    return Math.floor(Math.random() * arr.length);
  };

  const assetTypes = [
    "show",
    "episode",
    "network",
    "clip",
    "live",
    "playlist",
    "channel"
  ];
  const featured_flag = ["yes", "no"];
  const [featuredStatus, setFeaturedStatus] = useState("yes"); //scrolling, visible

  const [currentTile, setCurrentTile] = useState({
    // logo: "",
    title: "Property Brothers",
    description: "lorem ipsum",
    genres: ["parent", "child"],
    assetType: "show"
  });

  const handleFeaturedSelect = (event) => {
    const value = event.target.value;
    setFeaturedStatus(value);
  };

  const [heroText, setHeroText] = useState({});
  const heroAnimation = useAnimation();

  const classes = useStyles();

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

  async function loader() {}

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

  useEffect(() => {
    // Using an IIFE
    (async function anyNameFunction() {
      // do things
    })();
  }, [featuredStatus]);

  useEffect(() => {
    setVerticalOffset(featuredStatus === "yes" ? 35 : -100);
    setCurrentTile(randomItemArray(shows.results));
    return () => {
      setHeroText(currentTile);
    };
  }, [featuredStatus]);

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
      <Paper style={{ top: -100, width: "auto", position: "absolute" }}>
        <FormControl className={classes.formControl}>
          <InputLabel id="show-select-helper-label">Featured</InputLabel>
          <Select
            labelId="show-select-helper-label"
            id="show-select-helper"
            value={featuredStatus}
            onChange={handleFeaturedSelect}
          >
            {featured_flag.map((item, index) => {
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
            height={"auto"}
            width={"100%"}
            padding={16}
            paddingTop={16}
            paddingLeft={35 + 16}
            paddingRight={0}
            overflow={"visible"}
            direction="vertical"
            // gap={store.params.railGap}
            gap={50}
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
      </Frame>
    </>
  );
}

HomeMeteadata.defaultProps = {
  id: 0,
  name: "Home"
};
