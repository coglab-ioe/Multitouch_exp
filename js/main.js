var tasks_results = [];


var tasks_results = [];



var CanvasDrawr = function(options) {
  var canvas = document.getElementById(options.id),
      ctxt = canvas.getContext("2d");
  canvas.style.width = '100%'
  canvas.width = canvas.offsetWidth;
  canvas.style.width = '';
  ctxt.lineWidth = options.size || Math.ceil(Math.random() * 35);
  ctxt.lineCap = options.lineCap || "round";
  ctxt.pX = undefined;
  ctxt.pY = undefined;
  var lines = [, , ];
  var offset = $(canvas).offset();
  var pressed = false;
  var self = {
      init: function() {
        canvas.addEventListener('touchstart', self.preDraw, false);
        canvas.addEventListener('touchmove', self.draw, false);
        canvas.addEventListener('mousedown', self.preDraw, false);
        canvas.addEventListener('mouseup', function(){pressed = false;}, false);
        canvas.addEventListener('mouseout', function(){pressed = false;}, false);
        canvas.addEventListener('mousemove', self.draw, false);
      },
      preDraw: function(event) {
        if (typeof(event.touches) == "undefined"){
          pressed = true;
          console.log("pressed:"+ pressed);

          var id = 0,
              colors = ["red", "green", "yellow", "blue", "magenta", "orangered"],
              mycolor = colors[Math.floor(Math.random() * colors.length)];
          lines[id] = {
              x: event.pageX - offset.left,
              y: event.pageY - offset.top,
              color: mycolor
          };
        }else {
          $.each(event.touches, function(i, touch) {
              var id = touch.identifier,
                  colors = ["red", "green", "yellow", "blue", "magenta", "orangered"],
                  mycolor = colors[Math.floor(Math.random() * colors.length)];
              lines[id] = {
                  x: this.pageX - offset.left,
                  y: this.pageY - offset.top,
                  color: mycolor
              };
          });
        }
          event.preventDefault();
      },
      draw: function(event) {
          var e = event,
              hmm = {};
          if (typeof(event.touches) == "undefined" && pressed){
            var id =0,
                moveX = event.pageX - offset.left - lines[id].x,
                moveY = event.pageY - offset.top - lines[id].y;
            var ret = self.move(0, moveX, moveY);
            lines[0].x = ret.x;
            lines[0].y = ret.y;
          }else {
            $.each(event.touches, function(i, touch) {
                var id = touch.identifier,
                    moveX = this.pageX - offset.left - lines[id].x,
                    moveY = this.pageY - offset.top - lines[id].y;
                var ret = self.move(id, moveX, moveY);
                lines[id].x = ret.x;
                lines[id].y = ret.y;
            });
          }
          event.preventDefault();
      },
      move: function(i, changeX, changeY) {
          ctxt.strokeStyle = lines[i].color;
          ctxt.beginPath();
          ctxt.moveTo(lines[i].x, lines[i].y);
          ctxt.lineTo(lines[i].x + changeX, lines[i].y + changeY);
          ctxt.stroke();
          ctxt.closePath();
          return {
              x: lines[i].x + changeX,
              y: lines[i].y + changeY
          };
      }
  };
  return self.init();
};

$(function() {
  var canvas = document.getElementById('multitouch_task'),
          context = canvas.getContext('2d');

  var canvas_span = 0.98;

  // resize the canvas to fill browser window dynamically
  window.addEventListener('resize', resizeCanvas, false);

  function resizeCanvas() {
          canvas.width = window.innerWidth * canvas_span;
          canvas.height = window.innerHeight* canvas_span;
          /**
           * Your drawings need to be inside this function otherwise they will be reset when
           * you resize the browser window and the canvas goes will be cleared.
           */
  }
  resizeCanvas();
  var super_awesome_multitouch_drawing_canvas_thingy = new CanvasDrawr({
        id: "multitouch_task",
        size: 10
    });

  function drawStuff() {
          // do your drawing stuff here
  }
});
