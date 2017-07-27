# 基于HTML5的video标签的简易播放器制作(一)

### 开发前的说明:

#### 关于这个视频播放器

- **首先明确主要需求,该播放器具备以下功能**
  - 控制视频播放进度（快进和倒退）
  - 控制视频全屏和普通切换
  - 控制视频音量大小


- **其次需要清楚这是一个基于移动端的播放器,需要尽量兼容苹果手机和安卓手机**
- **最后写清楚开发文档**

### 开发前的思考:
HTML5已经有了一些关于video标签的简单操作功能（[w3school的HTML <video> 标签介绍](http://www.w3school.com.cn/tags/tag_video.asp)和[w3school的meida事件](http://www.w3school.com.cn/tags/html_ref_eventattributes.asp)），虽然在需求中没有提及 **静音(muted)** 和 **视频封面(poster)** ,这里建议还是加上去以提升用户体验。那么这里就不再详细说明，请大家自行看文档。

阅读完文档后我们可以先基于现有的原生事件来进行开发，最简单的就是基于PC端的开发工作。那么我们先开始吧。

#### 创建一个简单的DEMO

HTML:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>video player demo 2</title>
  <link rel="stylesheet" type="text/css" href="./index.css" />
</head>
<body>
  <div class="video-wrap" id="videoBox">
    <video width="640" height="480" class="video" id="video">
      <source src="../src/sample.mp4" type="video/mp4">
    </video>
    <div class="controller">
      <a href="javascript:;" id="btnPP">Play / Pause</a>
      <a href="javascript:;" id="btnForward">10s Forward</a>
      <a href="javascript:;" id="btnBackward">10s Backward</a>
      <a href="javascript:;" id="btnVolumeUp">Volume Up +10%</a>
      <a href="javascript:;" id="btnVolumeDown">Volume Down -10%</a>
      <a href="javascript:;" id="btnVolumeMute">Volume Mute</a>
      <a href="javascript:;" id="btnFullScreen">FullScreen Mode</a>      
    </div>
  </div>
  <script src="./index.js"></script>
</body>
</html>
```

JS:

```javascript
var boxPlayer = document.getElementById('videoBox'),
  video = document.getElementById('video');
var btnPlayPause = document.getElementById('btnPP'),
  btnForward = document.getElementById('btnForward'),
  btnBackward = document.getElementById('btnBackward'),
  btnVolumeUp = document.getElementById('btnVolumeUp'),
  btnVolumeDown = document.getElementById('btnVolumeDown'),
  btnVolumeMute = document.getElementById('btnVolumeMute'),
  btnFullScreen = document.getElementById('btnFullScreen');

var playingStatus = false;

video.addEventListener('click', function () {
  this.play();
}, 'false');


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
```

其实在制作简单的PC版本播放器时，有很多问题的这里简单说明一下：

1. 首先是播放音量问题，音量比较特殊，控制范围是0-1，并非我们想象的0-100，并且当音量增加或减少时超出边界范围操作会报错。

   参考MSDN [使用 JavaScript 控制 HTML5 视频播放器](https://msdn.microsoft.com/zh-cn/library/hh924823(v=vs.85).aspx)

2. 全屏切换操作，目前来看主流浏览器兼容性良好，但不排除其他意外情况。用的比较多的就是如JS代码中多种requestFullscreen的兼容写法；当然还有一种伪全屏，控制video标签定位及高宽100%来占满浏览器可视窗区域，这种是不推荐！这里有个DEMO和参考资料：

   MDN [Full Screen Example](https://developer.mozilla.org/samples/domref/fullscreen.html)

   Stackoverflow [Is there a way to make HTML5 video fullscreen?](https://stackoverflow.com/questions/1055214/is-there-a-way-to-make-html5-video-fullscreen)

   其他参考资料：

   [关于MDN对全屏的说明及监听键盘操作全屏切换](https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API#Watching_for_the_Enter_key)

   [Hiding Native HTML5 Video Controls in Full-Screen Mode](https://css-tricks.com/custom-controls-in-html5-video-full-screen/)（简单说明一下：该文介绍的时候自定义player UI在全屏状态下默认UI依旧呈现的问题解决方案，如果有兴趣自己做播放器，强烈推荐阅读）

3. 其实在本地进行测试的时候，大多使用的是本地媒体文件，就会容易忽视一个非常重要的问题-视频加载缓冲播放的问题。下面我将单独对此进行说明。

#### 完善这个播放器的功能

这次我将HTML代码内的视频SRC改成外链，进行相关测试，这样我们就需要考虑这些问题了

1. 视频地址错误或者视频格式错误造成的无法播放
2. 网络错误造成无法播放

为什么要考虑这些问题，原因很简单，不应该让用户死等或者反复刷新，避免用户困惑。

我在github上创建了一个加强版的[DEMO](https://github.com/whidy/video-player/tree/master/demo03)，就不再重复帖代码占位置了：）

总结及参考文献：

MSDN对于[canPlayType](https://msdn.microsoft.com/zh-cn/library/hh924823(v=vs.85).aspx)写了很多，我以为可以自动检测当前文件是否是可支持的格式，实际并不是，总而言之我认为它对开发播放器目前没有什么帮助。

[loadedmetadata](https://developer.mozilla.org/en-US/docs/Web/Events/loadedmetadata)是先于[loadeddata](https://developer.mozilla.org/en-US/docs/Web/Events/loadeddata)，前者获取到媒体文件的meta元数据，后者或许是加载到了视频的数据流，那么这里需要注意，readyState要写在后者才能触发播放，仅仅加载媒体文件元数据的情况下是无法播放的。迷迷糊糊的你赶紧去GOOGLE研究下吧，其实我也说不清楚哇哈哈。我DEMO中两种loaded都有写，可以自己改写试试。

关于媒体播放的两个重要的状态[networkState](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/networkState)和[readyState](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLMediaElement/readyState)是有必要了解下，我DEMO中做了个定时器检测。大部分资料来源[HTMLMediaElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement)

### 总结

其实，上面说的这些并只是视频播放器自带功能的一部分。还有很多个较为常见的功能未提及，希望大家自己如果有兴趣的话自己学习研究下，我简单总结下这些或许实用的功能：

1. 通过设置playbackRate来控制视频播放速度。附上摘自MSDN的说明

   > playbackRate 属性表示视频的固有或正常播放速率的放大器，其默认设置为 1。如果将该属性设置为 2，则会使播放速度加倍，而设置为 0.5 会使播放速度减半。 如果在 Windows Internet Explorer 9 中将 playbackRate 设置为负值，则会将其舍入为零，在实际中会暂停播放。在 Internet Explorer 10 中，playbackRate 为负值会造成反向播放视频。W3C 规范不建议设上限值，但 Internet Explorer 将 playbackRate 限制为最高 8x 速度。

   其实很多在线教程网站的播放器都有速度控制功能。还是很不错的~

2. 通过修改video的src来实现播放完后连续播放其他视频的功能。

3. 为视频增加字幕功能，在上面的DEMO我简单的做了尝试，有兴趣可以看看[Adding captions and subtitles to HTML5 video](https://developer.mozilla.org/en-US/Apps/Fundamentals/Audio_and_video_delivery/Adding_captions_and_subtitles_to_HTML5_video)

4. 通过监听window的blur和focus事件，当离开视频播放页时，暂停播放或者静音等其他播放器事件。适用场景比如你正在边打游戏边看视频，你的游戏开始需要加载5分钟，或者英雄死了，复活要1分钟，你决定切回网页看视频，看到一半游戏窗口主动被激活到当前窗口，视频依旧播放，那你还需要再切回浏览器进行暂停操作，这个的确很繁琐。（当然大部分游戏不会主动激活到当前窗口，不过有的还是会的。）

   具体操作可参考：[TURN THAT DOWN! Pausing or changing the volume of media when you leave the page](https://blogs.msdn.microsoft.com/mediastuff/2014/03/28/turn-that-down-pausing-or-changing-the-volume-of-media-when-you-leave-the-page/)

应该还有些比较实用的内容，我想到后再更新吧···

（PS：对于UI界面的优化后期可能会不定期更新哦~）



##### 额外阅读：

功能强大的[HTML5 Video Player](http://videojs.com/)里面有很多自定义功能，其实学习他的代码就够了

B站采用的[DPlayer](https://github.com/MoePlayer/DPlayer)

通过配置player参数来创建video的灵活性，扩展性强的网页版多媒体播放器[http://clappr.io](http://clappr.io/)

基于JQuery的HTML5 Audio & Video播放器[jPlayer](http://jplayer.org/)（兼容平台很强）



完成PC端基本功能后，我发现其实我对这个任务是跑题了，但是我觉得无论PC还是WAP，video还是需要尽可能的了解，废话少说，现在开始考虑移动端吧。

在移动端屏幕较小的情况下，我们或许难以留出很多按钮负责不同功能。那么这里就需要一些思考和技巧了。请看下期《基于HTML5的video标签的简易播放器制作（二）》（制作中···）