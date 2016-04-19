/*
*
*mult-touch module
*2016/4/14
*version 1.0
*
*/
'use strict'
var mult_touch = {
	get msg(){
		return this._touchMsg;
	},
	_touchMsg: null,
	_pressure:0,
	addEvent:function(dom,type,fn){
		//attach event
		if(dom.addEventListener){
			dom.addEventListener(type,fn,false);
		}
		else if(dom.attachEvent){
			dom.attachEvent('on'+type,fn);
		}
		else{
			dom['on' + type] = fn;
		}
	},
	bindevent: {
		down: "ontouchstart" in document ? "touchstart" : "mousedown",
		move: "ontouchmove" in document ? "touchmove" : "mousemove",
		up: "ontouchend" in document ? "touchend" : "mouseup"
	},
	init: function(target_id){
		//pressure config
		Pressure.config({
		  polyfill: true
		});
		
		//pressure config by jquery
		/*$.pressureConfig({
		  preventDefault: false
		});*/
		
		var block = {
		  start: function(event){
			//console.log('start', event);
			  //mult_touch._pressure = 0;
		  },

		  change: function(force, event){
			//this.style.width = $.pressureMap(force, 0, 50, 200, 300) + 'px';
			//this.style.width = Pressure.map(force, 0, 1, 300, 400) + 'px';
			//this.innerHTML = force;
			//console.log('change', force);
			mult_touch._pressure = (force * 100) >> 0;
			//console.log(mult_touch._pressure);
		  },

		  startDeepPress: function(event){
			//console.log('start deep press', event);
		  },

		  endDeepPress: function(){
			console.log('end deep press');
		  },

		  end: function(){
			//this.style.width = '300px';
			//this.innerHTML = 0;
		  },

		  unsupported: function(){
			console.log(this);
			this.innerHTML = 'Your device / browser does not support this :(';
		  }
		}

		//record touches
		var touchList = [];
		
		//enum finger status
		var finger_status = {
			down: "d",
			move: "m",
			up: "u"
		};
				
		//touch view
		var canvas = document.getElementById(target_id);

		//show debug message
		var printMsg = function(target) {
			var str = "msg: ";
			var finger;
			for(var i in touchList) {
				
				finger = touchList[i];
				
				str += "finger: "+ i + " status:" + finger.status + "<br>";
				
			}
			target.innerHTML = str;
		};
		
		//detect pressure
		Pressure.set('#'+target_id, block, {polyfill: true});
		//pressure by jquery
		//$('#'+target_id).pressure(block);

		if("ontouchstart" in document) {
			this.touchEvent(touchList, finger_status, canvas);
			console.log('touch');
		}
		else {
			this.mouseEvent(touchList, finger_status, canvas);
			console.log('mouse');
		}
	},
	touchEvent: function(touchList, finger_status, canvas) {
		
		//send touch message
		var sendTouchMsg = function () {
			
			var line = "";
			var finger;
			var copyList = [];
			
			for(var i in touchList) {
				
				finger = touchList[i];
				
				if( finger.status !== 'u') {
					
					line += finger.status + " " +
						i + " " +
						finger.x + " " +
						finger.y + " " +
						finger.pressure + "\n";
						
					copyList[i] = finger;
				
				}
				else {
					
					line += finger.status + " " + i + "\n";
					
				}
				
			}
			line += "c" + "\n";
			touchList = copyList;
			return line;
		}
		
		var pushList = function(finger, status){
			touchList[finger.identifier] = {
						x: finger.clientX,
						y: finger.clientY,
						status: status
					};
			touchList[finger.identifier].pressure = mult_touch._pressure;
			
		}
		//touch down event
		this.addEvent(canvas, this.bindevent.down, function(e) {
			e.preventDefault();
			//sendTouches(touches);
			
			//var str = "";
			var finger;
			var touches = e.changedTouches;
			for(var a = 0;a < touches.length; a++) {
				
				finger = touches[a];
						
				pushList(finger, finger_status.down);
				
			}
			
			mult_touch._touchMsg = sendTouchMsg();
		});
		
		//touch move event
		this.addEvent(canvas, this.bindevent.move,function(e) {
			e.preventDefault();
			//sendTouches(touches);
			var finger;
			var touches = e.changedTouches;
			for(var a = 0;a < touches.length; a++) {
				
				finger = touches[a];
						
				pushList(finger, finger_status.move);
			}
			
			mult_touch._touchMsg = sendTouchMsg();
		});

		//touch up event
		this.addEvent(canvas, this.bindevent.up,function(e) {
			e.preventDefault();
			var finger;
			var touches = e.changedTouches;
			
			for(var a = 0;a < touches.length; a++) {
				
				finger = touches[a];
						
				pushList(finger, finger_status.up);
			}
		
			//printMsg(canvas);
			mult_touch._touchMsg = sendTouchMsg();
		});
		
	},
	mouseEvent: function(touchList, finger_status, canvas) {
		touchList['mouseclick'] = {
			status:undefined
		};
		//send touch message
		var sendTouchMsg = function () {
			
			var line = "";
			var finger;
			var copyList = [];
			copyList['mouseclick'] = {
				status:undefined
			};
			for(var i in touchList) {
				
				finger = touchList[i];
				
				if(finger.status){
					if( finger.status !== 'u') {
						
						line += finger.status + " " +
							i + " " +
							finger.x + " " +
							finger.y + " " +
							finger.pressure + "\n";
							
						copyList[i] = finger;
					
					}
					else {
						
						line += finger.status + " " + i + "\n";
						
					}
				}
				else {
					copyList['mouseclick'] = {
						status:undefined
					};
				}
				
			}
			if(finger.status){
				line += "c" + "\n";
				touchList = copyList;
			}
			return line;
		}
		
		var pushList = function(finger, status){
			touchList['mouseclick'] = {
						x: finger.clientX,
						y: finger.clientY,
						status: status
					};
			touchList['mouseclick'].pressure = mult_touch._pressure;
			
		}
		//touch down event
		this.addEvent(canvas, this.bindevent.down, function(e) {
			
			e.preventDefault();
			pushList(e,finger_status.down);
			mult_touch._touchMsg = sendTouchMsg();
			//console.log('d');
		});
		
		//touch move event
		this.addEvent(canvas, this.bindevent.move,function(e) {
			
			e.preventDefault();	
			if(touchList['mouseclick'].status){		
			
				if(touchList['mouseclick'].x !== e.clientX && touchList['mouseclick'].y !== e.clientY){
					
						pushList(e, finger_status.move);
						//console.log('m');
				}
				mult_touch._touchMsg = sendTouchMsg();
			}
		});

		//touch up event
		this.addEvent(canvas, this.bindevent.up,function(e) {
			e.preventDefault();
			pushList(e, finger_status.up);
			mult_touch._touchMsg = sendTouchMsg();
			//console.log('u');
		});
		
	}
};
