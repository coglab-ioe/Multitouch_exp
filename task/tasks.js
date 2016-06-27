// Task 1

var startingPoint1 = new Point(100,100);
var endingPoint1 = new Point(200,200);
var trajectory1 = new Trajectory(startingPoint1,endingPoint1 );
var startingPoint2 = new Point(400,100);
var endingPoint2 = new Point(100,400);
var trajectory2 = new Trajectory(startingPoint2,endingPoint2 );
var task1 = new Task("1stTask", [trajectory1,trajectory2]);


var startingPoint3 = new Point(300,300);
var endingPoint3 = new Point(300,50);
var trajectory3 = new Trajectory(startingPoint3,endingPoint3,20);
var task2 = new Task("2ndTask", [trajectory3]);


var startingPoint4 = new Point(100,200);
var endingPoint4 = new Point(120,400);
var startingPoint5 = new Point(200,200);
var endingPoint5 = new Point(220,400);
var trajectory4 = new Trajectory(startingPoint4,endingPoint4,100);
var trajectory5 = new Trajectory(startingPoint5,endingPoint5,80);
var task3 = new Task("3rdTask", [trajectory4, trajectory5]);

var startingPoint6 = new Point(500,400);
var endingPoint6 = new Point(300,400);
var startingPoint7 = new Point(700,400);
var endingPoint7 = new Point(900,400);
var trajectory6 = new Trajectory(startingPoint6,endingPoint6,50);
var trajectory7 = new Trajectory(startingPoint7,endingPoint7,50);
var task4 = new Task("4thTask", [trajectory6, trajectory7]);



tasks = [
  task1, task2, task3
]
