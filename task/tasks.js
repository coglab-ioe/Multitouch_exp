// Task 1: one-touch in 0 degree
var startingPoint1 = new Point(500,300);
var endingPoint1 = new Point(500+200,300);
var trajectory1 = new Trajectory(startingPoint1,endingPoint1,50);
var task1 = new Task("one-touch in 0 degree", [trajectory1]);

// Task 2: one-touch in 45 degree
var startingPoint2 = new Point(500,300);
var endingPoint2 = new Point(500+200/1.414,300-200/1.414);
var trajectory2 = new Trajectory(startingPoint2,endingPoint2,50);
var task2 = new Task("one-touch in 45 degree", [trajectory2]);

// Task 3: one-touch in 90 degree
var startingPoint3 = new Point(500,300);
var endingPoint3 = new Point(500,300-200);
var trajectory3 = new Trajectory(startingPoint3,endingPoint3,50);
var task3 = new Task("one-touch in 90 degree", [trajectory3]);

// Task 4: one-touch in 135 degree
var startingPoint4 = new Point(500,300);
var endingPoint4 = new Point(500-200/1.414,300-200/1.414);
var trajectory4 = new Trajectory(startingPoint4,endingPoint4,50);
var task4 = new Task("one-touch in 135 degree", [trajectory4]);

// Task 5: one-touch in 180 degree
var startingPoint5 = new Point(500,300);
var endingPoint5 = new Point(500-200,300);
var trajectory5 = new Trajectory(startingPoint5,endingPoint5,50);
var task5 = new Task("one-touch in 180 degree", [trajectory5]);

// Task 6: one-touch in 225 degree
var startingPoint6 = new Point(500,300);
var endingPoint6 = new Point(500-200/1.414,300+200/1.414);
var trajectory6 = new Trajectory(startingPoint6,endingPoint6,50);
var task6 = new Task("one-touch in 225 degree", [trajectory6]);

// Task 7: one-touch in 270 degree
var startingPoint7 = new Point(500,300);
var endingPoint7 = new Point(500,300+200);
var trajectory7 = new Trajectory(startingPoint7,endingPoint7,50);
var task7 = new Task("one-touch in 270 degree", [trajectory7]);

// Task 8: one-touch in 315 degree
var startingPoint8 = new Point(500,300);
var endingPoint8 = new Point(500+200/1.414,300+200/1.414);
var trajectory8 = new Trajectory(startingPoint8,endingPoint8,50);
var task8 = new Task("one-touch in 315 degree", [trajectory8]);


// Task 1
//var startingPoint1 = new Point(0,0);
//var endingPoint1 = new Point(200,200);
//var trajectory1 = new Trajectory(startingPoint1,endingPoint1 );
//var startingPoint2 = new Point(400,100);
//var endingPoint2 = new Point(100,400);
//var trajectory2 = new Trajectory(startingPoint2,endingPoint2 );
//var task1 = new Task("1stTask", [trajectory1,trajectory2]);

// Task 2
//var startingPoint3 = new Point(300,300);
//var endingPoint3 = new Point(300,50);
//var trajectory3 = new Trajectory(startingPoint3,endingPoint3,20);
//var task2 = new Task("2ndTask", [trajectory3]);

// Task 3
//var startingPoint4 = new Point(100,200);
//var endingPoint4 = new Point(120,400);
//var startingPoint5 = new Point(200,200);
//var endingPoint5 = new Point(220,400);
//var trajectory4 = new Trajectory(startingPoint4,endingPoint4,100);
//var trajectory5 = new Trajectory(startingPoint5,endingPoint5,80);
//var task3 = new Task("3rdTask", [trajectory4, trajectory5]);

// Task 4
//var startingPoint6 = new Point(500,400);
//var endingPoint6 = new Point(300,400);
//var startingPoint7 = new Point(700,400);
//var endingPoint7 = new Point(900,400);
//var trajectory6 = new Trajectory(startingPoint6,endingPoint6,50);
//var trajectory7 = new Trajectory(startingPoint7,endingPoint7,50);
//var task4 = new Task("4thTask", [trajectory6, trajectory7]);

tasks = [
  task1, task2, task3, task4, task5, task6, task7, task8 
]

//tasks = [
//  task1, task2, task3, task4
//]
