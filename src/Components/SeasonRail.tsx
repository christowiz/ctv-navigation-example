import React from 'react';
// import { useStore } from "../Stores/Store";
import { Frame, Stack } from 'framer';
import { durations, transitions } from '../Components/Animations';
import { Tile } from '../Components/Tile';
import { Rail } from '../Components/Rail';

export function SeasonRail(props) {
  const {
    id,
    seasons,
    focus,
    state,
    focusDelay,
    episodesControl,
    ...rest
  } = props;

  const { currentEpisode, currentSeason, hasWatched } = state;

  const season = seasons.filter(item => item.season === currentSeason);

  const episodes = {
    page: 'detail',
    type: 'rail',
    sub_type: 'episode',
    content: season[0].content,
  };

  const activeSeasonMatch = season => {
    return currentSeason === season;
  };

  return (
    <Stack
      id={id}
      direction="vertical"
      gap={16}
      distribution="start"
      width="100%"
      height="auto"
      {...rest}>
      <Stack
        direction="horizontal"
        gap={8}
        distribution="start"
        width="100%"
        height="auto"
        type={'navigation'}>
        {seasons.map((item, index) => {
          const { season, state } = item;

          const seasonNum = 'S' + season;

          return (
            <Frame key={index} width={50} height={25} background="none">
              <Tile
                active={activeSeasonMatch(season) ? true : false}
                state={
                  focus.item === 'navigation' && activeSeasonMatch(season)
                    ? 'focus'
                    : activeSeasonMatch(season)
                    ? 'active'
                    : state
                }
                sub_type={'tertiary'}
                width={50}
                height={25}
                focusDelay={focusDelay}
                borderRadius={25 / 2}
              />
              <Frame
                width={50}
                height={25}
                background="none"
                style={{
                  color:
                    focus.item === 'navigation' && activeSeasonMatch(season)
                      ? '#fff'
                      : activeSeasonMatch(season)
                      ? '#000'
                      : '#fff',
                  fontSize: 12,
                  fontWeight: 'bold',
                  marginTop: -1,
                }}>
                {seasonNum}
              </Frame>
            </Frame>
          );
        })}
      </Stack>
      <Frame
        width={'100%'}
        height={85}
        background={'none'}
        animate={episodesControl}>
        <Rail
          localStore={episodes}
          animate={{
            left: season[0].left,
          }}
          type={'seasonRail'}
          transition={{
            opacity:
              focus.component > 2
                ? {
                    ...transitions.fade,
                  }
                : { ...transitions.fade, delay: durations.s },
          }}
        />
      </Frame>
    </Stack>
  );
}

SeasonRail.defaultProps = {
  type: 'rail',
  currentSeason: 3,
  currentEpisode: 0,
  seasons: [
    {
      id: 0,
      season: 3,
      state: 'default',
      content: [
        { state: 'default' },
        { state: 'default' },
        { state: 'default' },
        { state: 'default' },
        { state: 'default' },
        { state: 'default' },
        { state: 'default' },
        { state: 'default' },
        { state: 'default' },
        { state: 'default' },
      ],
    },
    {
      id: 1,
      season: 2,
      state: 'default',
      content: [
        { state: 'default' },
        { state: 'default' },
        { state: 'default' },
        { state: 'default' },
        { state: 'default' },
        { state: 'default' },
        { state: 'default' },
      ],
    },
  ],
};
