
$('#myModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
  })

const headerToken= 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFyaml0YmhhbmRhcmkyMjI4MzBAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkV0VQUGdjcEpOanNabkZscy5rVXlPLnQuL0RTNG00Q3JReTZhWGNyeVZ6MXRlOEJ1bkJSeU8iLCJpYXQiOjE1ODQ0MzE4NDJ9.7pJqEzYB5STsiSpHGbvYJUEinzAroDTOBn0CuZcS94Y';

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

$(document).ready(()=>{
    $("#form_login").submit((e)=>{
        e.preventDefault();
        $.ajax({
            url: '/login',
            headers:{
                'x-auth-token': headerToken
            },
            data :{
                email: $('#data1').val(),
                password: $('#data2').val(),
            },
            method: "POST",
            success : function(data){
                ajax_call1(data.email)
            },
            error:function(err){
                alert(JSON.stringify(err.responseText));
            }
        }); 
    });
});

function ajax_call1(email)
{
    return $.ajax({
            url: "/dashboard",
            headers:{
                'x-auth-token': headerToken,
                'email': email
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
}