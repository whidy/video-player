打开终端
npm install
npm run start

点击demo03即可


(内容正在更新中...不会我每次保存都会发送消息给小组成员吧= =第一次做任务如有打扰请谅解...)

开发前的说明:

关于这个视频播放器

- 首先明确主要需求,该播放器具备以下功能

1. 控制视频播放进度（快进和倒退）
2. 控制视频全屏和普通切换
3. 控制视频音量大小

- 其次需要清楚这是一个基于移动端的播放器,需要尽量兼容苹果手机和安卓手机
- 最后写清楚开发文档

开发前的思考:

HTML5已经有了一些关于video标签的简单操作功能（w3school的HTML <video> 标签介绍和w3school的meida事件），虽然在需求中没有提及 静音(muted) 和 视频封面(poster) ,这里建议还是加上去以提升用户体验。那么这里就不再详细说明，请大家自行看文档。

阅读完文档后我们可以先基于现有的原生事件来进行开发，最简单的就是基于PC端的开发工作。那么我们先开始做基础结构吧。



完成各项功能后,开始考虑移动端的问题.在移动端屏幕较小的情况下,我们或许难以留出很多歌按钮负责不同功能.很多视频播放软件都有左右"滑动视频"来控制进度,上下滑动控制音量甚至是显示亮度,我们可以考虑尝试实现.

blablabla...
