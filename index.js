/**
 * Name: Catherine Lien
 * Date: April 19, 2020
 * Section: CSE 154 AI
 *
 * This is the JS to implement the UI to my pomodoro timer and can generate
 * different timers and a list based on user input.
 */
"use strict";

(function() {

  window.addEventListener("load", init);

  /** Adds event handlers to all the buttons on the page.*/
  function init() {
    let startButton = id("start");
    let enterButton = id("enter");
    let clearButton = id("clear");
    let taskInput = id("task");
    startButton.addEventListener("click", startTimer);
    enterButton.addEventListener("click", addList);
    taskInput.addEventListener("keyup", function(event) {
      if(event.keyCode == 13) {
        enterButton.click();
      }
    });
    clearButton.addEventListener("click", clearList);
  }

  /**
   * Creates the timer based on user input and shows it on the page. Warns
   * the user if no value is inputed for the timer, if not, starts the
   * timer.
   */
  function startTimer() {
    const DURATION = id("time").value;
    if (validNumber(DURATION)) {
      createTimer(DURATION);
    } else {
      displayWarning();
    }
  }

  /** Displays a message that the input number is invalid for 3 seconds. */
  function displayWarning() {
    const THREE_SECONDS = 3000;
    let warning = gen("p");
    warning.textContent = "Please enter a valid number before starting the timer!";
    id("inputs").appendChild(warning);
    id("start").classList.add("hidden");
    setTimeout(() => {
      id("start").classList.remove("hidden");
      id("inputs").removeChild(warning);
    }, THREE_SECONDS);
  }

  /**
   * Creates the timer and counts it down. Hides the customization panel when
   * timer starts. Warns the user when timer is over and hides the timer.
   * When the timer is over, displays customization options on the page again.
   * @param {number} dur The amount of time for the timer. Must be an integer
   * and a postiive number.
   */
  function createTimer(dur) {
    const SECONDS = 60;
    const ONE_SECOND = 1000;
    let min = dur;
    let sec = 0;
    hideAndShow(id("inputs"), id("timer"));
    let countdown = setInterval(() => {
      if (min === 0 && sec === 0) {
        clearInterval(countdown);
        timeUp();
      } else if (min !== 0 && sec === 0) {
        min = min - 1;
        sec = SECONDS - 1;
      } else {
        sec--;
      }
      id("clock").textContent = min + "m" + sec + "s";
    }, ONE_SECOND);
  }

  /**
   * Hides an object on the page and display an object on the page.
   * @param {Object} hide The DOM object you want to hide on the page.
   * @param {Object} show The DOM object you want to show on the page.
   */
  function hideAndShow(hide, show) {
    hide.classList.add("hidden");
    show.classList.remove("hidden");
  }

  /**
   * Displays a message when the timer is over on the page for 3 seconds and hides the
   * timer after.
   */
  function timeUp() {
    const THREE_SECONDS = 3000;
    let timerDone = gen("p");
    timerDone.textContent = "Time is up!";
    id("timer").appendChild(timerDone);
    setTimeout(() => {
      hideAndShow(id("timer"), id("inputs"));
      id("timer").removeChild(timerDone);
    }, THREE_SECONDS);
  }

  /** Adds the user input to the task list on the page.*/
  function addList() {
    if (id("task").value.length !== 0) {
      let taskNode = gen("li");
      taskNode.textContent = id("task").value;
      qs("ol").appendChild(taskNode);
    }
  }

  /** Clears the task list on the page.*/
  function clearList() {
    qs("ol").innerHTML = "";
  }

  /**
   * Checks if user has inputed a valid value or not to set the timer.
   * @param {string} dur - The amount of time for the timer.
   * @return {boolean} Returns true if the user has inputed a valid value.
   */
  function validNumber(dur) {
    return dur.length !== 0 && parseInt(dur) > 0 && Number.isInteger(parseFloat(dur));
  }

  /** ------------------------------ Helper Functions  ------------------------------ */
  /**
   * Note: You may use these in your code, but remember that your code should not have
   * unused functions. Remove this comment in your own code.
   */

  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} idName - element ID
   * @returns {object} DOM object associated with id.
   */
  function id(idName) {
    return document.getElementById(idName);
  }

  /**
   * Returns the first element that matches the given CSS selector.
   * @param {string} selector - CSS query selector.
   * @returns {object} The first DOM object matching the query.
   */
  function qs(selector) {
    return document.querySelector(selector);
  }

  /**
   * Returns a new element with the given tag name.
   * @param {string} tagName - HTML tag name for new DOM element.
   * @returns {object} New DOM object for given HTML tag.
   */
  function gen(tagName) {
    return document.createElement(tagName);
  }

})();