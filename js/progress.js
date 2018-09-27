(function(window) {
    function Progress($progressBar, $progressLine, $progressDot) {
        return new Progress.prototype.init($progressBar, $progressLine, $progressDot);
    }
    Progress.prototype = {
        constructor: Progress,
        init: function($progressBar, $progressLine, $progressDot) {
            this.$progressBar = $progressBar;
            this.$progressLine = $progressLine;
            this.$progressDot = $progressDot;
        },
        isMove: false, // 用于解决歌曲播放过程中,拖拽/点击 进度条回弹问题
        progressClick: function(callBack) {
            // callBack 是进度条拖动时传递的
            var $this = this;

            // 监听进度条背景点击事件
            this.$progressBar.click(function(event) {
                // 获取默认距离窗口左侧的距离
                var $defaultLeft = $(this).offset().left;
                // 获取点击位置距离窗口左侧的距离
                var $eventLeft = event.pageX;
                // 设置进度条前景色的宽度
                $this.$progressLine.css("width", $eventLeft - $defaultLeft);
                // 设置进度条点的left值
                $this.$progressDot.css("left", $eventLeft - $defaultLeft);

                // 计算进度条比例
                var value = ($eventLeft - $defaultLeft) / $(this).width();
                callBack(value);
            });
        },
        progressMove: function(callBack) {
            var $this = this;
            var $defaultLeft;
            var $eventLeft;
            var barWidth = this.$progressBar.width();

            // 监听鼠标按下的事件
            this.$progressBar.mousedown(function() {
                // 拖拽的时候isMove为true
                $this.isMove = true;
                // 获取进度条默认距离窗口左边的位置
                $defaultLeft = $(this).offset().left;

                // 监听鼠标移动事件
                $(document).mousemove(function(event) {

                    // 获取拖动位置距离窗口左边的位置
                    $eventLeft = event.pageX;

                    var offset = $eventLeft - $defaultLeft;
                    // 判断进度条拖拽范围是否超出
                    if (offset >= 0 && offset <= barWidth) {
                        // 修改进度条前景色线的宽度
                        $this.$progressLine.css("width", offset);
                        // 修改进度条圆点距离左边的位置
                        $this.$progressDot.css("left", offset);
                    }

                    // // 计算进度条比例   这里修改拖拽位置会让音乐播放断断续续
                    // var value = ($eventLeft - $defaultLeft) / $(this).width();
                    // callBack(value);

                });
            });

            // 监听鼠标抬起事件
            $(document).mouseup(function() {
                $(document).off("mousemove");
                // 鼠标抬起的时候设为false,继续时间自己同步
                $this.isMove = false;

                // 计算进度条比例   抬起时修改解决了拖动过程中音乐断断续续播放的问题
                var value = ($eventLeft - $defaultLeft) / barWidth;
                callBack(value);
            });
        },
        setProgress: function(value) {
            // 判断是拖拽改变进度/还是时间自己同步
            if (this.isMove) return;
            // 判断传入的值是否合法,不满足这个范围直接return
            if (value < 0 || value > 100) return;
            // 改变进度条前景色线的宽度
            this.$progressLine.css({ width: value });
            // 改变进度条圆点距离左边的位置
            this.$progressDot.css({ left: value });
        }

    }
    Progress.prototype.init.prototype = Progress.prototype;
    window.Progress = Progress;
})(window);