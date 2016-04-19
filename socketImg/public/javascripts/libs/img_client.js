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
	touchEvent: function (canvas, socket) {
		canvas.addEventListener(mult_touch.bindevent.down, function(e) {

			socket.emit("down",mult_touch.msg);

		},false);
		canvas.addEventListener(mult_touch.bindevent.move, function(e) {

			socket.emit("move",mult_touch.msg);

		},false);
		canvas.addEventListener(mult_touch.bindevent.up, function(e) {

			socket.emit("up",mult_touch.msg);

		},false);
	},
	mouseEvent: function (canvas, socket) {
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
			socket.emit("down",mult_touch.msg);
			console.log('d');

		},false);
		canvas.addEventListener(mult_touch.bindevent.move, function(e) {
			if(mouse.status) {

				if (mouse.x !== e.clientX && mouse.y !== e.clientY) {

					changeStatus(e,mouseStatus.down);
					socket.emit("move",mult_touch.msg);
					console.log('m');
				}
			}
		},false);
		canvas.addEventListener(mult_touch.bindevent.up, function(e) {

			changeStatus(e, mouseStatus.down);
			mouse.status = undefined;
			socket.emit("up", mult_touch.msg);
			console.log('u');
		},false);
	},
	init: function(target){
		'use strict'
		/***********************/
		//connect socket server
		var socket = io.connect();
		/***********************/
		var canvas = document.getElementById(target);
		var c_width = canvas.clientWidth;
		if("ontouchstart" in document)
			this.touchEvent(canvas, socket);
		else
			this.mouseEvent(canvas, socket);
		/***********************/

		//init img object
		var img =  new Image();
		var img_w,
			img_h,
			draw_x,
			draw_y,
			zoom,
			zoom_w,
			zoom_h,
			myctx;
		var drawImg = function (img, canvas, w) {
			//console.log('draw img');
			myctx = canvas.getContext("2d");
			myctx.clearRect(0, 0, w, w);
			getZoomSize(img, c_width);
			myctx.drawImage(img, 0, 0, img_w, img_h, draw_x, draw_y, zoom_w, zoom_h);
			//console.log("sourceX: 0 sourceY: 0 sourceWidth: "+img_w+" sourceHeight: "+img_h+" destX: "+draw_x+" destY: "+draw_y+" destWidth: "+img_w * zoom + " destHeight: "+ img_h * zoom);
		};
		function getZoomSize(img, c_width) {
			img_w = img.width;
			img_h = img.height;
			if(img_w > img_h) {
				zoom = c_width / img_w;
				zoom_w = c_width;
				zoom_h = c_width / img_w * img_h;
				draw_x = 0;
				draw_y = (c_width - img_h * zoom) * 0.5;
			}
			else {
				zoom = c_width / img_h;
				zoom_h = c_width;
				zoom_w = c_width / img_h * img_w;
				draw_y = 0;
				draw_x = (c_width - img_w * zoom) * 0.5;
			}
		}
		//get socket data
		function getImageData(message,img) {

			img.src = 'data:img/jpeg;base64, ' + message;

			if(img.complete){

			   drawImg(img, canvas,c_width);

			}else{
			   img.onload = function(){
				 zoom = getZoomSize(img, c_width);
				 drawImg(img, canvas,c_width);

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
