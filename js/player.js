(function(window) {
    function Player($audio) {
        return new Player.prototype.init($audio);
    }
    Player.prototype = {
        constructor: Player,
        musicList: [],
        init: function($audio) {
            this.$audio = $audio;
            this.audio = $audio.get(0);
        },
        currentIndex: -1, // 4  3
        playMusic: function(index, music) {
            // 判断是否是同一首音乐
            if (this.currentIndex == index) {
                // 同一首音乐
                if (this.audio.paused) {
                    this.audio.play();
                } else {
                    this.audio.pause();
                }
            } else {
                // 不是同一首
                this.$audio.attr("src", music.link_url);
                this.audio.play();
                this.currentIndex = index;
            }
        },
        preIndex: function() {
            var index = this.currentIndex - 1;
            if (index < 0) {
                index = this.musicList.length - 1;
            }
            return index;
        },
        nextIndex: function() {
            var index = this.currentIndex + 1;
            if (index > this.musicList.length - 1) {
                index = 0;
            }
            return index;
        },
        changeMusic: function(index) {
            // 删除对应的数据
            this.musicList.splice(index, 1);

            // 判断当前删除的是否是正在播放音乐的前面的音乐
            if (index < this.currentIndex) {
                this.currentIndex = this.currentIndex - 1;
            }
        },
        musicTimeUpdate: function(callBack) {
            // 保留player的this  前台调用回调函数的是player
            var $this = this;
            // 这个this指的是audio 这个回调函数是audio调用的所以这里的this指的是audio
            this.$audio.on("timeupdate", function() {
                var duration = $this.audio.duration;
                var currentTime = $this.audio.currentTime;
                var timeStr = $this.formatDate(currentTime, duration);
                // 返回处理后的值,这里不能使用return,return有就近原则,在那个函数中,返回那个函数的返回值
                callBack(currentTime, duration, timeStr);
            });
        },
        formatDate: function(currentTime, duration) {

            if (isNaN(duration)) return;

            var $duration = parseInt(duration);
            $currentTime = parseInt(currentTime);

            var endMin = Math.floor($duration % 3600 / 60); // 2
            var endSec = Math.floor($duration % 60);

            if (endMin < 10) {
                endMin = "0" + endMin;
            }
            if (endSec < 10) {
                endSec = "0" + endSec;
            }

            var startMin = Math.floor($currentTime / 60); // 2
            var startSec = Math.floor($currentTime % 60);

            if (startMin < 10) {
                startMin = "0" + startMin;
            }
            if (startSec < 10) {
                startSec = "0" + startSec;
            }

            return startMin + ":" + startSec + " / " + endMin + ":" + endSec;

        },
        musicSeekTo: function(value) {
            // console.log(value);
            if (isNaN(value)) return;
            // console.log(this.audio.duration);

            this.audio.currentTime = this.audio.duration * value;



        },
        musicVoiceSeekTo: function(value) {
            if (isNaN(value)) return;
            if (value < 0 || value > 1) return;
            this.audio.volume = value;
        }
    }
    Player.prototype.init.prototype = Player.prototype;
    window.Player = Player;
})(window);