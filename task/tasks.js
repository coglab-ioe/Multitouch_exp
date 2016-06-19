

var startingPoint1 = new Point(100,100);
var endingPoint1 = new Point(200,200);
var trajectory1 = new Trajectory(startingPoint1,endingPoint1 );
var startingPoint2 = new Point(400,100);
var endingPoint2 = new Point(100,400);
var trajectory2 = new Trajectory(startingPoint2,endingPoint2 );
var task_temp = new Task("initialTask1", [trajectory1,trajectory2]);
tasks = [
  task_temp
]
