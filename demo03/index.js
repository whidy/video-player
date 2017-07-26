var boxPlayer = document.getElementById('videoBox'),
  video = document.getElementById('video');
var btnPlayPause = document.getElementById('btnPP'),
  btnForward = document.getElementById('btnForward'),
  btnBackward = document.getElementById('btnBackward'),
  btnVolumeUp = document.getElementById('btnVolumeUp'),
  btnVolumeDown = document.getElementById('btnVolumeDown'),
  btnVolumeMute = document.getElementById('btnVolumeMute'),
  btnFullScreen = document.getElementById('btnFullScreen');

//播放前的准备工作





var playingStatus = false;

video.addEventListener('click', function () {
  this.play();
}, 'false');

setInterval(function() {
  // console.log(video.readyState) //0 1 4
  console.log(video.readyState) //0 1 4
}, 10);

//播放暂停功能
btnPlayPause.addEventListener('click', function () {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}, 'false');

// 前进十秒
btnForward.addEventListener('click', function () {
  video.currentTime += 10;
}, 'false');

// 后退十秒
btnBackward.addEventListener('click', function () {
  video.currentTime -= 10;
}, 'false');

// 音量增加
btnVolumeUp.addEventListener('click', function () {
  setVol(.1);
}, 'false');

// 音量减少
btnVolumeDown.addEventListener('click', function () {
  setVol(-.1);
}, 'false');

// 静音开关
btnVolumeMute.addEventListener('click', function () {
  if (video.muted) {
    video.muted = false;
  } else {
    video.muted = true;
  }
}, 'false');

// 音量控制的正确方法
function setVol(value) {
  var vol = video.volume;
  vol += value;
  //  test for range 0 - 1 to avoid exceptions
  if (vol >= 0 && vol <= 1) {
    // if valid value, use it
    video.volume = vol;
  } else {
    // otherwise substitute a 0 or 1
    video.volume = (vol < 0) ? 0 : 1;
  }
}

// 全屏切换
var isFullscreen = false;
btnFullScreen.addEventListener('click', function () {
  if (!isFullscreen) {
    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if (video.mozRequestFullScreen) {
      container.mozRequestFullScreen(); // Firefox
    } else if (video.webkitRequestFullscreen) {
      video.webkitRequestFullscreen(); // Chrome and Safari
    }
    isFullscreen = true;
  } else {
    if (document.cancelFullScreen) {
      document.cancelFullScreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    }
    isFullscreen = false;
  }
}, 'false');