/* Dynamic Link Handler
Author: Simeon Lyubenov (lyubenov@gmail.com)
Website: www.webdevlabs.com
*/

(function( $ ) {

	$.fn.LinkHandler = function( options ) {
		$.fn.LinkHandler.defaults = {
			AjaxResponseDelimiter: '!',
			onStart : function() {},
			onEnd : function() {}
		};
    var settings = $.extend( {}, $.fn.LinkHandler.defaults, options );

		this.click(function(){
			var dlink = $(this).attr("data-link");
			var dajax = $(this).attr("data-ajax");
			var dconfirm = $(this).attr("data-confirm");
			var dtoggle = $(this).attr("data-toggle");

			if (dconfirm) {
				if (dconfirm != 'true') {
					question = $(this).attr('data-confirm');
				}else {
					question = "Are you sure?";
				}
				answer = confirm(question);
				if (answer === false){ return false; }
			}
	    settings.onStart.call();

			if (dtoggle) {
				$(this).addClass('hidden');
				$("#" + dtoggle).removeClass('hidden');
			}

			if (dajax == 'true') {
						$.get(dlink,function(response) {
							var customresponse = cutFirst(response,settings.AjaxResponseDelimiter);
							switch(customresponse[0]) {
								case 'success':
									alertify.success('<i class="fa fa-check"></i> '+customresponse[1]);
								break;
								case 'error':
									alertify.error('<i class="fa fa-close"></i>'+customresponse[1]);
									message.html(customresponse[1]);
								break;
								default:
									alertify.success('<i class="fa fa-check"></i> '+response);
							}
							settings.onEnd.call();
						});
			} else {
		    settings.onEnd.call();
				document.location.href=dlink;
			}

		});

		return this;

	};

}( jQuery ));
