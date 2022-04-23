$(function () {
  var layer = layui.layer
  // 调用用户数据
  getUserinfo()
  // 绑定退出
  $('#btnExitLogin').on('click', function () {
    console.log(111);
    layer.confirm('你确定要退出当前账号？', { icon: 3, title: '提示' }, function (index) {
      //do something
      localStorage.removeItem('token')
      location.href = '/login.html'
      // 关闭询问
      layer.close(index);
    });


  })

})
function getUserinfo() {
  $.ajax({
    method: 'GET',
    url: '/my/userinfo',
    // 请求头配置
    // headers: {
    //   Authorization: localStorage.getItem('token') || ''
    // },
    success: function (res) {
      if (res.status !== 0) {
        location.href = '/login.html'
        return layer.msg(res.message)

      }
      readuserinfo(res.data)

    },
    // 执行回调

  })
}
function readuserinfo(data) {

  // 渲染用户名
  let username = data.nickname || data.username
  $('#usernametext').html(`欢迎 ${username}`)

  // 渲染用户头像
  if (data.user_pic !== null) {
    $('.layui-nav-img').attr('src', data.user_pic).show()
    $('.defaAut').hide()
  } else {
    let pic = username.slice(0, 1).toUpperCase()
    $('.defaAut').html(pic).show()
    $('.layui-nav-img').hide()
  }

}
