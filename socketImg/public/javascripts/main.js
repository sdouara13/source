$(document).ready(function () {
	'use strict'
	/***********************/
	//alert('ready:'+document.getElementById('touchView').clientWidth );

	var id = "touchView";
	var canvas = document.getElementById(id);
	var c_width = canvas.clientWidth;
	var c_height = canvas.clientheight;
	mult_touch.init(id);
	img_client.init(canvas, mult_touch.msg);
	$('#range').on(mult_touch.bindevent.move, function (e) {
		//console.log( $('#range').val());
		var percent =  $('#range').val() * 0.01;
		canvas.style.transform = 'scale('+percent+','+percent+')';
		/*canvas.style.width = c_width + 'px';
		canvas.style.height = c_height + 'px';*/
		}
	);
	/**********************/

});

window.onload = function () {
	//alert('onload+'+document.getElementById('touchView').clientWidth);
}