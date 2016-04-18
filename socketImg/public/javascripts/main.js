$(document).ready(function () {
	'use strict'
	/***********************/
	//alert('ready:'+document.getElementById('touchView').clientWidth );

	var id = "touchView";
	var canvas = document.getElementById(id);

	var c_width = canvas.clientWidth;
	canvas.width = c_width;
	canvas.height = c_width;
	canvas.style.height = c_width + 'px';
	mult_touch.init(id);
	img_client.init(canvas);
	var range =  $('#range').val();
	$('#range').on(mult_touch.bindevent.move, function (e) {
			if (range !== $('#range').val()) {
				var percent = $('#range').val() * 0.01;
				canvas.style.transform =
					canvas.style.webkitTransform = 'scale(' + percent + ',' + percent + ')';
				/*canvas.style.width = c_width + 'px';
				 canvas.style.height = c_height + 'px';*/
				range =  $('#range').val();
			}
		}
	);

	/**********************/

});
