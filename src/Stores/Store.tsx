import { createStore } from "./CreateStore";

export const useStore = createStore({
  loading: false,
  params: {
    railGap: 70,
    durations: {
      verticalScroll: 0.3
    },
    heights: {
      show: 110,
      episode: 90.96,
      network: 50
    }
  },
  global_nav: {
    type: "navigation",
    focus: false,
    active: 0,
    current: 0,
    previous: 0,
    items: [
      {
        id: 0,
        path: "/",
        state: "active"
      },
      {
        id: 1,
        path: "/browse"
      }
    ]
  },
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
  contentHeight: 0,
  navigation: [
    {
      id: 0,
      type: "navigation",
      sub_type: "network",
      current_item: 0,
      left: 0,
      content: [
        { id: "sec-0", name: "nav item 1", state: "active" },
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
      type: "navigation",
      sub_type: "tertiary",
      current_item: 0,
      left: 0,
      offsets: [],
      content: [
        {
          id: "ter-0",
          state: "active",
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
    }
  ],
  components: [
    {
      id: 0,
      type: "rail",
      sub_type: "show",
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
    },
    {
      id: 1,
      type: "rail",
      sub_type: "show",
      current_item: 0,
      left: 0,
      content: [
        { state: "default" },
        { state: "default" },
        { state: "default" }
      ]
    },
    {
      id: 2,
      type: "rail",
      sub_type: "episode",
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
      id: 3,
      type: "rail",
      sub_type: "episode",
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
      id: 4,
      type: "rail",
      sub_type: "episode",
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
      id: 5,
      type: "rail",
      sub_type: "episode",
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
      id: 6,
      type: "rail",
      sub_type: "episode",
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
      sub_type: "show",
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
      id: 8,
      type: "rail",
      sub_type: "show",
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
      id: 9,
      type: "rail",
      sub_type: "show",
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
    }
  ]
});

export const pageStore = createStore({
  loading: false,
  current_page: "browse",
  params: {
    railGap: 60,
    durations: {
      verticalScroll: 0.3
    },
    heights: {
      show: 110,
      episode: 90.96,
      network: 50,
      hero: 50
    },
    backgrounds: {
      app: "linear-gradient(120deg, #160307 0%, #5C0C1D 100%)",
      dtc: "linear-gradient(0deg, #121317 0%, #262931 100%)",

      themes: [
        {
          title: "American Hereos Channel",
          color: "linear-gradient(120deg, #050709 0%, #2A3245 100%)"
        },
        {
          title: "Animal Planet",
          color: "linear-gradient(120deg, #000915 0%, #002049 100%)"
        },
        {
          title: "Cooking Channel",
          color: "linear-gradient(120deg, #080A0B 0%, #242A2E 100%)"
        },
        {
          title: "Destination America",
          color: "linear-gradient(120deg, #080A0B 0%, #242A2E 100%)"
        },
        {
          title: "DIY",
          color: "linear-gradient(120deg, #0A0A0A 0%, #2A2A2A 100%)"
        },
        {
          title: "Food Network",
          color: "linear-gradient(120deg, #080A0B 0%, #242A2E 100%)"
        },
        {
          title: "Discovery",
          color: "linear-gradient(120deg, #020A0E 0%, #0B283A 100%)"
        },
        {
          title: "Discovery Espanol",
          color: "linear-gradient(120deg, #080A0B 0%, #242A2E 100%)"
        },
        {
          title: "Discovery Family",
          color: "linear-gradient(120deg, #120913 0%, #361B3B 100%)"
        },
        {
          title: "Discovery Familia",
          color: "linear-gradient(120deg, #080A0B 0%, #242A2E 100%)"
        },
        {
          title: "Discovery Life",
          color: "linear-gradient(120deg, #080B11 0%, #212E47 100%)"
        },
        {
          title: "HGTV",
          color: "linear-gradient(120deg, #071012 0%, #1F444D 100%)"
        },
        {
          title: "ID",
          color: "linear-gradient(120deg, #01080A 0%, #06222C 100%)"
        },
        {
          title: "Motor Trend",
          color: "linear-gradient(120deg, #0A0A0A 0%, #2A2A2A 100%)"
        },
        {
          title: "OWN",
          color: "linear-gradient(120deg, #0A0A0A 0%, #2A2A2A 100%)"
        },
        {
          title: "Science",
          color: "linear-gradient(120deg, #080A0B 0%, #242A2E 100%)"
        },
        {
          title: "TLC",
          color: "linear-gradient(120deg, #160307 0%, #5C0C1D 100%)"
        },
        {
          title: "Travel Channel",
          color: "linear-gradient(120deg, #0D030C 0%, #290B25 100%)"
        },
        {
          title: "DTC",
          color: "linear-gradient(120deg, #15171c 0%, #363B46 100%)"
        }
      ]
      // 484e5c
    }
  },
  global_nav: {
    type: "navigation",
    focus: false,
    active: 1,
    current: 1,
    previous: 1,
    items: [
      {
        id: 0,
        key: "home",
        path: "/home",
        state: "active"
      },
      {
        id: 1,
        key: "browse",
        path: "/browse"
      }
    ]
  },
  pages: {
    home: {
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
      contentHeight: 0,
      components: [
        {
          id: 0,
          type: "rail",
          sub_type: "episode",
          locked: true,
          current_item: 0,
          left: 0,
          content: [
            {
              state: "default",
              series: "Iron Chef America",
              description:
                'Based upon the format of the original Japanese version of "Iron Chef," the series features a kitchen ...',
              recommendation: "For lovers of Food"
            },
            {
              state: "default",
              series: "Chopped",
              description:
                "Four chefs call on their culinary skills as they face off against one another to prepare a spectacular ...",
              recommendation: "For lovers of Food"
            },
            {
              state: "default",
              series: "Ace of Cakes",
              description:
                "Duff Goldman is a pastry-decorating virtuoso. Goldman and team turn out cakes that are works of art.",
              recommendation: "For lovers of Food"
            },
            {
              state: "default",
              series: "90 Day Fiancé",
              description:
                "Long-distance relationships have challenges that are sometimes difficult to overcome but ...",
              recommendation: "For lovers of Dating & Relationships"
            },
            {
              state: "default",
              series: "Dr. Pimple Popper",
              description:
                "Her actual name is Sandra Lee, but she is so popular in her field of dermatology that she ...",
              recommendation: "For lovers of Medical Marvels"
            },
            {
              state: "default",
              series: "Alaskan Bush People",
              description:
                "The Browns live in the Copper River Valley, where temperatures can drop to 60 degrees below zero ...",
              recommendation: "For lovers of Extreme Families"
            },
            {
              state: "default",
              series: "Crikey! It's the Irwins",
              description:
                "Carrying on late wildlife conservationist Steve Irwin's mission to bring people closer to animals ...",
              recommendation: "For lovers of Zoo's And Aquariums"
            },
            {
              state: "default",
              series: "Deadliest Catch",
              description:
                "Check out this gripping documentary series, revealing the mortal perils and intense discomfort ... ",
              recommendation: "For lovers of Extreme Jobs"
            }
          ]
        },
        {
          id: 1,
          type: "rail",
          sub_type: "show",
          locked: true,
          current_item: 0,
          left: 0,
          content: [
            {
              state: "default",
              series: "Alaskan Bush People",
              description:
                "The Browns live in the Copper River Valley, where temperatures can drop to 60 degrees below zero ...",
              recommendation: "For lovers of Extreme Families"
            },
            {
              state: "default",
              series: "Iron Chef America",
              description:
                'Based upon the format of the original Japanese version of "Iron Chef," the series features a kitchen ...',
              recommendation: "For lovers of Food"
            },
            {
              state: "default",
              series: "Dr. Pimple Popper",
              description:
                "Her actual name is Sandra Lee, but she is so popular in her field of dermatology that she ...",
              recommendation: "For lovers of Medical Marvels"
            },
            {
              state: "default",
              series: "90 Day Fiancé",
              description:
                "Long-distance relationships have challenges that are sometimes difficult to overcome but ...",
              recommendation: "For lovers of Dating & Relationships"
            },
            {
              state: "default",
              series: "Chopped",
              description:
                "Four chefs call on their culinary skills as they face off against one another to prepare a spectacular ...",
              recommendation: "For lovers of Food"
            },
            {
              state: "default",
              series: "Crikey! It's the Irwins",
              description:
                "Carrying on late wildlife conservationist Steve Irwin's mission to bring people closer to animals ...",
              recommendation: "For lovers of Zoo's And Aquariums"
            },
            {
              state: "default",
              series: "Battlebots",
              description:
                "The epic robot-fighting series returns for Season 4. It features the biggest, baddest ...",
              recommendation: "For lovers of Science & Technology"
            }
          ]
        },
        {
          id: 2,
          type: "rail",
          sub_type: "episode",
          locked: true,
          current_item: 0,
          left: 0,
          content: [
            {
              state: "default",
              series: "Deadliest Catch",
              description:
                "Check out this gripping documentary series, revealing the mortal perils and intense discomfort ... ",
              recommendation: "For lovers of Extreme Jobs"
            },
            {
              state: "default",
              series: "Crikey! It's the Irwins",
              description:
                "Carrying on late wildlife conservationist Steve Irwin's mission to bring people closer to animals ...",
              recommendation: "For lovers of Zoo's And Aquariums"
            },
            {
              state: "default",
              series: "Ace of Cakes",
              description:
                "Duff Goldman is a pastry-decorating virtuoso. Goldman and team turn out cakes that are works of art.",
              recommendation: "For lovers of Food"
            },
            {
              state: "default",
              series: "Iron Chef America",
              description:
                'Based upon the format of the original Japanese version of "Iron Chef," the series features a kitchen ...',
              recommendation: "For lovers of Food"
            }
          ]
        },
        {
          id: 3,
          type: "rail",
          sub_type: "show",
          locked: true,
          current_item: 0,
          left: 0,
          content: [
            {
              state: "default",
              series: "Crikey! It's the Irwins",
              description:
                "Carrying on late wildlife conservationist Steve Irwin's mission to bring people closer to animals ...",
              recommendation: "For lovers of Zoo's And Aquariums"
            },
            {
              state: "default",
              series: "90 Day Fiancé",
              description:
                "Long-distance relationships have challenges that are sometimes difficult to overcome but ...",
              recommendation: "For lovers of Dating & Relationships"
            },
            {
              state: "default",
              series: "Ace of Cakes",
              description:
                "Duff Goldman is a pastry-decorating virtuoso. Goldman and team turn out cakes that are works of art.",
              recommendation: "For lovers of Food"
            },
            {
              state: "default",
              series: "Dr. Pimple Popper",
              description:
                "Her actual name is Sandra Lee, but she is so popular in her field of dermatology that she ...",
              recommendation: "For lovers of Medical Marvels"
            },
            {
              state: "default",
              series: "Battlebots",
              description:
                "The epic robot-fighting series returns for Season 4. It features the biggest, baddest ...",
              recommendation: "For lovers of Science & Technology"
            }
          ]
        },
        {
          id: 4,
          type: "rail",
          sub_type: "episode",
          locked: true,
          current_item: 0,
          left: 0,
          content: [
            {
              state: "default",
              series: "Ace of Cakes",
              description:
                "Duff Goldman is a pastry-decorating virtuoso. Goldman and team turn out cakes that are works of art.",
              recommendation: "For lovers of Food"
            },
            {
              state: "default",
              series: "Dr. Pimple Popper",
              description:
                "Her actual name is Sandra Lee, but she is so popular in her field of dermatology that she ...",
              recommendation: "For lovers of Medical Marvels"
            },
            {
              state: "default",
              series: "Chopped",
              description:
                "Four chefs call on their culinary skills as they face off against one another to prepare a spectacular ...",
              recommendation: "For lovers of Food"
            },
            {
              state: "default",
              series: "90 Day Fiancé",
              description:
                "Long-distance relationships have challenges that are sometimes difficult to overcome but ...",
              recommendation: "For lovers of Dating & Relationships"
            },
            {
              state: "default",
              series: "Dr. Pimple Popper",
              description:
                "Her actual name is Sandra Lee, but she is so popular in her field of dermatology that she ...",
              recommendation: "For lovers of Medical Marvels"
            },
            {
              state: "default",
              series: "Alaskan Bush People",
              description:
                "The Browns live in the Copper River Valley, where temperatures can drop to 60 degrees below zero ...",
              recommendation: "For lovers of Extreme Families"
            },
            {
              state: "default",
              series: "Crikey! It's the Irwins",
              description:
                "Carrying on late wildlife conservationist Steve Irwin's mission to bring people closer to animals ...",
              recommendation: "For lovers of Zoo's And Aquariums"
            },
            {
              state: "default",
              series: "Deadliest Catch",
              description:
                "Check out this gripping documentary series, revealing the mortal perils and intense discomfort ... ",
              recommendation: "For lovers of Extreme Jobs"
            },
            {
              state: "default",
              series: "Ace of Cakes",
              description:
                "Duff Goldman is a pastry-decorating virtuoso. Goldman and team turn out cakes that are works of art.",
              recommendation: "For lovers of Food"
            },
            {
              state: "default",
              series: "Iron Chef America",
              description:
                'Based upon the format of the original Japanese version of "Iron Chef," the series features a kitchen ...',
              recommendation: "For lovers of Food"
            }
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
            {
              state: "default",
              series: "Chopped",
              description:
                "Four chefs call on their culinary skills as they face off against one another to prepare a spectacular ...",
              recommendation: "For lovers of Food"
            },
            {
              state: "default",
              series: "Battlebots",
              description:
                "The epic robot-fighting series returns for Season 4. It features the biggest, baddest ...",
              recommendation: "For lovers of Science & Technology"
            },
            {
              state: "default",
              series: "Dr. Pimple Popper",
              description:
                "Her actual name is Sandra Lee, but she is so popular in her field of dermatology that she ...",
              recommendation: "For lovers of Medical Marvels"
            },
            {
              state: "default",
              series: "Alaskan Bush People",
              description:
                "The Browns live in the Copper River Valley, where temperatures can drop to 60 degrees below zero ...",
              recommendation: "For lovers of Extreme Families"
            },
            {
              state: "default",
              series: "Crikey! It's the Irwins",
              description:
                "Carrying on late wildlife conservationist Steve Irwin's mission to bring people closer to animals ...",
              recommendation: "For lovers of Zoo's And Aquariums"
            },
            {
              state: "default",
              series: "90 Day Fiancé",
              description:
                "Long-distance relationships have challenges that are sometimes difficult to overcome but ...",
              recommendation: "For lovers of Dating & Relationships"
            }
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
            {
              state: "default",
              series: "Deadliest Catch",
              description:
                "Check out this gripping documentary series, revealing the mortal perils and intense discomfort ... ",
              recommendation: "For lovers of Extreme Jobs"
            },
            {
              state: "default",
              series: "Ace of Cakes",
              description:
                "Duff Goldman is a pastry-decorating virtuoso. Goldman and team turn out cakes that are works of art.",
              recommendation: "For lovers of Food"
            },
            {
              state: "default",
              series: "Iron Chef America",
              description:
                'Based upon the format of the original Japanese version of "Iron Chef," the series features a kitchen ...',
              recommendation: "For lovers of Food"
            }
          ]
        },
        {
          id: 7,
          type: "rail",
          sub_type: "show",
          locked: true,
          current_item: 0,
          left: 0,
          content: [
            {
              state: "default",
              series: "Chopped",
              description:
                "Four chefs call on their culinary skills as they face off against one another to prepare a spectacular ...",
              recommendation: "For lovers of Food"
            },
            {
              state: "default",
              series: "90 Day Fiancé",
              description:
                "Long-distance relationships have challenges that are sometimes difficult to overcome but ...",
              recommendation: "For lovers of Dating & Relationships"
            },
            {
              state: "default",
              series: "Dr. Pimple Popper",
              description:
                "Her actual name is Sandra Lee, but she is so popular in her field of dermatology that she ...",
              recommendation: "For lovers of Medical Marvels"
            },
            {
              state: "default",
              series: "Alaskan Bush People",
              description:
                "The Browns live in the Copper River Valley, where temperatures can drop to 60 degrees below zero ...",
              recommendation: "For lovers of Extreme Families"
            },
            {
              state: "default",
              series: "Crikey! It's the Irwins",
              description:
                "Carrying on late wildlife conservationist Steve Irwin's mission to bring people closer to animals ...",
              recommendation: "For lovers of Zoo's And Aquariums"
            },
            {
              state: "default",
              series: "Deadliest Catch",
              description:
                "Check out this gripping documentary series, revealing the mortal perils and intense discomfort ... ",
              recommendation: "For lovers of Extreme Jobs"
            },
            {
              state: "default",
              series: "Ace of Cakes",
              description:
                "Duff Goldman is a pastry-decorating virtuoso. Goldman and team turn out cakes that are works of art.",
              recommendation: "For lovers of Food"
            },
            {
              state: "default",
              series: "Iron Chef America",
              description:
                'Based upon the format of the original Japanese version of "Iron Chef," the series features a kitchen ...',
              recommendation: "For lovers of Food"
            }
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
            {
              state: "default",
              series: "Dr. Pimple Popper",
              description:
                "Her actual name is Sandra Lee, but she is so popular in her field of dermatology that she ...",
              recommendation: "For lovers of Medical Marvels"
            },
            {
              state: "default",
              series: "Alaskan Bush People",
              description:
                "The Browns live in the Copper River Valley, where temperatures can drop to 60 degrees below zero ...",
              recommendation: "For lovers of Extreme Families"
            },
            {
              state: "default",
              series: "Chopped",
              description:
                "Four chefs call on their culinary skills as they face off against one another to prepare a spectacular ...",
              recommendation: "For lovers of Food"
            },
            {
              state: "default",
              series: "Crikey! It's the Irwins",
              description:
                "Carrying on late wildlife conservationist Steve Irwin's mission to bring people closer to animals ...",
              recommendation: "For lovers of Zoo's And Aquariums"
            },
            {
              state: "default",
              series: "Battlebots",
              description:
                "The epic robot-fighting series returns for Season 4. It features the biggest, baddest ...",
              recommendation: "For lovers of Science & Technology"
            },
            {
              state: "default",
              series: "90 Day Fiancé",
              description:
                "Long-distance relationships have challenges that are sometimes difficult to overcome but ...",
              recommendation: "For lovers of Dating & Relationships"
            }
          ]
        },
        {
          id: 9,
          type: "rail",
          sub_type: "episode",
          locked: false,
          current_item: 0,
          left: 0,
          content: [
            {
              state: "default",
              series: "Ace of Cakes",
              description:
                "Duff Goldman is a pastry-decorating virtuoso. Goldman and team turn out cakes that are works of art.",
              recommendation: "For lovers of Food"
            },
            {
              state: "default",
              series: "Chopped",
              description:
                "Four chefs call on their culinary skills as they face off against one another to prepare a spectacular ...",
              recommendation: "For lovers of Food"
            },
            {
              state: "default",
              series: "90 Day Fiancé",
              description:
                "Long-distance relationships have challenges that are sometimes difficult to overcome but ...",
              recommendation: "For lovers of Dating & Relationships"
            },
            {
              state: "default",
              series: "Crikey! It's the Irwins",
              description:
                "Carrying on late wildlife conservationist Steve Irwin's mission to bring people closer to animals ...",
              recommendation: "For lovers of Zoo's And Aquariums"
            },
            {
              state: "default",
              series: "Dr. Pimple Popper",
              description:
                "Her actual name is Sandra Lee, but she is so popular in her field of dermatology that she ...",
              recommendation: "For lovers of Medical Marvels"
            },
            {
              state: "default",
              series: "Alaskan Bush People",
              description:
                "The Browns live in the Copper River Valley, where temperatures can drop to 60 degrees below zero ...",
              recommendation: "For lovers of Extreme Families"
            },
            {
              state: "default",
              series: "Deadliest Catch",
              description:
                "Check out this gripping documentary series, revealing the mortal perils and intense discomfort ... ",
              recommendation: "For lovers of Extreme Jobs"
            },
            {
              state: "default",
              series: "Ace of Cakes",
              description:
                "Duff Goldman is a pastry-decorating virtuoso. Goldman and team turn out cakes that are works of art.",
              recommendation: "For lovers of Food"
            },
            {
              state: "default",
              series: "Iron Chef America",
              description:
                'Based upon the format of the original Japanese version of "Iron Chef," the series features a kitchen ...',
              recommendation: "For lovers of Food"
            }
          ]
        }
      ]
    },
    browse: {
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
      contentHeight: 0,
      navigation: [
        {
          id: 0,
          type: "navigation",
          sub_type: "network",
          current_item: 0,
          left: 0,
          content: [
            { id: "sec-0", name: "nav item 1", state: "active" },
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
          type: "navigation",
          sub_type: "tertiary",
          current_item: 0,
          left: 0,
          offsets: [],
          content: [
            {
              id: "ter-0",
              state: "active",
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
        }
      ],
      components: [
        {
          id: 0,
          type: "grid",
          sub_type: "show",
          current_item: 0,
          current_row: 0,
          focusDelay: 0,
          gap: 16,
          local: {
            id: 0,
            type: "rail",
            sub_type: "show",
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
        }
      ]
    }
  }
});

export const showsStore = createStore({
  results: [
    {
      title: "Property Brothers",
      description:
        "The Property Brothers are determined to help couples find, buy and transform extreme fixer-uppers ...",
      background: "#751E01",
      image: "../Assets/show-art/hgtv-property-brothers-show-art.jpg"
    },
    {
      title: "LA Ink",
      description:
        "Kat Von D returns home to Los Angeles to realize her dream of opening her own tattoo shop. ...",
      recommendation: "For lovers of Unique Lifestyles",
      background: "#000",
      image:
        "https://us1-prod-images.disco-api.com/2020/06/02/d9660f6c-ed25-3cc7-b217-4c65e19b2718.jpeg?bf=0&f=jpg&p=true&q=85&w=640"
    },
    {
      title: "Say Yes to the Dress America",
      description:
        'Part bridal story, part fashion makeover and part family therapy session, each "Say Yes to the Dress" episode looks ...',
      recommendation: "For lovers of Weddings",
      background: "#000",
      image:
        "https://us1-prod-images.disco-api.com/2020/07/14/00aa181e-92f8-3f6f-bbde-f1f7fecad3b4.jpeg?bf=0&f=jpg&p=true&q=85&w=640"
    },
    {
      title: "Iron Chef America",
      description:
        'Based upon the format of the original Japanese version of "Iron Chef," the series features a kitchen ...',
      recommendation: "For lovers of Food",
      background: "#2B475C",
      image:
        "https://us1-prod-images.disco-api.com/2020/07/05/e75f9b01-8707-3056-a823-6d0178e9377f.jpeg?bf=0&f=jpg&p=true&q=85&w=640"
    },
    {
      title: "Chopped",
      description:
        "Four chefs call on their culinary skills as they face off against one another to prepare a spectacular ...",
      recommendation: "For lovers of Food",
      background: "#996643",
      image:
        "https://us1-prod-images.disco-api.com/2020/07/04/83179318-01ed-3bb0-8355-25efe6689808.jpeg?bf=0&f=jpg&p=true&q=85&w=640"
    },
    {
      title: "DC Cupcakes",
      description:
        "The sweet smell of success for sisters and business partners Sophie LaMontagne and Katherine Kallinis comes from ...",
      recommendation: "For lovers of Food",
      background: "#000",
      image:
        "https://us1-prod-images.disco-api.com/2020/07/13/d57c1bcf-eaef-33f0-a294-7c56cee11940.jpeg?bf=0&f=jpg&p=true&q=85&w=640"
    },
    {
      title: "Leah Remini: It's All Relative",
      description:
        "The reality series shows the actress is still a neighbourhood girl at heart, but she now lives in Los Angeles, ...",
      recommendation: "For lovers of Celebrities & Royals",
      background: "#000",
      image:
        "https://us1-prod-images.disco-api.com/2020/06/02/ba06a2b0-1c8f-3055-9605-281af59c7bbb.jpeg?bf=0&f=jpg&p=true&q=85&w=640"
    },
    {
      title: "Ace of Cakes",
      description:
        "Duff Goldman is a pastry-decorating virtuoso. Goldman and team turn out cakes that are works of art.",
      recommendation: "For lovers of Food",
      background: "#3B595C",
      image:
        "https://us1-prod-images.disco-api.com/2020/07/03/05e64f62-71f3-369c-83c0-7c0d85c1fe12.jpeg?bf=0&f=jpg&p=true&q=85&w=640"
    },
    {
      title: "90 Day Fiancé",
      description:
        "Long-distance relationships have challenges that are sometimes difficult to overcome but ...",
      recommendation: "For lovers of Dating & Relationships",
      background: "#5C282D",
      image:
        "https://us1-prod-images.disco-api.com/2020/06/02/897d7e6e-c247-3219-8a84-6e19add85cc9.jpeg?bf=0&f=jpg&p=true&q=85&w=640"
    },
    {
      title: "Dr. Pimple Popper",
      description:
        "Her actual name is Sandra Lee, but she is so popular in her field of dermatology that she ...",
      recommendation: "For lovers of Medical Marvels",
      background: "#135663",
      image:
        "https://us1-prod-images.disco-api.com/2020/06/30/69e79dd0-530e-31c8-b986-1ffa18b74274.jpeg?bf=0&f=jpg&p=true&q=85&w=640"
    },
    {
      title: "Alaskan Bush People",
      description:
        "The Browns live in the Copper River Valley, where temperatures can drop to 60 degrees below zero ...",
      recommendation: "For lovers of Extreme Families",
      background: "#181714",
      image:
        "https://us1-prod-images.disco-api.com/2020/06/30/ea700213-f707-3282-b490-85702f3e9ed6.jpeg?bf=0&f=jpg&p=true&q=85&w=640"
    },
    {
      title: "Crikey! It's the Irwins",
      description:
        "Carrying on late wildlife conservationist Steve Irwin's mission to bring people closer to animals ...",
      recommendation: "For lovers of Zoo's And Aquariums",
      background: "#175E59",
      image:
        "https://us1-prod-images.disco-api.com/2020/07/28/22431857-3831-372f-bbcf-5f6ecb4fc263.jpeg?bf=0&f=jpg&p=true&q=85&w=640"
    },
    {
      title: "Deadliest Catch",
      description:
        "Check out this gripping documentary series, revealing the mortal perils and intense discomfort ... ",
      recommendation: "For lovers of Extreme Jobs",
      background: "#782525",
      image:
        "https://us1-prod-images.disco-api.com/2020/07/13/44e19b0f-9154-33da-a180-45ae331c9bf1.jpeg?bf=0&f=jpg&p=true&q=85&w=640"
    },
    {
      title: "My Big Fat Fabulous Life",
      description:
        "Feeling trapped in a big body, she struggled with self-doubt and negative stereotypes. ... ",
      recommendation: "For lovers of Unique Lifestyles",
      background: "#000",
      image:
        "https://us1-prod-images.disco-api.com/2020/06/29/d3223917-daf7-3194-bfc8-b7576e40c3c4.jpeg?bf=0&f=jpg&p=true&q=85&w=640"
    },
    {
      title: "Battlebots",
      description:
        "The epic robot-fighting series returns for Season 4. It features the biggest, baddest ...",
      recommendation: "For lovers of Science & Technology",
      background: "#083048",
      image:
        "https://us1-prod-images.disco-api.com/2020/07/02/9bad547e-88e7-36af-9430-2f085be3ebef.jpeg?bf=0&f=jpg&p=true&q=85&w=640"
    },
    {
      title: "Four Weddings",
      description:
        "Every bride hopes her big day is spectacular and she works hard to make it the best possible wedding ...",
      recommendation: "For lovers of Dating & Relationships",
      background: "#873849",
      image:
        "https://us1-prod-images.disco-api.com/2020/06/02/68ec44c0-c269-3bd3-8232-788ac9ffb4e3.jpeg?bf=0&f=jpg&p=true&q=85&w=640"
    },
    {
      title: "Gypsy Sisters",
      description:
        "Follows the roller-coaster lives of the Stanleys, a loud and proud clan from West Virginia ...",
      recommendation: "For lovers of Unique Lifestyles",
      background: "#AE3D64",
      image:
        "https://us1-prod-images.disco-api.com/2020/06/15/ad52e26b-f500-3d2a-bcd1-ed1c8ba116b7.jpeg?bf=0&f=jpg&p=true&q=85&w=640"
    },
    {
      title: "Little People Big World",
      description:
        "Matt and Amy Roloff, both 4 feet tall, face a variety of challenges in raising their four children ...",
      recommendation: "For lovers of Intriguing Families",
      background: "#8D0F0F",
      image:
        "https://us1-prod-images.disco-api.com/2020/06/02/cffea374-ca52-39b8-b527-457275c2cede.jpeg?bf=0&f=jpg&p=true&q=85&w=640"
    }
  ]
});
