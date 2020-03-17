
$('#myModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
  })

const headerToken= 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFyaml0YmhzYW5kYXJpMDc2MkBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRnNTBTVHZTTXhTLlBKTGdQbXJEdWsudHQ4bDM2M1VGbC9NL0VYcGFZS0dqS2IyeVlrQkQwZSIsImlhdCI6MTU4NDQyNTU0MH0.5zKnYV0uRMDHT7N4Sh8rH0c1cNo5x14_SCuDGSTBp9w';

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
                console.log(data.token);
                alert(JSON.stringify(data.message));
            },
            error:function(err){
                alert(JSON.stringify(err.responseText));
            }
        }); 
    });
});