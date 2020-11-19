$(function () {
    let form = layui.form
    form.verify({
        pass: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        samePwd: function (value) {
            if (value === $("[name=oldPwd]").val()) {
                return "新密码与旧密码不能一致"
            }
        },
        rePwd:function (value) {
            if(value !== $("[name=newPwd]").val()) {
                return "两次输入密码不一致"
            }
        }
    })
    // 表单提交
    $('.layui-form').on('submit',function (e) {
        e.preventDefault()
        $.ajax({
            method:'post',
            url:'/my/updatepwd',
            data:$(this).serialize(),
            success:function (res) {
                if(res.status !== 0) {
                    return layui.layer.msg(res.message)
                }
                return layui.layer.msg(res.message)
            }
            })
    })
})
