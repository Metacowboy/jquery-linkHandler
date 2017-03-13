/* Dynamic Link Handler
Author: Simeon Lyubenov (lyubenov@gmail.com)
Website: www.webdevlabs.com

Attributes:
data-link = link to resource (use link handler on this element)
data-ajax = true (send href as ajax request)
data-confirm = true/msg (if true show default msg, else show data-confirm="msg contents")
data-toggle = elementID (Disable caller element and show elementID. Usable with data-ajax requests to switch button content)

Default Options:
onStart: function(){}
onEnd: function(){}
AjaxResponseDelimiter: '!'

Examples:
$('[data-link]').LinkHandler(); (recommended)
$('a, button').LinkHandler();
$('.customlink').LinkHandler();
$('[data-link]').LinkHandler({AjaxResponseDelimiter: ':',
															onStart: function(){ $('.loading').show(); },
															onEnd: function(){ }
														});

<button type="button" data-link="some.php?delete=someid" data-confirm='Are you sure you want to delete this item?'>delete</button>
<button type='button'
				data-link='some.php'
				data-ajax='true'
				data-confirm='Are you sure?'
				data-toggle='new_btn_element'
>GO!</button>
Full example (using all the features):
<button type="button"
				data-link="system.php?disable=this"
				data-confirm="Are you sure you want to disable this?"
				data-ajax="true"
				data-toggle="enable_button"
				id="disable_button">Set off</button>
<button type="button"
				data-link="system.php?enable=this"
				data-ajax="true"
				data-toggle="disable_button"
				id="enable_button">Set on</button>
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