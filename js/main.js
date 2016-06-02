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
          drawStuff();
  }
  resizeCanvas();

  function drawStuff() {
          // do your drawing stuff here
  }
});
