// 封装ajax
$.ajaxPrefilter(function (options) {
  options.url = 'http://www.liulongbin.top:3007' + options.url
})