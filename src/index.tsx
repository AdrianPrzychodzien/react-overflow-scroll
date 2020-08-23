import React, { useState, useEffect, useRef, MutableRefObject } from "react";
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
  opacity: 0;
  border: 2px solid gray;
  padding: 0.8rem 1.2rem;
  outline: none;
  transform: translateY(-50%);
  transition: all 0.2s linear;
  :hover {
    border-color: black;
  }
`;
interface IButtonLeft {
  canScrollLeft: boolean;
}
const ButtonLeft = styled(Button)<IButtonLeft>`
  display: ${({ canScrollLeft }) => (canScrollLeft ? "block" : "none")};
  margin-right: auto;
`;
interface IButtonRight {
  canScrollRight: boolean;
}
const ButtonRight = styled(Button)<IButtonRight>`
  display: ${({ canScrollRight }) => (canScrollRight ? "block" : "none")};
  margin-left: auto;
`;
const Arrow = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  transform: scale(1.5, 2);
`;
interface ISliderContainer {
  scale: number | null;
  withGrab: boolean;
}
const SliderContainer = styled.div<ISliderContainer>`
  ::-webkit-scrollbar {
    width: 0px;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
  display: flex;
  overflow: auto;
  transition: all 0.3s;
  ${({ scale }) => (scale ? `transform: scale(${scale})` : ``)};
  cursor: ${({ withGrab }) => (withGrab ? `grabbing` : `pointer`)};
  ${({ withGrab }) => (withGrab ? `cursor: -webkit-grabbing` : ``)};
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
const DotsGroup = styled.div`
  display: flex;
  justify-content: center;
  color: black;
  ${(props: { slide: number }) =>
    props.slide
      ? `&:nth-child(2) div {
    &:nth-child(${props.slide}) {
    transition: all 0.3s linear;
    transform: scale(1.5)
  }
}`
      : null}
`;
const Dot = styled.div`
  margin-right: 10px;
  &::after {
    content: "";
    display: block;
    width: 15px;
    height: 15px;
    background: black;
    border-radius: 50%;
    border: 2px solid black;
  }
`;
interface ISizeOfFullItemsAndSingleMargin {
  sizeOfFullItems: number;
  singleChildMargin: number;
  fullItems: number;
  scrollBy: number;
}
type IScale = "xs" | "sm" | "md" | "lg" | "xl";
interface ISlider {
  data: any;
  sliderStyle?: any;
  buttonsStyle?: any;
  withArrows?: boolean;
  withGrab: boolean;
  withDots: boolean;
  arrowLeft?: any;
  arrowRight?: any;
  scrollBy?: number;
  scrollToClick?: boolean;
  scrollToChild?: number;
  withScale?: IScale;
  withAuto?: boolean;
}
const Slider = ({
  data,
  sliderStyle,
  buttonsStyle,
  withArrows = true,
  withGrab = false,
  withDots = false,
  arrowLeft,
  arrowRight,
  scrollBy = 0,
  scrollToClick = false,
  scrollToChild = 0,
  withScale = "md",
  withAuto = false
}: ISlider) => {
  // const [arrows, setArrows] = useState(withArrows);
  const [hasOverflow, setHasOverflow] = useState<boolean>(false);
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(false);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const [dots, setDots] = useState<number>(0);
  const [slide, setSlide] = useState<number>(1);
  const [active, setActive] = useState<boolean>();
  const [actualDistanceFromLeft, setActualDistanceFromLeft] = useState<number>(
    0
  );
  const [intervalID, setIntervalID] = useState<any>();

  const container = useRef<HTMLDivElement>(null) as MutableRefObject<
    HTMLDivElement
  >;

  useEffect(() => {
    setTimeout(() => {
      howManyDots();
    }, 0);
  }, [data.length, scrollBy]);

  useEffect(() => {
    const { fullItems } = sizeOfFullItemsAndSingleMargin(container, scrollBy);
    let images: any[] = Array.from(container.current.querySelectorAll("img"));
    const items = fullItems || 5;
    const scrollByLazy = scrollBy;

    // obrazki, które widać w slajderze dostają atrybut src, a reszta ma data-src
    for (let img in images) {
      if (!images[img].dataset.src) {
        images[img].dataset.src = images[img].src;
        images[img].removeAttribute("src");
      }
      if (scrollBy && +img <= scrollByLazy) {
        images[img].src = images[img].dataset.src;
      }
      if (+img < scrollToChild + fullItems) {
        images[img].src = images[img].dataset.src;
      }
      if (withAuto && +img <= items) {
        images[img].src = images[img].dataset.src;
      }
      if (+img <= items) {
        images[img].src = images[img].dataset.src;
      }
    }

    // obrazki, które niedługo pojawią się w slajderze dostają atrybut src
    for (let img in images) {
      if (
        withAuto &&
        +img >= fullItems * slide &&
        +img <= fullItems * slide + fullItems
      ) {
        images[img].src = images[img].dataset.src;
      } else if (scrollToChild && +img <= +scrollToChild + 1) {
        images[img].src = images[img].dataset.src;
      } else if (
        scrollBy &&
        +img >= scrollByLazy * slide &&
        +img < scrollByLazy * slide + scrollByLazy
      ) {
        images[img].src = images[img].dataset.src;
      } else if (
        +img >= fullItems * slide &&
        +img <= fullItems * slide + fullItems
      ) {
        images[img].src = images[img].dataset.src;
      }
    }
  }, [slide]);

  useEffect(() => {
    const slider = container.current;
    checkForOverflow();
    checkForScrollPosition();
    moveItemsAutomatically();

    slider.addEventListener("scroll", debounceCheckForScrollPosition);

    return () => {
      slider.removeEventListener("scroll", debounceCheckForScrollPosition);
      debounceCheckForOverflow.cancel();
    };
  }, []);

  useEffect(() => {
    const slider = container.current;
    let isDown = false;
    let startX: number;
    let scrollLeftLocal: number;

    slider.addEventListener("mousedown", (e) => {
      e.preventDefault();
      isDown = true;
      // setArrows(false);
      setActive(true);

      startX = e.pageX - slider.offsetLeft;
      scrollLeftLocal = slider.scrollLeft;
    });
    slider.addEventListener("mouseleave", () => {
      isDown = false;
      // setArrows(true);
    });
    slider.addEventListener("mouseup", () => {
      isDown = false;
      // setArrows(true);
      setActive(false);
    });
    slider.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 3; // scroll-fast
      const distance = scrollLeftLocal - walk;
      slider.scrollLeft = distance;

      setActualDistanceFromLeft(distance);
      returnActualSlide(distance);
    });

    // mobile
    slider.addEventListener("touchstart", (e) => {
      e.preventDefault();
      isDown = true;

      startX = e.changedTouches[0].pageX - slider.offsetLeft;
      scrollLeftLocal = slider.scrollLeft;
    });
    slider.addEventListener("touchmove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.changedTouches[0].pageX - slider.offsetLeft;
      const walk = (x - startX) * 3; // scroll-fast
      const distance = scrollLeftLocal - walk;
      slider.scrollLeft = distance;

      setActualDistanceFromLeft(distance);
      returnActualSlide(distance);
    });
  }, []);

  useEffect(() => {
    if (scrollToClick && scrollToChild) {
      scrollToChildProp(scrollToChild);
    }
  }, [scrollToClick]);

  useEffect(() => {
    if (!active) {
      clearInterval(intervalID);
    }
  }, [active]);

  const moveItemsAutomatically = () => {
    const { children } = container.current;
    const { singleChildMargin } = sizeOfFullItemsAndSingleMargin(
      container,
      scrollBy
    );
    const singleItem = children[0].clientWidth + singleChildMargin;

    if (withAuto) {
      const sliderInterval = setInterval(() => {
        const distance = container.current.scrollLeft + singleItem;
        returnActualSlide(distance);
        setActualDistanceFromLeft(distance);
        container.current.scrollBy({ left: singleItem, behavior: "smooth" });
      }, 1500);

      setIntervalID(sliderInterval);
    }
  };

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

  const changeSlideAfterClick = (distance: number, e: React.MouseEvent) => {
    const newDistance = actualDistanceFromLeft + distance;

    setActualDistanceFromLeft(newDistance);
    clearInterval(intervalID);

    // right button click
    if (distance >= 0) {
      setButtonDisabled(true);
      returnActualSlide(newDistance, e);
      setActualDistanceFromLeft(newDistance);
    }
    // left button click
    if (distance < 0) {
      setButtonDisabled(true);
      setSlide(slide - 1);
    }

    container.current.scrollBy({ left: distance, behavior: "smooth" });
    setTimeout(() => setButtonDisabled(false), 500);
  };

  const scrollToChildProp = (childNumber: number) => {
    const { children } = container.current;
    const { singleChildMargin } = sizeOfFullItemsAndSingleMargin(
      container,
      scrollBy
    );

    const distance =
      (childNumber - 1) * (children[0].clientWidth + singleChildMargin);
    container.current.scroll({ left: distance, behavior: "smooth" });

    clearInterval(intervalID);
    returnActualSlide(distance);
    setActualDistanceFromLeft(distance);
  };

  const sizeOfFullItemsAndSingleMargin = (
    container: any,
    scrollBy: number
  ): ISizeOfFullItemsAndSingleMargin => {
    const { children, clientWidth } = container.current;
    const fullItems = Math.floor(clientWidth / children[0].clientWidth);

    // calculate margin of single element
    const nodeStyle = window.getComputedStyle(children[0]);
    const mr = nodeStyle.marginRight;
    const ml = nodeStyle.marginLeft;
    const marginRight = mr.substring(0, mr.length - 2);
    const marginLeft = ml.substring(0, ml.length - 2);

    const singleChildMargin = +marginRight + +marginLeft;

    const sizeOfFullItems =
      fullItems * (children[0].clientWidth + singleChildMargin);

    if (scrollBy > 1) {
      const sizeOfFullItems =
        scrollBy * (children[0].clientWidth + singleChildMargin);
      return { sizeOfFullItems, singleChildMargin, fullItems, scrollBy };
    }

    return { sizeOfFullItems, singleChildMargin, fullItems, scrollBy };
  };

  const scrollDistance = (scrollBy: number) => {
    const { children, clientWidth } = container.current;
    const {
      sizeOfFullItems,
      singleChildMargin
    } = sizeOfFullItemsAndSingleMargin(container, scrollBy);

    // if there is scrollBy prop
    if (scrollBy) {
      const userScrollBy =
        scrollBy * (children[0].clientWidth + singleChildMargin);

      if (!canScrollRight) {
        return (
          sizeOfFullItems - (clientWidth - userScrollBy) - singleChildMargin
        );
      }

      return userScrollBy;
    }

    if (!canScrollRight) {
      const distance =
        sizeOfFullItems - (clientWidth - sizeOfFullItems) - singleChildMargin;
      return distance;
    }

    return sizeOfFullItems;
  };

  const returnScale = (size: IScale) => {
    switch (size) {
      case "xs":
        return 0.9;
      case "sm":
        return 0.95;
      case "md":
        return 1;
      case "lg":
        return 1.05;
      case "xl":
        return 1.1;
      default:
        return 1;
    }
  };

  const returnActualSlide = (distance: number, e?: React.MouseEvent) => {
    const { scrollWidth, clientWidth } = container.current;
    const { sizeOfFullItems } = sizeOfFullItemsAndSingleMargin(
      container,
      scrollBy
    );
    const sliderSize = scrollWidth - clientWidth;

    const images: any[] = Array.from(container.current.querySelectorAll("img"));

    if (e) {
      // case button click
      if (distance > sliderSize) {
        setSlide(dots);
      }
    }

    if (distance < sliderSize) {
      for (let i = 0; i <= images.length; i++) {
        if (distance <= 0) {
          setSlide(1);
        }
        if (
          distance > sizeOfFullItems * i &&
          distance <= sizeOfFullItems * (i + 1)
        ) {
          setSlide(i + 2);
        }
      }
    } else if (distance > sliderSize) {
      // case mouse grab
      return;
    }
  };

  const returnArrow = (direction: "left" | "right") =>
    direction === "left" ? "<" : ">";

  const howManyDots = () => {
    const { fullItems } = sizeOfFullItemsAndSingleMargin(
      container,
      scrollBy
    ) as any;

    if (scrollBy > 1) {
      const dotsNumber = Math.ceil(data.length / scrollBy);
      if (fullItems - scrollBy > 4) {
        // because can`t scroll last slide more than 1
        return setDots(dotsNumber - 3);
      } else if (fullItems - scrollBy > 2) {
        return setDots(dotsNumber - 2);
      } else if (fullItems - scrollBy <= 2) {
        return setDots(dotsNumber - 1);
      }
      setDots(dotsNumber);
    } else {
      const dotsNumber = Math.ceil(data.length / fullItems);
      setDots(dotsNumber);
    }
  };

  const handleDotClick = (index: number, e: React.MouseEvent) => {
    const { sizeOfFullItems } = sizeOfFullItemsAndSingleMargin(
      container,
      scrollBy
    );
    const distance = sizeOfFullItems * index;

    clearInterval(intervalID);
    setActualDistanceFromLeft(distance);
    returnActualSlide(distance, e);

    container.current.scroll({ left: distance, behavior: "smooth" });
  };

  return (
    <>
      <StyledSlider>
        <SliderContainer
          style={sliderStyle}
          scale={active ? returnScale(withScale) : null}
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
              onClick={(e: React.MouseEvent) =>
                changeSlideAfterClick(-scrollDistance(scrollBy), e)
              }
            >
              <Arrow>{arrowLeft ? arrowLeft : returnArrow("left")}</Arrow>
            </ButtonLeft>
            <ButtonRight
              style={buttonsStyle}
              disabled={buttonDisabled}
              canScrollRight={canScrollRight}
              onClick={(e: React.MouseEvent) =>
                changeSlideAfterClick(scrollDistance(scrollBy), e)
              }
            >
              <Arrow>{arrowRight ? arrowRight : returnArrow("right")}</Arrow>
            </ButtonRight>
          </ButtonGroup>
        )}
      </StyledSlider>
      {withDots && dots && (
        <DotsGroup slide={slide}>
          {[...Array(dots).keys()].map((dot, index) => (
            <Dot
              key={dot}
              onClick={(e: React.MouseEvent) => handleDotClick(index, e)}
            ></Dot>
          ))}
        </DotsGroup>
      )}
    </>
  );
};

export default Slider;
