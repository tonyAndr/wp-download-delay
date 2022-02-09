import '../css/redirect-template.css';

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
 * Run the timer and display result
 */
let countdown = setInterval(function () {
    time--; 
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