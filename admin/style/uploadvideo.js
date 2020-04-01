
 var xhr;//异步请求对象
 var ot; //时间
  var oloaded;//大小
  //上传文件方法
  function UpladFile(){
      $("#videoOnePContent").html("");
      var fileObj = document.getElementById("videoOneP").files[0]; // js 获取文件对象
      if (fileObj.name) {
          $("#videoName").text(fileObj.name);
          var url = "/admin/uploadvideo/upload"; // 接收上传文件的后台地址
          var form = new FormData(); // FormData 对象
          form.append("files", fileObj); // 文件对象
          form.append("code", $("#code").val()); // 文件对象
          xhr = new XMLHttpRequest(); // XMLHttpRequest 对象
          xhr.open("post", url, true); //post方式，url为服务器请求地址，true 该参数规定请求是否异步处理。
        
          xhr.upload.onprogress = progressFunction; //【上传进度调用方法实现】
          xhr.upload.onloadstart = function () { //上传开始执行方法
              ot = new Date().getTime(); //设置上传开始时间
              oloaded = 0; //设置上传开始时，以上传的文件大小为0
          };
          xhr.send(form); //开始上传，发送form数据
         
          xhr.onload = uploadComplete; //请求完成
          xhr.onerror = uploadFailed; //请求失败
      }
    }




function progressFunction(evt) {
     $("#time").css("display", "block");
     // event.total是需要传输的总字节，event.loaded是已经传输的字节。如果event.lengthComputable不为真，则event.total等于0
     if (evt.lengthComputable) {
         $(".line").css("display", "block");
         /*进度条显示进度*/
         $(".layui-progress-bar").attr("lay-percent", Math.round(evt.loaded / evt.total * 100));
         $(".layui-progress-bar").css("width", Math.round(evt.loaded / evt.total * 100) + "%");
         $(".el-progress__text").html(Math.round(evt.loaded / evt.total * 100) + "%");
     }

     var time = document.getElementById("time");
     var nt = new Date().getTime(); //获取当前时间
     var pertime = (nt - ot) / 1000; //计算出上次调用该方法时到现在的时间差，单位为s
     ot = new Date().getTime(); //重新赋值时间，用于下次计算

     var perload = evt.loaded - oloaded; //计算该分段上传的文件大小，单位b
     oloaded = evt.loaded; //重新赋值已上传文件大小，用以下次计算

     //上传速度计算
     var speed = perload / pertime; //单位b/s
     var bspeed = speed;
     var units = 'b/s'; //单位名称
     if (speed / 1024 > 1) {
         speed = speed / 1024;
         units = 'k/s';
     }
     if (speed / 1024 > 1) {
         speed = speed / 1024;
         units = 'M/s';
     }
     speed = speed.toFixed(1);
     //剩余时间
     var resttime = ((evt.total - evt.loaded) / bspeed).toFixed(1);
     time.innerHTML = '上传速度：' + speed + units + ',剩余时间：' + resttime + 's';
     if (bspeed == 0)
         time.innerHTML = '上传已取消';
 }
//上传成功响应
        function uploadComplete(evt) {
            var date =jQuery.parseJSON(evt.target.responseText);
            if (date.State) {
                $("#videoOnePContent").append('<div><video src="' + date.Msg + '"preload controls /><input type="hidden" name="videoAlbum[0]" value="' + date.Msg + '"></video><span><a οnclick="Deleectvideo(this)">删除</a></span>');
                $("#videoOnePShow").css("display", "block");
                $("#time").css("display", "none");
            } else {
                layui.use('layer', function () {
                    //赋值
                    layui.layer.msg("上传失败！", { offset: '150px' });
                });
            }
        }
        //上传失败
        function uploadFailed(evt) {
            layui.use('layer', function () {
                //赋值
                layui.layer.msg("上传失败！", { offset: '150px' });
            });
        }

