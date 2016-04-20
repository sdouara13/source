'use strict';

describe('mult_touch test', function() {
  //test canvas
  var canvas = document.createElement('canvas');
  canvas.setAttribute('id','touchView');
  canvas.style.position= 'absolute';
  canvas.style.width = '500px';
  canvas.style.height = '500px';
  canvas.style.top = '0px';
  canvas.style.left = '0px';
  canvas.style.backgroundColor = 'lightblue';
  document.body.appendChild(canvas);

  it("Object mult_touch has defined", function () {
    expect(mult_touch).toBeDefined();

  });

  if("mult_touch.init has defined", function () {
        expect(mult_touch.init).toBeDefined();
   });

  it("test output message", function () {
      mult_touch.init('touchView');
      $('#touchView').on('mousemove', function () {
        if(mult_touch.msg !== null)
        console.log(mult_touch.msg);
      });
      //expect(mult_touch.msg).toBe();
  });

  /*afterEach(function () {
    var evObj = document.createEvent('MouseEvents');
    evObj.initEvent( 'mousemove', true, true, window, 1, 0, 0, 50, 50, false, false, false, false, 1, null );
    canvas.dispatchEvent(evObj);
  })*/



});


//initEvent(
// 'type', //事件类型
// bubbles, //是否冒泡
// cancelable, //是否可以使用e.preventDefault取消冒泡
// windowObject,//窗口
// detail, //鼠标单击量
// screenX, // 屏幕 x 坐标
// screenY,//屏幕 y 坐标
// clientX, // 客户机 x 坐标
// clientY, //客户机 y 坐标
// ctrlKey, //是否在 Event 期间按下 control 键
// altKey, //是否在 Event 期间按下 alt 键
// shiftKey, //是否在 Event 期间按下 shift 键
// metaKey, //是否在 Event 期间按下 meta 键
// button, // Event 的鼠标按键,0代表没有按，1代表左键，2345678看百度
// relatedTarget//Event 的相关 EventTarget
// )
//