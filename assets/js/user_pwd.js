$(function () {
  var form = layui.form

  form.verify({
    pwd: [
      /^[\S]{6,12}$/
      , '密码必须6到12位，且不能出现空格'
    ],
    nexpwd: function (val) {
      if ($('[name=old]').val() === val) return '新旧密码不能一致！'

    },
    repwd: function (val) {
      if ($('[name=newnext]').val() !== val) return '两次输入的新密码不一致！'
    }
  })

  $('.layui-form').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
      url: '/my/updatepwd',
      method: 'POST',
      data: {
        oldPwd: $('.layui-form [name=old]').val(),
        newPwd: $('.layui-form [name=newnext]').val()
      },

      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        layer.msg(res.message)
        $('.layui-form')[0].reset()
      }
    })
  })

})
