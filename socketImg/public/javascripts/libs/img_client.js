if(!mult_touch){
	var mult_touch = {
		bindevent: {
			down: "ontouchstart" in document ? "touchstart" : "mousedown",
			move: "ontouchmove" in document ? "touchmove" : "mousemove",
			up: "ontouchend" in document ? "touchend" : "mouseup"
		}
	}
}
var img_client = {
	touchEvent: function (canvas, socket, touchMsg) {
		canvas.addEventListener(mult_touch.bindevent.down, function(e) {

			socket.emit("down",touchMsg);

		},false);
		canvas.addEventListener(mult_touch.bindevent.move, function(e) {

			socket.emit("move",touchMsg);

		},false);
		canvas.addEventListener(mult_touch.bindevent.up, function(e) {

			socket.emit("up",touchMsg);

		},false);
	},
	mouseEvent: function (canvas, socket, touchMsg) {
		var mouse = {};
		var mouseStatus = {
			down: "d",
			move: "m",
			up: "u"
		};
		var changeStatus = function (event, status) {
			mouse = {
				x: event.clientX,
				y: event.clientY,
				status: status
			}
		}
		canvas.addEventListener(mult_touch.bindevent.down, function(e) {
			changeStatus(e,mouseStatus.down);
			socket.emit("down",touchMsg);
			console.log('d');

		},false);
		canvas.addEventListener(mult_touch.bindevent.move, function(e) {
			if(mouse.status) {

				if (mouse.x !== e.clientX && mouse.y !== e.clientY) {

					changeStatus(e,mouseStatus.down);
					socket.emit("move",touchMsg);
					console.log('m');
				}
			}
		},false);
		canvas.addEventListener(mult_touch.bindevent.up, function(e) {

			changeStatus(e, mouseStatus.down);
			mouse.status = undefined;
			socket.emit("up", touchMsg);
			console.log('u');
		},false);
	},
	init: function(target, touchMsg){
		'use strict'
		/***********************/
		//connect socket server
		var socket = io.connect();

		/***********************/
		var canvas = target;


		if("ontouchstart" in document)
			this.touchEvent(canvas, socket, touchMsg);
		else
			this.mouseEvent(canvas, socket, touchMsg);
		/***********************/

		//init img object
		var img =  new Image();
		var drawImg = function (img, canvas) {
			//console.log('draw img');
			var myctx = canvas.getContext("2d");

			myctx.drawImage(img, 0, 0);

		};

		//get socket data
		function getImageData(message,img) {

			img.src = 'data:img/jpeg;base64, ' + message.data;
			if(img.complete){

			   drawImg(img, canvas);

			}else{

			   img.onload = function(){

				 drawImg(img, canvas);

			   };

			   img.onerror = function(){

				 console.log('图片加载失败，请重试');

			   };

			};
		};

		socket.on('imgData',function(message){
			//console.log('get img data');
			getImageData(message, img);
		})
	}
};
