'use strict';

const segment = window.innerWidth / (p+1),
      latitudes = Array.apply(null, {length: p }).map(function(n, idx) {
        return (idx + 1) * segment;
      }),
      canvas = document.getElementById('canvas'),
      ctx = canvas.getContext('2d'),
      lineWidth = 1,
      spacing = 100,
      step = 5;

      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;

      ctx.fillStyle = '#151515';

var y = spacing, idx = 0;

drawSequence(tranlateSequence(combos[0]));

// Drawing
function drawLine(opts) {
  let start = opts[0],
      end = opts[1],
      y = opts[2];
  
  drawPoint(start, y);

  if (start < end) {
    requestAnimationFrame(drawLine.bind(this, [start + step, end, y]));
  }
}

function drawPoint(start, y) {
  ctx.fillRect(start, y, step, lineWidth);
}

// Breakout Combos

function tranlateSequence(sequence) {
  return sequence.map(splitPair);
}

function splitPair(pair) {
  return pair.split(delimiter);
}


function drawSequence(sequence) {
  for (let i = 0; i < sequence.length; i++) {
    let startIdx = parseInt(sequence[i][0]),
        endIdx = parseInt(sequence[i][1]);

    drawLine([latitudes[startIdx], latitudes[endIdx], y]);

    y+=100;

    canvas.height += y;
  }
}


