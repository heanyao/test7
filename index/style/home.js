
imgUpload({
    inputId: 'f-file', //input框id
    imgBox: 'imgBox', //图片容器id
    buttonId: 'f-btn', //提交按钮id
    upUrl: `${urls}/article/comments`,  //提交地址
    data: 'image[]' //参数名
});

 
/*实现顶功能*/
$(".f-putimg").find("img").click(function () {
    let Aid = $("#articleId").html();;  // 用户id
    let Nums = $(this).attr("num");;  // 是否已经顶了
    $.ajax({
        url: `${urls}/articles/ding/${Aid}/${Nums}`,
        type: 'get',
        dataType: 'json',
        success: function (data) {
            console.log(data)
            if(data.code==400) {
                Dialog.warn("提示", data.msg);
                $('.mini-dialog-footer').css('height','64px');
            }
            if(data.code=='add200') {
                Dialog.warn("提示", data.msg);
                $('.mini-dialog-footer').css('height','64px');
                // window.location.reload()
            }
            if(data.code=='delete200') {
                Dialog.warn("提示", data.msg);
                $('.mini-dialog-footer').css('height','64px');
            // window.location.reload()  
            }                            
        },
        error: function (error) {
            console.log(error)
        }
    })
});

/*收藏功能*/
$(".f-xingxing").click(function () {
    // $(this).css('backgroundImage', 'url(./images/soucanged.png)');//收藏
    //$(this).css('backgroundImage', 'url(./images/soucang.png)');//取消收藏
    let Aid = $("#articleId").html();;
    let types = $(this).attr('num')
    const that = this
    $.ajax({
        url: `${urls}/index/article/addKeep?artId=${Aid}&type=${types}`,
        type: 'get',
        dataType: 'json',
        success: function (data) {
            if (data.code=='delete200') {
                // var delUrl: `${index_url}/images/soucang.png`,  //提交地址
                Dialog.success("温馨提示", data.msg);
                $('.mini-dialog-footer').css('height','64px');
                $(that).css('backgroundImage', 'url(/static/index/images/shoucang.png)')
                $("#f-xingxing").attr('num', "1")
                var deleto = $("#keepchange").html()
                var delenum=parseInt(deleto)-1;
                $("#keepchange").html(delenum)
            } 
            if (data.code=='add200') {
                // var delUrl: `${index_url}/images/soucang.png`,  //提交地址
                Dialog.success("温馨提示", data.msg);
                $('.mini-dialog-footer').css('height','64px');
                $(that).css('backgroundImage', 'url(/static/index/images/soucanged.png)')
                $("#f-xingxing").attr('num', "2")
                var deleto = $("#keepchange").html()
                var delenum=parseInt(deleto)+1;
                $("#keepchange").html(delenum)
            }
            if(data.code==400) {
                Dialog.warn("提示", data.msg);
                $('.mini-dialog-footer').css('height','64px');
            }
                // window.location.reload()  
        },
        error: function (error) {
            console.log(error)
        }
    })
});
// 评论区关注功能
$("#comments").on("click", "#c-child", function () {
    // let uSid = 12; // 用户id
    let uSid = $(this).parent().find("img").attr("userID")
    let types = $(this).html() == "已关注" ? 2 : 1;
    const that = this
    $.ajax({
        url: `${urls}/index/userprofile/follow?userid=${uSid}&type=${types}`,
        type: 'get',
        dataType: 'json',
        success: function (data) {
            console.log(data)
            if(data.code==400) {
                $(that).html("十关注");
                Dialog.warn("提示", data.msg);
                $('.mini-dialog-footer').css('height','64px');
            }else if(data.code=='add200'){
                $(that).html("已关注");
                Dialog.success("提示", data.msg);
                $('.mini-dialog-footer').css('height','64px');     
            }else if(data.code=='delete200'){
                $(that).html("十关注")
                Dialog.warn("提示", data.msg);
                $('.mini-dialog-footer').css('height','64px'); 
            }else{
                $(that).html("已关注");
                Dialog.success("提示", data.msg);
                $('.mini-dialog-footer').css('height','64px'); 
            }
        },
        error: function (error) {
            console.log(error)
        }
    })
})

// 关注功能
$("#follow").click(function () {
    let uSid = $("#user_Id").html(); // 用户id
    let types = $(this).html() == "已关注" ? 2 : 1;
    const that = this
    $.ajax({
        url: `${urls}/index/userprofile/follow?userid=${uSid}&type=${types}`,
        type: 'get',
        dataType: 'json',
        success: function (data) {
            console.log(data)

            if(data.code==400) {
                $(that).html("十关注");
                Dialog.warn("提示", data.msg);
                $('.mini-dialog-footer').css('height','64px');
            }else if(data.code=='add200'){
                $(that).html("已关注");
                Dialog.success("提示", data.msg);
                $('.mini-dialog-footer').css('height','64px');     
            }else if(data.code=='delete200'){
                $(that).html("十关注")
                Dialog.warn("提示", data.msg);
                $('.mini-dialog-footer').css('height','64px'); 
            }else{
                $(that).html("已关注");
                Dialog.success("提示", data.msg);
                $('.mini-dialog-footer').css('height','64px'); 
            }


            // if (types == 1) {
            //     $(that).html("已关注")
            //     Dialog.warn("提示", '您已成功关注');
            //     $('.mini-dialog-footer').css('height','64px');
            // } else {
            //     $(that).html("十关注")
            //    Dialog.warn("提示", '您已取消关注TA');
            //     $('.mini-dialog-footer').css('height','64px');
            // }
        },
        error: function (error) {
            console.log(error)
        }
    })
});

//子回复
$("#comments").on("click", ".reply_btn", function () {
    $(".replayi").remove();
    let id = $(this).parent().parent().parent().find(".commentId").attr('data-id')
    console.log(id)
    console.log(photo_url)
    $(this).parent().parent().parent().append(`<div class="replayi">
    <div class="f-reply-textbox">
                <div class="f-reply-textbox-photo">
                    <img src= "`+photo_url+`" alt="">
                </div>
                <div class="f-reply-emoji">
                    <img src="/static/index/images/emoji.png" alt="" class="emojiIcon emojiIcon1">
                    <div class="emojiContent emojiContent1">
                        <ul class="emojiList emojiList1"></ul>
                    </div>
                    <span class="emojiTriangle emojiTriangle1"></span>
                    <div id="f-inputBox"><input type="file" title=" " id="f-file1" multiple
                            accept="image/png,image/jpg,image/gif,image/JPEG" /></div>
                </div>
                <div class="f-reply-words">
                    <textarea name="" id="f-words1" cols="30" maxlength="80" rows="10"
                        placeholder="这个问题你有什么看法，发表看看"></textarea>
                </div>
                <div id="imgBox1"></div>
            </div>
            <div class="f-btns"><button class="f-btn1" id="f-btn1">提交回答</button>
            <button class="f-btn1 cancelB" id="f-btn2">取消回答</button></div></div>`);
    imgUpload1({
        inputId: 'f-file1', //input框id
        imgBox: 'imgBox1', //图片容器id
        buttonId: 'f-btn1', //提交按钮id
        upUrl: `${urls}/article/subcomments`,  //提交地址
        data: 'image[]', //参数名
        commentid: id
    });
    emojiInit1()
});

$("#comments").on("click", "#f-btn2", function () {
    $(".replayi").remove();
});


//图片放大查看
$(".f-contenttop").find('img').click(function () {
    var _this = $(this);//将当前的pimg元素作为_this传入函数
    imgShow("#outerdiv", "#innerdiv", "#bigimg", _this);
});

$("#comments").find('.f-comment1-pic').find("img").click(function () {
    var _this = $(this);//将当前的pimg元素作为_this传入函数
    imgShow("#outerdiv", "#innerdiv", "#bigimg", _this);
});

$("#comments").on("click", '.f-comment1-pic img' , function() {
    var _this = $(this);//将当前的pimg元素作为_this传入函数
    imgShow("#outerdiv", "#innerdiv", "#bigimg", _this);
})


/*图片放大相关操作*/
function imgShow(outerdiv, innerdiv, bigimg, _this) {
    var src = _this.attr("src");//获取当前点击的pimg元素中的src属性
    $(bigimg).attr("src", src);//设置#bigimg元素的src属性

    /*获取当前点击图片的真实大小，并显示弹出层及大图*/
    $("<img/>").attr("src", src).load(function () {
        var windowW = $(window).width();//获取当前窗口宽度
        var windowH = $(window).height();//获取当前窗口高度
        var realWidth = this.width;//获取图片真实宽度
        var realHeight = this.height;//获取图片真实高度
        var imgWidth, imgHeight;
        var scale = 0.8;//缩放尺寸，当图片真实宽度和高度大于窗口宽度和高度时进行缩放

        if (realHeight > windowH * scale) {//判断图片高度
            imgHeight = windowH * scale;//如大于窗口高度，图片高度进行缩放
            imgWidth = imgHeight / realHeight * realWidth;//等比例缩放宽度
            if (imgWidth > windowW * scale) {//如宽度扔大于窗口宽度
                imgWidth = windowW * scale;//再对宽度进行缩放
            }
        } else if (realWidth > windowW * scale) {//如图片高度合适，判断图片宽度
            imgWidth = windowW * scale;//如大于窗口宽度，图片宽度进行缩放
            imgHeight = imgWidth / realWidth * realHeight;//等比例缩放高度
        } else {//如果图片真实高度和宽度都符合要求，高宽不变
            imgWidth = realWidth;
            imgHeight = realHeight;
        }
        $(bigimg).css("width", imgWidth);//以最终的宽度对图片缩放

        var w = (windowW - imgWidth) / 2;//计算图片与窗口左边距
        var h = (windowH - imgHeight) / 2;//计算图片与窗口上边距
        $(innerdiv).css({ "top": h, "left": w });//设置#innerdiv的top和left属性
        $(outerdiv).fadeIn("fast");//淡入显示#outerdiv及.pimg
        $("body").css('overflow', 'hidden');
    });

    $(outerdiv).click(function () {//再次点击淡出消失弹出层
        $(this).fadeOut("fast");
        $("body").css('overflow', 'auto');
    });
}


emojiInit();
/**
 * 表情初始化
 */
function emojiInit() {

    $(".emojiIcon").click(function () {
        $(".emojiContent,.emojiTriangle").toggle();
    });

    var list = $(".emojiList");
    for (var i = 1; i <= 149; i++) {
        if (i === 18 || i === 19) continue;
        // var temp = '<li><img src="../images/emoji/' + i + '.gif" alt=""/></li>';
        var temp = `<li><img src="${index_url}/images/emoji/${i}.gif" alt=""/></li>`;
        list.append(temp);
    }
    _bindSelectExpression();
}

function emojiInit1() {

    $(".emojiIcon1").click(function () {
        $(".emojiContent1,.emojiTriangle1").toggle();
    });

    var list = $(".emojiList1");
    for (var i = 1; i <= 149; i++) {
        if (i === 18 || i === 19) continue;
        // var temp = '<li><img src="../images/emoji/' + i + '.gif" alt=""/></li>';
        var temp = `<li><img src="${index_url}/images/emoji/${i}.gif" alt=""/></li>`;
        list.append(temp);
    }
    _bindSelectExpression1();
}

/**
 * 绑定选择表情
 * @private
 */
function _bindSelectExpression() {
    var text = "";
    $(".emojiList").find("li").click(function () {
        var src = $(this).find('img').attr('src');
        var t = src.split('/');
        var item = t[t.length - 1];
        console.log(item);
        text = '[' + item + ']';
        var input = $("#f-words");
        var value = input.val();
        input.val(value + text);
        $(".emojiContent").hide();
        $(".emojiTriangle").hide();
    })
}

/**
 * 绑定选择表情
 * @private
 */
function _bindSelectExpression1() {
    var text = "";
    $(".emojiList1").find("li").click(function () {
        var src = $(this).find('img').attr('src');
        var t = src.split('/');
        var item = t[t.length - 1];
        console.log(item);
        text = '[' + item + ']';
        var input = $("#f-words1");
        var value = input.val();
        input.val(value + text);
        $(".emojiContent1").hide();
        $(".emojiTriangle1").hide();
    })
}