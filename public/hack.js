
$('#myModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
  })

$(document).ready(()=>{
    $("#form_registration").submit( (e)=>{
        e.preventDefault();
        $.ajax({
            url: '/',
            data :{
                email: $('#data1').val(),
                password: $('#data2').val(),
            },
            method: "POST",
            success : function(data){
                window.location.replace(data.link);
                alert(JSON.stringify(data.message));
            },
            error:function(err){
                alert(JSON.stringify(err.responseText));
            }
        }); 
    });
});