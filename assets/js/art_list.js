$(function () {
  var layer = layui.layer
  var form = layui.form
  var laypage = layui.laypage
  template.defaults.imports.dataFormat = function (date) {
    var dt = new Date(date)

    var y = dt.getFullYear()
    var m = dt.getMonth() + 1
    var d = dt.getDate()

    var hh = dt.getHours()
    var mm = dt.getMinutes()
    var ss = dt.getSeconds()
    return `${y}-${m}-${d} ${hh}：${mm}：${ss}`
  }
  var q = {
    pagenum: 1,
    pagesize: 2,
    cate_id: '',
    state: ''
  }

  getartList()
  initCate()


  // 获取文章列表
  function getartList() {
    $.ajax({
      method: 'GET',
      url: '/my/article/list',
      data: q,
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('获取列表失败')
        }
        console.log(res);
        if (res.data.length < 1) {
          res.total = 10
          readpage(res.total)
          return layer.msg('当前没有任何文章')
        }
        layer.msg('刷新成功')
        let tplhtml = template('tpl-list', res)
        $('tbody').html(tplhtml)
        readpage(res.total)
      }
    })
  }

  // 获取文章分类
  function initCate() {
    $.ajax({
      method: 'GET',
      url: '/my/article/cates',
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('获取列表失败')
        }
        let tplinitcate = template('tpl-initcate', res)
        $('[name=init-Cate]').html(tplinitcate)
        // 需要重新调用一下form.render()重新渲染一下tpl
        form.render()
      }
    })
  }


  //筛选功能 
  $('#form-initcate').on('submit', function (e) {
    e.preventDefault()
    q.cate_id = $('[name=init-Cate]').val()
    q.state = $('[name=init-city]').val()
    initCate()
  })

  // 渲染分页的方法
  function readpage(page) {
    laypage.render({
      elem: 'test1', //注意，这里的 test1 是 ID，不用加 # 号
      count: page,//数据总数，从服务端得到
      limit: q.pagesize,//每页显示的条数。laypage将会借助 count 和 limit 计算出分页数。
      limits: [2, 4, 5, 10],//每页条数的选择项。如果 layout 参数开启了 limit，则会出现每页条数的select选择框
      curr: q.pagenum, //起始页。一般用于刷新类型的跳页以及HASH跳页
      layout: ['count', 'limit', 'prev', 'page', 'next', 'skip']
      , jump: function (obj, first) {
        //obj包含了当前分页的所有参数，比如：
        console.log(obj.curr, first); //得到当前页，以便向服务端请求对应页的数据。
        q.pagenum = obj.curr
        console.log(obj.limit); //得到每页显示的条数
        q.pagesize = obj.limit
        //首次不执行
        if (!first) {
          //do something
          getartList()
        }
      }
    });
  }
  // 删除按钮
  $('tbody').on('click', '.btn-delete', function () {
    // 通过获取页面中有多少个删除按钮来确定有多少条文章列表
    let leng = $('.btn-delete').length
    let id = $(this).attr('data-id')
    $.ajax({
      method: 'GET',
      url: '/my/article/delete/' + id,
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('删除失败了')
        }
        layer.msg('删除成功！！')
      }
    })
    // 判断列表里面还剩下多少
    if (leng === 1) {
      // 让页码减去一再去发请求
      q.pagenum = q.pagenum = 1 ? 1 : q.pagenum - 1

    }
    getartList()
  })



})

