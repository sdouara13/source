(function(mult_touch,img_client){
	'use strict'
	/***********************/
	
	mult_touch.init("touchView");
	//console.log(mult_touch.msg());
	var canvas = document.getElementById("touchView");
	img_client.init(canvas, mult_touch.msg);
	/*canvas.addEventListener(mult_touch.bindevent.down, function(e) {
		canvas.innerHTML = mult_touch.msg;
	},false);
	canvas.addEventListener(mult_touch.bindevent.move, function(e) {
		canvas.innerHTML = mult_touch.msg;
	},false);
	canvas.addEventListener(mult_touch.bindevent.up, function(e) {
		canvas.innerHTML = mult_touch.msg;
	},false);*/
}(mult_touch,img_client));
