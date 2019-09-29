"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SEARCH_FILE = 'SEARCH_FILE';
var SET_VISIBILITY_FILE = 'SET_VISIBILITY_FILE';
var INPUT_SEARCH = 'INPUT_SEARCH';
/*
 * генераторы действий
 */

var initState = {
  "inputSearch": '',
  "visibleFiles": {
    "api": true,
    "ci": true,
    "contrib": true,
    "http": true,
    "lib": true,
    "local": true,
    "packages": true,
    "robots": true,
    "server": true,
    "ut": true,
    "README.md": true,
    "ya.make": true
  }
};

function searchFile(name) {
  return {
    type: SEARCH_FILE,
    file: name
  };
}

var Store =
/*#__PURE__*/
function () {
  function Store(reducer, state) {
    _classCallCheck(this, Store);

    this._reducer = reducer;
    this._state = state ? state : [];
    this._listeners = [];
    this.dispatch;
  }

  _createClass(Store, [{
    key: "getState",
    value: function getState() {
      return this._state;
    }
  }, {
    key: "subscribe",
    value: function subscribe(cb) {
      var _this = this;

      this._listeners.push(cb);

      return function () {
        var index = _this._listeners.indexOf(cb);

        _this._listeners.splice(index, 1);
      };
    }
  }, {
    key: "dispatch",
    value: function dispatch(action) {
      this._state = this.search(this._state, action);

      this._notifyListeners();
    }
  }, {
    key: "_notifyListeners",
    value: function _notifyListeners() {
      var _this2 = this;

      this._listeners.forEach(function (listener) {
        listener(_this2._state);
      });
    }
  }, {
    key: "search",
    value: function search() {
      var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var action = arguments.length > 1 ? arguments[1] : undefined;

      switch (action.type) {
        case SEARCH_FILE:
          if (state.inputSearch && state.inputSearch === action.file) {
            return state;
          } else {
            var reg = new RegExp("^".concat(action.file));

            for (var key in state.visibleFiles) {
              state.visibleFiles[key] = key.match(reg) ? true : false;
            }

            return _objectSpread({}, state, {
              inputSearch: action.file
            });
          }

        default:
          return state;
      }
    }
  }]);

  return Store;
}();

var View =
/*#__PURE__*/
function () {
  function View(el, store) {
    _classCallCheck(this, View);

    this._el = el;
    this._store = store;
    this.unsubscribe = store.subscribe(this._prepareRender.bind(this));

    this._prepareRender(store.getState());
  }

  _createClass(View, [{
    key: "_prepareRender",
    value: function _prepareRender(state) {
      this.render(state);
    }
  }, {
    key: "render",
    value: function render(state) {
      var _this3 = this;

      var fileBlocks = [].slice.call(this._el);
      fileBlocks.forEach(function (element) {
        var fileName = element.querySelector('.directory-content-details__name').textContent.trim();

        var currentState = _this3._store.getState();

        if (!currentState.visibleFiles[fileName]) {
          element.style.display = 'none';
        } else {
          element.style.display = 'flex';
        }
      });
    }
  }]);

  return View;
}();

var files = document.querySelectorAll('.directory-content-details__item');
var store = new Store(search, initState);
var view = new View(files, store);
document.querySelector('.search__button').addEventListener('click', function () {
  var searchValue = document.querySelector('#search-input').value;
  store.dispatch(searchFile(searchValue));
  view.render();
});