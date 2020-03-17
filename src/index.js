import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import debounce from "lodash/debounce";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft
} from "@fortawesome/free-solid-svg-icons";

const ButtonGroup = styled.div`
  textalign: center;
  position: relative;
`;
const Button = styled.button`
  position: absolute;
  top: -260px;
  opacity: 0;
  padding: 0.8rem 1.2rem;
  border: 2px solid gray;
  outline: none;
  transition: all 0.2s linear;
  :hover {
    border-color: black;
  }
`;
const ButtonLeft = styled(Button)`
  left: 0px;
  display: ${({ canScrollLeft }) => (canScrollLeft ? `block` : `none`)};
`;
const ButtonRight = styled(Button)`
  right: 0px;
  display: ${({ canScrollRight }) => (canScrollRight ? `block` : `none`)};
`;

const SliderContainer = styled.div`
  ::-webkit-scrollbar {
    width: 0px;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
  display: flex;
  overflow: auto;
`;

const StyledSlider = styled.div`
  display: block;
  margin-bottom: 1rem;
  :hover ${ButtonRight} {
    opacity: 0.7;
  }
  :hover ${ButtonLeft} {
    opacity: 0.7;
  }
`;

const Slider = ({ children, withArrows = true }) => {
  const [hasOverflow, setHasOverflow] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const container = useRef(null);

  useEffect(() => {
    checkForOverflow();
    checkForScrollPosition();

    container.current.addEventListener(
      "scroll",
      debounceCheckForScrollPosition
    );

    return () => {
      container.current.removeEventListener(
        "scroll",
        debounceCheckForScrollPosition
      );
      debounceCheckForOverflow.cancel();
    };
  }, [children]);

  const checkForScrollPosition = () => {
    const { scrollLeft, scrollWidth, clientWidth } = container.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft !== scrollWidth - clientWidth);
  };

  const checkForOverflow = () => {
    const { scrollWidth, clientWidth } = container.current;
    const hasOverflow = scrollWidth > clientWidth;
    setHasOverflow(hasOverflow);
  };

  const debounceCheckForOverflow = debounce(checkForOverflow, 200);
  const debounceCheckForScrollPosition = debounce(checkForScrollPosition, 200);

  const scrollContainerBy = distance => {
    container.current.scrollBy({ left: distance, behavior: "smooth" });
  };

  const scrollDistance = () => {
    const { children, clientWidth } = container.current;
    let fullItems = Math.floor(clientWidth / children[0].clientWidth);

    let sizeOfFullItems = fullItems * (children[0].clientWidth + 8); // margin 8px
    console.log(children);
    if (!canScrollRight) {
      let distance = sizeOfFullItems - (clientWidth - sizeOfFullItems);
      return distance;
    }
    return sizeOfFullItems;
  };

  return (
    <StyledSlider>
      <SliderContainer ref={container}>{children}</SliderContainer>
      {withArrows && (
        <ButtonGroup>
          <ButtonLeft
            canScrollLeft={canScrollLeft}
            onClick={() => scrollContainerBy(-scrollDistance())}
          >
            <FontAwesomeIcon icon={faChevronLeft} size="lg" />
          </ButtonLeft>
          <ButtonRight
            canScrollRight={canScrollRight}
            onClick={() => scrollContainerBy(scrollDistance())}
          >
            <FontAwesomeIcon icon={faChevronRight} size="lg" />
          </ButtonRight>
        </ButtonGroup>
      )}
    </StyledSlider>
  );
};

export default Slider;
