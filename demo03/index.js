var boxPlayer = document.getElementById('videoBox'),
  video = document.getElementById('video'),
  customController = document.getElementById('customController'),
  controllers = document.getElementById('controllers'),
  msg = document.getElementById('msg');
var btnPlayPause = document.getElementById('btnPP'),
  btnForward = document.getElementById('btnForward'),
  btnBackward = document.getElementById('btnBackward'),
  btnVolumeUp = document.getElementById('btnVolumeUp'),
  btnVolumeDown = document.getElementById('btnVolumeDown'),
  btnVolumeMute = document.getElementById('btnVolumeMute'),
  btnFullScreen = document.getElementById('btnFullScreen'),
  videoSeekbar = document.getElementById('videoSeekbar');
btnCapSwitcher = document.getElementById('btnCapSwitcher');


//播放前的准备工作
var playingStatus = false;
var tempNetworkState;
var tempTimestamp = new Date();
//这个仅仅做测试,出现异常用
var interval = setInterval(function () {
  var currentTimestamp = new Date();
  // console.log('readyState: ', video.readyState) //0 1 4
  // console.log('networkState: ', video.networkState);
  // console.log('buffered: ', video.buffered);
  if (video.networkState == 2 && video.networkState != tempNetworkState) {
    msg.innerHTML += '加载中...';
  } else if (video.networkState == 3) {
    msg.innerHTML = '网络错误无法加载该视频...';
    clearInterval(interval);
  }

  if (currentTimestamp - tempTimestamp > 15000) {
    //15s超时不明原因
    msg.innerHTML = '你电脑炸了吧';
    clearInterval(interval);
  }

  if (video.networkState == 1 || video.readyState >= 2) {
    playingStatus = true;
    msg.innerHTML += '视频播放就绪<br/>';
    clearInterval(interval);
  }
  tempNetworkState = video.networkState;
}, 100);

// 获取媒体文件的元数据,初始化媒体
video.addEventListener("loadedmetadata", function () {
  playingStatus = true;
  videoSeekbar.max = video.duration;
  videoSeekbar.onchange = function () {
    // console.log(this.value);
    video.currentTime = this.value;
  }

  //进度条显示隐藏
  customController.addEventListener('mouseenter',function(e) {
    videoSeekbar.style.display = 'block';
  }, false);
  customController.addEventListener('mouseleave',function(e) {
    videoSeekbar.style.display = 'none'
  }, false);
}, false);

video.addEventListener('loadeddata', function () {
  if (video.readyState >= 2) {
    msg.innerHTML = '加载完成...<br/>';
    controllers.style.display = 'block';
  }
});

// video.addEventListener('click', function () {
//   this.play();
// }, 'false');


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

// 字幕开关(注意在本次demo测试中只有一个字幕因此可以这样处理,如果存在多个字幕需要修改,因为还涉及到字幕选择等功能)
btnCapSwitcher.addEventListener('click', function () {
  if (video.textTracks[0].mode == 'hidden') {
    video.textTracks[0].mode = 'showing';
  } else {
    video.textTracks[0].mode = 'hidden';
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