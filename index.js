['floor', 'random'].forEach(function(p) { window[p] = Math[p]; })
function randint(n) { return floor(random() * n); }
function choose(arr) { return arr[randint(arr.length)]; }


var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var W = canvas.width = window.innerWidth;
var H = canvas.height = window.innerHeight;

var grid = Grid(W, H, 5).init();
ctx.strokeStyle = 'hsla(60, 60%, 47%,.4)';

function draw() {
  ctx.clearRect(0, 0, W, H);
  grid.draw(ctx);
  grid.jiggle();
};

var interval = setInterval(draw, 50);
document.onclick = function() {
  clearInterval(interval);
  grid.init();
  interval = setInterval(draw, 30);
};
document.onkeypress = function(e) {
  if (e.which === 32) clearInterval(interval);
};

function Grid(w, h, size) {
  var ox = (w % size) / 2;
  var oy = (h % size) / 2;
  var segments = [];
  
  return {
    init: function() {
      segments.length = 0;
      for (var x = ox; x < w + size; x += size) {
        for (var y = oy; y < h + size; y += size) {
          segments.push({a: {x:x,y:y}, b:{x:x-size,y:y}});
          segments.push({a: {x:x,y:y}, b:{x:x,y:y-size}});
        }
      }
      return this;
    },
    draw: function(ctx) {
      ctx.beginPath();
      segments.forEach(function(seg) {
        ctx.moveTo(seg.a.x, seg.a.y);
        ctx.lineTo(seg.b.x, seg.b.y);
      });
      ctx.closePath();
      ctx.stroke();
    }, 
    jiggle: function() {
      segments.forEach(function(seg) {
        seg.a.x += (random()*1-0.5)/2;
        seg.a.y += (random()*1-0.5)/2;
        seg.b.x += (random()*1-0.5)/2;
        seg.b.y += (random()*1-0.5)/2;
      });
    }
  };
}  