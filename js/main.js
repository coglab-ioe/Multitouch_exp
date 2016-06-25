
var taskIndex = -1;
var firstTrial = true;
var tasks_results = [];
var DEBUG = true;
var draw_path = true;
var path_color = "black";
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



$(function() {

  var canvas = document.getElementById('multitouch_task'),
          context = canvas.getContext('2d');

  var canvas_span = 0.98;
  var DEFAULT_COUNTDOWN = 3;
  var countdown = DEFAULT_COUNTDOWN;

  var resizeCanvas = function() {
    canvas.width = window.innerWidth * canvas_span;
    canvas.height = window.innerHeight* canvas_span;
  }
  var nextTask = function(){
    taskIndex++;
    if(taskIndex >= tasks.length){
      alert("ERROR: this should not happen");
    }
    $(".layer-wrapper").hide();
    firstTrial = false;
    var task = tasks[taskIndex];
    if(task.trajectories.length > colors.length){
      alert("Currently the maximum number of colors specified is " + colors.length + ".");
      return;
    }
    myCanvas.updateTask(task);

    $(".countdown").toggle();
    $(".tasks").toggle();
  }
  var updateTask = function(){

    $(".countdown").toggle();
    $(".tasks").toggle();
    $("#countdown-number").text(DEFAULT_COUNTDOWN);
    countdown = DEFAULT_COUNTDOWN;
    var nextTa
    if ( DEFAULT_COUNTDOWN == 0){
      nextTask();
    }
    else{
      var countdownHandle = setInterval(function(){
        countdown--;
        $("#countdown-number").text(countdown);
        if (countdown > 0)
          return;
        nextTask();
        clearInterval(countdownHandle);

      },1000);
    }
  };

  var endTask = function(){
    $(".layer-wrapper").show();
    $("#final-trace-outcome").val($("#final-trace-outcome").val()+ tasks[taskIndex].reportTraces());
    $("#final-task-outcome").val($("#final-task-outcome").val()+ tasks[taskIndex].reportTrajectories());
    if(taskIndex == tasks.length-1){// this is the last tasks
      $(".tasks-done").toggle();
      $(".tasks").toggle();
    }else{
      $(".task-number").text(taskIndex+2);
    }

  }




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
            if(draw_path)
              self.drawEndPoint(moveX, moveY, path_color);
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
                if (tasks[taskIndex].touchstart(now, moveX, moveY, id) && draw_path)
                  self.drawEndPoint(moveX, moveY, path_color);
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
            if(draw_path)
              self.drawEndPoint(point.x, point.y, path_color);
          });
          taskStarted = false;
          clickid = 0;
          endTask();

        },
        touch: function(event) {
            var now = new Date().getTime(),
                e = event,
                hmm = {};
            if (typeof(event.touches) == "undefined" && pressed){
              // this if block part is for mouse event
              var moveX = event.pageX - offset.left ,
                  moveY = event.pageY - offset.top ;
              if(draw_path)
                self.draw(clickid, moveX, moveY, path_color);
              lines[clickid].x = moveX;
              lines[clickid].y = moveY;
              tasks[taskIndex].touchmove(now, event.pageX - offset.left, event.pageY - offset.top, clickid);
            }else {
              // this blocks is for touch events.
              $.each(event.touches, function(i, touch) {
                  var id = touch.identifier;
                  var moveX = touch.pageX - offset.left ,
                      moveY = touch.pageY - offset.top ;
                  if (draw_path)self.draw(id, moveX, moveY, path_color);
                  lines[id].x = moveX;
                  lines[id].y = moveY;
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
        draw: function(i, newX, newY, color) {
            ctxt.strokeStyle = color;
            ctxt.beginPath();
            ctxt.moveTo(lines[i].x, lines[i].y);
            ctxt.lineTo(newX, newY);
            ctxt.stroke();
            ctxt.closePath();
        },
        drawEndPoint:function(x,y,color){
          ctxt.beginPath();
          ctxt.arc(x,y,EndPointRadius,0,2*Math.PI);
          ctxt.lineWidth = 5;
          ctxt.strokeStyle = color;
          ctxt.stroke();
        },
        updateTask: function(task){
          ctxt.clearRect(0, 0, canvas.width, canvas.height);

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

  // resize the canvas to fill browser window dynamically
  window.addEventListener('resize', resizeCanvas, false);

  resizeCanvas();
  var myCanvas = new CanvasDrawr({
        id: "multitouch_task",
        size: 10
    });
  $(".total-task-number").text(tasks.length);
  $(".task-number").text(taskIndex+2);

  $(".countdown").toggle();
  $(".tasks-done").toggle();

  $('#cp7').colorpicker({
      color: '#000000',
      container: true,
      inline: true
  })

  .on("changeColor", function(e){
    path_color = e.color.toHex();
    console.log("color change - :" +path_color )
  })

  $("#next-task").click(updateTask);
  $("#start-over").click(function(){
    if( firstTrial || confirm("Did you save data? Textareas will be initialized.")){
      taskIndex = -1;
      $(".task-number").text(taskIndex+2);
      $("#final-trace-outcome").val("");
      $("#final-task-outcome").val("");
      $(".tasks-done").toggle();
      $(".tasks").toggle();
    }
    else{ // wait for the user to save ata
      return;
    }
  });

  $("#path-draw-toggle").click(function(event){
    draw_path = !draw_path;
    if(draw_path){
      $("#path-draw-toggle-status").text("(True)");
    }else{
      $("#path-draw-toggle-status").text("(False)");
    }
  });
  $("#countdown-increase").click(function(event){
    DEFAULT_COUNTDOWN++;
    $("#countdown-input").text(DEFAULT_COUNTDOWN);
  });

  $("#countdown-decrease").click(function(event){
    if(DEFAULT_COUNTDOWN==0)
      return;
    DEFAULT_COUNTDOWN--;
    $("#countdown-input").text(DEFAULT_COUNTDOWN);

  });

  $("#tab-main-button").click(function(){
    $("#tab-main").show();
    $("#tab-setting").hide();
    $("#tab-data").hide();
  });

  $("#tab-setting-button").click(function(){
    $("#tab-setting").show();
    $("#tab-main").hide();
    $("#tab-data").hide();


  });

  $("#tab-data-button").click(function(){
    $("#tab-data").show();
    $("#tab-setting").hide();
    $("#tab-main").hide();
  });

  $("#tab-data").hide();
  $("#tab-setting").hide();


});
