import "./styles/frame.less";

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
  .then((blob) => {
    alert("Blob Size " + blob.size);
    xhr.send(
      blob
    )
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
