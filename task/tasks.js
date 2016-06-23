// Task 1 

var startingPoint1 = new Point(100,100);
var endingPoint1 = new Point(200,200);
var trajectory1 = new Trajectory(startingPoint1,endingPoint1 );
var startingPoint2 = new Point(400,100);
var endingPoint2 = new Point(100,400);
var trajectory2 = new Trajectory(startingPoint2,endingPoint2 );
var task1 = new Task("initialTask1", [trajectory1,trajectory2]);


var startingPoint3 = new Point(50,50);
var endingPoint3 = new Point(300,300);
var trajectory3 = new Trajectory(startingPoint1,endingPoint1,200);
var startingPoint4 = new Point(200,100);
var endingPoint4 = new Point(500,400);
var trajectory4 = new Trajectory(startingPoint2,endingPoint2,50 );
var task2 = new Task("2ndTask", [trajectory3,trajectory4]);


tasks = [
  task1, task2
]
