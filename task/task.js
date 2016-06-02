var DEFAULT_RADIUS = 50;
var DEBUG = 0;

var Point = function(x,y){
  this.x = x;
  this.y = y;
}

Point.prototype={
  distance: function(point){
    return Math.pow(Math.pow(p1.x-p2.x,2) + Math.pow(p1.y-p2.y,2), 0.5);
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
    return (this.startingPoint.distance(s) <= radius)
      && (this.endingPoint.distance(e) <= radius)
      && (time <= this.time);
  },
  end_succeed: function(s,time){
    return (this.startingPoint.distance(s) <= radius)
      && (this.endingPoint.distance(e) <= radius)
      && (time <= this.time);
  }
}

var task = function(name, trajectories){
  this.name = name;
  this.trajectories = trajectories;
};

task.prototype = {
  data : {},
  touch_id : [],
  taskstart:function(){
    if(DEBUG) console.log("Task (" + this.name + ") started.")
    this.startTime = new Date().getTime();
  },
  touchstart:function(){
    if(DEBUG) console.log("Task (" + this.name + ") started.");
  },
  touchend: function(){
    if(DEBUG) console.log("Task (" + this.name + ") ended.")
  },
  log: function(_time, _x, _y, _type,_touch_id){
    if(data[touch_id] == null){
      this.data[_touch_id] = [];
      this.touch_id.push(_touch_id)
    }

    data[_touch_id].push({time:_time - this.startTime, x:_x, y:_y, type:_type});
  },
  export: function(){
    var string = "";
    for (var i=0; i< touch_id.length; i++){
      for (var j=0; j< data[touch_id[i]].length; j++){
        string += this.name + ",";
        string += this.data[touch_id[i]][j].time + ",";
        string += this.data[touch_id[i]][j]._x + ",";
        string += this.data[touch_id[i]][j]._y + ",";
        string += this.data[touch_id[i]][j].type + "\n";
      }
    }
    return string;
  }
}
