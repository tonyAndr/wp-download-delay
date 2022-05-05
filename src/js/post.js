import '../css/post-template.css';
import fontColorContrast from 'font-color-contrast';
import rgbHex from 'rgb-hex';

jQuery(document).ready(function($) {

    // keep track of delayed downloads
	let dload_list = [];

    function get_url_extension( url ) {
        if (!url || !url.trim().length) {
            return false;
        }
        return url.split(/[#?]/)[0].split('.').pop().trim();
    }

	function findAndWrapLinks() {
		$("a").each(function () {
            let wrapped = false;
            // check by file extension and pre-wrap using shortcode
            let ext = get_url_extension($(this).attr('href'));
            if (ext) {
                if (dloaddelay_options['extensions'].includes(ext.toLowerCase())) {
                    // console.log(ext);
                    // check if wrapped already 
                    if (!Boolean(this.closest(".dloaddelay-link-wrapper"))) {
                        $(this).wrap('<span class="dloaddelay-link-wrapper" data-time="'+dloaddelay_options['delay_time']+'"></span>');
                    }

                    wrapped = true;
                }
            }
            // check by className element and parents
            if (!wrapped && dloaddelay_options['download_class']) {
                if (this.classList.contains(dloaddelay_options['download_class']) ||
                Boolean(this.closest('.'+dloaddelay_options['download_class']))) {
                    $(this).wrap('<span class="dloaddelay-link-wrapper" data-time="'+dloaddelay_options['delay_time']+'"></span>');
                }
            }
		});
	}


    if (dloaddelay_options['autowrap'] === 'true') {
        findAndWrapLinks();
    }

	$('.dloaddelay-link-wrapper').click(function(e){
		e.preventDefault();
		let time = 0;
		let url = '';
        let is_redirect = undefined;

		url = $(this).find('a').attr('href');
		time = $(this).attr('data-time');
		is_redirect = $(this).attr('data-redirect');

        if (is_redirect === undefined) {
            // get from global options
            is_redirect = dloaddelay_options['page_redirect'] === 'true';
        } else {
            // get from element
            is_redirect = is_redirect === 'true';
        }

        if (is_redirect) {
            make_redirect(url, time)
            return;
        }

		if (!dload_list[url] || $('#'+dload_list[url]).css('display') === 'none') {
			// let parent = getParentParagraph(this);
            // let container_id = appendTimerContainer(parent, url);
            let container_id = appendTimerContainer(this, url);
			show_inpage_timer(url, time, container_id, $(this).find('a'));
		} 
	})

	function getParentParagraph(element) {
		let parent;

		if ($(element).parent().prop('tagName') === "P") {
			parent = $(element).parent();
		} else {
			if ($(element).parent().hasClass('entry-content')) {
				parent = element;
			} else {
				parent = getParentParagraph($(element).parent());
			}
		}

		return parent;
	}

	function appendTimerContainer(element, url) {
		let id = ""; // generate smth unique
        let wrap_element;
		if ($('.dload-timer-wrap')) {
			$('.dload-timer-wrap').each(function(){
				if ($(this).attr('data-url') === url) {
					let _id = $(this).attr('id');
                    wrap_element = this;
                    if (_id === dload_list[url]) {
                        id = _id;
                    } 
				}
			})
		}
		if (!id) {
            $(wrap_element).remove();
			id = Math.random().toString(36).replace(/[^a-z]+/g, '').substring(0, 5);
			$(element).after(
				'<div id="'+id+'" class="dload-timer-wrap" data-url="'+url+'" style="display:none"></div>'
			);
			$('#'+id).html(dloaddelay_options['download_template']);
			// $('#'+id).html($('<textarea />').html(dloaddelay_options['wait_text']).text());
		}

		dload_list[url] = id; // save it to check if this link already is waiting for redirect
		return id;
	}

	function show_inpage_timer(url, time, timer_container_id, link) {
        let bg_color = rgbHex($('#'+timer_container_id).find('div.timer-container').css('background-color'));
        let contrast_color = fontColorContrast(bg_color);
        let font_black = contrast_color === '#000000';
        // console.log("========== COLOR ==========", bg_color, font_color);
        if (font_black) {
            $('#'+timer_container_id).find('div.timer-container').addClass('font-black');
            $('#'+timer_container_id).find('.dload-timer-cd').addClass('font-black');
        } else {
            $('#'+timer_container_id).find('div.timer-container').removeClass('font-black');
            $('#'+timer_container_id).find('.dload-timer-cd').removeClass('font-black');
        }


		$('#'+timer_container_id).find('.dload-timer-cd').html(time);
		$('#'+timer_container_id).fadeIn();
        document.querySelector('#'+timer_container_id).scrollIntoView({behavior: "smooth", block: "center", inline: "center"});
		var timers = setInterval(function () {
            let tab_active = document.visibilityState === "visible";
            if (tab_active) {
                time--; 
            }

			$('#'+timer_container_id).find('.dload-timer-cd').html(time);
			if (time == 0) {
				// $('#'+timer_container_id).fadeOut();
				// $('#'+timer_container_id).remove();

                dload_list[url] = null;
                clearInterval(timers);
                $.get(url) // check file exists
                    .done(function() { 
                        // exists code 
                        if (dloaddelay_options['dload_newtab']) {
                            window.open(url, '_blank');
                        } else {
                            // location.href=url;
                            downloadFile(url);
                        }
                        // replace {download_link} tag
                        let template = dloaddelay_options['success_template'].replaceAll("{download_link}", `<a href='${url}' download>${url}</a>`);
                        $('#'+timer_container_id).html(template);
                        $('#'+timer_container_id).find('.dload-timer-cd').remove();
                    }).fail(function() { 
                        // not exists code
                        $('#'+timer_container_id).html(dloaddelay_options['failed_template']);
                        $('#'+timer_container_id).find('.dload-timer-cd').remove();
                    })


			}
		}, 1000)
	}

    function make_redirect(url, time) {
        // generate url id
        let url_id = Math.random().toString(36).replace(/[^a-z]+/g, '').substring(0, 5);
        // save download url and current page url to localstorage
        let item = {url, return: location.href, time}
        localStorage.setItem('fdd_' + url_id, JSON.stringify(item))
        // create custom unique link to download page using random id
        let link = document.createElement('a');
		link.href = '/download/'+url_id;
        // open download page in new tab
        link.target = '_blank';
		link.click();
    }

	function downloadFile(filePath) {
		let link = document.createElement('a');
		link.href = filePath;
		link.download = filePath.substring(filePath.lastIndexOf('/') + 1);
		link.click();
	}
})