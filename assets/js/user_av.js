$(function () {
  var layer = layui.layer
  // 1.1 获取裁剪区域的 DOM 元素
  var $image = $('#image')
  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
  }

  // 1.3 创建裁剪区域
  $image.cropper(options)

  $('#btnUpload').on('click', function () {

    $('#file').trigger('click')
  })

  $('#file').on('change', function (e) {
    console.log(e.target);
    // 获取文件信息
    let file = e.target.files[0]
    if (e.target.files.length === 0) {
      console.log(111);
      return layer.msg('你取消了上传')
    }
    // 将获取的文件转存URL地址
    let imgurl = window.URL.createObjectURL(file)
    //  先`销毁`旧的裁剪区域，再`重新设置图片路径`，之后再`创建新的裁剪区域`：
    $image
      .cropper('destroy')      // 销毁旧的裁剪区域
      .attr('src', imgurl)  // 重新设置图片路径
      .cropper(options)        // 重新初始化裁剪区域
  })
  $('#datemUpload').on('click', function () {
    // 将裁剪后的图片，输出为 base64 格式的字符串
    var dataURL = $image
      .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
        width: 100,
        height: 100
      }).toDataURL('image/jpg')
    $.ajax({
      method: 'POST',
      url: '/my/update/avatar',
      data: {
        avatar: dataURL
      },
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('更新失败了！！！')
        }
        layer.msg('更新成功了~~~')
        window.parent.getUserinfo()
      }
    })
  })
})