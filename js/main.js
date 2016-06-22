var tasks_results = [];
var DEBUG = true;
var timeoutHandle = [];
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
var EndPointRadius = 20;

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
  var numTaskLeft = 0, taskStarted = false;
  var taskIndex = 0;
  var clickid = 0;
  var self = {
      init: function() {
        canvas.addEventListener('touchstart', self.preTouch, false);
        canvas.addEventListener('touchmove', self.touch, false);
        canvas.addEventListener('touchend', self.postTouch, false);
        canvas.addEventListener('touchcancel', self.postTouch, false);
        canvas.addEventListener('mousedown', self.preTouch, false);
        canvas.addEventListener('mousemove', self.touch, false);
        canvas.addEventListener('mouseup', self.postTouch, false);
        canvas.addEventListener('mouseout', self.postTouch, false);
    //    self.updateTask();
        return self;
      },
      preTouch: function(event) {

        var now = new Date().getTime();
        if ( numTaskLeft == 0){
          numTaskLeft = tasks[taskIndex].trajectories.length;
          taskStarted = true;
        }
        if(DEBUG) console.log("preTouch : numTaskLeft : " + numTaskLeft);

        if (typeof(event.touches) == "undefined"){
          pressed = true;
          console.log("pressed:"+ pressed);

          var colors = ["red", "green", "yellow", "blue", "magenta", "orangered"],
              mycolor = colors[Math.floor(Math.random() * colors.length)],
              moveX = event.pageX - offset.left ,
              moveY = event.pageY - offset.top ;

          lines[clickid] = {
              x: moveX,
              y: moveY,
              color: mycolor
          };
          tasks[taskIndex].touchstart(now, moveX, moveY, clickid);
          self.drawEndPoint(moveX, moveY, "black");
        }else {
          $.each(event.touches, function(i, touch) {
              var id = touch.identifier;
              var  colors = ["red", "green", "yellow", "blue", "magenta", "orangered"],
                  mycolor = colors[Math.floor(Math.random() * colors.length)],
                  moveX = touch.pageX - offset.left ,
                  moveY = touch.pageY - offset.top ;

              lines[id] = {
                  x: moveX,
                  y: moveY,
                  color: mycolor
              };
              tasks[taskIndex].touchstart(now, moveX, moveY, id);
              self.drawEndPoint(moveX, moveY, "black");

          });
        }
        event.preventDefault();
      },
      postTouch: function(event) {
        var now = new Date().getTime();
        if(!taskStarted)
          return;

        numTaskLeft--;
        if(DEBUG) console.log("postTouch: numTaskLeft: " + numTaskLeft);

        pressed = false;
        if (typeof(event.touches) == "undefined"){
          clickid++;
        }else {
          // nothing to do for now.
        }

        if(numTaskLeft==0){
          self.clearTimeout();
          self.endTask(now);
        }
        else if(numTaskLeft < 0){
          if(DEBUG) alert("numTaskLeft < 0: deal with the boundary cases. ")
        }
        event.preventDefault();
      },
      clearTimeout: function(){
        for (var i=0; i< timeoutHandle.length; i++){
          clearTimeout(timeoutHandle[i]);
        }
        timeoutHandle = [];
      },
      endTask: function(now){
        // the task is ended ;
        tasks[taskIndex].taskend(now);
        tasks[taskIndex].getLastPoints().forEach(function(point){
          self.drawEndPoint(point.x, point.y, "green");
        });
        taskStarted = false;
        $(".layer-wrapper").show();
        $("#final-trace-outcome").val($("#final-trace-outcome").val()+ tasks[taskIndex].reportTraces());
        $("#final-task-outcome").val($("#final-task-outcome").val()+ tasks[taskIndex].reportTrajectories());
        clickid = 0;
      },
      touch: function(event) {
          var now = new Date().getTime(),
              e = event,
              hmm = {};
          if (typeof(event.touches) == "undefined" && pressed){
            // this if block part is for mouse event
            var moveX = event.pageX - offset.left - lines[clickid].x,
                moveY = event.pageY - offset.top - lines[clickid].y;
            var ret = self.draw(clickid, moveX, moveY);
            lines[clickid].x = ret.x;
            lines[clickid].y = ret.y;
            tasks[taskIndex].touchmove(now, event.pageX - offset.left, event.pageY - offset.top, clickid);
          }else {
            // this blocks is for touch events.
            $.each(event.touches, function(i, touch) {
                var id = touch.identifier;
                var moveX = touch.pageX - offset.left - lines[id].x,
                    moveY = touch.pageY - offset.top - lines[id].y;
                var ret = self.draw(id, moveX, moveY);
                lines[id].x = ret.x;
                lines[id].y = ret.y;
                tasks[taskIndex].touchmove(now, this.pageX - offset.left, this.pageY - offset.top, id);
                self.clearTimeout();
                var timeout = setTimeout(function(){
                  self.endTask(now);
                }, 2000);
                timeoutHandle.push(timeout);
            });
          }
        //  event.preventDefault();
      },
      draw: function(i, changeX, changeY) {
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
      drawEndPoint:function(x,y,color){
        ctxt.beginPath();
        ctxt.arc(x,y,EndPointRadius,0,2*Math.PI);
        ctxt.lineWidth = 5;
        ctxt.strokeStyle = color;
        ctxt.stroke();
      },
      updateTask: function(){
        ctxt.clearRect(0, 0, canvas.width, canvas.height);

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
        task.taskstart();
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
  var myCanvas = new CanvasDrawr({
        id: "multitouch_task",
        size: 10
    });

  $("#next-task").click(function(){
    $(".layer-wrapper").hide();
    myCanvas.updateTask();
  });
});
