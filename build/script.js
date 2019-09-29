"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

window.onload = function () {
  document.body.addEventListener('click', function (event) {
    var containClass = function containClass(selector) {
      return event.target.classList.contains(selector);
    };

    if (containClass('onoffswitch') || containClass('onoffswitch__button')) {
      var blocksWithTheme = _toConsumableArray(document.querySelectorAll('.theme_color_project-default, .theme_color_project-inverse'));

      document.querySelector('.onoffswitch__button').classList.toggle('onoffswitch__button_active');
      blocksWithTheme.forEach(function (block) {
        block.classList.toggle('theme_color_project-inverse');
        block.classList.toggle('theme_color_project-default');
      });
    }

    var blocksFromHistory = _toConsumableArray(document.querySelectorAll('.history__transaction, .history__transaction div'));

    if (blocksFromHistory.includes(event.target)) {
      var historyTransaction = event.target.closest('.history__transaction');
      var historyHidden = historyTransaction.querySelector('.history__hide');
      historyHidden.classList.toggle('history__hide_visible');
    }
  });
};