// let element = document.querySelector('#url_id');
// let key = 'fdd_' + element.getAttribute('data-url-id');
// let item = JSON.parse(localStorage.getItem(key));
// element.innerHTML = "Found url: " + item.url;

const item = JSON.parse(localStorage.getItem('fdd_'+fdd_vars.url_id));
const url = item.url;

const main_content = document.querySelector('#main_content_container');
main_content.innerHTML = fdd_vars.template_wait;

let timer_element = document.querySelector('.dload-timer-cd');
timer_element.innerHTML = fdd_vars.delay_time;

		var countdown = setInterval(function () {
			fdd_vars.delay_time--; 
			timer_element.innerHTML = fdd_vars.delay_time;
			if (fdd_vars.delay_time == 0) {
                clearInterval(countdown);

                fetch(url, {
                    method: 'HEAD'
                })
                // .then(response => JSON.parse(response))
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
                
                // console.log(response.ok);

                // $.get(url) // check file exists
                //     .done(function() { 
                //         // exists code 
                //         if (dloaddelay_options['dload_newtab']) {
                //             window.open(url, '_blank');
                //         } else {
                //             // location.href=url;
                //             downloadFile(url);
                //         }
                //         $('#'+timer_container_id).html(dloaddelay_options['success_template']);
                //         $('#'+timer_container_id).find('.dload-timer-cd').remove();
                //     }).fail(function() { 
                //         // not exists code
                //         $('#'+timer_container_id).html(dloaddelay_options['failed_template']);
                //         $('#'+timer_container_id).find('.dload-timer-cd').remove();
                //     })


			}
		}, 1000)