import React, { useState, useEffect } from 'react';
import { Frame, useAnimation } from 'framer';
import { durations, transitions, timeouts } from '../Components/Animations';

export function Toast(props) {
  const { initial, trigger, animate, msg, styles, ...rest } = props;

  // animation controller for toast
  const controls = useAnimation();

  async function animShowToast() {
    // reset
    await controls.start({
      y: -50,
    });

    // play
    await controls.start({
      y: 30,
      transition: {
        ...transitions.enter,
      },
    });

    // then hide toast
    animHideToast();
  }

  async function animHideToast() {
    // hide toast
    await controls.start({
      y: -50,
      transition: {
        ...transitions.exit,
        delay: timeouts.medium,
      },
    });
  }

  async function sequence() {
    animShowToast();
  }

  // mount
  useEffect(() => {}, []);

  useEffect(() => {
    if (!initial) sequence();
  }, [trigger]);

  return (
    <Frame
      center="x"
      initial={{
        y: -50,
      }}
      transition={transitions.enter}
      animate={controls}
      style={styles}>
      {props.msg}
    </Frame>
  );
}

Toast.defaultProps = {
  initial: true,
  trigger: false,
  animate: {},
  msg: 'Toast Message',
  styles: {
    minWidth: 280,
    width: 'auto',
    height: 'auto',
    padding: '12px 8px',
    background: '#fff',
    boxShadow: '0 4px 12px -4px rgba(0,0,0,0.2)',
    borderRadius: 4,
    fontSize: 14,
  },
};
