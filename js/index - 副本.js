$(function() {

    // 0.自定义滚动条

    // var viewH = $(document).height();
    // $(".con__left__musiclist").css('height', viewH);

    $(".con__left__musiclist").mCustomScrollbar();


    var $audio = $("audio");
    var player = new Player($audio);

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

    // $(".muscilist__bd--item").hover(function() {

    //     $(this).find(".musiclist__bd--menu").stop().fadeIn(300);

    //     $(this).find(".musiclist__bd--songtime span").stop().fadeOut();

    //     $(this).find(".musiclist__bd--songtime a").stop().fadeIn();

    // }, function() {

    //     $(this).find(".musiclist__bd--menu").stop().fadeOut(300);

    //     $(this).find(".musiclist__bd--songtime a").stop().fadeOut(300);

    //     $(this).find(".musiclist__bd--songtime span").stop().fadeIn();

    // });


    // 2.选中
    // $(".musiclist__bd--check").click(function() {
    //     $(this).toggleClass("musiclist--checked");
    // });

    $(".musiclist__bd").delegate(".musiclist__bd--check", "click", function() {

        $(this).toggleClass("musiclist--checked");

    });

    // 3.全选/全不选
    $(".musiclist__hd--check").click(function() {
        $(".musiclist__bd").find(".musiclist__bd--check").stop().toggleClass("musiclist--checked");
    });


    // 4.获取歌曲列表
    getMusicList();

    function getMusicList() {
        $.ajax({
            type: "get",
            url: "./source/musiclist.json",
            dataType: "json",
            success: function(data) {
                // console.log(data);
                var $musiclist = $(".musiclist__bd");

                $.each(data, function(index, ele) {
                    var $item = createMusicItem(index, ele);
                    $musiclist.append($item);
                });

            }
        });

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
    }

    // 5. 切换图标

    $(".con__left__musiclist").delegate(".bd--menu--play", "click", function() {

        var $musicitem = $(this).parents(".musiclist__bd--item");

        // 给 播放 按钮添加类名,切换播放/暂停图标
        $(this).toggleClass("bd--menu--play2");

        // 其它兄弟元素还原未播放状态
        $musicitem.siblings().find(".bd--menu--play").removeClass("bd--menu--play2");

        /**
         * 同步底部控制菜单播放/暂停状态按钮的切换
         * 5.3 子菜单 和 底部菜单 同步
         * 
         */

        if ($(this).attr("class").indexOf("bd--menu--play2") != -1) {

            // 子菜单播放按钮播放时底部控制菜单同步状态 
            $(".music__btn__play").addClass("music__btn__play2");

            // 选定歌曲播放时,文字高亮显示
            $musicitem.find("div").css("color", "#fff");

            // 切换序号动画,还原为数字样式时,去除文字高亮显示
            $musicitem.siblings().find("div").css("color", "rgba(255, 255, 255, .5)");

        } else {

            // 子菜单不播放时底部控制菜单的状态
            $(".music__btn__play").removeClass("music__btn__play2");

            // 选定歌曲播放时,文字高亮显示
            $musicitem.find("div").css("color", "rgba(255, 255, 255, .5)");

        }

        /** 
         * 5.4 播放歌曲 序号/动画 切换
         * 
         */

        // 切换当前选中行的序号选中状态
        $musicitem.find(".musiclist__bd--number").toggleClass("musiclist__bd--number2");
        // 除了当前选中元素,其它元素变回原来样式
        $musicitem.siblings().find(".musiclist__bd--number").removeClass("musiclist__bd--number2");



        /**
         * 5.5 播放音乐(子菜单)
         * 
         */
        player.playMusic($musicitem.get(0).index, $musicitem.get(0).music);




    });


});
$