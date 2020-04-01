$(function () {
    $(".searcha").hide();
    $(".shizhoulist").hide();
    $(".search_ss").hide();
    $(".weitu").hide();

})
// $(".shoucang").toggle(function () {
    // $(this).children().next().css("color", "rgba(247, 181, 0, 1)")
    // $(this).children().attr("src", __INDEXURL__+"/images/save_yellow_a.png")
// }, function () {
    // $(this).children().next().css("color", "rgba(255, 255, 255, 1)")
    // $(this).children().attr("src", __INDEXURL__+"/images/save_a.png")
// });

// images/椭圆形.png
//images/分组%2011.png
$(".search_s").mouseover(function () {
    $(".search_ss").show();
});

$(".search_ss").mouseover(function () {
    $(".search_ss").show();
});
$(".search_ss").mouseout(function () {
    $(".search_ss").hide();
});
$(".search_s").mouseout(function () {
    $(".search_ss").hide();
});
$(".weitus").mouseover(function () {
    $(this).parent().next().show();
});
$(".weitu").mouseover(function () {
    $(this).show();
});
$(".weitu").mouseout(function () {
    $(this).hide();
});
$(".weitus").mouseout(function () {
    $(this).parent().next().hide();
});
// var i =0;
// var s = 0;
//
// $(".button_xia1").click(function () {
//     i++;
//     if(i>=2){
//         i=2;
//         $(".button_xia1").hide();
//     }else if(i>0) {
//         $(".button_shang1").show();
//     }
//     if(i==1){
//         $(this).prev().css("width","0")
//         $(this).prev().css("background-color","rgba(66, 48, 106, 1)")
//     }else if(i==2){
//         $(this).prev().css("background-color","rgba(242, 242, 242, 1)")
//     }
// });
//
// $(".button_shang1").click(function () {
//     i--;
//     if(i<=0){
//         i=0;
//         $(".button_shang1").hide();
//     }else if(i<2) {
//         $(".button_xia1").show();
//     }
//     if(i==0){
//         $(this).next().css("background-color","red")
//     }else if(i==1){
//         $(this).next().css("background-color","rgba(66, 48, 106, 1)")
//     }
// });
// // $(".button_xia").click(function () {
// //     s++;
// //     if(s>=2){
// //         s=2;
// //         $(".button_xia").hide();
// //     }else if(s>0) {
// //         $(".button_shang").show();
// //     }
// //     alert(s)
// //     if(s==1){
// //         $(this).prev().css("background-color","rgba(66, 48, 106, 1)")
// //     }else if(s==2){
// //         $(this).prev().css("background-color","rgba(242, 242, 242, 1)")
// //     }
// // });
// $(".button_xia").click(function () {
//     s++;
//     if(s>=2){
//         s=2;
//         $(".button_xia").hide();
//     }else if(s<2) {
//         $(".button_shang").show();
//     }
//     if(s==1){
//         $(this).prev().css("background-color","rgba(66, 48, 106, 1)")
//     }else if(s==2){
//         $(this).prev().css("background-color","rgba(242, 242, 242, 1)")
//     }
//
// });
// $(".button_shang").click(function () {
//     s--;
//     if(s<=0){
//         s=0;
//         $(".button_shang").hide();
//     }else if(s<2) {
//         $(".button_xia").show();
//     }
//     if(s==0){
//         $(this).next().css("background-color","red")
//     }else if(s==1){
//         $(this).next().css("background-color","rgba(66, 48, 106, 1)")
//     }
// });
// $("#checkboxFourInput").click(function () {
//    alert( $(this).attr("checked")) checkbox是否选中
// });
// $("#checkboxFourInputs").click(function () {
//     if($(this).attr("checked")=='checked'){
//           alert( $("#checkboxFourInputs ").val())
//     }
//   //checkbox是否选中
// });

$(".quedings").click(function () {
    $(".diqulistt a").css("background", "none");
    $(".diqulistt a").css("color", "rgba(102, 102, 102, 1)");
    $(".diqulist a").css("background", "none");
    $(".diqulist a").css("color", "rgba(102, 102, 102, 1)");
    $(".diqulistt>a:first-of-type").css("color", "rgba(208, 2, 27, 1)")
    $(".diqulist>a:first-of-type").css("color", "rgba(208, 2, 27, 1)")
});



$(".diqulistt>a:first-of-type").click(function () {

    $(this).css("background", "rgba(168, 160, 184, 1)");
    $(this).css("color", "white");
    $(".guojiabox a").css("background", "none");
    $(".guojiabox a").css("color", "rgba(102, 102, 102, 1)");
});
$(".guojiabox a").click(function () {
    $(".guojiabox a").css("background", "none");
    $(".guojiabox a").css("color", "rgba(102, 102, 102, 1)");
    $(this).css("background", "rgba(168, 160, 184, 1)");
    $(this).css("color", "white");
    $(".diqulistt>a:first-of-type").css("background", "none");
    $(".diqulistt>a:first-of-type").css("color", "rgba(208, 2, 27, 1)");
});


$(".diqulist>a:first-of-type").click(function () {
    $(this).nextAll("a").css("background", "none");
    $(this).nextAll("a").css("color", "rgba(102, 102, 102, 1)");
    $(this).css("background", "rgba(168, 160, 184, 1)");
    $(this).css("color", "white");

});
$(".diqulist a:not(:first-of-type)").click(function () {
    $(this).siblings("a").css("background", "none");
    $(this).siblings("a").css("color", "rgba(102, 102, 102, 1)");
    $(this).css("background", "rgba(168, 160, 184, 1)");
    $(this).css("color", "white");
    $(this).parent().children("a.buxian").css("background", "none");
    $(this).parent().children("a.buxian").css("color", "rgba(208, 2, 27, 1)");
});

$(".anniu").click(function () {
    $(this).children().children().attr("checked", "checked")
});


$(".lxfscroll1 ul li").click(function () {
    open("housingDetails.html")
});

$(".lxfscroll ul li").click(function () {
    open("housingDetails.html")
});

var i = 0;
var li = $(".lxfscroll li");
var n = li.length - 1;
$(".photo_count").text("1/"+(n+1));

var speed = 300;
li.not(":first").css({left: "600px"});
// li.eq(n).css({left: "-600px"});
lxfNext = function () {
    if (!li.is(":animated")) {
        if (i >= n) {
            i = n;
            open("housingDetails.html")
        } else {
            i++;
            li.eq(i - 1).animate({left: "-600px"}, speed);
            li.eq(i).animate({left: "0px"}, speed);
            $(".photo_count").text((i+1)+"/"+(n+1));
        }
        ;
        li.not("eq(i)").css({left: "600px"});

    } else {
    }
    ;
};
lxfLast = function () {
    if (!li.is(":animated")) {
        if (i <= 0) {
            i = 0;

        } else {
            i--;
            li.eq(i + 1).animate({left: "600px"}, speed);
            li.eq(i).animate({left: "0px"}, speed);
            $(".photo_count").text((i+1)+"/"+(n+1));
        }
        li.not("eq(i)").css({left: "-600px"});
        $("i").text(i + 1);
    }
    ;
};


var s = 0;
var lis = $(".lxfscroll1 li");
var ns = lis.length - 1;
$(".photo_cout").text("1/"+(ns+1));
var speeds = 300;
lis.not(":first").css({left: "600px"});
// lis.eq(ns).css({left: "-600px"});
lxfNext1 = function () {
    if (!lis.is(":animated")) {
        if (s >= ns) {
            s = ns;
            open("housingDetails.html")
            // lis.eq(ns).animate({left: "-600px"}, speeds);
            // lis.eq(s).animate({left: "0px"}, speeds);
        } else {
            s++;
            lis.eq(s - 1).animate({left: "-600px"}, speeds);
            lis.eq(s).animate({left: "0px"}, speeds);
            $(".photo_cout").text((s+1)+"/"+(ns+1));
        }
        ;
        li.not("eq(s)").css({left: "600px"});

    } else {
    }
    ;
};
lxfLast1 = function () {
    if (!lis.is(":animated")) {
        if (s <= 0) {
            s = 0;
            // lis.eq(0).animate({left: "600px"}, speeds);
            // lis.eq(ns).animate({left: "0px"}, speeds);
        } else {
            s--;
            lis.eq(s + 1).animate({left: "600px"}, speeds);
            lis.eq(s).animate({left: "0px"}, speeds);
            $(".photo_cout").text((s+1)+"/"+(ns+1));
        }
        lis.not("eq(s)").css({left: "-600px"});
        $("s").text(s + 1);
    }
    ;
};