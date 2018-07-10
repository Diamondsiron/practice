/**
 * 图片上传插件
 * formdata
 * 进度条
 * 拖拽
 * 图片动态加载
 * 
 */
　define(['jquery'], function($){
  　　　　function foo(){
      /*判断长传图片是否存在*/
  　　　　　　if($("#file").val()==""){
         //console.log("没有蛀牙")
        var message="没有上传图片";
        console.log(message) ;
      }else{
        /*单图上传*/
        var fileName = $("#file").val();
        var strFileName=fileName.replace(/^.+?\\([^\\]+?)(\.[^\.\\]*?)?$/gi,"$1");  //正则表达式获取文件名，不带后缀
        //console.log("strFileName="+strFileName)
        var FileExt=fileName.replace(/.+\./,""); //获得后缀
        //console.log("FileExt="+FileExt)
        //console.log(FileExt.indexOf("jpg,jpeg,gif,ai,pdg,png,pdf"));
        /*if(!(FileExt.indexOf("jpg","jpeg","gif","ai","pdg","png")> -1)){
          console.log("123");
          return;
          
        }*/
        var image = $("#file").prop("files")[0];
        var data=new FormData();
        data.append('picture',image);
         /*拖拽*/
        /*var dragDrop = $("#dragDrop").get(0)
        
        dragDrop.addEventListener("dragover", function(e) {
          e.stopPropagation();
          e.preventDefault();
          console.log('123');
          //this[e.type === "dragover"? "onDragOver": "onDragLeave"].call(e.target);
          return this;
        }, false)
        dragDrop.addEventListener("dragleave", function(e) { 
          e.stopPropagation();
          e.preventDefault();
          console.log('123');
          //this[e.type === "dragover"? "onDragOver": "onDragLeave"].call(e.target);
          return this;
        }, false)
        dragDrop.addEventListener("drop", function(e) {
          e.stopPropagation();
          e.preventDefault();
          //this.funDragHover(e);
          
          // 获取文件列表对象
          var files = e.target.files || e.dataTransfer.files;
          //继续添加文件
          console.log("456");
          
          this.fileFilter = this.fileFilter.concat(this.filter(files));
          this.funDealFiles();
          return this;
        }, false)*/
        
        
        
        
        /*多文件
        <input id="myFile" type="file" multiple>
        var fileInput = document.getElementById("myFile");
        var files = fileInput.files;
        var formData = new FormData();
  
        for(var i = 0; i < files.length; i++) {
            var file = files[i];
            formData.append('files[]', file, file.name);
        }*/
        /*csrf*/
        headers={};
          headers["X-CSRF-TOKEN"]=$("#csrf").val();
          /*文件显示在页面上*/
          var img = document.createElement("img");
          img.width=100;
          img.height=100;
          img.src = window.URL.createObjectURL(image);
          img.onload = function() {
              // 明确地通过调用释放
              window.URL.revokeObjectURL(this.src);
          }
          $('#previewArea').empty();
          
          $('#previewArea').append(img);
           $(".image-picker").addClass("uploading");
          
          /*ajax提交*/
          
          $.ajax({
            type : "POST",
            url : "baseUpload.action?MyUrl=ajaxUpload",
            data:data,
            headers: headers,
            cache: false,
            contentType: false,        //不可缺参数
            processData: false,        //不可缺参数
            success:function(data){
              /*上传返回结果验证 出错return 不出错保存在id里面*/
              var reg =  /^\u/
                if(data.match(reg)==null){
                  var message="服务器配置错误"
                  console.log(message) ;
                  return;
                }
              console.log(data) ;
              $(".image-picker").removeClass("downloading");
              $("#pojoImage").val(data);  
            },
            error:function(){
              var message="服务器配置错误"
                console.log(message) ;
              
                 
            },
            xhr: function(){
                    var xhr = $.ajaxSettings.xhr();
                    if(onprogress && xhr.upload) {
                        xhr.upload.addEventListener("progress" , onprogress, false);
                        return xhr;
                     
                    }
                }
          })
      }
      
      //IE6~IE9浏览器不支持progress元素
      if (typeof window.screenX !== "number") {
          document.createElement("progress");	
          document.createElement("ie");	
      }
      /*进度条*/
        function onprogress(evt){
              var loaded = evt.loaded;                  //已经上传大小情况 
              var tot = evt.total;                      //附件总大小 
              var per = Math.floor(100*loaded/tot);  
              $("progress").val(per);//已经上传的百分比  
              console.log(per)
               $(".image-picker").removeClass("uploading").addClass("downloading");	
          }
        
        
  　　　　}
  　　　　return {
  　　　　　　foo : foo
  　　　　}
  　　})
  
  