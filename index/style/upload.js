var imgSrc1 = []; //图片路径
var imgFile1 = []; //文件流
var imgName = []; //图片名字
var formData = new FormData();
//选择图片
function imgUpload1(obj) {
	var oInput = '#' + obj.inputId;
	var imgBox = '#' + obj.imgBox;
	var btn = '#' + obj.buttonId;

	$(oInput).on("change", function () {
		var fileImg = $(oInput)[0];
		var fileList = fileImg.files;
		for (var i = 0; i < fileList.length; i++) {
			var imgSrcI = getObjectURL1(fileList[i]);
			imgName.push(fileList[i].name);
			imgSrc1.push(imgSrcI);
			imgFile1.push(fileList[i]);
		}
		addNewContent1(imgBox);
	})
	$(btn).on('click', function () {
		var data = new Object;
		console.log(data)
		data[obj.data] = imgFile1;
		data['msg'] = $("#f-words1").val();
		data['article_id'] = $("#articleId").html();
		data['commentid'] = obj.commentid
		console.log($("#f-words").val())


		imgFile1.forEach(value => {
			formData.append("image[]", value);//*
		});


		formData.append("msg", $("#f-words1").val());
		formData.append("article_id", $("#articleId").html());
		formData.append("commentid", obj.commentid);


		submitPicture1(obj.upUrl, formData);
	})
}
//图片展示
function addNewContent1(obj) {
	$(imgBox1).html("");
	for (var a = 0; a < imgSrc1.length; a++) {
		var oldBox = $(obj).html();
		$(obj).html(oldBox + '<div class="f-imgContainer"><img title=' + imgName[a] + ' alt=' + imgName[a] + ' src=' + imgSrc1[a] + ' onclick="imgDisplay1(this)"><p onclick="removeImg1(this,' + a + ')" class="f-imgDelete">删除</p></div>');
	}
}
//删除
function removeImg1(obj, index) {
	console.log(obj)
	console.log(imgSrc1)
	console.log(index)
	console.log(formData)
	imgSrc1.splice(index, 1);
	imgFile1.splice(index, 1);
	imgName.splice(index, 1);
	var boxId = "#" + $(obj).parent().parent().attr("id");

	// if (formData.has("image[]")) {
	// 	formData.delete("image[]")
	// }

	console.log(boxId)
	addNewContent1(boxId);
}
//子回复上传(将文件流数组传到后台)
function submitPicture1(url, data) {
	console.log(data);
	// alert('请打开控制台查看传递参数！');
	if (url && data) {
		$.ajax({
			type: "post",
			url: url,
			async: true,
			data: data,
			processData: false,
			contentType: false,
			success: function (data) {
            if (data.code==400) {
                Dialog.warn("温馨提示", data.msg);
                $('.mini-dialog-footer').css('height','64px');
            }else if(data.code==200){
                Dialog.success("温馨提示", data.msg);
                $('.mini-dialog-footer').css('height','64px');
				setTimeout(function(){
					window.location.reload();
				}, 2000);
				// Dialog
				// ({
				// 	title: "温馨提示",
				// 	content: data.msg,
				// 	afterClose: function () {
				// 		window.location.reload();
				// 	}
				// });
            }else{
               Dialog.warn("提示", data.msg);
                $('.mini-dialog-footer').css('height','64px');
            }
				//			console.log(dat);
				imgSrc1 = []; //图片路径
				imgFile1 = []; //文件流
				imgName = []; //图片名字
				formData = new FormData();
			}
		});
	}
}
//图片灯箱
function imgDisplay1(obj) {
	var src = $(obj).attr("src");
	var imgHtml = '<div style="width: 100%;height: 100vh;overflow: auto;background: rgba(0,0,0,0.5);text-align: center;position: fixed;top: 0;left: 0;z-index: 1000;"><img src=' + src + ' style="margin-top: 100px;width: 70%;margin-bottom: 100px;"/><p style="font-size: 50px;position: fixed;top: 30px;right: 30px;color: white;cursor: pointer;" onclick="closePicture1(this)">×</p></div>'
	$('body').append(imgHtml);
}
//关闭
function closePicture1(obj) {
	$(obj).parent("div").remove();
}

//图片预览路径
function getObjectURL1(file) {
	var url = null;
	if (window.createObjectURL != undefined) { // basic
		url = window.createObjectURL(file);
	} else if (window.URL != undefined) { // mozilla(firefox)
		url = window.URL.createObjectURL(file);
	} else if (window.webkitURL != undefined) { // webkit or chrome
		url = window.webkitURL.createObjectURL(file);
	}
	return url;
}