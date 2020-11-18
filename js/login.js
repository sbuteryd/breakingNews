$(function () {
    //点击注册 隐藏登录
    $('#register-btn').on('click',function () {
        $('.login-box').hide()
        $('.regster-box').show()
    })
    //点击登录 隐藏注册
    $('#login-btn').on('click',function () {
        $('.regster-box').hide()
        $('.login-box').show()
    })

})

//验证表单首先
let form = layui.form;
form.verify({
    password: [
    /^[\S]{6,12}$/
    ,'密码必须6到12位，且不能出现空格'
    ],
    repassword: function(value, item){ //value：表单的值、item：表单的DOM对象
        let password = $('.regster-box [name=password]').val()
         if(password !== value) {
            return '两次密码不一致'
        }
    }
    //我们既支持上述函数式的方式，也支持下述数组的形式
    //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]

});
// 监听表单事件 -注册
$('#form-register').on("submit",function (e) {
    e.preventDefault();
    //获取表单数据
    let data = {
        username:$('.regster-box [name="username"]').val(),
        password:$('.regster-box [name="password"]').val()
    };
    $.ajax({
        type: "post",
        url: "/api/reguser",
        data:data,
        success: function (res) {
            console.log(res)
        // 注册成功返回 0成功 1失败
            if(res.status !==0){
                return layer.msg(res.message);
            }
            $('#login-btn').click()
            return layer.msg(res.message);
        }
    });
})

// 登录请求
$("#form-login").submit(function (e) {
     e.preventDefault()
    $.ajax({
        type: "post",
        url: "/api/login",
        data:$(this).serialize(),
        success: function (res) {
            // 注册成功返回 0成功 1失败
            if(res.status !==0){
                return layer.msg(res.message);
            }

            return layer.msg(res.message);
        }
    });
})
