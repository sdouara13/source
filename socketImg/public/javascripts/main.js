$(document).ready(function () {
	'use strict'
	/***********************/
	//alert('ready:'+document.getElementById('touchView').clientWidth );

	var id = "touchView";
	var url = "http://10.20.105.6:3000/upload";
	var canvas = document.getElementById(id);
	var socket = io.connect();
	//如果在pc上打开网页
	if(!("ontouchstart" in document)) {
		var wrap = document.getElementById('container');
		wrap.style.width = '270px';
		document.getElementById('canvas_box').setAttribute('class', 'phoneBox');
		//绑定文件上传功能
		upload(id, url);
	}
	var c_width = canvas.clientWidth;
	canvas.width = c_width;
	canvas.height = c_width;
	canvas.style.height = c_width + 'px';


	mult_touch.init(id);
	img_client.init(id, socket);
	logcat(socket);

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
