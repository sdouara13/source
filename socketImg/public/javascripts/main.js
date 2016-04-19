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
	img_client.init(id);
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
	/*
	var wsServer = 'ws://10.20.96.117:8000';
	var websocket = new WebSocket(wsServer);

	websocket.onopen = function (evt) {
		//已经建立连接
		console.log("已经建立连接");
	};
	websocket.onclose = function (evt) {
		//已经关闭连接
		alert("已经关闭连接");
	};
	websocket.onmessage = function (evt) {
		//收到服务器消息，使用evt.data提取
		evt.stopPropagation()
		evt.preventDefault()
		//alert(evt.data);
		console.log(evt.data);
		//websocket.close();
	};*/
	/**********************/

});
