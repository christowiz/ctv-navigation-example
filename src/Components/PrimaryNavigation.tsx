import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import Gamepad from 'react-gamepad';
import { Frame, Stack } from 'framer';
import { durations, transitions } from './Animations';
import { pageStore } from '../Stores/Store';

export default function NavItem(props) {
  const { onClick, state, ...rest } = props;

  const variants = {
    default: {
      background: 'rgba(255, 255, 255, 0.1)',
      scale: 1,
    },
    focus: {
      background: 'rgb(0, 145, 255, 1)',
      scale: 1.1,
    },
    previous: {
      background: 'rgba(255, 255, 255, 0.4)',
      scale: 1,
    },
    active: {
      background: 'rgba(255, 255, 255, 0.75)',
      scale: 1,
    },
  };

  return (
    <Frame
      width={25}
      height={25}
      borderRadius={29 / 2}
      variants={variants}
      initial={'default'}
      animate={state}
      transition={{
        ...transitions.fade,
      }}
      onClick={onClick}>
      {props.children}
    </Frame>
  );
}

function PrimaryNavigation(props) {
  const { ...rest } = props;
  const [state, setState] = useState('collapsed');
  const [store, setStore] = pageStore();

  const { global_nav, current_page, pages } = store;
  const { type, focus, active, current, previous, items } = global_nav;

  const { current_group, current_global, previous_global } = pages[
    current_page
  ];

  const current_item = items[current];
  const { path, key } = current_item;

  const variants = {
    collapsed: {
      left: 0,
      width: 36,
      background: 'rgba(0,0,0,0.75)',
    },
    focus: {
      left: 0,
      width: 136,
      background: 'rgba(0,0,0,1)',
    },
    hidden: {
      left: -36,
      width: 36,
      background: 'rgba(0,0,0,0.95)',
    },
  };

  const loadPage = () => {
    const resets = {
      current_group: 'components', //globalNav, navigation, components
      current_global: 0,
      // current_navigation: 1,
      // current_component: 0,
      previous_group: 'globalNav',
      previous_global: 0,
      // previous_navigation: 1,
      // previous_component: 0,
      // current_id: 0,
    };
    setStore({
      ...store,
      current_page: `${key}`,
      global_nav: {
        ...global_nav,
        active: current,
      },
      pages: {
        ...store.pages,
        home: {
          ...store.pages.home,
          ...resets,
        },
        browse: {
          ...store.pages.browse,
          ...resets,
        },
      },
    });
    // load page
    props.history.push(path);
  };

  const handleSubmit = (e, current, index, path, key) => {
    e.preventDefault();
    // console.log(key);
    if (
      current !== active &&
      store.pages[current_page].current_group === 'globalNav'
    )
      loadPage();
  };

  const buttonDownHandler = (buttonName, pressed) => {
    if (buttonName === 'A') {
      if (
        current !== active &&
        pressed &&
        store.pages[current_page].current_group === 'globalNav'
      )
        loadPage();
    }
  };

  useEffect(() => {
    let state = current_group === 'globalNav' ? 'focus' : 'collapsed';
    setState(state);
  }, [current_group]);

  return (
    <Frame
      height={360}
      // background={'rgba(0,0,0,0.95)'}
      variants={variants}
      initial={'collapsed'}
      animate={state}
      transition={{ ...transitions.slide }}
      {...rest}>
      <Stack
        direction={'vertical'}
        distribution={'center'}
        gap={12}
        width={25}
        height={250}
        center={'y'}
        left={5}
        background={'none'}>
        {items.map((item, index) => {
          const { id, path, key, state } = item;

          // console.log(key, path);
          return (
            <NavItem
              key={index}
              state={
                current_group === 'globalNav' && current === index
                  ? 'focus'
                  : active === index
                  ? 'active'
                  : 'default'
              }
              onClick={e => {
                handleSubmit(e, current, index, path, key);
              }}
            />
          );
        })}
      </Stack>
      <Gamepad
        onButtonChange={(buttonName, pressed) => {
          buttonDownHandler(buttonName, pressed);
        }}>
        <></>
      </Gamepad>
      <KeyboardEventHandler
        handleKeys={['space', 'return']}
        handleEventType="keyup"
        onKeyEvent={(key, e) => {
          if (key === 'space' || key === 'return') {
            handleSubmit(e);
          }
        }}
      />
    </Frame>
  );
}

PrimaryNavigation.defaultProps = {
  type: 'navigation',
  focus: false,
  active: 0,
  current: 0,
  previous: 0,
  items: [
    {
      id: 0,
      path: '/',
      state: 'active',
    },
    {
      id: 1,
      path: '/browse',
    },
  ],
};

export default withRouter(PrimaryNavigation);
