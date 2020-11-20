$(function () {
     initArtCateList()
//    为添加分类添加弹出层
    $('#btnAddCate').on('click',function () {
        layer.open({
            type: 1,
            title: '在线调试'
            ,content: '可以填写任意的layer代码',
            area: ['500px', '300px']
        });

    })
})


function initArtCateList() {
    $.ajax({
        type:'get',
        url:'/my/article/cates',
        success:function (res) {
           var htmlStr = template('tpl-table',res)
            $('tbody').html(htmlStr)
        }

    })
}