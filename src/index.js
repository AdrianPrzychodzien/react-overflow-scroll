import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import debounce from "lodash/debounce";

const ButtonGroup = styled.div`
  width: 100%;
  height: 0px;
  display: flex;
  position: absolute;
  top: 50%;
`;
const Button = styled.button`
  height: 40px;
  opacity: 1;
  border: 2px solid gray;
  padding: 0.8rem 1.2rem;
  outline: none;
  transform: translateY(-50%);
  transition: all 0.2s linear;
  :hover {
    border-color: black;
  }
`;
const ButtonLeft = styled(Button)`
  display: ${({ canScrollLeft }) => canScrollLeft ? `block` : `none`};
  margin-right: auto;
`;
const ButtonRight = styled(Button)`
  display: ${({ canScrollRight }) => canScrollRight ? `block` : `none`};
  margin-left: auto;
`;
const Arrow = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  transform: scale(1.5, 2);
`
const SliderContainer = styled.div`
  ::-webkit-scrollbar {
    width: 0px;
  };
  scrollbar-width: none;
  -ms-overflow-style: none;
  display: flex;
  overflow: auto;
  transition: all 0.3s;
  ${({ active }) => active.active ? `transform: scale(${active.scale})` : ``};
  cursor: ${({ withGrab }) => withGrab ? `grabbing` : `pointer`};
  ${({ withGrab }) => withGrab ? `cursor: -webkit-grabbing` : ``};
`
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
`
const DotsGroup = styled.div`
  display: flex;
  justify-content: center;
  color: black;
   ${({ slide }) => slide ?
    `&:nth-child(2) div {
      &:nth-child(${slide}) {
      transition: all 0.3s linear;
      transform: scale(1.5)
    }
  }` : null
  }
`
const Dot = styled.div`
  margin-right: 10px;
  &::after {
    content: "";
    display: block;
    width: 15px;
    height: 15px;
    background: black;
    border-radius: 50%;
    border: 2px solid black
  }
`

const Slider = ({
  sliderStyle, buttonsStyle,
  data,
  withArrows = true, withGrab = false, withDots = false,
  scrollBy, scrollToClick = false, scrollToChild,
  withScale = 'md'
}) => {
  const [arrows, setArrows] = useState(withArrows)
  const [hasOverflow, setHasOverflow] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [dots, setDots] = useState();
  const [slide, setSlide] = useState(1)
  const [active, setActive] = useState()
  const [actualDistanceFromLeft, setActualDistanceFromLeft] = useState(0)

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

  useEffect(() => {
    const howManyDots = () => {
      const { children, clientWidth } = container.current;
      let fullItems = Math.floor(clientWidth / children[0].clientWidth);

      if (scrollBy !== undefined) {
        const dotsNumber = Math.ceil(data.length / scrollBy);
        setDots(dotsNumber)
      } else {
        const dotsNumber = Math.ceil(data.length / fullItems);
        setDots(dotsNumber)
      }
    }

    howManyDots()
  }, [])

  useEffect(() => {
    let slider = container.current
    let isDown = false;
    let startX;
    let scrollLeftLocal;

    slider.addEventListener('mousedown', e => {
      e.preventDefault()
      isDown = true
      setArrows(false)
      setActive(true)
      startX = e.pageX - slider.offsetLeft
      scrollLeftLocal = slider.scrollLeft
    })
    slider.addEventListener('mouseleave', e => {
      isDown = false
      setArrows(true)
      setActive(false)
    })
    slider.addEventListener('mouseup', e => {
      isDown = false
      setArrows(true)
      setActive(false)
    })
    slider.addEventListener('mousemove', e => {
      if (!isDown) return
      e.preventDefault()
      const x = e.pageX - slider.offsetLeft
      const walk = (x - startX) * 3 // scroll-fast
      slider.scrollLeft = scrollLeftLocal - walk

      setActualDistanceFromLeft(scrollLeftLocal - walk)
      returnActualSlide(scrollLeftLocal - walk)
    })
  }, [])

  useEffect(() => {
    if (scrollToClick) {
      scrollToChildProp(scrollToChild)
    }
  }, [scrollToClick])

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

  const changeSlideAfterClick = (distance, e) => {
    setActualDistanceFromLeft(actualDistanceFromLeft + distance)

    // right button click
    if (distance >= 0) {
      setButtonDisabled(true)
      returnActualSlide(actualDistanceFromLeft + distance)
      setActualDistanceFromLeft(actualDistanceFromLeft + distance)
    }
    // left button click
    if (distance < 0) {
      setButtonDisabled(true)
      setSlide(slide - 1)
    }

    container.current.scrollBy({ left: distance, behavior: "smooth" });
    setTimeout(() => setButtonDisabled(false), 500)
  }

  const scrollToChildProp = scrollBy => {
    let slider = container.current
    const { children } = container.current;
    const { singleChildMargin } = sizeOfFullItemsAndSingleMargin()

    let distance = (scrollBy - 1) * (children[0].clientWidth + singleChildMargin);
    let moveSliderBy = distance - slider.scrollLeft
    container.current.scrollBy({ left: moveSliderBy, behavior: "smooth" });

    returnActualSlide(distance)
    setActualDistanceFromLeft(distance)
  }

  const sizeOfFullItemsAndSingleMargin = () => {
    const { children, clientWidth } = container.current;
    let fullItems = Math.floor(clientWidth / children[0].clientWidth);

    // calculate margin of single element
    let nodeStyle = window.getComputedStyle(children[0]);
    let mr = nodeStyle.marginRight;
    let ml = nodeStyle.marginLeft;
    let marginRight = mr.substring(0, mr.length - 2);
    let marginLeft = ml.substring(0, ml.length - 2);

    let singleChildMargin = +marginRight + +marginLeft;

    let sizeOfFullItems =
      fullItems * (children[0].clientWidth + singleChildMargin);

    if (scrollBy !== undefined) {
      let sizeOfFullItems =
        scrollBy * (children[0].clientWidth + singleChildMargin);
      return { sizeOfFullItems, singleChildMargin, scrollBy }
    }

    return { sizeOfFullItems, singleChildMargin, fullItems }
  }

  const scrollDistance = (scrollBy) => {
    const { children, clientWidth } = container.current;
    const { sizeOfFullItems, singleChildMargin } = sizeOfFullItemsAndSingleMargin()

    // if there is scrollBy prop
    if (scrollBy) {
      let userScrollBy = scrollBy * (children[0].clientWidth + singleChildMargin)

      if (!canScrollRight) {
        return sizeOfFullItems - (clientWidth - userScrollBy) - singleChildMargin;
      }

      return userScrollBy
    }

    if (!canScrollRight) {
      let distance = sizeOfFullItems - (clientWidth - sizeOfFullItems) - singleChildMargin
      return distance
    }

    return sizeOfFullItems;
  };

  const returnScale = size => {
    switch (size) {
      case 'xs':
        return 0.9;
      case 'sm':
        return 0.95;
      case 'md':
        return 1;
      case 'lg':
        return 1.05;
      case 'xl':
        return 1.1
      default:
        return 1
    }
  }

  const returnActualSlide = distance => {
    const { scrollWidth, clientWidth } = container.current;
    const { sizeOfFullItems } = sizeOfFullItemsAndSingleMargin()
    let sliderSize = scrollWidth - clientWidth

    if (distance <= sliderSize) {
      if (distance <= 0) {
        setSlide(1)
      } else if (distance <= sizeOfFullItems) {
        setSlide(2)
      } else if (distance > sizeOfFullItems && distance <= sizeOfFullItems * 2) {
        setSlide(3)
      } else if (distance > sizeOfFullItems * 2 && distance <= sizeOfFullItems * 3) {
        setSlide(4)
      } else if (distance > sizeOfFullItems * 3 && distance <= sizeOfFullItems * 4) {
        setSlide(5)
      } else if (distance > sizeOfFullItems * 4 && distance <= sizeOfFullItems * 5) {
        setSlide(6)
      } else if (distance > sizeOfFullItems * 5 && distance <= sizeOfFullItems * 6) {
        setSlide(7)
      } else if (distance > sizeOfFullItems * 6 && distance <= sizeOfFullItems * 7) {
        setSlide(8)
      } else if (distance > sizeOfFullItems * 7 && distance <= sizeOfFullItems * 8) {
        setSlide(9)
      }
    } else {
      return
    }
  }

  const returnArrow = direction => direction === 'left' ? '<' : '>'

  return (
    <>
      <StyledSlider>
        <SliderContainer
          style={sliderStyle}
          active={{ active, scale: returnScale(withScale) }}
          withGrab={withGrab}
          ref={container}
        >
          {data}
        </SliderContainer>
        {withArrows && (
          <ButtonGroup>
            <ButtonLeft
              style={buttonsStyle}
              disabled={buttonDisabled}
              canScrollLeft={canScrollLeft}
              onClick={e => changeSlideAfterClick(-scrollDistance(scrollBy), e)}
            >
              <Arrow>{returnArrow('left')}</Arrow>
            </ButtonLeft>
            <ButtonRight
              style={buttonsStyle}
              disabled={buttonDisabled}
              canScrollRight={canScrollRight}
              onClick={e => changeSlideAfterClick(scrollDistance(scrollBy), e)}
            >
              <Arrow>{returnArrow('right')}</Arrow>
            </ButtonRight>
          </ButtonGroup>
        )}
      </StyledSlider>
      {withDots && (
        <DotsGroup slide={slide} >
          {[...Array(dots).keys()].map(dot => {
            return <Dot key={dot}></Dot>
          })}
        </DotsGroup>
      )}
    </>
  );
};

export default Slider;