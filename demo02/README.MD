
-------------------- demo 2 readme ------------------
对音量控制进行优化
增加了静音开关

增加了视频封面

其实据说全屏操作是个较为困难的操作.只能用一个全屏API,这个API的兼容情况如下
http://caniuse.com/#feat=fullscreen
实际操作方法
https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API



demo
https://css-tricks.com/examples/CustomVideoControlsFullscreen/





参考文献:
使用 JavaScript 控制 HTML5 视频播放器
https://msdn.microsoft.com/zh-cn/library/hh924823(v=vs.85).aspx

额外阅读:
如何自定义html5的controls
https://css-tricks.com/custom-controls-in-html5-video-full-screen/
我猜你大概不明白作者想干啥...其实这篇文章想说的是默认状态controls不写在video上就好了,但是全屏的时候会再次出现这是个问题,我要彻底隐藏他用我自己的喔~




-------------------- demo 1 readme ------------------
这是一个在没有controls的情况下
实现了PC端页面上基本的一些视频操作

有以下功能
播放 / 暂停
快进10s / 倒退10s
音量增加10 / 音量减少10

另外留下两个坑
音量比较特殊他的范围是0-1,所以到边界继续超出边界范围操作会报错
没有全屏功能
没有静音功能