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
  padding: ${({ buttonSize }) => buttonSize}
`;
const ButtonRight = styled(Button)`
  display: ${({ canScrollRight }) => (canScrollRight ? `block` : `none`)};
  margin-left: auto;
  padding: ${({ buttonSize }) => buttonSize}
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


const Slider = ({ data, withArrows = true, withGrab = false, buttonSize = '0.8rem 1.2rem', scrollBy, withDots = false }) => {
  const [arrows, setArrows] = useState(withArrows)
  const [hasOverflow, setHasOverflow] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [dots, setDots] = useState();
  const [slide, setSlide] = useState(1)

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

      const dotsNumber = Math.ceil(data.length / fullItems);
      setDots(dotsNumber)
    }

    howManyDots()
  }, [])

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
    const { sizeOfFullItems, singleChildrenMargin, fullItems } = sizeOfFullItemsAndSingleMargin()

    let slider = container.current

    // right button click
    if (distance > 0) {
      if (slider.scrollLeft <= distance - sizeOfFullItems) {
        setSlide(2)
      } else if (slider.scrollLeft <= distance) {
        setSlide(3)
      } else if (slider.scrollLeft <= distance * 2) {
        setSlide(4)
      } else if (slider.scrollLeft <= distance * 3) {
        setSlide(5)
      } else if (slider.scrollLeft <= distance * 4) {
        setSlide(6)
      } else if (slider.scrollLeft <= distance * 5) {
        setSlide(7)
      }
    }

    // left button click
    if (distance < 0) {
      let num
      if (!canScrollRight) {
        num = sizeOfFullItems - (slider.clientWidth - sizeOfFullItems) - singleChildrenMargin;
      }
      if (Math.abs(distance) === num) {
        setSlide(slide - 1)
      } else if (slider.scrollLeft) {
        setSlide(slide - 1)
      }
    }

    container.current.scrollBy({ left: distance, behavior: "smooth" });
  };

  const sizeOfFullItemsAndSingleMargin = () => {
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

    return { sizeOfFullItems, singleChildrenMargin, fullItems }
  }

  const scrollDistance = (scrollBy) => {
    const { children, clientWidth } = container.current;
    const { sizeOfFullItems, singleChildrenMargin, fullItems } = sizeOfFullItemsAndSingleMargin()

    // if there is scrollBy prop
    if (scrollBy) {
      let userScrollBy = scrollBy * (children[0].clientWidth + singleChildrenMargin)

      if (!canScrollRight) {
        return sizeOfFullItems - (clientWidth - userScrollBy) - singleChildrenMargin;
      }

      return userScrollBy
    }

    if (!canScrollRight) {
      return sizeOfFullItems - (clientWidth - sizeOfFullItems) - singleChildrenMargin;
    }

    return sizeOfFullItems;
  };

  const changeDotAfterWalk = distance => {
    const { sizeOfFullItems, singleChildrenMargin, fullItems } = sizeOfFullItemsAndSingleMargin()

    // TODO: scrollBy prop
    // TODO: disable button
    if (distance === 0) {
      setSlide(1)
    } else if (distance <= sizeOfFullItems) {
      setSlide(2)
    } else if (distance <= sizeOfFullItems * 2) {
      setSlide(3)
    } else if (distance <= sizeOfFullItems * 3) {
      setSlide(4)
    } else if (distance <= sizeOfFullItems * 4) {
      setSlide(5)
    } else if (distance <= sizeOfFullItems * 5) {
      setSlide(6)
    } else if (distance <= sizeOfFullItems * 6) {
      setSlide(7)
    }
  }

  const handleGrabbing = e => {
    let slider = container.current
    let isDown = false;
    let startX;
    let scrollLeftLocal;

    slider.addEventListener('mousedown', e => {
      e.preventDefault()
      isDown = true
      setArrows(false)
      startX = e.pageX - slider.offsetLeft
      scrollLeftLocal = slider.scrollLeft
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
      if (!isDown) return
      e.preventDefault()
      const x = e.pageX - slider.offsetLeft
      const walk = (x - startX) * 3 // scroll-fast
      slider.scrollLeft = scrollLeftLocal - walk

      changeDotAfterWalk(slider.scrollLeft)
    })
  }

  const returnArrow = direction => direction === 'left' ? '<' : '>'

  return (
    <>
      <StyledSlider>
        <SliderContainer
          withGrab={withGrab}
          onClick={withGrab ? (e => handleGrabbing(e)) : null}
          ref={container}
        >
          {data}
        </SliderContainer>
        {arrows && (
          <ButtonGroup >
            <ButtonLeft
              buttonSize={buttonSize}
              canScrollLeft={canScrollLeft}
              onClick={() => scrollContainerBy(-scrollDistance(scrollBy))}
            >
              <Arrow>{returnArrow('left')}</Arrow>
            </ButtonLeft>
            <ButtonRight
              buttonSize={buttonSize}
              canScrollRight={canScrollRight}
              onClick={() => scrollContainerBy(scrollDistance(scrollBy))}
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
