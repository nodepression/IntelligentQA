(function () {
    // 资源对应的标签
    var one,   //一级
        two,   //二级
        three; //三级

    var index = 1; //当前位于第几页
    var num = 10; //一页最多显示多少个
    var result = new Array(73);
    var len = result.length;
    for (var k = 0; k < len; k++) {
        result[k] = k;
    }
    var lastIndex = Math.floor(len / num) + 1; //最多显示到第几页

    var tags = {
        "front": ["React.js", "Vue.js", "Node.js", "html/css", "Javascript", "Angular.js", "jQuery", "Bootstrap", "Sass/Less", "前端工具"],
        "back": ["Java", "SpringBoot", "C++", "Python", "爬虫", "Django", "go", "PHP", "Ruby", "C"],
        "mobile": ["Android", "iOS", "ReactNative", "WEEX"],
        "cloud": ["云计算 ", "大数据", "Hadoop"],
        "algorithm": ["算法与数据结构"],
        "test": ["运维", "自动化测试", "Linux", "测试", "功能测试", "性能测试", "自动化测试", "接口测试", "安全测试"],
        "database": ["MySQL", "Redis", "MongoDB", "Oracle", "SQL Server"],
        "uiDesign": ["模型制作", "动效动画", "设计基础", "设计工具", "APPUI设计", "产品交互"],
        "leading": ["区块链", "人工智能", "计算机视觉", "微服务", "以太坊", "机器学习", "深度学习", "数据分析"],
        "game": ["Unity3D", "Cocos2d-x"]
    };

    //初始化
    function init() {

        $('.pre').css("visibility", "hidden");
        if (len <= num) {
            $('.next').css("visibility", "hidden");
        }
        render();
    }
    init();

    //渲染后台返回的结果
    function render() {
        for (var i = (index - 1) * num; i < (index - 1) * num + num; i++) {
            if (i >= len)
                break;
            var file = document.createElement("div");
            file.className = "item";

            var pic = document.createElement("img");
            pic.src = "../../statics/images/pdf.png";

            var text = document.createElement("div");
            text.innerText = result[i];
            file.appendChild(pic);
            file.appendChild(text);
            $('.result').append(file);
        }
        $('.index').text(index);
    }

    //根据方向显示分类
    function changeSecond(aspect) {
        for (var i = 0; i < tags[aspect].length; i++) {
            var item = document.createElement("span");
            item.className = "tag";
            item.innerText = tags[aspect][i];
            $('.second').append(item);
        }
    }

    //类型选择
    $('.first').click(function (e) {
        if ($(e.target).hasClass("tag")) {
            one = $(e.target).text();
            $(".first>.tag").css("backgroundColor", "white");
            $(e.target).css("backgroundColor", "#6db7d5");

            $('.second').empty();
            var aspect = $(e.target).attr("class").split(" ")[1];
            // console.log(aspect);
            changeSecond(aspect);
        }
    })
    $('.second').click(function (e) {
        if ($(e.target).hasClass("tag")) {
            two = $(e.target).text();
            $(".second>.tag").css("backgroundColor", "white");
            $(e.target).css("backgroundColor", "#6db7d5");
        }
    })
    $('.third').click(function (e) {
        if ($(e.target).hasClass("tag")) {
            three = $(e.target).text();
            $(".third>.tag").css("backgroundColor", "white");
            $(e.target).css("backgroundColor", "#6db7d5");
        }
    })

    //页码选择 

    //上一页
    $('.pre').click(function () {
        $('.result').empty()
        if (index == lastIndex) {  //当前是最后一页
            $('.next').css("visibility", "visible");
        } else if (index == 2) //当前是第二页
        {
            $('.pre').css("visibility", "hidden");
        }
        index--;
        render();
    })

    //下一页
    $('.next').click(function () {
        $('.result').empty()
        if (index == 1) {  //当前是第一页
            $('.pre').css("visibility", "visible");
        }
        if (index == (lastIndex - 1)) //当前是倒数第二页
        {
            $('.next').css("visibility", "hidden");
        }
        index++;
        render();
    })

}.call(this));