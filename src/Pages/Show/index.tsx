import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { orderBy } from "lodash-core";

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

import { updateValue } from "../../Helpers/Functions";

import { Frame, Stack, useAnimation } from "framer";
import { durations, transitions } from "../../Components/Animations";

import { MVPDLogo } from "../../Components/MVPDLogo";
import { HeroShow } from "../../Components/HeroShow";
import { Loader } from "../../Components/Loader";
import { Rail } from "../../Components/Rail";
import { SeasonRail } from "../../Components/SeasonRail";
import { Toast } from "../../Components/Toast";

import { pageStore } from "../../Stores/Store";

import { randomNumber, translateLeft } from "./Functions";

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

export default function Show(props) {
  const { id, name, ...rest } = props;
  const classes = useStyles();

  const query = useQuery();

  const [isLoading, setIsLoading] = useState(true);

  const [initial, setInitial] = useState(true);

  const [seasons, setSeasons] = useState([
    {
      season: 6,
      state: "default",
      page: "detail",
      sub_type: "episode",
      current_item: 0,
      left: 0,
      content: [
        { episode: 1, state: "default" },
        { episode: 2, state: "default" },
        { episode: 3, state: "default" },
        { episode: 4, state: "default" },
        { episode: 5, state: "default" },
        { episode: 6, state: "default" },
        { episode: 7, state: "default" },
        { episode: 8, state: "default" },
        { episode: 9, state: "default" },
        { episode: 10, state: "default" },
        { episode: 11, state: "default" },
        { episode: 12, state: "default" },
        { episode: 13, state: "default" },
        { episode: 14, state: "default" },
        { episode: 15, state: "default" },
        { episode: 16, state: "default" }
      ]
    },
    {
      season: 3,
      state: "default",
      page: "detail",
      sub_type: "episode",
      current_item: 0,
      left: 0,
      content: [
        { episode: 1, state: "default" },
        { episode: 2, state: "default" },
        { episode: 3, state: "default" },
        { episode: 4, state: "default" },
        { episode: 5, state: "default" },
        { episode: 6, state: "default" },
        { episode: 8, state: "default" },
        { episode: 9, state: "default" },
        { episode: 10, state: "default" },
        { episode: 11, state: "default" },
        { episode: 13, state: "default" },
        { episode: 16, state: "default" }
      ]
    },
    {
      season: 2,
      state: "default",
      page: "detail",
      sub_type: "episode",
      current_item: 0,
      left: 0,
      content: [
        { episode: 1, state: "default" },
        { episode: 2, state: "default" },
        { episode: 3, state: "default" },
        { episode: 4, state: "default" },
        { episode: 5, state: "default" },
        { episode: 6, state: "default" },
        { episode: 7, state: "default" },
        { episode: 8, state: "default" },
        { episode: 9, state: "default" },
        { episode: 10, state: "default" },
        { episode: 11, state: "default" },
        { episode: 12, state: "default" },
        { episode: 13, state: "default" },
        { episode: 14, state: "default" },
        { episode: 15, state: "default" },
        { episode: 16, state: "default" }
      ]
    }
  ]);

  const [state, setState] = useState({
    saved: false,
    currentSeason: 3,
    currentEpisode: 1,
    hasWatched: false
  });

  const [focus, setFocus] = useState({
    component: 0,
    item: "watch"
  });

  const [components, setComponents] = useState([
    {
      name: "hero",
      items: ["watch", "save"]
    },
    {
      name: "seasonRail",
      current_item: 0,
      current_season: 0,
      left: 0,
      items: ["navigation", "rail"]
    },
    {
      name: "editorial",
      type: "rail",
      page: "detail",
      sub_type: "show",
      current_item: 0,
      left: 0,
      items: ["rail"],
      content: [
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
      page: "detail",
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
        { state: "default" },
        { state: "default" },
        { state: "default" },
        { state: "default" },
        { state: "default" },
        { state: "default" }
      ]
    }
  ]);

  const [original, setOriginal] = useState({
    state: state,
    focus: focus,
    components: components
  });

  const seasonOrderOptions = ["Catch Up", "Start New", "Don't Spoil Me"];

  const [seasonOrder, setSeasonOrder] = useState("Catch Up");

  const [currentComponent, setCurrentComponent] = useState({});

  const [product, setProduct] = useState("TVE");

  const products = ["TVE", "DTC"];

  const [store, setStore] = pageStore();

  const { params } = store;
  const { backgrounds } = params;

  const verticalOffsets = [0, -160, -350, -544];

  const [activeShow, setActiveShow] = useState(Number);

  const [showContent, setShowContent] = useState(true);

  const [background, setBackground] = useState({
    title: "Travel Channel",
    color: "linear-gradient(120deg, #0D030C 0%, #290B25 100%)"
  });

  let shows = [
    {
      logo:
        "https://us1-prod-images.disco-api.com/2020/06/02/9b4eb9ae-3b64-35fd-b184-fe2c64f888ca.png?bf=0&f=png&p=true&q=85&w=266",
      title: "Long Island Medium",
      description:
        "Theresa speaks to the dead and helps clients find closure with loved ones.",
      image:
        "https://digitalstudiosproduct.discovery.com/prototypes/ATVE/assets/images/TLC/16x9%20Show%20Hero/16x9-hero-long-island-medium.jpg"
    },
    {
      logo:
        "https://us1-prod-images.disco-api.com/2020/06/02/fc99cbd2-6548-3d90-a0f4-6a03462d759b.png?bf=0&f=png&p=true&q=85&w=266",
      title: "90 Day Fiance",
      description:
        "International couples will have just 90 days to decide to get married.",
      image:
        "https://digitalstudiosproduct.discovery.com/prototypes/ATVE/assets/images/TLC/16x9%20Show%20Hero/16x9-hero-90-day-fiance.jpg"
    },
    {
      logo:
        "https://us1-prod-images.disco-api.com/2020/07/14/d6f5ef37-250d-3a64-8d9b-940d3562f870.png?bf=0&f=png&p=true&q=85&w=266",
      title: "Say Yes To The Dress",
      description:
        "This show is bridal story, fashion makeover and family therapy in one.",
      image:
        "https://digitalstudiosproduct.discovery.com/prototypes/ATVE/assets/images/TLC/16x9%20Show%20Hero/16x9-hero-syttd.jpg"
    },
    {
      logo:
        "https://us1-prod-images.disco-api.com/2020/06/30/2396b5f9-ba49-3c7e-88d8-22a9eb0f1113.png?bf=0&f=png&p=true&q=85&w=266",
      title: "Dr Pimple Popper",
      description:
        "Dr. Sandra Lee removes life-altering growths from her patients' skin.",
      image:
        "https://digitalstudiosproduct.discovery.com/prototypes/ATVE/assets/images/TLC/16x9%20Show%20Hero/16x9-hero-drpimplepopper.jpg"
    },
    {
      logo: "./Assets/logos/shows/TLC-SisterWives-TT-1000x500-LeftAligned.png",
      title: "Sister Wives",
      description:
        "This is the story of Kody Brown, his three wives and extraordinary family.",
      image:
        "https://digitalstudiosproduct.discovery.com/prototypes/ATVE/assets/images/TLC/16x9%20Show%20Hero/16x9-hero-sisterwives.jpg"
    },
    {
      logo:
        "https://us1-prod-images.disco-api.com/2020/06/26/66cbbaf1-17e2-31d7-8a60-fd15c66ee84e.png?bf=0&f=png&p=true&q=85&w=266",
      title: "Welcome to Plathville",
      description:
        "A Georgia family shares a love for music, religion and traditional roles.",
      image:
        "https://digitalstudiosproduct.discovery.com/prototypes/ATVE/assets/images/TLC/16x9%20Show%20Hero/16x9-hero-WTP.jpg"
    },
    {
      logo:
        "https://us1-prod-images.disco-api.com/2020/07/14/d6f5ef37-250d-3a64-8d9b-940d3562f870.png?bf=0&f=png&p=true&q=85&w=266",
      title: "Say Yes To The Dress: America",
      description:
        "Designer Randy Fenoli officiates an epic group wedding extravaganza in NYC.",
      image:
        "https://digitalstudiosproduct.discovery.com/prototypes/ATVE/assets/images/TLC/16x9%20Show%20Hero/16x9-hero-syttdamerica.jpg"
    },
    {
      logo:
        "https://us1-prod-images.disco-api.com/2020/06/29/d0080654-8677-3dab-b5a3-748a4121cdad.png?bf=0&f=png&p=true&q=85&w=266",
      title: "My Big Fat Fabulous Life",
      description:
        "A woman's life changes when a self-choreographed video goes viral.",
      image:
        "https://digitalstudiosproduct.discovery.com/prototypes/ATVE/assets/images/TLC/16x9%20Show%20Hero/16x9-hero-mbffl.jpg"
    },
    {
      logo:
        "https://us1-prod-images.disco-api.com/2020/07/14/78845fd0-8669-3649-a2a4-a2bec1130543.png?bf=0&f=png&p=true&q=85&w=266",
      title: "I Am Jazz",
      description:
        "Jazz is a transgender female and has lived as a girl since kindergarten.",
      image:
        "https://us1-prod-images.disco-api.com/2020/07/14/1018a4e5-8350-34a5-952d-da7fae67e262.jpeg?bf=0&f=jpg&p=true&q=85&w=640"
    }
  ];

  shows = orderBy(shows, ["title"], ["asc"]);

  const episodesControl = useAnimation();
  const contentControl = useAnimation();

  const translateY = () => {
    return verticalOffsets[focus.component];
  };

  const navigateHero = (direction) => {
    let active = focus.item;
    if (active === "watch" && direction === "forward") {
      setFocus({
        ...focus,
        item: "save"
      });
    }
    if (active === "save" && direction === "back") {
      setFocus({
        ...focus,
        item: "watch"
      });
    }
  };

  const navigateRail = (direction) => {
    let local = [...components];
    let component = { ...local[focus.component] };
    let { current_item, content, left, sub_type } = component;

    // update old
    content[current_item].state = "default";

    // update new
    let active = updateValue(current_item, content.length - 1, direction);
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

  const navigateEpisodes = (direction) => {
    let local = [...seasons];
    let component = { ...local[currentComponent.current_season] };
    let { current_item, content, left, sub_type } = component;

    // update old
    content[current_item].state = "default";

    // update new
    let active = updateValue(current_item, content.length - 1, direction);
    content[active].state = "focus";

    component.left = translateLeft(component, active, component.sub_type);

    // update component
    component = {
      ...component,
      current_item: active
    };

    // replace component in page data
    local.splice(currentComponent.current_season, 1, component);

    setSeasons([...local]);
  };

  async function updateEpisodes() {
    await episodesControl.start({
      opacity: 0,
      transition: {
        duration: 0
      }
    });

    seasons.map((item) => {
      item.current_item = 0;
      item.left = 0;
      item.content
        .filter((episode) => episode.state !== "default")
        .map((item) => (item.state = "default"));
    });

    await episodesControl.start({
      opacity: 1,
      transition: {
        ...transitions.fade,
        duration: durations.s,
        delay: durations.m
      }
    });
  }

  async function loadShow() {
    setInitial(true);

    await setLoadingStatus(true);

    await contentControl.start({
      opacity: 0,
      transition: {
        duration: 0
      }
    });

    await setLoadingStatus(false);

    await contentControl.start({
      opacity: 1,
      transition: {
        ...transitions.fade,
        duration: durations.l,
        delay: 1.5
      }
    });

    setInitial(false);
  }

  async function setLoadingStatus(state) {
    const loader = setTimeout(
      () => {
        setIsLoading(state);
        return () => {
          clearTimeout(loader);
        };
      },
      !state ? 1000 : 0
    );
  }

  const navigateSeason = (direction) => {
    let local = [...components];
    let component = { ...local[focus.component] };
    let { current_season } = component;

    // update new
    let active = updateValue(current_season, seasons.length - 1, direction);

    if (current_season !== active) {
      // update component
      component = {
        ...component,
        current_season: active
      };

      updateEpisodes();

      // replace component in page data
      local.splice(focus.component, 1, component);

      setComponents([...local]);
    }
  };

  const navigateHorizontal = (direction) => {
    if (focus.component === 0) navigateHero(direction);
    if (focus.component === 1) {
      if (focus.item === "navigation") {
        navigateSeason(direction);
      }

      if (focus.item === "rail") {
        navigateEpisodes(direction);
      }
    }
    if (focus.component > 1) {
      navigateRail(direction);
    }
  };

  const navigateVertical = (direction) => {
    updatePreviousComponent();

    if (focus.component === 1) {
      if (focus.item === "navigation" && direction === "up") {
        setFocus({
          ...focus,
          component: 0,
          item: components[0].items[0]
        });
      }
      if (focus.item === "navigation" && direction === "down") {
        setFocus({
          ...focus,
          component: 1,
          item: components[1].items[1]
        });
      }
      if (focus.item === "rail" && direction === "up") {
        setFocus({
          ...focus,
          component: 1,
          item: components[1].items[0]
        });
      }
      if (focus.item === "rail" && direction === "down") {
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
      }
    } else {
      let newIndex = updateValue(
        focus.component,
        components.length - 1,
        direction
      );

      if (components[newIndex].name === "seasonRail") {
        setFocus({
          ...focus,
          component: newIndex,
          item:
            direction === "up"
              ? components[newIndex].items[1]
              : components[newIndex].items[0]
        });
      } else {
        setFocus({
          ...focus,
          component: newIndex,
          item: components[newIndex].items[0]
        });
      }
    }
  };

  const handleSubmit = (pressed) => {
    const { component, item } = focus;

    if (component === 0 && item === "save" && pressed) {
      // set save state
      setState({
        ...state,
        saved: !state.saved
      });
    }
    if (component === 1 && item === "rail") {
      setState({
        ...state,
        currentSeason: seasons[components[1].current_season].season,
        currentEpisode:
          seasons[components[1].current_season].content[
            seasons[components[1].current_season].current_item
          ].episode,
        hasWatched: true
      });
    }

    // assume programmed as shows
    if (component > 1 && item === "rail") {
      // set active show to result of random show
      setActiveShow(randomNumber(shows));
    }
  };

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

    if (name === "seasonRail" && item === "rail") {
      let season = seasons[component.current_season];
      season.content[season.current_item].state = "focus";
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

    if (name === "seasonRail" && item === "rail") {
      let season = seasons[component.current_season];
      season.content[season.current_item].state = "previous";
    }
  };

  const handleSelect = (event) => {
    const value = event.target.value;
    setSeasonOrder(value);
  };

  const handleProductSelect = (event) => {
    const value = event.target.value;
    setProduct(value);
  };

  const handleThemeSelect = (event) => {
    const value = event.target.value;
    let themeValue = backgrounds.themes.filter((item) => item.title === value);
    setBackground({ ...themeValue[0] });
  };

  const handleShowSelect = (event) => {
    const value = event.target.value;
    setActiveShow(value);
    setState({
      ...state,
      hasWatched: false
    });
  };

  const handleShowContent = (event) => {
    setShowContent(!showContent);
  };

  const updateSeasonOrder = () => {
    let params = {
      season: "desc",
      episode: "desc"
    };

    if (seasonOrder === "Start New") {
      params = {
        season: "asc",
        episode: "asc"
      };
    }

    if (seasonOrder === "Don't Spoil Me") {
      params = {
        season: "desc",
        episode: "asc"
      };
    }

    let seasons_ordered = seasons.map((item) => {
      item.content = orderBy(item.content, ["episode"], [params.episode]);
      return item;
    });

    seasons_ordered = orderBy(seasons_ordered, ["season"], [params.season]);

    setSeasons(seasons_ordered);

    setState({
      ...state,
      currentSeason: seasons_ordered[0].season,
      currentEpisode: seasons_ordered[0].content[0].episode
    });
  };

  // load
  useEffect(() => {
    if (query) {
      let brand = query.get("brand");
      let order = query.get("order");
      let theme = query.get("theme");

      if (order) {
        if (order === "dont-spoil") setSeasonOrder("Don't Spoil Me");
        if (order === "start") setSeasonOrder("Start New");
        if (order === "catch-up") setSeasonOrder("Catch Up");
      }

      if (brand === "dtc") {
        if (order) {
          setSeasonOrder("Start New");
        }

        setProduct("DTC");
        let theme = {
          title: "DTC",
          color: backgrounds.dtc
        };
        setBackground(theme);
      }

      if (brand === "tve") {
        setProduct("TVE");
        let theme = backgrounds.themes.filter((item) => item.title === "TLC");
        setBackground({ ...theme[0] });
      }

      if (theme) {
        let themeValue;

        if (theme === "animal") {
          themeValue = backgrounds.themes.filter(
            (item) => item.title === "Animal Planet"
          );
        }

        if (theme === "travel") {
          themeValue = backgrounds.themes.filter(
            (item) => item.title === "Travel Channel"
          );
        }

        if (theme === "food") {
          themeValue = backgrounds.themes.filter(
            (item) => item.title === "Food Network"
          );
        }

        if (theme === "hgtv") {
          themeValue = backgrounds.themes.filter(
            (item) => item.title === "HGTV"
          );
        }

        setBackground({ ...themeValue[0] });
      } else {
        let themeValue = backgrounds.themes.filter(
          (item) => item.title === "TLC"
        );
        setBackground({ ...themeValue[0] });
      }
    }

    const item = {
      state: { ...state },
      focus: { ...focus },
      components: [...components]
    };

    setInitial(false);

    setOriginal({ ...item });

    setActiveShow(randomNumber(shows));

    setStore({
      ...store,
      current_page: "show"
    });

    updateActiveComponent();
    updateSeasonOrder();

    // console.log(original.components);

    // loadShow();
  }, []);

  // focus changes
  useEffect(() => {
    updateActiveComponent();
  }, [focus]);

  // active component
  useEffect(() => {
    // let { name, type, page, sub_type, current_item, items } = currentComponent;
  }, [currentComponent]);

  // update seash order
  useEffect(() => {
    updateSeasonOrder();
  }, [seasonOrder]);

  useEffect(() => {
    loadShow();
    resetComponents();
  }, [activeShow]);

  // useEffect(() => {

  // }, [state.saved])

  const resetComponents = () => {
    setState({ ...original.state, hasWatched: false });
    setFocus(original.focus);

    let localComponents = [...original.components];
    let localSeasons = [...seasons];

    localComponents
      .filter((item) => item.name === "seasonRail")
      .map((item) => {
        item.left = 0;
        item.current_item = 0;
        item.current_season = 0;
      });

    localComponents
      .filter((item) => item.type === "rail")
      .map((item) => {
        item.left = 0;
        item.current_item = 0;
        item.content.map((item) => (item.state = "default"));
      });

    localSeasons.map((season) => {
      season.current_item = 0;
      season.left = 0;
      season.content.map((item) => {
        item.state = "default";
      });
    });

    setComponents(localComponents);
    setSeasons(localSeasons);
  };

  return (
    <>
      <Paper style={{ marginTop: -100, width: "auto" }}>
        <FormControl className={classes.formControl}>
          <InputLabel id="product-helper-label">Product</InputLabel>
          <Select
            labelId="product-helper-label"
            id="product-helper"
            value={product}
            onChange={handleProductSelect}
          >
            {products.map((item, index) => {
              return (
                <MenuItem key={index} value={item}>
                  {item}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel id="season-order-helper-label">Order</InputLabel>
          <Select
            labelId="season-order-helper-label"
            id="season-order-helper"
            value={seasonOrder}
            onChange={handleSelect}
          >
            {seasonOrderOptions.map((item, index) => {
              return (
                <MenuItem key={index} value={item}>
                  {item}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel id="show-select-helper-label">Shows</InputLabel>
          <Select
            labelId="show-select-helper-label"
            id="show-select-helper"
            value={activeShow}
            onChange={handleShowSelect}
          >
            {shows.map((item, index) => {
              return (
                <MenuItem key={index} value={index}>
                  {item.title}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        {product !== "DTC" ? (
          <FormControl className={classes.themes}>
            <InputLabel id="show-theme-select-label">Themes</InputLabel>
            <Select
              labelId="show-theme-select-label"
              id="show-theme-select"
              value={background.title}
              onChange={handleThemeSelect}
            >
              {backgrounds.themes.map((item, index) => {
                return (
                  <MenuItem key={index} value={item.title}>
                    {item.title}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        ) : null}

        {/* <FormControl className={classes.formControl}>
          <FormControlLabel
            control={
              <Checkbox
                checked={showContent}
                onChange={handleShowContent}
                name="checked"
                color="primary"
              />
            }
            label={showContent ? "Content Shown" : "Content Hidden"}
          />
        </FormControl> */}
      </Paper>

      <Frame
        center
        width={640}
        height={360}
        background={product === "DTC" ? backgrounds.dtc : background.color}
        overflow={"hidden"}
        {...rest}
      >
        <Frame
          width={640}
          height={360}
          background={"none"}
          animate={contentControl}
        >
          <HeroShow
            initial={initial}
            state={state}
            focus={focus}
            translateY={translateY}
            logo={shows[activeShow].logo}
            image={shows[activeShow].image}
            description={shows[activeShow].description}
            showContent={showContent}
            product={product}
          />

          {product !== "DTC" ? <MVPDLogo /> : null}

          {showContent ? (
            <Frame
              id="content"
              width={"100%"}
              height={360}
              top={200}
              background="none"
            >
              <Stack
                height={"auto"}
                width={"auto"}
                padding={16}
                paddingTop={64}
                paddingLeft={30}
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
                <SeasonRail
                  seasons={seasons}
                  focus={focus}
                  state={{
                    ...state,
                    currentSeason: seasons[components[1].current_season].season
                  }}
                  animate={{ opacity: focus.component > 1 ? 0 : 1 }}
                  episodesControl={episodesControl}
                  transition={
                    focus.component > 1
                      ? { ...transitions.fade }
                      : { ...transitions.fade, delay: durations.s }
                  }
                />
                <Rail
                  localStore={{ ...components[2] }}
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
                <Rail
                  localStore={{ ...components[3] }}
                  animate={{
                    opacity: focus.component > 3 ? 0 : 1,
                    left: components[3].left
                  }}
                  transition={{
                    opacity:
                      focus.component > 3
                        ? {
                            ...transitions.fade
                          }
                        : { ...transitions.fade, delay: durations.s }
                  }}
                />
              </Stack>
            </Frame>
          ) : null}
        </Frame>

        <Loader classes={classes} state={{ isLoading }} />

        <Toast
          initial={initial}
          trigger={state.saved}
          msg={
            state.saved ? "show added to my list" : "show removed from my list"
          }
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

Show.defaultProps = {
  id: 2,
  name: "Show"
};
