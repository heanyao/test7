var index = 1;//图片轮播索引
var time = 0;//计时
var hoverFlag = 0;//标记是全球还是其他国家，0是全球，1是其他国家
var currentPage = 1;
var flag = "";//标识选择了哪个国家
var links = [];
    links[0] = '/propertylist/29';
    links[1] = '/propertylist/25';
    links[2] = 'https://www.so.com/';

var _serverUrl = getApi();

//测试数据
var globalData = [
    {
        "id": "1",
        "name": "亚洲",
        "value": "newYork"
    },
    {
        "id": "35",
        "name": "欧洲",
        "value": "losAngeles"
    },
    {
        "id": "44",
        "name": "大洋洲",
        "value": "chicago"
    },
    {
        "id": "16",
        "name": "北美洲",
        "value": "Houston"
    },
    {
        "id": "23",
        "name": "非洲",
        "value": "philadelphia"
    }
];

var country = {
    "10001": [
        {
            "id": "68",
            "name": "佛山",
            "value": "newYork",

        },
        {
            "id": "4",
            "name": "深圳",
            "value": "losAngeles"
        },
        {
            "id": "69",
            "name": "珠海",
            "value": "chicago",
        },
        {
            "id": "70",
            "name": "南山",
            "value": "Houston"
        },
        {
            "id": "71",
            "name": "东莞",
            "value": "philadelphia"
        }],//中国
    "10002": [
        {
            "id": "15",
            "name": "板来市",
            "value": "newYork",
            "price": "￥56万"
        },
        {
            "id": "72",
            "name": "TOKYO",
            "value": "losAngeles",
            "price": "￥55万"
        },
        {
            "id": "73",
            "name": "福冈",
            "value": "chicago",
            "price": "￥44万"
        },
        {
            "id": "74",
            "name": "名古屋",
            "value": "Houston",
            "price": "￥99万"
        },
        {
            "id": "75",
            "name": "北海道",
            "value": "philadelphia",
            "price": "￥58万"
        }
    ],//日本
    "10003": [
        {
            "id": "68",
            "name": "美国佛山",
            "value": "newYork",
            "price": "￥330万"
        },
        {
            "id": "4",
            "name": "深圳",
            "value": "losAngeles",
            "price": "￥50万"
        },
        {
            "id": "69",
            "name": "珠海",
            "value": "chicago",
            "price": "￥50万"
        },
        {
            "id": "70",
            "name": "南山",
            "value": "Houston",
            "price": "￥50万"
        },
        {
            "id": "71",
            "name": "东莞",
            "value": "philadelphia",
            "price": "￥50万"
        }
    ],//美国
    "10004": [
        {
            "id": "15",
            "name": "马来国板来市",
            "value": "newYork"
        },
        {
            "id": "72",
            "name": "TOKYO",
            "value": "losAngeles"
        },
        {
            "id": "73",
            "name": "福冈",
            "value": "chicago"
        },
        {
            "id": "74",
            "name": "名古屋",
            "value": "Houston"
        },
        {
            "id": "75",
            "name": "北海道",
            "value": "philadelphia"
        }
    ],//马来国
    "10005": [
        {
            "id": "68",
            "name": "泰国佛山",
            "value": "newYork",
            "price": "￥50万"
        },
        {
            "id": "4",
            "name": "深圳",
            "value": "losAngeles",
            "price": "￥50万"
        },
        {
            "id": "69",
            "name": "珠海",
            "value": "chicago",
            "price": "￥50万"
        },
        {
            "id": "70",
            "name": "南山",
            "value": "Houston",
            "price": "￥50万"
        },
        {
            "id": "71",
            "name": "东莞",
            "value": "philadelphia",
            "price": "￥50万"
        }
    ],//泰国
    "10006": [
        {
            "id": "68",
            "name": "韩国佛山",
            "value": "newYork",
            "price": "￥50万"
        },
        {
            "id": "4",
            "name": "深圳",
            "value": "losAngeles",
            "price": "￥50万"
        },
        {
            "id": "69",
            "name": "珠海",
            "value": "chicago",
            "price": "￥50万"
        },
        {
            "id": "70",
            "name": "南山",
            "value": "Houston",
            "price": "￥50万"
        },
        {
            "id": "71",
            "name": "东莞",
            "value": "philadelphia",
            "price": "￥50万"
        }
    ]//韩国
};


/*初始化*/
function init() {
    $('.wrapBackground').click(function (event) {
        event.stopPropagation();
        $(".popupContainer").hide().find(".keyItem_a,.countryName_con").removeClass("selectedCondition");
        $(".wrapBackground").hide();
        $("body").css("overflow", "auto");

    });

    _bindSelectedHotKey();

    _bindSwitchImage();

    _bindAutoSwitchImage();
    _bindSearch();

    _bindCountryEvent();

    // _bindPrePageBtn();
    // _bindNextPageBtn();
    _bindClickMenuNavigation();
    _setArrowPosition();
    _bindSwitchBtnHover();
    _bindOpenMoreCondition();
    _moreSelected();

}

/*打开更多筛选弹框*/
function _moreSelected() {
    $(".moreChoose").click(function () {
        $(".popupContainer").show();
        $(".more_hide").hide();
        $("body").css("overflow", "hidden");
        $(".wrapBackground").show();
        $(".moreConditionBtn").show();
    });

    /*为除国家条件之外项，添加选择事件*/
    $(".keyItem_a").click(function () {
        $(this).parents(".conditionList").find(".keyItem_a").removeClass("selectedCondition");
        $(this).addClass("selectedCondition");
    });

    /*国家选择*/
    $(".countryName_con").click(function () {
        $(".countryName_con").removeClass("selectedCondition");
        $(this).addClass("selectedCondition");
    });

    /*点击不限取消选择*/
    $(".unSelectBtn").click(function () {
        var item1 = $(this).parents(".conditionItem").find(".countryName_con");
        var item2 = $(this).parents(".conditionItem").find(".keyItem_a");
        var item = item1.length ? item1 : item2;
        item.removeClass("selectedCondition");
    })

    /*重置条件*/
    $(".resetBtn").click(function () {
        $(".countryName_con,.keyItem_a").removeClass("selectedCondition");
    });

    /*确认*/
    $(".submitBtn").click(function () {

        var selectList = $(".moreCondition_pop").find(".selectedCondition");;
        var url = "";
        //没有选择
        if (selectList.length === 0) {
            console.log("没有选择");
            window.location.href = window.location.href;
        }
        if (selectList.length > 0) {
            let str = "";
            selectList.each(function () {
                var key = $(this).parents('.conditionItem').attr('name');
                console.log(key, '=', $(this).context.dataset.super);
                 str += key + "=" + $(this).context.dataset.super + "&";
            });
            url = _serverUrl + "/propertylist/30?" + str.slice(0, str.length - 1);
            console.log("url=", url);
            window.location.href = url;
        }
        $(".popupContainer").hide();
        $(".popupContainer").find(".keyItem_a,.countryName_con").removeClass("selectedCondition");
        $(".wrapBackground").hide();
        $("body").css("overflow", "auto");
    })
}

/*绑定查看更多筛选条件*/
function _bindOpenMoreCondition() {
    $(".moreConditionBtn").click(function (e) {
        e.stopPropagation();
        $(".more_hide").show();
        $(this).hide();
    })
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
        var type = $('input:radio[name="hotKeyS"]:checked').val();//获取搜索框的搜索类别是房源(fy)还是资讯(zx)
        var condition = $.trim($(".hotKeyInput")[0].value);
        console.log(condition)
        if(type === 'fy'){
            window.location.href=window.location.href + '/propertylist/28?hotKeyS='+type+'&key='+condition
        }else {
            window.location.href='https://www.baidu.com' + '?hotKeyS='+type+'&key='+condition
        }
    })
}

/*绑定选择国家显示箭头和向右显示滑动框*/
function _bindCountryEvent() {
    _bindSelectedPrice();
    var t = 0;
    var timer = null;

    /**
     * 绑定当鼠标停在国家上的一系列事件
     */
    $(".countryItem").hover(function () {
        var _self = $(this);
        $(".countryItem").removeClass('hoverCountry');
        _self.addClass('hoverCountry');
        timer = setInterval(function () {
            t++;
            if (t === 200) {
                t = 0;
                clearInterval(timer);
                $(".thisCountryHouseCon").show('fast');//显示详细内容的右边
                $(".countryArrow").remove();
                _self.find(".rightArrIcon").after('<span class="countryArrow"></span>');//三角形
                var con = $(".thisCountryHouseDetail");
                con.animate({left: '0'}, '100');
                var name = _self.attr('name');
                "globalFlag" === name ? hoverFlag = 0 : hoverFlag = 1;
                if (hoverFlag === 0) {//全球
                    $(".moreCountryOrCity").hide();
                    flag = 10000;
                    _formatCountryOrCity(globalData);
                    _getCountryList(1);//默认获取亚洲国家
                } else {
                    var moreBtn = $(".moreCountryOrCity");
                    moreBtn.show();
                    flag = _self.attr('name');
                    moreBtn.attr('href', _serverUrl + "/propertylist/" + flag+'/99999');
                    var id = _self[0].dataset['flag'];
                    flag = _self.attr('name');
                    _formatCountryOrCity(country[flag]);
                    _getCityList(flag);
                }
            }

        });


    }, function () {
        t = 0;
        clearInterval(timer);
        timer = null;
    });

    /**
     * 获取全球下的国家
     * @private
     */
    function _getCountryList(id) {
        $.ajax({
            url: _serverUrl + '/getcountry/' + id,
            type: "GET",
            dataType: 'json',
            success: function (res) {
                var t = "";
                if (res.data.length && res.data.length > 0) {
                    $.each(res.data, function (index, item) {
                        t += '<a class="tableContentItem" href="' + _serverUrl + '/propertylist/30?country=' + item.id + '">' +
                            '<img src="' + _serverUrl + item.flag_url + '" alt="国旗" onerror="imageError(this)">' +
                            '<div class="countryNameContent">' +
                            '    <p class="chineseText">' + item.name + '</p>' +
                            '    <p class="englishText">' + item.en_name + '</p>' +
                            '</div>' +
                            '</a>'
                    });
                    t += '<a href="' + _serverUrl + '/global' + '" class="moreCountryOrCity2">更多>></a>';
                    $(".secondColumn").empty().append(t);
                }

            },
            error: function () {
                alert("请求失败！");
            }
        });
    }

    /**
     * 获取国家的城市
     * @private
     */
    function _getCityList(id) {
        $.ajax({
            url: _serverUrl + '/getcity/' + id,
            type: "GET",
            dataType: 'json',
            success: function (res) {
                var t = "";
                var arr = res.data.data;
                if (arr.length && arr.length > 0) {

                    $.each(arr, function (index, item) {
                        console.log(item);
                        t += '<a class="theCountryHouseItem" href="' + _serverUrl + '/propertydetail/' + item.id + '">' +
                            '   <img src="' + byPoint(item.property_pics_url) + '" alt="" onerror="imageError(this)">' +
                            '   <div class="theHouseMsg">' +
                            '        <span class="theHousePrice">' + '$' + item.project_price + '万元' + '</span>' +
                            '        <span class="houseDetailAddress">' + item.location2 + '-' + item.location4 + '</span>' +
                            '    </div>' +
                            '     <span class="typeHouse1">' + item.property_type + '</span>' +
                            '</a>';
                    });
                    $(".secondColumn").empty().append(t);
                } else {
                    $(".secondColumn").empty().append('<span class="resultNullTip">没有数据哟！</span>')
                }

            },
            error: function () {
                alert("请求失败！");
            }
        });
    }

    /*当鼠标移出右边容器实现隐藏*/
    $(".countryHouseContainer").hover(function () {

    }, function () {
        var con = $(".thisCountryHouseDetail");
        con.animate({left: '-810px'}, "fast", '', function () {

        });
        $(".thisCountryHouseCon").hide();
        $(".countryArrow").remove();
        $(".countryItem").removeClass('hoverCountry');
        $(".secondColumn").empty();
    });

    /*全球下的更多链接*/
    $(".moreCountryOrCity2").click(function () {

    });

    /**
     * 格式化城市和国家数据
     * @param flag {number} 0国家，1城市
     * @param data {array}
     * @private
     */
    function _formatCountryOrCity(data) {
        var time = 0;
        var timer = null;
        var html = "";
        $.each(data, function (index, item) {
            var temp = '<div class="countryTitle" name="' + item.id + '">' + item.name + "</div>"
            html += temp;
        });
        var title = $(".countryTitle");
        title.remove();
        $('.tableHeadTitle').after(html);
        /*绑定点击事件*/
        $(".countryTitle").click(function () {
            $(".countryTitle").removeClass("selectedCountry");
            $(this).addClass('selectedCountry');
            console.log($(this).attr('name'));
            var id = $(this).attr('name');
            hoverFlag === 1 ? _getCityList(id) : _getCountryList(id);
        });

        /*点击绑定滑过事件*/
        $(".countryTitle").hover(function () {
            if ($(this).hasClass("selectedCountry")) return;
            var id = $(this).attr('name');
            timer = setInterval(function () {
                time++;
                if (time === 200) {
                    clearInterval(timer);
                    hoverFlag === 1 ? _getCityList(id) : _getCountryList(id);
                }
            });

        }, function () {
            time = 0;
            clearInterval(timer);
            timer = null;
        });

    }


    /**
     * 选择价格范围
     * @private
     */
    function _bindSelectedPrice() {
        $(".priceRange").hover(function () {
            $(".priceRange").removeClass("selectedHousePrice");
            var self = $(this);
            self.addClass("selectedHousePrice");
        }, function () {
            $(".priceRange").removeClass("selectedHousePrice");
        });

        $(".priceRange").click(function () {
            var url = _serverUrl + "/propertylist/"
            var range = $(this)[0].dataset['range'];
            if (parseInt(range) > 1000) {
                url += flag;
            }
            if (parseInt(range) > 0 && parseInt(range) <= 1000) {
                url += flag + "/" + range;
            }
            window.location = url;
        })
    }
}

/**
 * 获取第一张图片
 * @param str
 * @returns {string}
 */
function byPoint(str) {
    // var url = str.split(',');
    return _serverUrl + str[0];
}
/**
 * 绑定列表查看上一页
 * @private
 */
function bindPrePageBtn(a) {
    left = $('.prePageBtn').eq(a).prev('.pageChangeCon').find(".listContent").css('left');
    left = parseInt(left.slice(0, -2));
    left = Math.abs(left);
    var currentPage = left/1260;
    var roll = $('.prePageBtn').eq(a).prev('.pageChangeCon').find(".listContent");
    if (left !== 0) {
        currentPage--;
        roll.css("left", -(left - 1260) + 'px')
    } else {
        window.location = links[a];
    }
}

/*绑定查看下一页*/
function bindNextPageBtn(a) {
    left = $('.prePageBtn').eq(a).prev('.pageChangeCon').find(".listContent").css('left');
    left = parseInt(left.slice(0, -2));
    left = Math.abs(left);
    var currentPage = left/1260;
    var con = $('.nextPageBtn').eq(a).prevAll('.pageChangeCon');
    count = con.find(".listItem_a").length;
    count = count % 3 === 0 ? count / 3 : parseInt(count / 3) + 1;

    if (currentPage < count-1) {
        con.find(".listContent").css("left", -1260 * (currentPage+1) + 'px');
    }
    else {
        currentPage = count;
        window.location = links[a];
    }
}

/*监控屏幕宽度改变修改左右切换按钮的位置*/
$(window).resize(function () {
    _setArrowPosition();

});

/**
 * 设置切换按钮的位置
 * @private
 */
function _setArrowPosition() {
    var left = $(".pageChangeCon").offset().left;
    var preBtn = $(".prePageBtn");
    var nextBtn = $(".nextPageBtn");
    if (left >= 178) {
        preBtn.css({"left": -178});
        nextBtn.css({"right": -178});
    } else if (left < 178 && left > 0) {
        preBtn.css({"left": -left, "background": 'rgba(0, 0, 0, 0.85)', "opacity": 0.1});
        nextBtn.css({"right": -left, "background": 'rgba(0, 0, 0, 0.85)', "opacity": 0.1});
    } else {
        if (left <= 0) {
            preBtn.css({"left": 20, "background": "#e4e4e4", "opacity": 0.1});
            nextBtn.css({"right": 20, "background": "#e4e4e4", "opacity": 0.1});
        }
    }
}

/**
 * 添加切换按钮hover效果
 * @private
 */
function _bindSwitchBtnHover() {
    $(".prePageBtn").hover(function () {
        $(this).css("opacity", 0.5);
    }, function () {
        $(this).css("opacity", 0.1);
    });

    $(".nextPageBtn").hover(function () {
        $(this).css("opacity", 0.5);
    }, function () {
        $(this).css("opacity", 0.1);
    })
}

/**
 * 图片错误时执行
 * * @param e
 */
function imageError(e) {
    e.src = _serverUrl + '/public' + e.src.split(_serverUrl).join('');
}

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