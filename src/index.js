import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import debounce from "lodash/debounce";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft
} from "@fortawesome/free-solid-svg-icons";

const ButtonGroup = styled.div`
  width: 100%;
  display: flex;
  position: absolute;
  top: 50%;
`;
const Button = styled.button`
  opacity: 0;
  padding: 0.8rem 1.2rem;
  border: 2px solid gray;
  outline: none;
  transform: translateY(-50%);
  transition: all 0.2s linear;
  :hover {
    border-color: black;
  }
`;
const ButtonLeft = styled(Button)`
  display: ${({ canScrollLeft }) => (canScrollLeft ? `block` : `none`)};
  margin-right: auto;
`;
const ButtonRight = styled(Button)`
  display: ${({ canScrollRight }) => (canScrollRight ? `block` : `none`)};
  margin-left: auto;
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
  margin-bottom: 1rem;
  position: relative;
  display: flex;
  justify-content: center;
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

    // calculate margin of single element
    let nodeStyle = window.getComputedStyle(children[0]);
    let mr = nodeStyle.marginRight;
    let ml = nodeStyle.marginLeft;
    let marginRight = mr.substring(0, mr.length - 2);
    let marginLeft = ml.substring(0, ml.length - 2);

    let singleChildrenMargin = +marginRight + +marginLeft;

    let sizeOfFullItems =
      fullItems * (children[0].clientWidth + singleChildrenMargin);

    if (!canScrollRight) {
      let distance = sizeOfFullItems - (clientWidth - sizeOfFullItems) -
        singleChildrenMargin;
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
