import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import debounce from "lodash/debounce";

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
const Arrow = styled.div`
  font-weight: 600;
  transform: scale(1.5, 2)
`

const SliderContainer = styled.div`
  ::-webkit-scrollbar {
    width: 0px;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
  display: flex;
  overflow: auto;
  cursor: ${({ withGrab }) => withGrab ? `grabbing` : `pointer`};
  ${({ withGrab }) => withGrab ? `cursor: -webkit-grabbing` : ``};
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

const Slider = ({ data, withArrows = true, withGrab = false, buttonSize = '0.8rem 1.2rem' }) => {
  const [arrows, setArrows] = useState(withArrows)
  const [hasOverflow, setHasOverflow] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const container = useRef(null);

  useEffect(() => {
    const slider = container.current
    checkForOverflow();
    checkForScrollPosition();

    slider.addEventListener(
      "scroll",
      debounceCheckForScrollPosition
    );

    return () => {
      slider.removeEventListener(
        "scroll",
        debounceCheckForScrollPosition
      );
      debounceCheckForOverflow.cancel();
    };
  }, [data]);

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

  const handleGrabbing = e => {
    const slider = document.querySelector('#slider')
    let isDown = false;
    let startX;
    let scrollLeftChange;

    slider.addEventListener('mousedown', e => {
      e.preventDefault()
      isDown = true
      setArrows(false)
      startX = e.pageX - slider.offsetLeft
      scrollLeftChange = slider.scrollLeft
    })
    slider.addEventListener('mouseleave', e => {
      isDown = false
      setArrows(true)
    })
    slider.addEventListener('mouseup', e => {
      isDown = false
      setArrows(true)
    })
    slider.addEventListener('mousemove', e => {
      if (isDown) {
        e.preventDefault()
        const x = e.pageX - slider.offsetLeft
        const walk = (x - startX) * 3 // scroll-fast
        slider.scrollLeft = scrollLeftChange - walk
      }
    })
  }

  const returnArrow = direction => direction === 'left' ? '<' : '>'

  return (
    <StyledSlider>
      <SliderContainer
        withGrab={withGrab}
        onClick={withGrab ? (e => handleGrabbing(e)) : null}
        ref={container}
        id="slider"
      >
        {data}
      </SliderContainer>
      {arrows && (
        <ButtonGroup>
          <ButtonLeft
            buttonSize={buttonSize}
            canScrollLeft={canScrollLeft}
            onClick={() => scrollContainerBy(-scrollDistance())}
          >
            <Arrow>{returnArrow('left')}</Arrow>
          </ButtonLeft>
          <ButtonRight
            buttonSize={buttonSize}
            canScrollRight={canScrollRight}
            onClick={() => scrollContainerBy(scrollDistance())}
          >
            <Arrow>{returnArrow('right')}</Arrow>
          </ButtonRight>
        </ButtonGroup>
      )}
    </StyledSlider>
  );
};

export default Slider;
