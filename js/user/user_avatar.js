$(function () {
    let layer = layui.layer
    var $image = $('#image');
    const options = { aspectRatio: 1,  preview: '.img-preview' };
    $image.cropper(options)

    $('#btnUploadFile').on('click',function () {
        $("#file").click()
    })

    $("#file").on('change',function (e) {
        let filesList =  e.target.files
        if(filesList.length ===0 ){
            return  layer.msg('请选择图片')
        }
        // 1 拿到用户选择的文件
        var file = e.target.files[0]
        // 2 将文件转换为路径
        var newImgURL = URL.createObjectURL(file)
        $image
            .cropper('destroy')
            .attr('src', newImgURL)
            .cropper(options)
    })
})

