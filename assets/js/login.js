
$(function () {
  // 点击注册页面
  $('#link_reg').on('click', function () {
    $('.login_box').hide()
    $('.reg_box').show()
  })
  // 点击登录
  $('#link_login').on('click', function () {
    $('.login_box').show()
    $('.reg_box').hide()
  })
  // 从layui获取form
  var form = layui.form
  var layer = layui.layer
  // 自定义规则
  form.verify({
    pass: [
      /^[\S]{6,12}$/
      , '密码必须6到12位，且不能出现空格'
    ],
    repwd: function (value) {
      let val = $('.reg_box [name=password]').val()
      if (value !== val) {
        return '两次密码不一致，请重新输入'
      }
    }
  })

  // 注册功能
  $('.reg_box').on('submit', function (e) {
    e.preventDefault()
    let password = $('.reg_box [name=repassword]').val()
    let username = $('.reg_box [name=username]').val()
    $.post('/api/reguser', { username: username, password: password }, function (res) {
      if (res.status !== 0) {
        return layer.msg(res.message);
      }
      console.log('ok');
      layer.msg(res.message);
      // $('#link_login').click()
    })
  })

  // 登录功能
  $('.login_box').on('submit', function (e) {
    e.preventDefault()
    let username = $('.login_box [name=username]').val()
    let password = $('.login_box [name=pwd]').val()
    // console.log(username, password);
    // 用ajax发起请求
    // $.post('http://www.liulongbin.top:3007/api/login', { username: username, password: password }, function (res) {
    //   if (res.status !== 0) {
    //     return layer.msg(res.message);
    //   }
    //   layer.msg(res.message);
    // })
    $.ajax({
      url: '/api/login',
      method: 'POST',
      data: { username, password },
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        layer.msg(res.message);
        localStorage.setItem('token', res.token)
        location.href = '/index.html'
      }
    })
  })

})  