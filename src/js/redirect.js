import '../css/redirect-template.css';
import fontColorContrast from 'font-color-contrast';
import rgbHex from 'rgb-hex';
/**
 * Get url, return_url, time from browser localStorage
 */
const item = JSON.parse(localStorage.getItem('fdd_'+fdd_vars.url_id));
const url = item.url;
let time = item.time ? item.time : fdd_vars.delay_time;

/**
 * Get HTML template from options
 */
const main_content = document.querySelector('#main_content_container');
main_content.innerHTML = fdd_vars.template_wait;
let timer_element = document.querySelector('.dload-timer-cd');
timer_element.innerHTML = time;

/**
 * Set contrast font & timer animation color
 */
let timer_container = document.querySelector('div.timer-container');
let css_bg_color = getComputedStyle(timer_container).backgroundColor;
let bg_color = rgbHex(css_bg_color);
let contrast_color = fontColorContrast(bg_color);
let font_black = contrast_color === '#000000';
// console.log("========== COLOR ==========", bg_color, font_color);
if (font_black) {
    timer_container.classList.add('font-black');
    timer_element.classList.add('font-black');
} else {
    timer_container.classList.remove('font-black');
    timer_element.classList.remove('font-black');
}
/**
 * Run the timer and display result
 */
let countdown = setInterval(function () {

    let tab_active = document.visibilityState === "visible";
    if (tab_active) {
        time--; 
    }

    timer_element.innerHTML = time;
    if (time == 0) {
        clearInterval(countdown);

        // using fetch to verify that file exists
        fetch(url, {
            method: 'HEAD'
        })
        .then(response => {
            if (response.ok) {
                let manual_link = "<a download href='"+url+"'>"+url+"</a>";
                fdd_vars.template_success = fdd_vars.template_success.replace('{download_link}', manual_link);
                main_content.innerHTML = fdd_vars.template_success;
            } else {
                main_content.innerHTML = fdd_vars.template_failed;
            }
            timer_element = document.querySelector('.dload-timer-cd');
            timer_element.remove();
        });
    }
}, 1000)