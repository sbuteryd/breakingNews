// 每次调用get post ajax 都会先调用 ajax-prefile
//相当于审核员，

$.ajaxPrefilter(function (option) {
    option.url = `http://ajax.frontend.itheima.net${option.url}`
})
