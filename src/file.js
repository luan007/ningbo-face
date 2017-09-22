import "./styles/frame.less";

// {
//   anger: 0.00008750693,
//   contempt: 0.0003515207,
//   disgust: 0.0000187189253,
//   fear: 0,
//   happiness: 0.000004826031,
//   neutral: 0.997983456,
//   sadness: 0.001484175,
//   surprise: 0.00006906028,
// }

function evaluate(s) {
  // var s = {
  //   anger: 0.00008750693,
  //   contempt: 0.0003515207,
  //   disgust: 0.0000187189253,
  //   fear: 0,
  //   happiness: 0.500004826031,
  //   neutral: 0.397983456,
  //   sadness: 0.001484175,
  //   surprise: 0.00006906028
  // };
  //make it arr
  var q = Object.keys(s);
  q = q.sort(function(a, b) {
    return s[b] - s[a];
  });

  var emotional_complexity = 0;
  for (var i in s) {
    emotional_complexity += Math.pow(s[i], 2);
  }
  emotional_complexity /= q.length;
  emotional_complexity = 1 - emotional_complexity;
  console.log(emotional_complexity);
  console.log(q);

  if (emotional_complexity > 0.97) {
    return Math.random() > 0.4 ? "strange2" : "contempt_disgust";
  }

  //simple
  if (q.indexOf("anger") < 1) {
    return "anger";
  }

  if (q.indexOf("happiness") < 1) {
    return Math.random() > 0.5 ? "lauuugh" : "female-happy";
  }

  if (q.indexOf("surprise") < 1) {
    return "supri";
  }

  if (q.indexOf("sadness") == 0) {
    return "cry";
  }

  if (q.indexOf("sadness") < 1) {
    return "sad";
  }

  if (q.indexOf("fear") < 4) {
    return "nerv";
  }

  if (q.indexOf("neutral") == 0) {
    return "nothing";
  }

  if (q.indexOf("happiness") < 4 || q.indexOf("contempt") < 4) {
    return "composite-smile";
  }

  if (q.indexOf("disgust") < 2 || q.indexOf("contempt") < 2) {
    return "contempt_disgust";
  }

  if (q.indexOf("anger") < 4) {
    return "compo-anger";
  }
  //nothin
  return Math.random() > 0.5 ? "strange" : "strange2";
}

function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function(e) {};
    reader.readAsDataURL(input.files[0]);
  }
}

var scores = {};

var mutex = false;
function upload(img) {
  if (mutex) return;

  document.body.classList.remove("good");
  document.body.classList.remove("resultMode");
  mutex = true;
  document.body.classList.add("mask");
  var xhr = new XMLHttpRequest();
  xhr.onload = done;
  xhr.onerror = err;
  xhr.open(
    "POST",
    "https://westus.api.cognitive.microsoft.com/emotion/v1.0/recognize"
  );
  xhr.setRequestHeader("Content-Type", "application/octet-stream");
  xhr.setRequestHeader(
    "Ocp-Apim-Subscription-Key",
    "4acfac6414c44ac791e1fea12de4795c"
  );
  // img.toDataURL
  //   function(B) {
  //     alert("!" + B.size);
  //     xhr.send(B);
  //   }
  // , "jpeg", 0.3);

  fetch(blobUrl)
    .then(res => res.blob())
    .then(blob => {
      // alert("Blob Size " + blob.size);
      xhr.send(blob);
    });
}

function done(e) {
  if (mutex) {
    mutex = false;
    document.body.classList.remove("mask");
  }
  try {
    var t = JSON.parse(e.srcElement.response);
    console.log(t);
    if (t.length == 0 || t[0] == undefined) {
      scores = {};
      alert("无法找到人脸, 你在哪里啊??!!");
    } else {
      scores = t[0].scores;
      var result = evaluate(scores);
      console.log(result);

      document.querySelector(".text").style.backgroundImage =
        "url(/assets/results/" + result + ".png)";
      document.body.classList.add("good");
    }
  } catch (e) {
    alert(e);
    alert("发生错误，请重试 :(");
  }
}

function err(e) {
  if (mutex) {
    mutex = false;
    document.body.classList.remove("mask");
  }
  alert("发生错误，请重试 :(");
}

var blobUrl = "";
document.getElementById("capture").onchange = function(e) {
  loadImage(
    e.target.files[0],
    function(img) {
      blobUrl = img.toDataURL("image/jpeg", 50);
      document.getElementById("myphoto").style.backgroundImage =
        "url(" + blobUrl + ")";
      document.body.classList.add("showImage");
      upload(img);
    },
    {
      canvas: true,
      maxWidth: 600,
      orientation: true
    }
  );
};
