var index = 1;//图片轮播索引
var time = 0;//计时


/*初始化*/
function init() {
    $('.wrapBackground').click(function (event) {
        event.stopPropagation();
        $(".popupContainer").hide();
        $(".popupContainer").find(".keyItem_a,.countryName_con").removeClass("selectedCondition");
        $(".wrapBackground").hide();
        $("body").css("overflow", "auto");

    });
    _bindSelectedHotKey();
    _bindSwitchImage();
    _bindAutoSwitchImage();
    _bindSearch();
    _bindSHowHideQr();
    _bindClickMenuNavigation();

}



/**
 * 绑定点击头部菜单事件
 * @private
 */
function _bindClickMenuNavigation() {
    $(".MenuNavigation").find(".nav").click(function () {

        $(".nav").removeClass("selected");
        $(this).addClass("selected");
    });
}

/*绑定顶部显示二维码*/
function _bindSHowHideQr() {
    $(".topNavigation").find("li").hover(function () {
        var _self = $(this);


        _self.find(".downArrowIcon").css({
            "transform": "rotate(-180deg)",
            "-ms-transform": "rotate(-180deg)",
            "-moz-transform": "rotate(-180deg)"
        });
        _self.find(".topHide").show();
        _self.find('a').css('color', '#ffffff');
    }, function () {
        var _self = $(this);
        _self.find(".downArrowIcon").css({
            "transform": "rotate(0deg)",
            "-ms-transform": "rotate(0deg)",
            "-moz-transform": "rotate(0deg)"
        });
        _self.find(".topHide").hide();
        _self.find('a').css('color', '#cdcdcd');
    })
}

/*绑定初始化图片自动轮播*/
function _bindAutoSwitchImage() {
    setInterval(function () {
        if (time != 0) {
            time = 0;
        } else {
            var w = $(".rollBox").width();
            index++;
            if (index === 6) {
                index = 1;
            }

            $(".rollContent").css("margin-left", -(index - 1) * w);
            var btn = $(".switchBtn");
            btn.removeClass("selectedSwitchBtn");
            $(btn[index - 1]).addClass("selectedSwitchBtn");
        }
    }, 5000);

}

/*绑定选择热门词汇*/
function _bindSelectedHotKey() {
    $(".keyItem").click(function () {
        console.log(this.innerHTML);
        $(".hotKeyInput").val(this.innerHTML);
    })
}

/*绑定图片轮播*/
function _bindSwitchImage() {
    $(".switchBtn").click(function (e) {
        $(".switchBtn").removeClass("selectedSwitchBtn");
        $(this).addClass("selectedSwitchBtn");
        index = this.dataset.index;
        var w = $(".rollBox").width();
        $(".rollContent").css("margin-left", -(index - 1) * w);
        time = 1;
    })
}

/*绑定搜索框所有事件*/
function _bindSearch() {
    $("#hotKey1").click(function () {
        $(".hotKeyInput").attr('placeholder', '请输入国家/城市/项目名/学校名/找房');
    });
    $("#hotKey2").click(function () {
        $(".hotKeyInput").attr('placeholder', '请输入资讯关键字');
    });
    $(".searchBtn_a").click(function () {
        console.log($('input:radio[name="hotKeyS"]:checked').val());
    })
}





