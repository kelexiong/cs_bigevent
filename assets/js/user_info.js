$(function () {
  const form = layui.form

  form.verify({
    nickname: function (val) {
      if (val.length > 6) {
        return '昵称必须是1-6字符之间！'
      }
    }
  })
  // 重置按钮
  $('.layui-form-item [name=chongzhi]').on('click', function (e) {
    e.preventDefault();
    unserinfo()
  })
  // 提交按钮
  $('.layui-form').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/my/userinfo',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        layer.msg(res.message)
        // 调用index页面的方法刷新页面数据
        window.parent.getUserinfo()
      }
    })
  })
})
unserinfo()

function unserinfo() {
  $.ajax({
    method: 'GET',
    url: '/my/userinfo',
    success: function (res) {
      let form = layui.form
      if (res.status !== 0) {
        return layer.msg(res.message);
      }
      console.log(res.data);
      // layer.msg(res.message)
      form.val('alteruserinfo', res.data
        // {
        //   "username": res.data.username,
        //   "nickname": res.data.nickname,
        //   "email": res.data.email
        // }
      )
    },
  })
}