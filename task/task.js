var DEFAULT_RADIUS = 50;
var DEBUG = true;

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
  }
}

var Trajectory = function(startingPoint, endingPoint, radius = DEFAULT_RADIUS, time  = Infinity){
  this.startingPoint = startingPoint;
  this.endingPoint = endingPoint;
  this.radius = radius;
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
  data : {},
  touch_id : [],
  taskstart:function(){
    if(DEBUG) console.log("Task (" + this.name + ") started.")
    this.startTime = new Date().getTime();
  },
  touchstart:function(){
    if(DEBUG) console.log("Task (" + this.name + ") started.");
    this.log(this.startTime)

  },
  touchend: function(){
    if(DEBUG) console.log("Task (" + this.name + ") ended.")
  },
  log: function(_time, _x, _y, _type,_touch_id){
    if(this.touch_id.length===0){
      this.data[_touch_id] = [];
      this.touch_id.push(_touch_id)
    }
    data[_touch_id].push({time:_time - this.startTime, x:_x, y:_y, type:_type});
  },
  reportTraces: function(){
    var string = "";
    for (var i=0; i< this.touch_id.length; i++){
      for (var j=0; j< data[this.touch_id[i]].length; j++){
        string += this.name + ",";
        string += this.data[touch_id[i]][j].time + ",";
        string += this.data[touch_id[i]][j].x + ",";
        string += this.data[touch_id[i]][j].y + ",";
        string += this.data[touch_id[i]][j].type + "\n";
      }
    }
    return string;
  },
  reportTrajectories: function(){
    var string = "";
    for (var i=0; i< this.touch_id.length; i++){
      var minDist = Infinity;
      var selectedTrajectoryIndex = -1;
      var lastIndex =this.data[this.touch_id[i]].length-1
      for (var j=0; j< this.trajectories.length; j++){
        var distance = this.trajectories[j].startingPoint.distXY(this.data[this.touch_id[i]][0].x, this.data[this.touch_id[i]][0].y);
        distance += this.trajectories[j].endingPoint.distXY(this.data[this.touch_id[i]][lastIndex].x,   this.data[this.touch_id[i]][lastIndex].y);
        if(minDist >distance ){
          selectedTrajectoryIndex = j;
          minDist = distance;
        }
      }
      // found trajectory :

      if(selectedTrajectoryIndex == -1){
        if(DEBUG) alert("error");
        return;
      }
      var dist = this.trajectories[selectedTrajectoryIndex].startingPoint.distXY(this.data[this.touch_id[i]][0].x, this.data[this.touch_id[i]][0].y);
// task starint point
      string += this.name + ",";
      string += "task start" + ",";
      string += this.data[this.touch_id[i]][0].time + ",,,,,,\n";
      // touch starting point
      string += this.name + ",";
      string += "touch start" + ",";
      string += this.data[this.touch_id[i]][0].time + ",";
      string += this.data[this.touch_id[i]][0].x + ",";
      string += this.data[this.touch_id[i]][0].y + ",";
      string += this.trajectories[selectedTrajectoryIndex].startingPoint.x + ",";
      string += this.trajectories[selectedTrajectoryIndex].startingPoint.y + ",";
      string += dist + ",";
      string += (dist < this.trajectories[selectedTrajectoryIndex].radius) + "\n";
      // touch ending point
      dist = this.trajectories[selectedTrajectoryIndex].endingPoint.distXY(this.data[this.touch_id[i]][lastIndex].x, this.data[this.touch_id[i]][lastIndex].y);
      string += this.name + ",";
      string += "touch end" + ",";
      string += this.data[this.touch_id[i]][lastIndex].time + ",";
      string += this.data[this.touch_id[i]][lastIndex].x + ",";
      string += this.data[this.touch_id[i]][lastIndex].y + ",";
      string += this.trajectories[selectedTrajectoryIndex].endingPoint.x + ",";
      string += this.trajectories[selectedTrajectoryIndex].endingPoint.y + ",";
      string += dist + ",";
      string += (dist < this.trajectories[selectedTrajectoryIndex].radius) + "\n";
    }
    return string;
  }
}
