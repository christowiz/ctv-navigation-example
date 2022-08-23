import React, { useState, useEffect } from 'react';
import Gamepad from 'react-gamepad';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import { Frame, Stack } from 'framer';

import { durations, transitions } from '../Components/Animations';
import { Rail } from '../Components/Rail';
import { useStore } from '../Stores/Store';

export default function Home(props) {
  const { id, name, ...rest } = props;
  const [isPressed, setIsPressed] = useState(false);
  const [focusDelay, setFocusDelay] = useState(false);
  const [store, setStore] = useStore();
  const [contentLoading, setContentLoading] = useState(true);
  const [tertiaryLoading, setTertiaryLoading] = useState(true);

  const {
    current_group,
    current_component,
    current_navigation,
    previous_group,
    global_nav,
    current_id,
    navigation,
  } = store;

  const curIndex =
    current_group === 'components' ? current_component : current_navigation;

  const type =
    current_group === 'components'
      ? store.components[curIndex].type
      : store.navigation[curIndex].type;
  const initialOffset = 100;

  // console.log("home rendering");

  const updateValue = (x, max, direction) => {
    let value = x;
    value =
      direction === 'down' || direction === 'forward'
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
    let lstore = { ...store };
    let { navigation, components } = lstore;

    // update old
    let oldNav = navigation[lstore.previous_navigation];
    oldNav.content[oldNav.current_item].state = 'active';

    let oldComponent = components[lstore.previous_component];
    oldComponent.content[oldComponent.current_item].state = 'previous';

    if (current_group === 'components') {
      let component = components[lstore.current_component];
      let content = component.content;
      let active = component.current_item;

      // update new
      content[active].state = 'focus';

      // push
      setStore({
        ...store,
        components: components,
      });
    } else if (current_group === 'navigation') {
      let components = lstore.navigation;
      let component = components[curIndex];
      let content = component.content;
      let active = component.current_item;

      // update old
      let curItem = content[active];

      curItem.state =
        curItem.state === 'focus' && current_component === component.id
          ? 'active'
          : 'focus';

      // push
      setStore({
        ...store,
        navigation: components,
      });
    } else if (current_group === 'globalNav') {
      components[lstore.current_component].content[
        components[lstore.current_component].current_item
      ].state = 'previous';
      navigation[lstore.current_navigation].content[
        navigation[lstore.current_navigation].current_item
      ].state = 'active';
      setStore({
        ...store,
        navigation: navigation,
        components: components,
      });
    }
  };

  const calculateHeights = initialOffset => {
    // local copy of offsets
    let offsets = [...store.verticalOffsets];
    let contentHeight = 0;

    // calculate vertical scroll position for each component
    store.components.map((item, index) => {
      const { sub_type } = item;
      const { params } = store;
      const { railGap, heights } = params;
      const height = heights[sub_type];

      const offsetHeight =
        offsets[index - 1] === undefined ? -55 : offsets[index - 1];

      offsets = [
        ...offsets,
        -Math.abs(height) + offsetHeight + -Math.abs(railGap),
      ];

      contentHeight =
        contentHeight + (height + Math.abs(offsetHeight) + railGap);
    });

    offsets.unshift(initialOffset);

    setStore({
      ...store,
      contentHeight: contentHeight,
      verticalOffsets: offsets,
    });
  };

  const calculateWidths = () => {
    let navigation = [...store.navigation];
    let tertiary = navigation[1];

    tertiary.content.map((item, index) => {
      const offsetWidth =
        tertiary.offsets[index - 1] === undefined
          ? 0
          : tertiary.offsets[index - 1];
      tertiary.offsets = [
        ...tertiary.offsets,
        -Math.abs(item.width) + offsetWidth + -Math.abs(8),
      ];
    });
    tertiary.offsets.unshift(0);
    setStore({
      ...store,
      navigation: navigation,
    });
  };

  const translateLeft = (component, value, sub_type) => {
    // console.log(arr, value, sub_type);

    // step distance
    let step = 0;
    let offset = 0;
    let visible = 0;

    if (sub_type === 'show') {
      step = 73.33 + 15;
      visible = 6;
    }

    if (sub_type === 'episode') {
      step = 162.67 + 15;
      visible = 3;
    }

    if (sub_type === 'network') {
      step = 50 + 8;
      visible = 9;
    }

    if (sub_type === 'tertiary') {
      visible = 5;
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
      sub_type === 'tertiary'
        ? component.offsets[scrollIndex]
        : -step * scrollIndex;
    return left;
  };

  const navigateRail = direction => {
    // copy local
    let lstore = { ...store };
    let components =
      lstore.current_group === 'components'
        ? lstore.components
        : lstore.navigation;
    let component =
      components[
        lstore.current_group === 'components'
          ? lstore.current_component
          : lstore.current_navigation
      ];
    let content = component.content;
    let active = component.current_item;

    // if left and first item, open primary navigation
    if (direction === 'back' && active === 0) {
      updateRail();
      setStore({
        ...store,
        previous_group: lstore.current_group,
        current_group: 'globalNav',
        global_nav: {
          ...global_nav,
          current: global_nav.active,
        },
      });
    } else {
      // update old
      let curItem = content[active];
      curItem.state = 'default';

      // set new value
      active = updateValue(active, content.length - 1, direction);
      component.current_item = active;

      // update new
      let newItem = content[active];
      newItem.state = 'focus';

      setStore({
        ...store,
        current_id: component.content[active].id,
      });

      if (component.type === 'navigation') {
        setContentLoading(true);
      }
      if (component.sub_type === 'network') {
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
        [lstore.current_group === 'components'
          ? 'components'
          : 'navigation']: components,
      });
    }
  };

  const navigateHorizontal = direction => {
    if (current_group === 'globalNav') {
      if (direction === 'forward') {
        setStore({
          ...store,
          current_group: previous_group,
        });
      }
    } else {
      navigateRail(direction);
    }
  };

  const navigateVertical = direction => {
    setFocusDelay(0);
    let params = {};

    if (current_group === 'components') {
      params = {
        ...params,
        index: current_component,
        arr: store.components,
      };
    } else if (current_group === 'navigation') {
      params = {
        ...params,
        index: current_navigation,
        arr: store.navigation,
      };
    } else {
      params = {
        ...params,
        index: global_nav.current,
        arr: global_nav.items,
      };
    }

    const { index, arr } = params;

    let newIndex = updateValue(index, arr.length - 1, direction);

    if (current_group === 'navigation') {
      if (type === 'rail') updateRail();

      // if on last nav component, move to components
      if (index === arr.length - 1 && direction === 'down') {
        setStore({
          ...store,
          current_group: 'components',
          previous_group: 'navigation',
          previous_navigation: index,
        });
      }
      if (newIndex !== index) {
        setStore({
          ...store,
          previous_navigation: index,
          current_navigation: newIndex,
        });
      }
    }

    // moving through components
    if (current_group === 'components') {
      if (type === 'rail') updateRail();
      // if on first component, move to navigation
      if (index === 0 && direction === 'up') {
        setStore({
          ...store,
          current_group: 'navigation',
          previous_group: 'components',
          previous_component: index,
        });
      }
      if (newIndex !== index) {
        setStore({
          ...store,
          previous_component: index,
          current_component: newIndex,
        });
      }
    }

    // move through primary navigation
    if (current_group === 'globalNav') {
      if (newIndex !== index) {
        setStore({
          ...store,
          global_nav: {
            ...global_nav,
            current: newIndex,
            previous: index,
          },
        });
      }
    }
  };

  const tilePress = pressed => {
    let lstore = { ...store };
    let component = { ...lstore.components[curIndex] };
    let content = component.content;
    let tile = content[component.current_item];
    tile.state = pressed ? 'press' : 'focus';

    lstore.components[curIndex] = component;

    setStore({
      ...store,
      components: lstore.components,
    });
  };

  const handleSubmit = pressed => {
    setIsPressed(pressed);
    if (type === 'rail') tilePress(pressed);
  };

  const backNavigate = () => {
    if (current_group === 'components' && store.current_component >= 0) {
      let components = store.components;

      components[current_component].content[
        components[current_component].current_item
      ].state = 'previous';

      // set to previous focus
      // set group to navigation
      setStore({
        ...store,
        current_group: 'navigation',
        previous_group: 'components',
        current_component: 0,
        previous_component: 0,
        components: components,
      });
    } else if (
      current_group === 'navigation' &&
      store.current_component === 0 &&
      (store.navigation[0].current_item > 0 ||
        store.navigation[1].current_item > 0)
    ) {
      let navigation = store.navigation;
      navigation.map((item, index) => {
        item.content[item.current_item].state = 'default';
        item.current_item = 0;
        item.left = 0;
        item.content[0].state = 'active';
      });
      navigation[current_navigation].content[0].state = 'focus';
      setStore({
        ...store,
        current_group: 'navigation',
        previous_group: 'navigation',
      });
    } else if (
      current_group === 'navigation' &&
      store.current_component === 0 &&
      store.navigation[current_navigation].current_item === 0
    ) {
      let navigation = store.navigation;
      navigation[current_navigation].content[0].state = 'previous';

      setStore({
        ...store,
        current_group: 'globalNav',
        previous_group: 'navigation',
      });
    } else if (
      current_group === 'globalNav' &&
      store.navigation[current_navigation].current_item === 0
    ) {
      setStore({
        ...store,
        current_group: store.previous_group,
        previous_group: 'globalNav',
        global_nav: {
          ...global_nav,
          current: store.global_nav.active,
        },
      });
    }
  };

  

  const buttonDownHandler = buttonName => {
    if (buttonName === 'DPadUp') navigateVertical('up');
    if (buttonName === 'DPadDown') navigateVertical('down');
    if (buttonName === 'DPadLeft') navigateHorizontal('back');
    if (buttonName === 'DPadRight') navigateHorizontal('forward');
  };

  const buttonChangeHandler = (buttonName, pressed) => {
    if (buttonName === 'B' && pressed) backNavigate();
    if (buttonName === 'A') handleSubmit(pressed);
  };

  useEffect(() => {
    updateRail();
  }, [current_group, current_navigation, current_component]);

  let loadTimeout;

  const showContent = () => {
    setContentLoading(false);
    setTertiaryLoading(false);
  };

  const setTimeouts = () => {
    if (tertiaryLoading) {
      let components = store.navigation;

      components[1].current_item = 0;
      components[1].content.map(item => {
        item.state = 'default';
      });
      components[1].content[0].state = 'active';
      components[1].left = 0;

      setStore({
        ...store,
        navigation: components,
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
  // for content y position scrolling
  useEffect(() => {
    resetHome();
    setContentLoading(false);
    setTertiaryLoading(false);

    if (store.navigation.filter(item => item.sub_type === 'tertiary').length) {
      // console.log('do a thing');
      calculateWidths();
    }

    if (store.current_page === 'home') {
      calculateHeights(0);
    }
  }, [store.current_page]);

  return (
    <>
      <Frame
        center
        width={640}
        height={360}
        background={'rgba(255,255,255,0.0125)'}
        overflow={'hidden'}
        animate={{
          opacity: current_group === 'globalNav' ? 0.25 : 1,
        }}
        transition={{
          ...transitions.slide,
        }}
        {...rest}>
        <Frame
          id="navigation"
          width={'100%'}
          height={150}
          background="none"
          overflow="visible"
          animate={{
            y:
              current_component > 0
                ? store.verticalOffsets[current_component]
                : 0,
          }}
          transition={{
            duration: store.params.durations.verticalScroll,
            ease: 'easeInOut',
          }}>
          <Stack
            width={'auto'}
            height={120}
            direction={'vertical'}
            padding={16}
            paddingLeft={35 + 16}
            center={'y'}
            gap={16}>
            {store.navigation.map((component, index) => {
              return (
                <Rail
                  key={index}
                  localStore={component}
                  animate={{
                    left: component.left,
                    opacity:
                      component.sub_type === 'tertiary' && tertiaryLoading
                        ? 0
                        : 1,
                  }}
                  focusDelay={focusDelay}
                  transition={{
                    ...transitions.slide,
                    duration:
                      component.sub_type === 'network'
                        ? durations.s
                        : durations.m,
                    opacity: {
                      duration:
                        component.sub_type === 'tertiary' && tertiaryLoading
                          ? 0
                          : durations.s,
                    },
                  }}
                />
              );
            })}
          </Stack>
        </Frame>
        <Frame
          id="content"
          width={'100%'}
          height={360}
          top={initialOffset}
          background="none"
          animate={{
            opacity: contentLoading ? 0 : 1,
          }}
          transition={{
            duration: contentLoading ? 0.125 : durations.s,
          }}>
          <Stack
            height={store.contentHeight}
            width={'auto'}
            padding={16}
            paddingTop={64}
            paddingLeft={35 + 16}
            paddingRight={0}
            overflow={'hidden'}
            direction="vertical"
            gap={store.params.railGap}
            animate={{
              y: store.verticalOffsets[current_component],
            }}
            transition={{
              ...transitions.slide,
              duration: durations.m,
            }}>
            {store.components.map((component, index) => {
              return (
                <Rail
                  key={index}
                  id={id}
                  localStore={component}
                  focusDelay={focusDelay}
                  animate={{
                    opacity: index < current_component ? 0 : 1,
                    left: component.left,
                  }}
                  transition={{
                    ...transitions.slide,
                    duration: durations.m,
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
        }}>
        <React.Fragment />
      </Gamepad>

      <KeyboardEventHandler
        handleKeys={[
          'up',
          'down',
          'left',
          'right',
          'space',
          'return',
          'b',
          'del',
          'backspace',
          'esc',
        ]}
        handleEventType="keydown"
        onKeyEvent={(key, e) => {
          if (key === 'up') navigateVertical('up');
          if (key === 'down') navigateVertical('down');
          if (key === 'left') navigateHorizontal('back');
          if (key === 'right') navigateHorizontal('forward');
          if (key === 'space' || key === 'return') {
            handleSubmit(true);
          }
          if (
            key === 'b' ||
            key === 'del' ||
            key === 'backspace' ||
            key === 'esc'
          ) {
            backNavigate();
          }
        }}
      />

      <KeyboardEventHandler
        handleKeys={['space', 'return', 'b', 'del', 'backspace', 'esc']}
        handleEventType="keyup"
        onKeyEvent={(key, e) => {
          if (key === 'space' || key === 'return') {
            handleSubmit(false);
          }
        }}
      />
    </>
  );
}

Home.defaultProps = {
  id: 0,
  name: 'Home',
};
