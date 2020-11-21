$(function () {
    let layer = layui.layer
    let form = layui.form
    var index =  null;
     initArtCateList()
//    为添加分类添加弹出层

    $('#btnAddCate').on('click',function () {
        index = layer.open({
            type: 1,
            title: '添加文章分类',
            content: $('#model-add').html(),
            area: ['500px', '300px']
        });
    })
    $('body').on('submit','#form-artical',function (e) {
        e.preventDefault()
        $.ajax({
            method:'post',
            url:'/my/article/addcates',
            data:$('#form-artical').serialize(),
            success:function (res) {

                if(res.status !==0){
                    return  layer.msg(res.message)
                }
                layer.close(index)
                initArtCateList()
                return  layer.msg(res.message)
            }
        })
    })
    var edit =  null;
    $('tbody').on('click',".btn-edit",function (e) {
        e.preventDefault()
        initArtCateList()

        edit = layer.open({
                type: 1,
                title: '修改文章分类',
                content: $('#dialog-edit').html(),
                area: ['500px', '300px']
            });
        let id = $(this).attr('data-id')
           $.ajax({
            method:'get',
            url:`/my/article/cates/${id}`,
            success:function (res) {
                if(res.status !==0){
                    return  layer.msg(res.message)
                }
                form.val('form-edit',res.data)
             }
        })

    })
    $('body').on('submit','#form-edit',function (e) {
        e.preventDefault()
        $.ajax({
            method:'post',
            url:'/my/article/updatecate',
            data:$(this).serialize(),
            success:function (res) {
                if(res.status !==0){
                    return  layer.msg(res.message)
                }
                initArtCateList()
                layer.close(edit)
                return  layer.msg(res.message)
            }
        })
    })
    $('body').on('click','.btn-dele',function () {
         let id = $(this).attr('data-id')
        //eg1
        layer.confirm('确认删除?', {icon: 3, title:'提示'}, function(index){
             $.ajax({
                 method:'get',
                 url:`/my/article/deletecate/${id}`,
                 success:function (res) {
                     if(res.status !==0){
                         return  layer.msg(res.message)
                     }

                     layer.close(index);
                     initArtCateList()
                     return  layer.msg(res.message)
                 }
             })

        });
        console.log(id)
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