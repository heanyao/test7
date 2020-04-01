$(function () {
    $(".massages_xi").hide();
    $(".massages_xi:first").show();
    $(".massage_di_anniu:first").css("background", "rgba(66,48,106,1)");
   $(".ssa").hide()

});
//
$(".fangda").mouseover(function () {
$(this).css("width","134px");
    $(this).css("padding-right","0px");
$(this).children(".lubo").css("background","rgba(202,182,240,1)")
$(this).children(".ssa").show()
});
$(".fangda").mouseleave(function () {
    $(this).css("width","114px");
    $(this).css("padding-right","20px");
    $(this).children(".lubo").css("background","white")
    $(this).children(".ssa").hide()
});
$(".massage_di_anniu:first").click(function () {
    $(".massages_xi").show();
    $(".massages_xi:first").hide();

});
$("#box_two").css("display", "none");

// $(".lubo").click(function () {
//     window.open("carousel2/carousel.html", '_self');
// });
//
// $(".ssa").click(function () {
//     window.open("carousel2/carousel.html", '_self');
// });
function luobo() {
    window.open("carousel2/carousel.html", '_self');
}

function loadJs(file) {
    var head = $("head").remove("script[role='reload']");
    $("<scri" + "pt>" + "</scr" + "ipt>").attr({role: 'reload', src: file, type: 'text/javascript'}).appendTo(head);
}

var s = $(".index_color div");
var t = s.length;


var i = 0;
var li = $(".lxfscroll li");
var n = li.length - 1;
var speed = 300;
var t;
qiehuan = function (a) {

    if (i < a) {
        if ((a - i) == 1) {
            li.eq(i).animate({left: "-1140px"}, speed);
            li.eq(a).animate({left: "0px"}, speed);
        }
        if ((a - i) == 2) {
            li.eq(i).animate({left: "-1140px"}, speed);
            li.eq(i + 1).animate({left: "-1140px"}, speed);
            li.eq(a).animate({left: "0px"}, speed);
        }
        if ((a - i) == 3) {
            li.eq(i).animate({left: "-1140px"}, speed);
            li.eq(i + 1).animate({left: "-1140px"}, speed);
            li.eq(i + 2).animate({left: "-1140px"}, speed);
            li.eq(a).animate({left: "0px"}, speed);
        }
        if ((a - i) == 4) {
            li.eq(i).animate({left: "-1140px"}, speed);
            li.eq(i + 1).animate({left: "-1140px"}, speed);
            li.eq(i + 2).animate({left: "-1140px"}, speed);
            li.eq(i + 3).animate({left: "-1140px"}, speed);
            li.eq(a).animate({left: "0px"}, speed);
        }
    }
    if (i > a) {
        if ((i - a) == 1) {
            li.eq(i).animate({left: "1140px"}, speed);
            li.eq(a).animate({left: "0px"}, speed);
        }
        if ((i - a) == 2) {
            li.eq(i).animate({left: "1140px"}, speed);
            li.eq(i - 1).animate({left: "1140px"}, speed);
            li.eq(a).animate({left: "0px"}, speed);
        }
        if ((i - a) == 3) {
            li.eq(i).animate({left: "1140px"}, speed);
            li.eq(i - 1).animate({left: "1140px"}, speed);
            li.eq(i - 2).animate({left: "1140px"}, speed);
            li.eq(a).animate({left: "0px"}, speed);
        }
        if ((i - a) == 4) {
            li.eq(i).animate({left: "1140px"}, speed);
            li.eq(i - 1).animate({left: "1140px"}, speed);
            li.eq(i - 2).animate({left: "1140px"}, speed);
            li.eq(i - 3).animate({left: "1140px"}, speed);
            li.eq(a).animate({left: "0px"}, speed);
        }
        // li.eq(i + 1).animate({left: "1140px"}, speed);
        // li.eq(a).animate({left: "0px"}, speed);
    }
    i = a;
//     $(".lxfscroll li").not(".lxfscroll li:eq("+a+")").animate({left: "-1140px"}, speed);
//        li.eq(a).animate({left: "0px"}, speed);
//
//
//
// alert(i)
    $(".index_color div").css("background", "rgba(216,216,216,1)");
    $(".index_color div:eq(" + (i) + ")").css("background", "rgb(66, 48, 106)");
}
li.not(":first").css({left: "1140px"});
// li.eq(n).css({left: "-1140px"});
lxfNext = function () {

    if (!li.is(":animated")) {
        if (i >= n) {
            i = n;
        } else {
            $(".index_color div").css("background", "rgba(216,216,216,1)");
            $(".index_color div:eq(" + (i + 1) + ")").css("background", "rgb(66, 48, 106)");
            i++;

            li.eq(i - 1).animate({left: "-1140px"}, speed);
            li.eq(i).animate({left: "0px"}, speed);
            li.eq(i - 1).attr("z-index", "1");
        }
        ;
    } else {
    }
    ;
};
lxfLast = function () {
    if (!li.is(":animated")) {
        if (i <= 0) {
            i = 0;
        } else {
            $(".index_color div").css("background", "rgba(216,216,216,1)");
            $(".index_color div:eq(" + (i - 1) + ")").css("background", "rgb(66, 48, 106)");
            i--;
            li.eq(i + 1).animate({left: "1140px"}, speed);
            li.eq(i).animate({left: "0px"}, speed);
        }
        li.not("eq(i)").css({left: "-1140px"});
        $("i").text(i + 1);
    }
    ;
};