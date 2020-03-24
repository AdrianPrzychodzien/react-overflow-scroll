# React Overflow Scroll

![react-overflow-slider](src/assets/slider.gif)
![gotobutton](src/assets/go-to-button.gif)
![styles](src/assets/styles.gif)

## Built with react hooks, styled-components and lodash

- horizontal scrollbar
- touch support
- grabbing and clicking
- smooth scrolling
- clickable navigation dots
- universal app support
- customizable styles
- and more...

# Quick start

```node
yarn add (or npm install) --save react-overflow-scroll
```

In project:

```javascript
import React from "react";
import ReactDOM from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft
} from "@fortawesome/free-solid-svg-icons";
import Slider from "react-overflow-scroll";

const App = () => {
  let arrayItems = [...Array(19).keys()].map((el, index) => (
    <div
      style={{ height: 200, minWidth: 200, background: "#eee", margin: 8 }}
      key={index}
    >
      Lorem ipsum!
    </div>
  ));
  const arrowRight = <FontAwesomeIcon icon={faChevronRight} />;
  const arrowLeft = <FontAwesomeIcon icon={faChevronLeft} />;

  return (
    <>
      <div style={{ width: 950 }}>
        <Slider
          data={arrayItems}
          arrowLeft={arrowLeft}
          arrowRight={arrowRight}
          withGrab={true}
          withDots={true}
        />
      </div>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
```

# Properties and callbacks

| Props         |           Type            |                                             Description |
| ------------- | :-----------------------: | ------------------------------------------------------: |
| data          | Array of react components |                               Items to render in slider |
| sliderStyle   |          Object           |                                       Styles for slider |
| buttonStyle   |          Object           |                                      Styles for buttons |
| withArrows    |          Boolean          |                                 Render clickable arrows |
| withGrab      |          Boolean          |                   Allow moving slider by grabbing items |
| withDots      |          Boolean          |            Render dots that shows number ofactual slide |
| withGrab      |          Boolean          |                   Allow moving slider by grabbing items |
| withScale     |          String           |             Zoom in or zoom out items while slider move |
| arrowLeft     |      React component      |                          React component for left arrow |
| arrowRight    |      React component      |                         React component for right arrow |
| scrollToClick |          Boolean          |                      Enable scrolling to specified item |
| scrollToChild |          Number           | Which child should scroll to when ScrollToClick is true |
| scrollBy      |          Number           |                      Scroll by specific amount of items |

# Gotchas

It is not recommended to use navigation dots on mobile. The will not follow slider.
Ignore them in props because by default they are hidden or set `withDots={false}` in props.

# Usage examples
