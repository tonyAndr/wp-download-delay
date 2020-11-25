jQuery(document).ready(function($){

	// dloaddelay_options = JSON.parse(dloaddelay_options);

	function findAndWrapLinks() {
		$("a").each(function () {
			if ($(this).attr('href').includes('pdf') ||
				$(this).attr('href').includes('doc') ||
				$(this).attr('href').includes('docx') ||
				$(this).attr('href').includes('xls') ||
				$(this).attr('href').includes('xlsx') ||
				$(this).attr('href').includes('rtf') ||
				$(this).attr('href').includes('txt') ||
				$(this).attr('href').includes('pptx')) {
					console.log(this);
					$(this).wrap('<span class="dloaddelay-link-wrapper" data-time="'+dloaddelay_options['delay_time']+'"></span>');
				}
		});
	}

	findAndWrapLinks();

	var dload_list = [];

	$('.dloaddelay-link-wrapper').click(function(e){
		e.preventDefault();
		let time = 0;
		let url = '';

		url = $(this).find('a').attr('href');
		time = $(this).attr('data-time');

		if (!dload_list[url] || $('#'+dload_list[url]).css('display') === 'none') {
			let parent = getParentParagraph(this);
			make_redirect(url, time, appendTimerContainer(parent, url), $(this).find('a'));
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
		if ($('.dload-timer-wrap')) {
			$('.dload-timer-wrap').each(function(){
				if ($(this).attr('data-url') === url) {
					id = $(this).attr('id');
				}
			})
		}
		if (!id) {

			id = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
			$(element).after(
				'<div id="'+id+'" class="dload-timer-wrap" data-url="'+url+'" style="display:none"></div>'
			);
			$('#'+id).html(dloaddelay_options['wait_text']);
			// $('#'+id).html($('<textarea />').html(dloaddelay_options['wait_text']).text());
		}


		dload_list[url] = id; // save it to check if this link already is waiting for redirect
		return id;
	}

	function make_redirect(url, time, timer_container_id, link) {
		$('#'+timer_container_id).find('.dload-timer-cd').html(time);
		$('#'+timer_container_id).fadeIn();
		var timers = setInterval(function () {
			time--; 
			$('#'+timer_container_id).find('.dload-timer-cd').html(time);
			if (time == 0) {
				// $('#'+timer_container_id).fadeOut();
				// $('#'+timer_container_id).remove();
				dload_list[url] = null;
				clearInterval(timers);
				if (dloaddelay_options['dload_newtab'] === "true") {
					window.open(url, '_blank');
				} else {
					location.href=url;
					// downloadFile(url);
				}
			}
		}, 1000)
	}
	function downloadFile(filePath) {
		var link = document.createElement('a');
		link.href = filePath;
		link.download = filePath.substr(filePath.lastIndexOf('/') + 1);
		link.click();
	}



})