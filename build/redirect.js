/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

/**
 * Get url, return_url, time from browser localStorage
 */

var item = JSON.parse(localStorage.getItem('fdd_' + fdd_vars.url_id));
var url = item.url;
var time = item.time ? item.time : fdd_vars.delay_time;
/**
 * Get HTML template from options
 */

var main_content = document.querySelector('#main_content_container');
main_content.innerHTML = fdd_vars.template_wait;
var timer_element = document.querySelector('.dload-timer-cd');
timer_element.innerHTML = time;
/**
 * Run the timer and display result
 */

var countdown = setInterval(function () {
  time--;
  timer_element.innerHTML = time;

  if (time == 0) {
    clearInterval(countdown); // using fetch to verify that file exists

    fetch(url, {
      method: 'HEAD'
    }).then(function (response) {
      if (response.ok) {
        var manual_link = "<a download href='" + url + "'>" + url + "</a>";
        fdd_vars.template_success = fdd_vars.template_success.replace('{download_link}', manual_link);
        main_content.innerHTML = fdd_vars.template_success;
      } else {
        main_content.innerHTML = fdd_vars.template_failed;
      }

      timer_element = document.querySelector('.dload-timer-cd');
      timer_element.remove();
    });
  }
}, 1000);
/******/ })()
;