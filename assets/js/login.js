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
})  