$(function () {
  var form = layui.form
  // 获取文章列表数据
  function getinitArtactlist() {
    $.ajax({
      method: 'GET',
      url: '/my/article/cates',
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('获取文章类别失败！！！')
        }
        console.log(res);

        let htmltpl = template('tpl-table', res)
        $('tbody').html(htmltpl)
      }
    })
  }
  getinitArtactlist()
  // 用来接受弹窗层本体
  var dalongNull = null
  $('#popUpedit').on('click', function () {
    // 弹出层代码
    dalongNull = layer.open({
      type: 1,
      title: '添加文章分类',
      area: ['500px', '280px'],
      content: $('#dalong-up').html(),
    });
  })
  // 通过代理形式添加绑定事件，因为这个弹窗是通过点击渲染的，一开始页面是找不到这个元素的
  $('body').on('submit', '#layui-form-kcs', function (e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/my/article/addcates',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('获取文章类别失败！！！')
        }
        console.log(res);
        // 添加后重新获取
        getinitArtactlist()
        layer.msg('添加成功！！！')
        // 关闭弹出层本体
        layer.close(dalongNull)
      }
    })
  })
  // 代理表单编辑按钮
  var indexEdit = null
  $('tbody').on('click', '#edit', function (e) {
    console.log(this);
    // 修改文章弹窗
    indexEdit = layer.open({
      type: 1,
      title: '修改文章分类',
      area: ['500px', '280px'],
      content: $('#dalong-edit').html(),
    });
    // 获取自定义属性id
    let id = $(this).attr('data-id')
    $.ajax({
      method: 'GET',
      url: '/my/article/cates/' + id,
      success: function (res) {
        console.log(res);
        form.val('layui-form-edit', res.data)
      }
    })
  })
  // 代理表单编辑按钮里面的确认
  $('body').on('submit', '#layui-form-edit', function (e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/my/article/updatecate',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('更新失败了！！！')
        }
        layer.close(indexEdit)
        getinitArtactlist()
        layer.msg('更新成功！！！')
      }
    })
  })
  // 代理表单里面的删除按钮
  $('tbody').on('click', '#del', function (e) {
    var id = $(this).attr('data-id')
    layer.confirm('确定是否删除当前的文章分类', { icon: 3, title: '警告' }, function (index) {
      //do something
      $.ajax({
        method: 'GET',
        url: '/my/article/deletecate/' + id,
        success: function (res) {
          if (res.status !== 0) {
            return layer.msg('删除失败了！！！')
          }
          layer.close(index);
          getinitArtactlist()
          layer.msg('删除成功！！！')
        }
      })

    });

  })
})