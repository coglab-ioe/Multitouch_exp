var tasks_results = [];
var colors = [
  {
    fill: "#009900",
    stroke : "#005500"
  },
  {
    fill: "#990000",
    stroke : "#550000"
  },
  {
    fill: "#000099",
    stroke : "#000044"
  }
  ,
  {
    fill: "#007777",
    stroke : "#003333"
  },
  {
    fill: "#777700",
    stroke : "#333300"
  }
];

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
  var taskIndex = 0;
  var self = {
      init: function() {
        canvas.addEventListener('touchstart', self.preDraw, false);
        canvas.addEventListener('touchmove', self.draw, false);
        canvas.addEventListener('mousedown', self.preDraw, false);
        canvas.addEventListener('mouseup', function(){pressed = false;}, false);
        canvas.addEventListener('mouseout', function(){pressed = false;}, false);
        canvas.addEventListener('mousemove', self.draw, false);
        self.updateTask();
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
      },
      updateTask: function(){

        var task = tasks[taskIndex];

        if(task.trajectories.length > colors.length){
          alert("Currently the maximum number of colors specified is " + colors.length + ".");
          return;
        }
        for (var i=0; i< task.trajectories.length; i++){
          /// starting point
          ctxt.beginPath();
          ctxt.arc(task.trajectories[i].startingPoint.x,task.trajectories[i].startingPoint.y,task.trajectories[i].radius,0,2*Math.PI);
          ctxt.fillStyle = colors[i].fill;
          ctxt.fill();
          ctxt.lineWidth = 5;
          ctxt.strokeStyle = colors[i].stroke;
          ctxt.stroke();
          ctxt.beginPath();
          ctxt.arc(task.trajectories[i].startingPoint.x,task.trajectories[i].startingPoint.y,task.trajectories[i].radius* 0.5,0,2*Math.PI);
          ctxt.fillStyle = "white";
          ctxt.fill();
          ctxt.stroke();

          ctxt.beginPath();
          ctxt.arc(task.trajectories[i].endingPoint.x,task.trajectories[i].endingPoint.y,task.trajectories[i].radius,0,2*Math.PI);
          ctxt.fillStyle = colors[i].fill;
          ctxt.fill();
          ctxt.lineWidth = 5;
          ctxt.strokeStyle = colors[i].stroke;
          ctxt.stroke();
        }

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
