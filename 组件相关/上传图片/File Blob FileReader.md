#### 上传图片组件的实现

* FormData + XHR2

* Fetch 上传

* Blob File 是什么东西 还有FileReader的关系

* 图片预览

  * FIleReader
  * URL.createObjectURL(bob)

* 拖拽文件上传 & 拖拽文件删除

  * dragstart 

  * drag 

  * dragend
  * dragenter
  * dragover
  * dragleave drop



* dataTransfer 对象



#### Blob 对象

Blob对象表示一个不可变 原始数据的类文件对象。 File接口基于Blob。继承了bolb的功能。 要创建包含一个blob数据的子集blob。 请使用slice方法。 要获取用户文件系统上的文件对应的Blob对象。



**blob对象的使用**

* 分片上传

  由于服务器的限制。不能上传很大的图片。这时候要把一个需要上传的文件进行切割。分别上传到服务器。

  ```javascript
  var BYTES_CHUNK = 1024 * 1024;
  
  var blob = document.getElementById('file').file[0];
  var slices = Math.ceil(blob.size / BYTES_CHUNK);
  var blobs = [];
  slices.forEach((item, index) => {
     blobs.push(blob.slice(index, index + 1)); 
  });
  
  ```



##### 图片缩略图 FileReader

从blob中读取内容的唯一方法就是使用 FileReader。 FileReader 接口有四个方法。 其中三个用来读取文件。 

**readAsDataURL 读取指定Blob或File对象。读取操作完成之后 readyState 会变成已完成 触发 loadend事件。同事reslut属性包含一个data： URL格式的字符串编码 表示读取文件的内容**



```javascript
  // 图片
  var img = document.getElementById('img');
  var inputBox = document.getElementById('upload');
  var input = document.getElementById('input');

  inputBox.addEventListener('click', function() {
    // 这里是通过隐藏input 美化上传按钮
    input.click();
  }, false);

  input.addEventListener('change', function() {
    var reader = new FileReader();
    var file = this.files[0];
    console.log(file);

    if (file) {
      reader.readAsDataURL(file);
      reader.addEventListener('load', function(){
        img.src = this.result;
      }, false);
    }
  }, false);
```



#### 图片缩略图 URL

URL可以不像FileReader那样转成一个base64那么长的字符串。 URL可以直接返回提供一个地址给img元素的src属性值。

**URL接口用来创建URL对象 有两个方法**

* createObjectURL 传入一个File或者Blob对象 返回一个DOMString 这个字符串可以用来展示我们的内容
* revokeObjectURL 用来销毁通过createObjectURL创建的DOMString



```javascript
handleChange = event => {
   	event.preventDefault();
    const { files } = this.state;
    Array.prototype.forEach.call(this.fileInput.files, file => {
       // 一句代码就可以直接返回src给img的src属性 
       const src = URL.createObjectURL(file);
       file.src = src;
       this.setState({
         files: [...files, file]     
       });
        this.fileInput.value = '';
    });
};
```





