$(function () {
    getUserInfor()
    $('#btnLogout').on('click',btnLogout)
})



function btnLogout() {
    layer.confirm('确认退出?', {icon: 3, title:'提示'}, function(index){
        //do something
        localStorage.removeItem('token');
        location.href ='/breakingNews/login.html'
        //layer ui 关闭按钮
        layer.close(index);
    });
}


// 获取用户信息
function  getUserInfor() {
      $.ajax({
          type:'GET',
          url:'/my/userinfo',
          success:function (res) {
              if(res.status !==0) {
                  return  layer.msg(res.message);
              }
              renderAvater(res.data)
          }

      })
}


function renderAvater(user) {
    // 1 判断是否有nicename，有显示 没有显示 名字的第一个字母
    // 2、判断是否有头像 有显示，没有隐藏，并且显示第一个名字的字母，并且大写
    let userName = user.nickname || user.username;
    $('#welcome').html(`欢迎 ${userName}`);
    if(user.user_pic){
         $('.avatar-img').attr('src',user.user_pic).show();
         $('.text-avatar').hide();
    }else{
        let firstName = userName[0].toUpperCase();
         $('.avatar-img').hide();
         $('.text-avatar').html(firstName);
         $('.text-avatar').show();
    }
}
