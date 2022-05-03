$(function () {
  var layer = layui.layer
  var form = layui.form

  initC()
  initEditor()



  function initC() {
    $.ajax({
      method: 'GET',
      url: '/my/article/cates',
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('获取文章列表失败！！！')
        }
        let tplhtmls = template('tpl-cate', res)
        $(' [name=cate_id]').html(tplhtmls)
        console.log(111);
        // 需要重新调用一下form.render()重新渲染一下tpl
        form.render()
      }
    })
  }


  // 1. 初始化图片裁剪器
  var $image = $('#image')

  // 2. 裁剪选项
  var options = {
    aspectRatio: 400 / 280,
    preview: '.img-preview'
  }

  // 3. 初始化裁剪区域
  $image.cropper(options)

  // 通过点击按钮来触发隐藏域的点击事件
  $('#btnCimgae').on('click', function () {
    $('#covefile').trigger('click')
  })


  // 监听隐藏域的change
  $('#covefile').on('change', function (e) {
    // 获取文件的列表数组
    var files = e.target.files

    if (files.length === 0) {
      return
    }
    var newImgURL = window.URL.createObjectURL(files[0])

    $image
      .cropper('destroy')      // 销毁旧的裁剪区域
      .attr('src', newImgURL)  // 重新设置图片路径
      .cropper(options)        // 重新初始化裁剪区域
  })

  // 定义一个文章的状态
  var art_kk = '已发布'
  // 通过监听文章状态来发送
  $('#btnSavedraft').on('click', function () {
    art_kk = '草稿'

  })
  // 通过表单的提交来监听所有的数据项目
  $('#art_form').on('submit', function (e) {
    e.preventDefault()
    // 基于form表单，快速创建一个FormData对象
    var kk = new FormData($(this)[0])

    kk.append('state', art_kk)

    // 将裁剪后的图片，输出为文件
    $image
      .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
        width: 400,
        height: 280
      })
      .toBlob(function (blob) {       // 将 Canvas 画布上的内容，转化为文件对象
        // 得到文件对象后，进行后续的操作
        kk.append('cover_img', blob)
        pppt(kk)
      })
    // // 打印测试
    // setTimeout(() => {
    //   kk.forEach((k, v) => {
    //     console.log(k, v);
    //   })
    // }, 1000)

  })




  function pppt(params) {
    $.ajax({
      method: 'POST',
      url: '/my/article/add',
      data: params,
      // 如果想服务器提交的是FormData格式的数据，必须要添加以下两点
      contentType: false,
      processData: false,
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('发表或存稿文章失败！！！')
        }
        layer.msg('文章成功的发表或存稿！！！')
        // location.href = '/art_actlist/art_list.html'
      }
    })
  }


})