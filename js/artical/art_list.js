$(function () {
    let layer = layui.layer
    var form = layui.form


    let q = {
        pagenum:1, //页码值
        pagesize:2, //显示多少数据
        cate_id:'',//分类文章id
        state:''//文章状态
    }
    getApiData()
    getCagte()
    function  getApiData(){

        $.ajax({
            method:'GET',
            url:'/my/article/list',
            data:q,
            success:function (res) {
             let htmlStrin =  template('artical-list',res)
                $('tbody').html(htmlStrin)
            }
        })
    }

    function getCagte() {
        let form = layui.form
        $.ajax({
            method:'GET',
            url:'/my/article/cates',
            data:q,
            success:function (res) {
                if(res.status !==0){
                    return layer.msg('获取分类失败')
                }
                let htmlStrin =  template('cate_id',res)
                 $('[name=cate_id]').html(htmlStrin)
                 form.render('select'); //刷新select选择框渲染
            }
        })
    }
   $('#form-search').on('submit',function (e) {
       e.preventDefault()
       let cate_id= $('[name=cate_id]').val()
         let name_state= $('[name=state]').val()
        q.state =name_state
       q.cate_id=cate_id
       getApiData()
   })

})
