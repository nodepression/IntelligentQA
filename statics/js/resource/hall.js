(function () {

    var cards = $('.card');
    var seconds = $('.second');
    var tags = [
        { first: "前端", "second": ["React.js", "Vue.js", "Node.js","html/css"] },
        { first: "后台", "second": ["Java", "SpringBoot", "C++"] },
        { first: "移动", "second": ["Android", "iOS", "ReactNative"] },
        { first: "云计算和大数据", "second": ["云计算 ", "大数据", "Hadoop"] },
        { first: "算法和数学", "second": ["算法与数据结构"] },
        { first: "运维和测试", "second": ["运维", "自动化测试", "Linux"] },
        { first: "数据库", "second": ["MySQL", "Redis", "MongoDB"] },
        { first: "ui设计", "second": ["模型制作", "动效动画", "设计基础"] },
        { first: "前沿", "second": ["区块链", "人工智能", "计算机视觉"] },
        { first: "游戏", "second": ["Unity3D", "Cocos2d-x"] }
    ];


    //初始化二级栏目
    function initSecond() {
        var index;
        for (index = 0; index < 10; index++) {
            var len = tags[index].second.length;
            var i;
            if (len <= 3) {
                for (i = 0; i < len; i++) {
                    var item = document.createElement("span");
                    item.innerHTML = tags[index].second[i]
                    seconds[index].append(item);
                }
            } else {
                for (i = 0; i < 3; i++) {
                    var item = document.createElement("span");
                    item.innerHTML = tags[index].second[i]
                    seconds[index].append(item);
                }
                var item = document.createElement("span");
                item.innerHTML = "其他";
                seconds[index].append(item);
            }
        }
    }
    initSecond();
    //初始化到登录后显示的界面
    function init() {
        $(".second").css("z-index", "-1");
        $(".second").removeClass('animated bounceInRight');
    }
    $('.card').mouseover(function (e) {
        timer = setTimeout(function () {
            $(e.target).children(".second").css("z-index", "2");
            $(e.target).children(".second").addClass('animated bounceInRight');
            // var index = Array.prototype.indexOf.call(cards, e.target);
        }, 50);
    });

    $('.card').mouseout(function () {
        clearTimeout(timer);
    })

    $(".second").mouseleave(function () {
        init();
    })
}.call(this));