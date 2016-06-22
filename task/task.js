var DEFAULT_RADIUS = 50;
var DEBUG = false;

var Point = function(x,y){
  this.x = x;
  this.y = y;
}

Point.prototype={
  distP: function(point){
    return Math.pow(Math.pow(this.x-point.x,2) + Math.pow(this.y-point.y,2), 0.5);
  },
  distXY: function(x,y){
    return Math.pow(Math.pow(this.x-x,2) + Math.pow(this.y-y,2), 0.5);
  },
  withinP: function(point, dist){
    return this.distP(point) <= dist;
  },
  withinXY: function(x,y, dist){
    return this.distXY(x,y) <= dist;
  }
}

var Trajectory = function(startingPoint, endingPoint,radius, time){
  this.startingPoint = startingPoint;
  this.endingPoint = endingPoint;
  this.radius = (radius?radius:DEFAULT_RADIUS);
  this.time = time;
};

Trajectory.prototype = {
  register: function(event_num){
    this.num= event_num;
  },
  start_succeed: function(s,time){
    return (this.startingPoint.distP(s) <= radius)
      && (this.endingPoint.distP(e) <= radius)
      && (time <= this.time);
  },
  end_succeed: function(s,time){
    return (this.startingPoint.distP(s) <= radius)
      && (this.endingPoint.distP(e) <= radius)
      && (time <= this.time);
  }
}

var Task = function(name, trajectories){
  this.name = name;
  this.trajectories = trajectories;
};

Task.prototype = {
  traceData : {},
  taskData : [],
  touch_id : [],
  taskstart:function(){
    if(DEBUG) console.log("Task (" + this.name + ") started.")
    this.startTime = new Date().getTime();
    this.taskData.push({time: this.startTime, type: "task-start"});
  },
  touchstart:function(_time, _x, _y, _touch_id){
    if(DEBUG) console.log("Task (" + this.name + ") started.");
    this.traceData[_touch_id] = [];
    this.touch_id.push(_touch_id)
    this.log(_time, _x, _y, "touch-start",_touch_id);
  },
  touchend: function(_time, _x, _y, _touch_id){
    if(DEBUG) console.log("Task (" + this.name + ") ended.")
    if (_touch_id !== null && this.traceData[_touch_id] !== undefined){
      this.log(_time, _x, _y, "touch-end",_touch_id);
    }
    else{
      // find the closest place
      var selectedTrajectoryIndex = -1;
      var minDist = Infinity;
      var touchEndpoint = new Point(_x,_y);
      for (var i=0; i< this.touch_id.length; i++){
        if (this.traceData[this.touch_id[i]].length ==0)
          continue;

        var lastIndex =this.traceData[this.touch_id[i]].length-1
        var distance = touchEndpoint.distXY(this.traceData[this.touch_id[i]][lastIndex].x,   this.traceData[this.touch_id[i]][lastIndex].y);
        if(minDist >distance ){
          selectedTrajectoryIndex = i;
          minDist = distance;
        }
      }

      if ( selectedTrajectoryIndex == -1){
        alert("Error : could not find the closest path");
        return;
      }
      this.log(_time, _x, _y, "touch-end",this.touch_id[selectedTrajectoryIndex]);
    }
  },
  taskend: function(_time){
    if(DEBUG) console.log("Task (" + this.name + ") ended.")
    this.endTime = new Date().getTime();
    this.taskData.push({time: _time, type: "task-end"});
  },
  touchmove: function(_time, _x, _y, _touch_id){
    //if(DEBUG) console.log("Task (" + this.name + ") ended.")
    this.log(_time, _x, _y, "touch-move",_touch_id);
  },
  log: function(_time, _x, _y, _type,_touch_id){

    if(DEBUG)console.log(_time+", "+_x+", "+_y+", "+_type+", "+_touch_id);
    this.traceData[_touch_id].push({time:_time - this.startTime, x:_x, y:_y, type:_type});
  },
  reportTraces: function(){
    var string = "";
    for (var i=0; i< this.touch_id.length; i++){
      for (var j=0; j< this.traceData[this.touch_id[i]].length; j++){
        string += this.name + ",";
        string += this.touch_id[i] + ",";
        string += this.traceData[this.touch_id[i]][j].time + ",";
        string += this.traceData[this.touch_id[i]][j].x + ",";
        string += this.traceData[this.touch_id[i]][j].y + ",";
        string += this.traceData[this.touch_id[i]][j].type + "\n";
      }
    }
    return string;
  },
  reportTrajectories: function(){
    var string = "";
    string += this.name + ",";
    string += "task-start" + ",0"+ ",,,,,,\n"

    for (var i=0; i< this.touch_id.length; i++){
      var minDist = Infinity;
      var selectedTrajectoryIndex = -1;
      var lastIndex =this.traceData[this.touch_id[i]].length-1
      for (var j=0; j< this.trajectories.length; j++){
        var distance = this.trajectories[j].startingPoint.distXY(this.traceData[this.touch_id[i]][0].x, this.traceData[this.touch_id[i]][0].y);
        distance += this.trajectories[j].endingPoint.distXY(this.traceData[this.touch_id[i]][lastIndex].x,   this.traceData[this.touch_id[i]][lastIndex].y);
        if(minDist >distance ){
          selectedTrajectoryIndex = j;
          minDist = distance;
        }
      }
      // found trajectory :

      if(selectedTrajectoryIndex == -1){
        if(DEBUG) alert("selectedTrajectoryIndex == -1");
        return;
      }
      var dist = this.trajectories[selectedTrajectoryIndex].startingPoint.distXY(this.traceData[this.touch_id[i]][0].x, this.traceData[this.touch_id[i]][0].y);
// task starint point
      // touch starting point
      string += this.name + ",";
      string += "touch-start" + ",";
      string += this.traceData[this.touch_id[i]][0].time + ",";
      string += this.traceData[this.touch_id[i]][0].x + ",";
      string += this.traceData[this.touch_id[i]][0].y + ",";
      string += this.trajectories[selectedTrajectoryIndex].startingPoint.x + ",";
      string += this.trajectories[selectedTrajectoryIndex].startingPoint.y + ",";
      string += dist + ",";
      string += (dist < this.trajectories[selectedTrajectoryIndex].radius) + "\n";
      // touch ending point
      dist = this.trajectories[selectedTrajectoryIndex].endingPoint.distXY(this.traceData[this.touch_id[i]][lastIndex].x, this.traceData[this.touch_id[i]][lastIndex].y);
      string += this.name + ",";
      string += "touch-end" + ",";
      string += this.traceData[this.touch_id[i]][lastIndex].time + ",";
      string += this.traceData[this.touch_id[i]][lastIndex].x + ",";
      string += this.traceData[this.touch_id[i]][lastIndex].y + ",";
      string += this.trajectories[selectedTrajectoryIndex].endingPoint.x + ",";
      string += this.trajectories[selectedTrajectoryIndex].endingPoint.y + ",";
      string += dist + ",";
      string += (dist < this.trajectories[selectedTrajectoryIndex].radius) + "\n";
    }
    string += this.name + ",";
    string += "task-end" + ",";
    string += this.taskData[1].time - this.taskData[0].time + ",,,,,,\n";
    return string;
  }
}
