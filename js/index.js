$(function() {

    /** 
     * 0.自定义滚动条
     */

    $(".con__left__musiclist").mCustomScrollbar();

    /**
     * 1.创建audio标签
     */

    var $audio = $("audio");
    var player = new Player($audio);
    console.log(player);
    var lyric;

    /**
     *  2.获取进度条相关元素
     */

    var $progressBar = $(".music__btn__progress__bar");
    var $progressLine = $(".music__btn__progress__line");
    var $progressDot = $(".music__btn__progress__dot");

    // 调用Progress类的方法
    var progress = Progress($progressBar, $progressLine, $progressDot);

    console.log(progress);
    progress.progressClick(function(value) {
        player.musicSeekTo(value);
    });
    progress.progressMove(function(value) {
        player.musicSeekTo(value);
    });



    var $voiceBar = $(".music__btn__voice__bar");
    var $voiceLine = $(".music__btn__voice__line");
    var $voiceDot = $(".music__btn__voice__dot");
    voiceProgress = Progress($voiceBar, $voiceLine, $voiceDot);
    voiceProgress.progressClick(function(value) {
        player.musicVoiceSeekTo(value);
    });
    voiceProgress.progressMove(function(value) {
        player.musicVoiceSeekTo(value);
    });


    // 3.初始化歌词信息
    function initMusicLyric(music) {
        lyric = new Lyric(music.link_lrc);
        var $lryicContainer = $(".song__lyric");
        // 清空上一首音乐的歌词
        $lryicContainer.html("");
        lyric.loadLyric(function() {
            // 创建歌词列表
            $.each(lyric.lyrics, function(index, ele) {
                var $item = $("<li>" + ele + "</li>");
                $lryicContainer.append($item);
            });
        });
    }

    /**
     *  2.获取歌曲列表
     */

    getMusicList();

    // 获取歌曲信息,成功后动态常见歌曲列表
    function getMusicList() {
        $.ajax({
            type: "GET",
            url: "./source/musiclist.json",
            dataType: "json",
            success: function(data) {
                // 将数据传给player.js文件中的musicList
                player.musicList = data;
                // 歌曲列表添加的父节点
                var $musiclist = $(".musiclist__bd");
                // 将获取到的数据添加到页面中
                $.each(data, function(index, ele) {
                    var $item = createMusicItem(index, ele);
                    $musiclist.append($item);
                });

                // 初始化歌曲信息 默认第一首
                initMusicInfo(data[0]);
                //
                initMusicLyric(data[0]);
            },
            error: function(e) {
                console.log(e);
            }
        });
    }

    /**
     * 初始化歌曲信息
     * @param music object  歌曲信息
     * @param songPic  右侧歌曲图片
     */

    function initMusicInfo(music) {
        //console.log(music);//{name: "告白气球", singer: "周杰伦", album: "周杰伦的床边故事", time: "03:35", link_url: "./source/告白气球.mp3", …}

        var $songPic = $(".song__info__pic img");
        var $songName = $(".song__info__name a");
        var $songSinger = $(".song__info__singer a");
        var $songAblum = $(".song__info__ablum a");
        var $songPressName = $(".music__btn__progress__name");
        var $songPressTime = $(".music__btn__progress__time");
        var $songBg = $(".mask_bg");

        $songPic.attr("src", music.cover);
        $songName.text(music.name);
        $songSinger.text(music.singer);
        $songAblum.text(music.album);
        $songPressName.text(music.name + " - " + music.singer);
        $songPressTime.text("00:00 / " + music.time);
        $songBg.css("background", "url('" + music.cover + "')");
    }

    /**
     * 3.初始化各种事件
     * 
     */

    eventsInit();

    function eventsInit() {

        // 1.鼠标移入/移除 显示/隐藏 子菜单
        $(".musiclist__bd").delegate(".musiclist__bd--item", "mouseenter", function() {

            $(this).find(".musiclist__bd--menu").stop().fadeIn(300);

            $(this).find(".musiclist__bd--songtime .music__time").stop().fadeOut();

            $(this).find(".musiclist__bd--songtime a").stop().fadeIn(300);
        });

        $(".musiclist__bd").delegate(".musiclist__bd--item", "mouseleave", function() {

            $(this).find(".musiclist__bd--menu").stop().fadeOut(300);

            $(this).find(".musiclist__bd--songtime a").stop().fadeOut(300);

            $(this).find(".musiclist__bd--songtime .music__time").stop().fadeIn();
        });

        /**
         * 2.选中
         * 
         */

        $(".musiclist__bd").delegate(".musiclist__bd--check", "click", function() {

            $(this).toggleClass("musiclist--checked");

        });

        // 3.全选/全不选
        $(".musiclist__hd--check").click(function() {
            $(".musiclist__bd").find(".musiclist__bd--check").stop().toggleClass("musiclist--checked");
        });

        // 4. 切换图标
        var $musicPlay = $(".music__btn__play");

        $(".con__left__musiclist").delegate(".bd--menu--play", "click", function() {

            var $item = $(this).parents(".musiclist__bd--item");

            // console.log($item.get(0).index);
            // console.log($item.get(0).music);

            // 4.1 给 播放 按钮添加类名,切换播放/暂停图标
            $(this).toggleClass("bd--menu--play2");
            // 4.2 其它兄弟元素还原未播放状态
            $item.siblings().find(".bd--menu--play").removeClass("bd--menu--play2");

            /**
             * 同步底部控制菜单播放/暂停状态按钮的切换
             * 4.3 子菜单 和 底部菜单 同步
             */
            if ($(this).attr("class").indexOf("bd--menu--play2") != -1) {
                // 子菜单播放按钮播放时底部控制菜单同步状态 
                $musicPlay.addClass("music__btn__play2");
                // 选定歌曲播放时,文字高亮显示
                $item.find("div").css("color", "#fff");
                // 切换序号动画,还原为数字样式时,去除文字高亮显示
                $item.siblings().find("div").css("color", "rgba(255, 255, 255, .5)");
            } else {
                // 子菜单不播放时底部控制菜单的状态
                $musicPlay.removeClass("music__btn__play2");
                // 选定歌曲播放时,文字高亮显示
                $item.find("div").css("color", "rgba(255, 255, 255, .5)");
            }

            /** 
             * 4.4 播放歌曲 序号/动画 切换
             */
            // 切换当前选中行的序号选中状态
            $item.find(".musiclist__bd--number").toggleClass("musiclist__bd--number2");
            // 除了当前选中元素,其它元素变回原来样式
            $item.siblings().find(".musiclist__bd--number").removeClass("musiclist__bd--number2");

            /**
             * 4.5 播放音乐(子菜单)
             */
            player.playMusic($item.get(0).index, $item.get(0).music);

            // 4.6
            initMusicInfo($item.get(0).music);

            // 4.7 切换歌词信息
            initMusicLyric($item.get(0).music);

        });


        /**
         *  6. 底部控制菜单
         *  @param player.currentIndex  number 判断是否播放过歌曲的标识  
         *         -1:未播放过, 播放过:索引值 (播放过哪首就会显示该歌曲的索引)
         * 
         */


        // 6.1 播放

        $musicPlay.click(function() {
            if (player.currentIndex == -1) {
                // 没有播放过音乐
                $(".musiclist__bd--item").eq(0).find(".bd--menu--play").trigger("click");
            } else {
                // 播放过音乐
                $(".musiclist__bd--item").eq(player.currentIndex).find(".bd--menu--play").trigger("click");

            }
        });

        // 6.2 上一首

        $(".music__btn__prev").click(function() {
            // console.log($(".musiclist__bd--item").eq(player.preIndex()));
            $(".musiclist__bd--item").eq(player.preIndex()).find(".bd--menu--play").trigger("click");

        });

        // 6.3 下一首

        $(".music__btn__next").click(function() {
            // console.log($(".musiclist__bd--item").eq());

            // console.log($(".musiclist__bd--item").eq(player.nextIndex()).find(".bd--menu--play"));
            $(".musiclist__bd--item").eq(player.nextIndex()).find(".bd--menu--play").trigger("click");

        });


        /**
         * 7.删除歌曲信息
         */

        $(".con__left__musiclist").delegate(".musiclist__bd--del", "click", function() {

            // 找到被点击的音乐
            var $item = $(this).parents(".musiclist__bd--item");

            // 判断当前删除的是否是正在播放的
            if ($item.get(0).index == player.currentIndex) {
                $(".music__btn__next").trigger("click");
            }

            $item.remove();
            player.changeMusic($item.get(0).index);

            // 重新排序
            $(".musiclist__bd--item").each(function(index, ele) {
                ele.index = index;
                $(ele).find(".musiclist__bd--number").text(index + 1);
            });

        });



        // 8.监听播放的进度
        player.musicTimeUpdate(function(currentTime, duration, timeStr) {
            // 同步时间
            $(".music__btn__progress__time").text(timeStr);

            // 同步进度条
            // 计算播放比例
            var value = currentTime / duration * 100 + "%";
            progress.setProgress(value);
            // 实现歌词同步
            var index = lyric.currentIndex(currentTime);
            var $item = $(".song__lyric li").eq(index);
            $item.addClass("cur");
            $item.siblings().removeClass("cur");

            // 实现歌词滚动
            if (index <= 2) return;
            var top = (-index + 2) * 30;
            $(".song__lyric").css({
                "marginTop": top,
                "transition": "all .98s ease-in .68s"
            });
        });

        /**
         * 9.声音控制
         *
         */
        $(".music__btn__voice__icon").click(function() {
            // 切换voice_icon
            $(this).toggleClass("music__btn__voice__icon2");
            // 切换声音图标的同时,为静音时将进度条切换为0,有声音时切换为原来的音量
            if ($(this).attr("class").indexOf("music__btn__voice__icon2") != -1) {
                // $audio.get(0).volume = 0;
                player.musicVoiceSeekTo(0);
            } else {
                // $audio.get(0).volume = 1;
                player.musicVoiceSeekTo(1);
            }
        });

    }

    /**
     * 音乐播放完成后自动播放下一首
     * @param ended  blooean  音乐播放完成后触发
     */
    $audio.on("ended", function() {
        // alert("播放结束");
        $(".song__lyric").css({ marginTop: 0 });
        $(".musiclist__bd--item").eq(player.nextIndex()).find(".bd--menu--play").trigger("click");
    });

    // 动态创建歌曲列表模板
    function createMusicItem(index, music) {
        var $item = $("" +
            "<li class=\"musiclist__bd--item clearfix\">\n" +
            "<div class=\"musiclist__bd--check\"><i></i></div>\n" +
            "<div class=\"musiclist__bd--number\">" + (index + 1) + "</div>\n" +
            "<div class=\"musiclist__bd--songname\">\n" +
            "    <span title=" + music.name + ">" + music.name + "</span>\n" +
            "	  <div class=\"musiclist__bd--menu\">\n" +
            "	      <a href=\"javascript:void(0);\" title=\"播放\" class=\"bd--menu--play\"></a>\n" +
            "        <a href=\"javascript:void(0);\" title=\"添加到歌单\"></a>\n" +
            "        <a href=\"javascript:void(0);\" title=\"下载\"></a>\n" +
            "        <a href=\"javascript:void(0);\" title=\"分享\"></a>\n" +
            "    </div>\n" +
            "</div>\n" +
            "<div class=\"musiclist__bd--singer\">" + music.singer + "</div>\n" +
            "<div class=\"musiclist__bd--songtime\">\n" +
            "    <span class=\"music__time\">" + music.time + "</span>\n" +
            "	  <a href=\"javascript:void(0);\" title=\"删除\" class=\"musiclist__bd--del\"></a>\n" +
            "</div>\n" +
            "</li>");

        $item.get(0).index = index;
        $item.get(0).music = music;

        return $item;
    }

});