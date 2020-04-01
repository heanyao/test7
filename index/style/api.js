
$(function () {
    // getPage()
    ajaxPage()
})

// 获取评论信息接口
function ajaxPage(page) {
    var p = page || 1;
    var artId = $("#articleId").html();
    $.ajax({
        type: "get",
        url: urls + "/article/comments/" + artId + "/6/" + p + "/0",
        dataType: "json",
        success: function (data) {
            //数据处理
            let dataList = data.data.leavemsg;
            dataList.forEach((value) => {
                let wrapStr = $("<div>")
                let htmlStr = `
                <div class="f-comment">
                    <div class="f-comment-photo">
                        <img userID="${value.id}" src="${urls}${value.head_img_url}" alt="">
                    </div>
                    <div class="f-comment-name">${value.name}</div>
                    <div class="f-addinterest1" id="c-child">十关注</div>
                </div>
                <div class="commentId" data-id="${value.id}" style="display:none"></div>`

                // <div class="f-comment1-words">${value.introduce}</div>
                if (value.introduce) {
                    if (value.introduce.indexOf('.gif') > -1) {
                        var matchReg = /(?<=\[).*?\.gif/gi;
                        let list = value.introduce.match(matchReg)
                        console.log(value.introduce.match(matchReg));
                        let stre = value.introduce
                        list.forEach((value) => {
                            console.log(value)
                            console.log(stre)
                            stre = stre.replace(`[${value}]`, `<img class="imgE" src="${index_url}/images/emoji/${value}" alt />`)
                        })
                        htmlStr = htmlStr + `<div class="f-comment1-words">${stre}</div>`
                    } else {
                        htmlStr = htmlStr + `<div class="f-comment1-words">${value.introduce}</div>`
                    }
                }

                if (value.comment_pics) {
                    let imgStr = $('<div>')
                    imgStr.attr("class", 'f-comment1-pic')
                    htmlStr = htmlStr + `<div class="f-comment1-pic">`
                    let imgList = value.comment_pics.split(',')
                    let imgLength = ''
                    imgList.forEach((img) => {
                        let srcImg = img.replace(/\\/g, '/')
                        imgLength = imgLength + srcImg
                        if (srcImg.length > 5) {
                            htmlStr = htmlStr + `<img src="${urls}${srcImg}" alt="">`
                        }
                    })
                    imgStr.html(imgLength)
                    htmlStr = htmlStr + `</div>`
                }
                let aTime = getMyDate(value.create_time * 1000)
                htmlStr = htmlStr + `<div class="f-comment-operation f-comment-operation1">
                                <div class="f-comment-time">${aTime}</div>
                                <div class="flexs">
                                <div class="f-comment-report">举报</div>
                                <div class="f-comment-stop"></div>
                                <div class="f-comment-reply reply_btn">回复</div></div>
                            </div>`
                if (value.children) {
                    value.children.forEach((item) => {
                        let time = getMyDate(item.create_time * 1000)
                        let sters = ''
                        if (item.introduce.indexOf('.gif') > -1) {
                            var matchReg = /(?<=\[).*?\.gif/gi;
                            let list = item.introduce.match(matchReg)
                            console.log(item.introduce.match(matchReg));
                            let stre = item.introduce
                            list.forEach((item1) => {
                                console.log(item1)
                                console.log(stre)
                                stre = stre.replace(`[${item1}]`, `<img class="imgE imgE1" src="${index_url}/images/emoji/${item1}" alt />`)
                            })
                            sters = `<div class="f-comment-child-words">${stre}</div>`
                        } else {
                            sters = `<div class="f-comment-child-words">${item.introduce}</div>`
                        }
                        let t = `
                        <div class="f-comment-child">
                            <div class="f-comment-child-photo">
                                <img src="${urls}${item.head_img_url}" alt="">
                            </div>
                            <div class="f-comment-child-name">${item.name}</div>${sters}
                        </div>
                        <div class="f-comment-operation f-comment-operation1">
                            <div class="f-comment-time">${time}</div>
                        </div>`

                        htmlStr = htmlStr + t

                        if (item.comment_pics) {
                            let imgStr = $('<div>')
                            imgStr.attr("class", 'f-comment1-pic')
                            htmlStr = htmlStr + `<div class="f-comment1-pic">`
                            let imgList = item.comment_pics.split(',')
                            let imgLength = ''
                            imgList.forEach((img) => {
                                let srcImg = img.replace(/\\/g, '/')
                                imgLength = imgLength + srcImg
                                if (srcImg.length > 5) {
                                    htmlStr = htmlStr + `<img src="${urls}${srcImg}" alt="">`
                                }
                            })
                            imgStr.html(imgLength)
                            htmlStr = htmlStr + `</div>`
                        }
                    })
                }
                wrapStr.html(htmlStr)
                $("#comments").append(wrapStr)
            });

            // 调用分页插件
            $("#myPage1").sPage({
                page: p,//当前页码
                pageSize: 6,//每页显示多少条数据，默认10条
                total: data.data.total_num,//数据总条数,后台返回
                prevPage: "←",
                nextPage: "→",
                backFun: function (page) {
                    //点击分页按钮回调函数，返回当前页码
                    ajaxPage(page);
                }
            });
        },
        error: function (e) {
            console.log(e);
        }
    });
}

// 分页操作
function getPage() {
    $("#myPage1").sPage({
        page: 1,
        pageSize: 10,
        total: 150,
        prevPage: "←",
        nextPage: "→",
        backFun: function (page) {
            $("#pNum1").text(page);
        }
    });
}

// 时间戳转换工具
function getMyDate(str) {
    var oDate = new Date(str),
        oYear = oDate.getFullYear(),
        oMonth = oDate.getMonth() + 1,
        oDay = oDate.getDate(),
        oHour = oDate.getHours(),
        oMin = oDate.getMinutes(),
        oSen = oDate.getSeconds(),
        oTime = oYear + '-' + getzf(oMonth) + '-' + getzf(oDay) + ' ' + getzf(oHour) + ':' + getzf(oMin)
    //  + ':' + getzf(oSen);//最后拼接时间  
    return oTime;
};
//补0操作
function getzf(num) {
    if (parseInt(num) < 10) {
        num = '0' + num;
    }
    return num;
}