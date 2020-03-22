"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _debounce = _interopRequireDefault(require("lodash/debounce"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _templateObject9() {
  var data = _taggedTemplateLiteral(["\n  margin-right: 10px;\n  &::after {\n    content: \"\";\n    display: block;\n    width: 15px;\n    height: 15px;\n    background: black;\n    border-radius: 50%;\n    border: 2px solid black\n  }\n"]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  justify-content: center;\n  color: black;\n   ", "\n"]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = _taggedTemplateLiteral(["\n  margin-bottom: 1rem;\n  position: relative;\n  display: flex;\n  justify-content: center;\n  :hover ", " {\n    opacity: 0.7;\n  }\n  :hover ", " {\n    opacity: 0.7;\n  }\n"]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _taggedTemplateLiteral(["\n  ::-webkit-scrollbar {\n    width: 0px;\n  }\n  scrollbar-width: none;\n  -ms-overflow-style: none;\n  display: flex;\n  overflow: auto;\n  cursor: ", ";\n  ", ";\n"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n  font-weight: 600;\n  transform: scale(1.5, 2)\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  display: ", ";\n  margin-left: auto;\n  padding: ", "\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  display: ", ";\n  margin-right: auto;\n  padding: ", "\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  opacity: 0;\n  border: 2px solid gray;\n  outline: none;\n  transform: translateY(-50%);\n  transition: all 0.2s linear;\n  :hover {\n    border-color: black;\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  width: 100%;\n  display: flex;\n  position: absolute;\n  top: 50%;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var ButtonGroup = _styledComponents["default"].div(_templateObject());

var Button = _styledComponents["default"].button(_templateObject2());

var ButtonLeft = (0, _styledComponents["default"])(Button)(_templateObject3(), function (_ref) {
  var canScrollLeft = _ref.canScrollLeft;
  return canScrollLeft ? "block" : "none";
}, function (_ref2) {
  var buttonSize = _ref2.buttonSize;
  return buttonSize;
});
var ButtonRight = (0, _styledComponents["default"])(Button)(_templateObject4(), function (_ref3) {
  var canScrollRight = _ref3.canScrollRight;
  return canScrollRight ? "block" : "none";
}, function (_ref4) {
  var buttonSize = _ref4.buttonSize;
  return buttonSize;
});

var Arrow = _styledComponents["default"].div(_templateObject5());

var SliderContainer = _styledComponents["default"].div(_templateObject6(), function (_ref5) {
  var withGrab = _ref5.withGrab;
  return withGrab ? "grabbing" : "pointer";
}, function (_ref6) {
  var withGrab = _ref6.withGrab;
  return withGrab ? "cursor: -webkit-grabbing" : "";
});

var StyledSlider = _styledComponents["default"].div(_templateObject7(), ButtonRight, ButtonLeft);

var DotsGroup = _styledComponents["default"].div(_templateObject8(), function (_ref7) {
  var slide = _ref7.slide;
  return slide ? "&:nth-child(2) div {\n      &:nth-child(".concat(slide, ") {\n      transition: all 0.3s linear;\n      transform: scale(1.5)\n    }\n  }") : null;
});

var Dot = _styledComponents["default"].div(_templateObject9());

var Slider = function Slider(_ref8) {
  var data = _ref8.data,
      _ref8$withArrows = _ref8.withArrows,
      withArrows = _ref8$withArrows === void 0 ? true : _ref8$withArrows,
      _ref8$withGrab = _ref8.withGrab,
      withGrab = _ref8$withGrab === void 0 ? false : _ref8$withGrab,
      _ref8$buttonSize = _ref8.buttonSize,
      buttonSize = _ref8$buttonSize === void 0 ? '0.8rem 1.2rem' : _ref8$buttonSize,
      scrollBy = _ref8.scrollBy,
      _ref8$withDots = _ref8.withDots,
      withDots = _ref8$withDots === void 0 ? false : _ref8$withDots;

  var _useState = (0, _react.useState)(withArrows),
      _useState2 = _slicedToArray(_useState, 2),
      arrows = _useState2[0],
      setArrows = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      hasOverflow = _useState4[0],
      setHasOverflow = _useState4[1];

  var _useState5 = (0, _react.useState)(false),
      _useState6 = _slicedToArray(_useState5, 2),
      canScrollLeft = _useState6[0],
      setCanScrollLeft = _useState6[1];

  var _useState7 = (0, _react.useState)(false),
      _useState8 = _slicedToArray(_useState7, 2),
      canScrollRight = _useState8[0],
      setCanScrollRight = _useState8[1];

  var _useState9 = (0, _react.useState)(),
      _useState10 = _slicedToArray(_useState9, 2),
      dots = _useState10[0],
      setDots = _useState10[1];

  var _useState11 = (0, _react.useState)(1),
      _useState12 = _slicedToArray(_useState11, 2),
      slide = _useState12[0],
      setSlide = _useState12[1];

  var container = (0, _react.useRef)(null);
  (0, _react.useEffect)(function () {
    var slider = container.current;
    checkForOverflow();
    checkForScrollPosition();
    slider.addEventListener("scroll", debounceCheckForScrollPosition);
    return function () {
      slider.removeEventListener("scroll", debounceCheckForScrollPosition);
      debounceCheckForOverflow.cancel();
    };
  }, [data]);
  (0, _react.useEffect)(function () {
    var howManyDots = function howManyDots() {
      var _container$current = container.current,
          children = _container$current.children,
          clientWidth = _container$current.clientWidth;
      var fullItems = Math.floor(clientWidth / children[0].clientWidth);
      var dotsNumber = Math.ceil(data.length / fullItems);
      setDots(dotsNumber);
    };

    howManyDots();
  }, []);

  var checkForScrollPosition = function checkForScrollPosition() {
    var _container$current2 = container.current,
        scrollLeft = _container$current2.scrollLeft,
        scrollWidth = _container$current2.scrollWidth,
        clientWidth = _container$current2.clientWidth;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft !== scrollWidth - clientWidth);
  };

  var checkForOverflow = function checkForOverflow() {
    var _container$current3 = container.current,
        scrollWidth = _container$current3.scrollWidth,
        clientWidth = _container$current3.clientWidth;
    var hasOverflow = scrollWidth > clientWidth;
    setHasOverflow(hasOverflow);
  };

  var debounceCheckForOverflow = (0, _debounce["default"])(checkForOverflow, 200);
  var debounceCheckForScrollPosition = (0, _debounce["default"])(checkForScrollPosition, 200);

  var scrollContainerBy = function scrollContainerBy(distance) {
    var _sizeOfFullItemsAndSi = sizeOfFullItemsAndSingleMargin(),
        sizeOfFullItems = _sizeOfFullItemsAndSi.sizeOfFullItems,
        singleChildrenMargin = _sizeOfFullItemsAndSi.singleChildrenMargin,
        fullItems = _sizeOfFullItemsAndSi.fullItems;

    var slider = container.current; // right button click

    if (distance > 0) {
      if (slider.scrollLeft <= distance - sizeOfFullItems) {
        setSlide(2);
      } else if (slider.scrollLeft <= distance) {
        setSlide(3);
      } else if (slider.scrollLeft <= distance * 2) {
        setSlide(4);
      } else if (slider.scrollLeft <= distance * 3) {
        setSlide(5);
      } else if (slider.scrollLeft <= distance * 4) {
        setSlide(6);
      } else if (slider.scrollLeft <= distance * 5) {
        setSlide(7);
      }
    } // left button click


    if (distance < 0) {
      var num;

      if (!canScrollRight) {
        num = sizeOfFullItems - (slider.clientWidth - sizeOfFullItems) - singleChildrenMargin;
      }

      if (Math.abs(distance) === num) {
        setSlide(slide - 1);
      } else if (slider.scrollLeft) {
        setSlide(slide - 1);
      }
    }

    container.current.scrollBy({
      left: distance,
      behavior: "smooth"
    });
  };

  var sizeOfFullItemsAndSingleMargin = function sizeOfFullItemsAndSingleMargin() {
    var _container$current4 = container.current,
        children = _container$current4.children,
        clientWidth = _container$current4.clientWidth;
    var fullItems = Math.floor(clientWidth / children[0].clientWidth); // calculate margin of single element

    var nodeStyle = window.getComputedStyle(children[0]);
    var mr = nodeStyle.marginRight;
    var ml = nodeStyle.marginLeft;
    var marginRight = mr.substring(0, mr.length - 2);
    var marginLeft = ml.substring(0, ml.length - 2);
    var singleChildrenMargin = +marginRight + +marginLeft;
    var sizeOfFullItems = fullItems * (children[0].clientWidth + singleChildrenMargin);
    return {
      sizeOfFullItems: sizeOfFullItems,
      singleChildrenMargin: singleChildrenMargin,
      fullItems: fullItems
    };
  };

  var scrollDistance = function scrollDistance(scrollBy) {
    var _container$current5 = container.current,
        children = _container$current5.children,
        clientWidth = _container$current5.clientWidth;

    var _sizeOfFullItemsAndSi2 = sizeOfFullItemsAndSingleMargin(),
        sizeOfFullItems = _sizeOfFullItemsAndSi2.sizeOfFullItems,
        singleChildrenMargin = _sizeOfFullItemsAndSi2.singleChildrenMargin,
        fullItems = _sizeOfFullItemsAndSi2.fullItems; // if there is scrollBy prop


    if (scrollBy) {
      var userScrollBy = scrollBy * (children[0].clientWidth + singleChildrenMargin);

      if (!canScrollRight) {
        return sizeOfFullItems - (clientWidth - userScrollBy) - singleChildrenMargin;
      }

      return userScrollBy;
    }

    if (!canScrollRight) {
      return sizeOfFullItems - (clientWidth - sizeOfFullItems) - singleChildrenMargin;
    }

    return sizeOfFullItems;
  };

  var changeDotAfterWalk = function changeDotAfterWalk(distance) {
    var _sizeOfFullItemsAndSi3 = sizeOfFullItemsAndSingleMargin(),
        sizeOfFullItems = _sizeOfFullItemsAndSi3.sizeOfFullItems,
        singleChildrenMargin = _sizeOfFullItemsAndSi3.singleChildrenMargin,
        fullItems = _sizeOfFullItemsAndSi3.fullItems; // TODO: scrollBy prop
    // TODO: disable button


    if (distance === 0) {
      setSlide(1);
    } else if (distance <= sizeOfFullItems) {
      setSlide(2);
    } else if (distance <= sizeOfFullItems * 2) {
      setSlide(3);
    } else if (distance <= sizeOfFullItems * 3) {
      setSlide(4);
    } else if (distance <= sizeOfFullItems * 4) {
      setSlide(5);
    } else if (distance <= sizeOfFullItems * 5) {
      setSlide(6);
    } else if (distance <= sizeOfFullItems * 6) {
      setSlide(7);
    }
  };

  var handleGrabbing = function handleGrabbing(e) {
    var slider = container.current;
    var isDown = false;
    var startX;
    var scrollLeftLocal;
    slider.addEventListener('mousedown', function (e) {
      e.preventDefault();
      isDown = true;
      setArrows(false);
      startX = e.pageX - slider.offsetLeft;
      scrollLeftLocal = slider.scrollLeft;
    });
    slider.addEventListener('mouseleave', function (e) {
      isDown = false;
      setArrows(true);
    });
    slider.addEventListener('mouseup', function (e) {
      isDown = false;
      setArrows(true);
    });
    slider.addEventListener('mousemove', function (e) {
      if (!isDown) return;
      e.preventDefault();
      var x = e.pageX - slider.offsetLeft;
      var walk = (x - startX) * 3; // scroll-fast

      slider.scrollLeft = scrollLeftLocal - walk;
      changeDotAfterWalk(slider.scrollLeft);
    });
  };

  var returnArrow = function returnArrow(direction) {
    return direction === 'left' ? '<' : '>';
  };

  return _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement(StyledSlider, null, _react["default"].createElement(SliderContainer, {
    withGrab: withGrab,
    onClick: withGrab ? function (e) {
      return handleGrabbing(e);
    } : null,
    ref: container
  }, data), arrows && _react["default"].createElement(ButtonGroup, null, _react["default"].createElement(ButtonLeft, {
    buttonSize: buttonSize,
    canScrollLeft: canScrollLeft,
    onClick: function onClick() {
      return scrollContainerBy(-scrollDistance(scrollBy));
    }
  }, _react["default"].createElement(Arrow, null, returnArrow('left'))), _react["default"].createElement(ButtonRight, {
    buttonSize: buttonSize,
    canScrollRight: canScrollRight,
    onClick: function onClick() {
      return scrollContainerBy(scrollDistance(scrollBy));
    }
  }, _react["default"].createElement(Arrow, null, returnArrow('right'))))), withDots && _react["default"].createElement(DotsGroup, {
    slide: slide
  }, _toConsumableArray(Array(dots).keys()).map(function (dot) {
    return _react["default"].createElement(Dot, {
      key: dot
    });
  })));
};

var _default = Slider;
exports["default"] = _default;
