$(function () {
    let form = layui.form
    var layer = layui.layer;
    form.verify({
        nickname:function (value) {
            if(value.length >6) {
                return "昵称长度必须在 1 ~ 6 个字符之间"
            }
        }
    })

    initInfor()
    function  initInfor() {
        $.ajax({
            type:'GET',
            url:'/my/userinfo',
            success:function (res) {
                if(res.status !== 0) {
                    layer.msg(res.message)
                }
                console.log(res)
                var data1 = form.val("formUserInfor",res.data);
            }
        })
    }
    $('.btnRest').on('click',function (e) {
        e.preventDefault()
        initInfor()
    })
    $('.layui-form').submit(function (e) {
        e.preventDefault()
         $.ajax({
             method:'POST',
             url:'/my/userinfo',
             data:$(this).serialize(),
             success:function (res) {
                 if(res.status !==0 ){
                     return layer.msg(res.message)
                 }
                 window.parent.getUserInfor()
                 return  layer.msg(res.message)
             }
         })
    })
})
