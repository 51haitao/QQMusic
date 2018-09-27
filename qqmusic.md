### QQmusic 开发日志

### 布局分析

> 分为 头、身体、尾三部分

> QQ音乐 logo--pic 大小

```css
.logo--pic{
    width: 78px;
    height: 21px;
    opacity: .3;
}
```

> 身体和尾部 有版心  1200

身体部分 分为:left部分 和 right 部分

left部分: 分为 上 和 下

上面部分菜单不会跟着滚动而滚动,可见是固定定位

下面部分可以滚动  


#### 音乐播放 

> 音乐播放图标切换

页面中有两个播放按钮  一个在上面的 歌曲子菜单中
一个在下面的播放菜单中
这两个按钮无论播放那个都可以播放音乐,而且会切换按钮图标

音乐列表是动态创建的,我们只能通过事件委托来实现

在动态创建音乐列表的时创建的子菜单中添加类名,根据此类型找到点击的哪个播放按钮;
然后再给该歌曲的子菜单添加暂停播放的类名,
点击其它歌曲播放按钮的时候,除了当前被点击的其余的都应该还原


#### 子菜单音乐播放


#### 子菜单音乐删除



#### 底部菜单音乐播放

1.获取底部控制菜单的三个按钮,并且添加事件

2.播放歌曲,判断之前是否播放过歌曲,播放过则,继续播放该歌曲,未播放过,则默认播放第一首歌曲

3.上一首按钮    当前播放歌曲的index(索引) - 1   当前歌曲的索引为 player.currentIndex

4.下一首按钮    当前播放歌曲的index(索引) + 1

5.播放的是第一首或最后一首歌曲时,点击上一首/下一首,则回到最后一首/第一首



#### 初始化歌曲信息

> 需要初始化的地方:右侧专辑歌手信息 + 比不控制菜单进度条处 + 播放音乐时的背景(mask_bg)

1.歌曲列表加载完成后,初始化歌曲信息

2.默认加载第一首歌曲的信息

3.获取要修改歌曲信息处的元素(类名)

4.给获取到元素赋值

5.切换歌曲信息播放时的背景


#### 进度条(progress) 点击

0.新建progress.js文件

```javascript
(function(window) {

    // 定义Progress构造函数
    function Progress() {
        return new Progress.prototype.init();
    }

    // 给Pregress函数的原型添加方法
    Progress.prototype = {
        constructor: Progress,
        init: function() {

        }
    }

    // 
    Progress.prototype.init.prototype = Progress.prototype;
    window.Progress = Progress;

})(window);
```

1.获取要操作的元素,将获取到的元素传递给progress函数

```javascript
    /**
     *  2.获取歌曲列表
     */

    var $progressBar = (".music__btn__progress__bar");
    var $progressLine = (".music__btn__progress__line");
    var $progressDot = (".music__btn__progress__dot");

    //
    var progress = Progress($progressBar, $progressLine, $progressDot);
```

2.progress方法接收参数,return接收的参数,并初始化

```javascript
(function(window) {

    // 定义Progress构造函数
    function Progress($progressBar, $progressLine, $progressDot) {
        return new Progress.prototype.init($progressBar, $progressLine, $progressDot);
    }

    // 给Pregress函数的原型添加方法
    Progress.prototype = {
        constructor: Progress,
        init: function($progressBar, $progressLine, $progressDot) {
            this.$progressBar = $progressBar;
            this.$progressLine = $progressLine;
            this.$progressDot = $progressDot;
        },
        progressClick: function() {

        },
        progressMove: function() {

        }
    }

    // 
    Progress.prototype.init.prototype = Progress.prototype;
    window.Progress = Progress;

})(window);
```

3.监听背景的点击



3.1 获取进度条默认距离窗口的位置

3.2 获取点击位置距离窗口的位置

3.3 设置progressLine的宽度

3.4 根据progressLine的位置修改progressDot的定位


#### 进度条(progress)拖动



#### 音乐时间同步









#### 错误记录

```javascript
progress.js:19 Uncaught TypeError: this.$progressBar.click is not a function
    at init.progressClick (progress.js:19)
    at HTMLDocument.<anonymous> (index.js:32)
    at fire (jquery-1.12.4.js:3232)
    at Object.fireWith [as resolveWith] (jquery-1.12.4.js:3362)
    at Function.ready (jquery-1.12.4.js:3582)
    at HTMLDocument.completed (jquery-1.12.4.js:3617)
```
错误:
```javascript
init {$progressBar: ".music__btn__progress__bar", $progressLine: ".music__btn__progress__line", $progressDot: ".music__btn__progress__dot"}
```

> `一般都是获取元素时出错了`

正确:
```javascript
init {$progressBar: jQuery.fn.init(1), $progressLine: jQuery.fn.init(1), $progressDot: jQuery.fn.init(1)}
```



```javascript
HTML5 audio element - seek slider - Failed to set the 'currentTime' property on 'HTMLMediaElement': The provided double value is non-finite
```











```
                    <!-- s:musiclist__bd -->
                    <ul class="musiclist__bd">
                        <!-- <li class="muscilist__bd--item clearfix">
                            <div class="musiclist__bd--check"><i></i></div>
                            <div class="musiclist__bd--number">1</div>
                            <div class="musiclist__bd--songname">
                                <span title="如果你爱上了别人">如果你爱上了别人</span>
                                <div class="musiclist__bd--menu">
                                    <a href="javascript:void(0);" title="播放"></a>
                                    <a href="javascript:void(0);" title="添加到歌单"></a>
                                    <a href="javascript:void(0);" title="下载"></a>
                                    <a href="javascript:void(0);" title="分享"></a>
                                </div>
                            </div>
                            <div class="musiclist__bd--singer">徐誉滕</div>
                            <div class="musiclist__bd--songtime">
                                <span>04:01</span>
                                <a href="javascript:void(0);" title="删除" class="musiclist__bd--del"></a>
                            </div>
                        </li>
                        <li class="muscilist__bd--item clearfix">
                            <div class="musiclist__bd--check"><i></i></div>
                            <div class="musiclist__bd--number">2</div>
                            <div class="musiclist__bd--songname">
                                <span title="盗将行">盗将行</span>
                                <div class="musiclist__bd--menu">
                                    <a href="javascript:void(0);" title="播放"></a>
                                    <a href="javascript:void(0);" title="添加到歌单"></a>
                                    <a href="javascript:void(0);" title="下载"></a>
                                    <a href="javascript:void(0);" title="分享"></a>
                                </div>
                            </div>
                            <div class="musiclist__bd--singer">花粥/马雨阳</div>
                            <div class="musiclist__bd--songtime">
                                <span>03:18</span>
                                <a href="javascript:void(0);" title="删除" class="musiclist__bd--del"></a>
                            </div>
                        </li>
                        <li class="muscilist__bd--item clearfix">
                            <div class="musiclist__bd--check"><i></i></div>
                            <div class="musiclist__bd--number">1</div>
                            <div class="musiclist__bd--songname">
                                <span title="如果你爱上了别人">如果你爱上了别人</span>
                                <div class="musiclist__bd--menu">
                                    <a href="javascript:void(0);" title="播放"></a>
                                    <a href="javascript:void(0);" title="添加到歌单"></a>
                                    <a href="javascript:void(0);" title="下载"></a>
                                    <a href="javascript:void(0);" title="分享"></a>
                                </div>
                            </div>
                            <div class="musiclist__bd--singer">徐誉滕</div>
                            <div class="musiclist__bd--songtime">
                                <span>04:01</span>
                                <a href="javascript:void(0);" title="删除" class="musiclist__bd--del"></a>
                            </div>
                        </li>
                        <li class="muscilist__bd--item clearfix">
                            <div class="musiclist__bd--check"><i></i></div>
                            <div class="musiclist__bd--number">2</div>
                            <div class="musiclist__bd--songname">
                                <span title="盗将行">盗将行</span>
                                <div class="musiclist__bd--menu">
                                    <a href="javascript:void(0);" title="播放"></a>
                                    <a href="javascript:void(0);" title="添加到歌单"></a>
                                    <a href="javascript:void(0);" title="下载"></a>
                                    <a href="javascript:void(0);" title="分享"></a>
                                </div>
                            </div>
                            <div class="musiclist__bd--singer">花粥/马雨阳</div>
                            <div class="musiclist__bd--songtime">
                                <span>03:18</span>
                                <a href="javascript:void(0);" title="删除" class="musiclist__bd--del"></a>
                            </div>
                        </li>
                        <li class="muscilist__bd--item clearfix">
                            <div class="musiclist__bd--check"><i></i></div>
                            <div class="musiclist__bd--number">1</div>
                            <div class="musiclist__bd--songname">
                                <span title="如果你爱上了别人">如果你爱上了别人</span>
                                <div class="musiclist__bd--menu">
                                    <a href="javascript:void(0);" title="播放"></a>
                                    <a href="javascript:void(0);" title="添加到歌单"></a>
                                    <a href="javascript:void(0);" title="下载"></a>
                                    <a href="javascript:void(0);" title="分享"></a>
                                </div>
                            </div>
                            <div class="musiclist__bd--singer">徐誉滕</div>
                            <div class="musiclist__bd--songtime">
                                <span>04:01</span>
                                <a href="javascript:void(0);" title="删除" class="musiclist__bd--del"></a>
                            </div>
                        </li>
                        <li class="muscilist__bd--item clearfix">
                            <div class="musiclist__bd--check"><i></i></div>
                            <div class="musiclist__bd--number">2</div>
                            <div class="musiclist__bd--songname">
                                <span title="盗将行">盗将行</span>
                                <div class="musiclist__bd--menu">
                                    <a href="javascript:void(0);" title="播放"></a>
                                    <a href="javascript:void(0);" title="添加到歌单"></a>
                                    <a href="javascript:void(0);" title="下载"></a>
                                    <a href="javascript:void(0);" title="分享"></a>
                                </div>
                            </div>
                            <div class="musiclist__bd--singer">花粥/马雨阳</div>
                            <div class="musiclist__bd--songtime">
                                <span>03:18</span>
                                <a href="javascript:void(0);" title="删除" class="musiclist__bd--del"></a>
                            </div>
                        </li>
                        <li class="muscilist__bd--item clearfix">
                            <div class="musiclist__bd--check"><i></i></div>
                            <div class="musiclist__bd--number">1</div>
                            <div class="musiclist__bd--songname">
                                <span title="如果你爱上了别人">如果你爱上了别人</span>
                                <div class="musiclist__bd--menu">
                                    <a href="javascript:void(0);" title="播放"></a>
                                    <a href="javascript:void(0);" title="添加到歌单"></a>
                                    <a href="javascript:void(0);" title="下载"></a>
                                    <a href="javascript:void(0);" title="分享"></a>
                                </div>
                            </div>
                            <div class="musiclist__bd--singer">徐誉滕</div>
                            <div class="musiclist__bd--songtime">
                                <span>04:01</span>
                                <a href="javascript:void(0);" title="删除" class="musiclist__bd--del"></a>
                            </div>
                        </li>
                        <li class="muscilist__bd--item clearfix">
                            <div class="musiclist__bd--check"><i></i></div>
                            <div class="musiclist__bd--number">2</div>
                            <div class="musiclist__bd--songname">
                                <span title="盗将行">盗将行</span>
                                <div class="musiclist__bd--menu">
                                    <a href="javascript:void(0);" title="播放"></a>
                                    <a href="javascript:void(0);" title="添加到歌单"></a>
                                    <a href="javascript:void(0);" title="下载"></a>
                                    <a href="javascript:void(0);" title="分享"></a>
                                </div>
                            </div>
                            <div class="musiclist__bd--singer">花粥/马雨阳</div>
                            <div class="musiclist__bd--songtime">
                                <span>03:18</span>
                                <a href="javascript:void(0);" title="删除" class="musiclist__bd--del"></a>
                            </div>
                        </li>
                        <li class="muscilist__bd--item clearfix">
                            <div class="musiclist__bd--check"><i></i></div>
                            <div class="musiclist__bd--number">1</div>
                            <div class="musiclist__bd--songname">
                                <span title="如果你爱上了别人">如果你爱上了别人</span>
                                <div class="musiclist__bd--menu">
                                    <a href="javascript:void(0);" title="播放"></a>
                                    <a href="javascript:void(0);" title="添加到歌单"></a>
                                    <a href="javascript:void(0);" title="下载"></a>
                                    <a href="javascript:void(0);" title="分享"></a>
                                </div>
                            </div>
                            <div class="musiclist__bd--singer">徐誉滕</div>
                            <div class="musiclist__bd--songtime">
                                <span>04:01</span>
                                <a href="javascript:void(0);" title="删除" class="musiclist__bd--del"></a>
                            </div>
                        </li>
                        <li class="muscilist__bd--item clearfix">
                            <div class="musiclist__bd--check"><i></i></div>
                            <div class="musiclist__bd--number">2</div>
                            <div class="musiclist__bd--songname">
                                <span title="盗将行">盗将行</span>
                                <div class="musiclist__bd--menu">
                                    <a href="javascript:void(0);" title="播放"></a>
                                    <a href="javascript:void(0);" title="添加到歌单"></a>
                                    <a href="javascript:void(0);" title="下载"></a>
                                    <a href="javascript:void(0);" title="分享"></a>
                                </div>
                            </div>
                            <div class="musiclist__bd--singer">花粥/马雨阳</div>
                            <div class="musiclist__bd--songtime">
                                <span>03:18</span>
                                <a href="javascript:void(0);" title="删除" class="musiclist__bd--del"></a>
                            </div>
                        </li>
                        <li class="muscilist__bd--item clearfix">
                            <div class="musiclist__bd--check"><i></i></div>
                            <div class="musiclist__bd--number">1</div>
                            <div class="musiclist__bd--songname">
                                <span title="如果你爱上了别人">如果你爱上了别人</span>
                                <div class="musiclist__bd--menu">
                                    <a href="javascript:void(0);" title="播放"></a>
                                    <a href="javascript:void(0);" title="添加到歌单"></a>
                                    <a href="javascript:void(0);" title="下载"></a>
                                    <a href="javascript:void(0);" title="分享"></a>
                                </div>
                            </div>
                            <div class="musiclist__bd--singer">徐誉滕</div>
                            <div class="musiclist__bd--songtime">
                                <span>04:01</span>
                                <a href="javascript:void(0);" title="删除" class="musiclist__bd--del"></a>
                            </div>
                        </li>
                        <li class="muscilist__bd--item clearfix">
                            <div class="musiclist__bd--check"><i></i></div>
                            <div class="musiclist__bd--number">2</div>
                            <div class="musiclist__bd--songname">
                                <span title="盗将行">盗将行</span>
                                <div class="musiclist__bd--menu">
                                    <a href="javascript:void(0);" title="播放"></a>
                                    <a href="javascript:void(0);" title="添加到歌单"></a>
                                    <a href="javascript:void(0);" title="下载"></a>
                                    <a href="javascript:void(0);" title="分享"></a>
                                </div>
                            </div>
                            <div class="musiclist__bd--singer">花粥/马雨阳</div>
                            <div class="musiclist__bd--songtime">
                                <span>03:18</span>
                                <a href="javascript:void(0);" title="删除" class="musiclist__bd--del"></a>
                            </div>
                        </li>
                        <li class="muscilist__bd--item clearfix">
                            <div class="musiclist__bd--check"><i></i></div>
                            <div class="musiclist__bd--number">1</div>
                            <div class="musiclist__bd--songname">
                                <span title="如果你爱上了别人">如果你爱上了别人</span>
                                <div class="musiclist__bd--menu">
                                    <a href="javascript:void(0);" title="播放"></a>
                                    <a href="javascript:void(0);" title="添加到歌单"></a>
                                    <a href="javascript:void(0);" title="下载"></a>
                                    <a href="javascript:void(0);" title="分享"></a>
                                </div>
                            </div>
                            <div class="musiclist__bd--singer">徐誉滕</div>
                            <div class="musiclist__bd--songtime">
                                <span>04:01</span>
                                <a href="javascript:void(0);" title="删除" class="musiclist__bd--del"></a>
                            </div>
                        </li>
                        <li class="muscilist__bd--item clearfix">
                            <div class="musiclist__bd--check"><i></i></div>
                            <div class="musiclist__bd--number">2</div>
                            <div class="musiclist__bd--songname">
                                <span title="盗将行">盗将行</span>
                                <div class="musiclist__bd--menu">
                                    <a href="javascript:void(0);" title="播放"></a>
                                    <a href="javascript:void(0);" title="添加到歌单"></a>
                                    <a href="javascript:void(0);" title="下载"></a>
                                    <a href="javascript:void(0);" title="分享"></a>
                                </div>
                            </div>
                            <div class="musiclist__bd--singer">花粥/马雨阳</div>
                            <div class="musiclist__bd--songtime">
                                <span>03:18</span>
                                <a href="javascript:void(0);" title="删除" class="musiclist__bd--del"></a>
                            </div>
                        </li>
                        <li class="muscilist__bd--item clearfix">
                            <div class="musiclist__bd--check"><i></i></div>
                            <div class="musiclist__bd--number">1</div>
                            <div class="musiclist__bd--songname">
                                <span title="如果你爱上了别人">如果你爱上了别人</span>
                                <div class="musiclist__bd--menu">
                                    <a href="javascript:void(0);" title="播放"></a>
                                    <a href="javascript:void(0);" title="添加到歌单"></a>
                                    <a href="javascript:void(0);" title="下载"></a>
                                    <a href="javascript:void(0);" title="分享"></a>
                                </div>
                            </div>
                            <div class="musiclist__bd--singer">徐誉滕</div>
                            <div class="musiclist__bd--songtime">
                                <span>04:01</span>
                                <a href="javascript:void(0);" title="删除" class="musiclist__bd--del"></a>
                            </div>
                        </li>
                        <li class="muscilist__bd--item clearfix">
                            <div class="musiclist__bd--check"><i></i></div>
                            <div class="musiclist__bd--number">2</div>
                            <div class="musiclist__bd--songname">
                                <span title="盗将行">盗将行</span>
                                <div class="musiclist__bd--menu">
                                    <a href="javascript:void(0);" title="播放"></a>
                                    <a href="javascript:void(0);" title="添加到歌单"></a>
                                    <a href="javascript:void(0);" title="下载"></a>
                                    <a href="javascript:void(0);" title="分享"></a>
                                </div>
                            </div>
                            <div class="musiclist__bd--singer">花粥/马雨阳</div>
                            <div class="musiclist__bd--songtime">
                                <span>03:18</span>
                                <a href="javascript:void(0);" title="删除" class="musiclist__bd--del"></a>
                            </div>
                        </li> -->
                    </ul>
                    <!-- e:musiclist__bd -->
```


#### audio

1.属性

> auotoplay     媒体是否自动播放,默认是不自动播放的
> loop          是否循环播放
> currentTime   当前播放时间 不仅可以获取时间,还可以设置

```javascript
oP.currentTime = 60;    // 从60s处开始播放
```
> duration      总时长(只是获取)
> volume        声音    取值0~1
> paused        是否暂停

```javascript

```

2.方法

> play()
> pause()
> load()

```javascript
$("vedio").get(0).click(function(){
    if(this.vedio.paused){
        this.vedio.play();
    }else{
    this.vedio.pause();
    }
});
```

3.事件

> ended         播放完成后触发



#### video

1.属性(以下属性是video特有的属性)

> poster        视频预览图片
> width/height  设置视频显示宽高
> videoWidth/heigt  视频的实际宽高(只读)

`其它属性/方法/事件同audio标签`



#### 待开发的功能

记忆播放功能，记录上次播放时间，兼容模式-ckplayer帮助手册  http://www.ckplayer.com/samplex/cookie.html