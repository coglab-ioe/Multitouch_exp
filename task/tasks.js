// Task 1_1: one-touch in 0 degree
var startingPoint1_1 = new Point(500,300);
var endingPoint1_1 = new Point(500+200,300);
var trajectory1_1 = new Trajectory(startingPoint1_1,endingPoint1_1,50);
var task1_1 = new Task("one-touch in 0 degree", [trajectory1_1]);

// Task 1_2: one-touch in 45 degree
var startingPoint1_2 = new Point(500,300);
var endingPoint1_2 = new Point(500+200/1.414,300-200/1.414);
var trajectory1_2 = new Trajectory(startingPoint1_2,endingPoint1_2,50);
var task1_2 = new Task("one-touch in 45 degree", [trajectory1_2]);

// Task 1_3: one-touch in 90 degree
var startingPoint1_3 = new Point(500,300);
var endingPoint1_3 = new Point(500,300-200);
var trajectory1_3 = new Trajectory(startingPoint1_3,endingPoint1_3,50);
var task1_3 = new Task("one-touch in 90 degree", [trajectory1_3]);

// Task 1_4: one-touch in 135 degree
var startingPoint1_4 = new Point(500,300);
var endingPoint1_4 = new Point(500-200/1.414,300-200/1.414);
var trajectory1_4 = new Trajectory(startingPoint1_4,endingPoint1_4,50);
var task1_4 = new Task("one-touch in 135 degree", [trajectory1_4]);

// Task 1_5: one-touch in 180 degree
var startingPoint1_5 = new Point(500,300);
var endingPoint1_5 = new Point(500-200,300);
var trajectory1_5 = new Trajectory(startingPoint1_5,endingPoint1_5,50);
var task1_5 = new Task("one-touch in 180 degree", [trajectory1_5]);

// Task 1_6: one-touch in 225 degree
var startingPoint1_6 = new Point(500,300);
var endingPoint1_6 = new Point(500-200/1.414,300+200/1.414);
var trajectory1_6 = new Trajectory(startingPoint1_6,endingPoint1_6,50);
var task1_6 = new Task("one-touch in 225 degree", [trajectory1_6]);

// Task 1_7: one-touch in 270 degree
var startingPoint1_7 = new Point(500,300);
var endingPoint1_7 = new Point(500,300+200);
var trajectory1_7 = new Trajectory(startingPoint1_7,endingPoint1_7,50);
var task1_7 = new Task("one-touch in 270 degree", [trajectory1_7]);

// Task 1_8: one-touch in 315 degree
var startingPoint1_8 = new Point(500,300);
var endingPoint1_8 = new Point(500+200/1.414,300+200/1.414);
var trajectory1_8 = new Trajectory(startingPoint1_8,endingPoint1_8,50);
var task1_8 = new Task("one-touch in 315 degree", [trajectory1_8]);

// Task 2_1: two-touch (pinch) in 0 degree
var startingPoint2_1_1 = new Point(500+200,300);
var endingPoint2_1_1 = new Point(500+30,300);
var startingPoint2_1_2 = new Point(500-200,300);
var endingPoint2_1_2 = new Point(500-30,300);
var trajectory2_1_1 = new Trajectory(startingPoint2_1_1,endingPoint2_1_1,50);
var trajectory2_1_2 = new Trajectory(startingPoint2_1_2,endingPoint2_1_2,50);
var task2_1 = new Task("two-touch (pinch) in 0 degree", [trajectory2_1_1, trajectory2_1_2]);

// Task 2_2: two-touch (pinch) in 45 degree
var startingPoint2_2_1 = new Point(500+200/1.414,300-200/1.414);
var endingPoint2_2_1 = new Point(500+30/1.414,300-30/1.414);
var startingPoint2_2_2 = new Point(500-200/1.414,300+200/1.414);
var endingPoint2_2_2 = new Point(500-30/1.414,300+30/1.414);
var trajectory2_2_1 = new Trajectory(startingPoint2_2_1,endingPoint2_2_1,50);
var trajectory2_2_2 = new Trajectory(startingPoint2_2_2,endingPoint2_2_2,50);
var task2_2 = new Task("two-touch (pinch) in 45 degree", [trajectory2_2_1, trajectory2_2_2]);

// Task 2_3: two-touch (pinch) in 90 degree
var startingPoint2_3_1 = new Point(500,300-200);
var endingPoint2_3_1 = new Point(500,300-30/1.414);
var startingPoint2_3_2 = new Point(500,300+200);
var endingPoint2_3_2 = new Point(500,300+30/1.414);
var trajectory2_3_1 = new Trajectory(startingPoint2_3_1,endingPoint2_3_1,50);
var trajectory2_3_2 = new Trajectory(startingPoint2_3_2,endingPoint2_3_2,50);
var task2_3 = new Task("two-touch (pinch) in 90 degree", [trajectory2_3_1, trajectory2_3_2]);

// Task 2_4: two-touch (pinch) in 135 degree
var startingPoint2_4_1 = new Point(500-200/1.414,300-200/1.414);
var endingPoint2_4_1 = new Point(500-30/1.414,300-30/1.414);
var startingPoint2_4_2 = new Point(500+200/1.414,300+200/1.414);
var endingPoint2_4_2 = new Point(500+30/1.414,300+30/1.414);
var trajectory2_4_1 = new Trajectory(startingPoint2_4_1,endingPoint2_4_1,50);
var trajectory2_4_2 = new Trajectory(startingPoint2_4_2,endingPoint2_4_2,50);
var task2_4 = new Task("two-touch (pinch) in 135 degree", [trajectory2_4_1, trajectory2_4_2]);




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

//tasks = [
//  task1_1, task1_2, task1_3, task1_4, task1_5, task1_6, task1_7, task1_8
//]

tasks = [
  task2_1, task2_2, task2_3, task2_4
]
