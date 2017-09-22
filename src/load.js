import "./styles/load.less";

var progress = document.querySelector(".progress");

var sources = [
  "/assets/frame.png",
  "/assets/waveb.png",
  "/assets/mountain.png",
  "/assets/bus.png",
  "/assets/boombeep.png",
  "/assets/hair.png",
  "/assets/top.png",
  "/assets/c1.png",
  "/assets/c2.png",
  "/assets/c3.png",
  "/assets/g1.png",
  "/assets/g2.png",
  "/assets/g3.png",
  "/assets/road.png",
  "/assets/bigmouth.png",
  "/assets/txt-g.png",
  "/assets/txt-p.png",
  "/assets/txt-gg.png",
  "/assets/btn_main.png",
  "/assets/frame.png",
  "/assets/analz.png",
  "/assets/btnw_qr.png",
  "/assets/frameX.png",
  "/assets/cam2.png",
  "/assets/confirm.png",
];

loadImages(sources, initGame); // calls initGame after *all* images have finished loading

function loadImages(sources, callback) {
  var loadedImages = 0;
  var images = [];
  var numImages = sources.length;
  for (var src = 0; src < numImages; src++) {
    images[src] = new Image();
    images[src].onload = images[src].onerror = function() {
      loadedImages++;
      var r = Math.round(loadedImages / numImages * 100);

      progress.style.transform =
        "scale(" + loadedImages / numImages + "," + "1)";
      if (loadedImages >= numImages) {
        callback(images);
      }
    };
    images[src].src = sources[src];
  }
}

var TIMEOUT = 2000; //2000;
var TRIGGERED = false;
setTimeout(function() {
  if (TRIGGERED) {
    setOut();
  }
  TRIGGERED = true;
}, TIMEOUT);

function initGame(images) {
  if (TRIGGERED) {
    setOut();
  } else {
    TRIGGERED = true;
  }
}

function setOut() {
  document.body.classList.add("out");
  setTimeout(function() {
    document.body.classList.add("show");
  }, 300);

  setTimeout(function() {
    document.body.classList.add("stage2");
  }, 6500);//6500);
}

