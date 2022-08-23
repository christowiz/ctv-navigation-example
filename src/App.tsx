import React, { UseEffect, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Frame } from "framer";
import "./styles.css";

// Global Store
import { useStore, pageStore } from "./Stores/Store";

// Global Navigation
import PrimaryNavigation from "./Components/PrimaryNavigation";

// Pages
import HomeATVE from "./Pages/Home/homeATVE";
import HomeDTC from "./Pages/Home/homeDTC";
import Browse from "./Pages/Browse/index";
import Show from "./Pages/Show";

// Patterns
import HomeMetadata from "./Pages/Annotation/Homepage/metadata";
import NavPatternSecondary from "./Pages/Navigation/Secondary";
import NavPatternTertiary from "./Pages/Navigation/Tertiary";

// Info
import { KeyboardInfo } from "./Components/KeyboardInfo";

// Styles
import "./styles.css";

export default function App() {
  const [store, setStore] = pageStore();

  const { current_page } = store;

  return (
    <Router>
      <div className="App">
        <Frame
          center
          width={640}
          height={360}
          background={"rgba(255,255,255,0.0125)"}
        >
          {/* pages */}
          <Switch>
            <Route exact path="/">
              <Browse />
            </Route>
            <Route exact path="/home">
              <HomeDTC />
            </Route>
            <Route exact path="/dtc/home">
              <HomeDTC />
            </Route>
            <Route exact path="/browse">
              <Browse />
            </Route>
            <Route exact path="/browse-local">
              <Browse />
            </Route>
            <Route exact path="/show">
              <Show />
            </Route>
            <Route exact path="/atve/home">
              <HomeATVE />
            </Route>
            <Route path="/patterns/home-metadata">
              <HomeMetadata />
            </Route>
            <Route path="/patterns/secondary-navigation">
              <NavPatternSecondary />
            </Route>
            <Route path="/patterns/tertiary-navigation">
              <NavPatternTertiary />
            </Route>
          </Switch>

          {current_page !== "show" && current_page !== "playlist" ? (
            <PrimaryNavigation />
          ) : null}
          <KeyboardInfo />
        </Frame>
      </div>
    </Router>
  );
}
