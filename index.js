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

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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
  var data = _taggedTemplateLiteral(["\n  display: ", ";\n  margin-left: auto;\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  display: ", ";\n  margin-right: auto;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  opacity: 0;\n  padding: 0.8rem 1.2rem;\n  border: 2px solid gray;\n  outline: none;\n  transform: translateY(-50%);\n  transition: all 0.2s linear;\n  :hover {\n    border-color: black;\n  }\n"]);

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
});
var ButtonRight = (0, _styledComponents["default"])(Button)(_templateObject4(), function (_ref2) {
  var canScrollRight = _ref2.canScrollRight;
  return canScrollRight ? "block" : "none";
});

var Arrow = _styledComponents["default"].div(_templateObject5());

var SliderContainer = _styledComponents["default"].div(_templateObject6(), function (_ref3) {
  var withGrab = _ref3.withGrab;
  return withGrab ? "grabbing" : "pointer";
}, function (_ref4) {
  var withGrab = _ref4.withGrab;
  return withGrab ? "cursor: -webkit-grabbing" : "";
});

var StyledSlider = _styledComponents["default"].div(_templateObject7(), ButtonRight, ButtonLeft);

var Slider = function Slider(_ref5) {
  var data = _ref5.data,
      _ref5$withArrows = _ref5.withArrows,
      withArrows = _ref5$withArrows === void 0 ? true : _ref5$withArrows,
      _ref5$withGrab = _ref5.withGrab,
      withGrab = _ref5$withGrab === void 0 ? false : _ref5$withGrab,
      _ref5$buttonSize = _ref5.buttonSize,
      buttonSize = _ref5$buttonSize === void 0 ? '0.8rem 1.2rem' : _ref5$buttonSize,
      scrollBy = _ref5.scrollBy;

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

  var checkForScrollPosition = function checkForScrollPosition() {
    var _container$current = container.current,
        scrollLeft = _container$current.scrollLeft,
        scrollWidth = _container$current.scrollWidth,
        clientWidth = _container$current.clientWidth;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft !== scrollWidth - clientWidth);
  };

  var checkForOverflow = function checkForOverflow() {
    var _container$current2 = container.current,
        scrollWidth = _container$current2.scrollWidth,
        clientWidth = _container$current2.clientWidth;
    var hasOverflow = scrollWidth > clientWidth;
    setHasOverflow(hasOverflow);
  };

  var debounceCheckForOverflow = (0, _debounce["default"])(checkForOverflow, 200);
  var debounceCheckForScrollPosition = (0, _debounce["default"])(checkForScrollPosition, 200);

  var scrollContainerBy = function scrollContainerBy(distance) {
    container.current.scrollBy({
      left: distance,
      behavior: "smooth"
    });
  };

  var scrollDistance = function scrollDistance(scrollBy) {
    var _container$current3 = container.current,
        children = _container$current3.children,
        clientWidth = _container$current3.clientWidth;
    var fullItems = Math.floor(clientWidth / children[0].clientWidth); // calculate margin of single element

    var nodeStyle = window.getComputedStyle(children[0]);
    var mr = nodeStyle.marginRight;
    var ml = nodeStyle.marginLeft;
    var marginRight = mr.substring(0, mr.length - 2);
    var marginLeft = ml.substring(0, ml.length - 2);
    var singleChildrenMargin = +marginRight + +marginLeft;
    var sizeOfFullItems = fullItems * (children[0].clientWidth + singleChildrenMargin); // if there is scrollBy prop

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

  var handleGrabbing = function handleGrabbing(e) {
    var slider = document.querySelector('#slider');
    var isDown = false;
    var startX;
    var scrollLeftChange;
    slider.addEventListener('mousedown', function (e) {
      e.preventDefault();
      isDown = true;
      setArrows(false);
      startX = e.pageX - slider.offsetLeft;
      scrollLeftChange = slider.scrollLeft;
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
      if (isDown) {
        e.preventDefault();
        var x = e.pageX - slider.offsetLeft;
        var walk = (x - startX) * 3; // scroll-fast

        slider.scrollLeft = scrollLeftChange - walk;
      }
    });
  };

  var returnArrow = function returnArrow(direction) {
    return direction === 'left' ? '<' : '>';
  };

  return _react["default"].createElement(StyledSlider, null, _react["default"].createElement(SliderContainer, {
    withGrab: withGrab,
    onClick: withGrab ? function (e) {
      return handleGrabbing(e);
    } : null,
    ref: container,
    id: "slider"
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
  }, _react["default"].createElement(Arrow, null, returnArrow('right')))));
};

var _default = Slider;
exports["default"] = _default;
