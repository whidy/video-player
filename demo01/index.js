var boxPlayer = document.getElementById('videoBox'),
  video = document.getElementById('video');
var btnPlayPause = document.getElementById('btnPP'),
  btnForward = document.getElementById('btnForward'),
  btnBackward = document.getElementById('btnBackward'),
  btnVolumeUp = document.getElementById('btnVolumeUp'),
  btnVolumeDown = document.getElementById('btnVolumeDown');

var playingStatus = false;
//播放暂停功能
btnPlayPause.onclick = function (e) {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

// 前进十秒
btnForward.onclick = function () {
  video.currentTime += 10;
}

// 后退十秒
btnBackward.onclick = function () {
  video.currentTime -= 10;
}

// 音量增加
btnVolumeUp.onclick = function () {
  video.volume  += 0.1;
}

// 音量减少
btnVolumeDown.onclick = function () {
  video.volume  -= 0.1;  
}