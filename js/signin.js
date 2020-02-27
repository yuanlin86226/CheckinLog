$(document).ready( function () {
    $("#login_btn").click(function(){
        var account = $('#inputAccount').val();
        var password = $('#inputPassword').val();

        var data = {
            "account_number": account,
            "password": password,
        }

        if (account != "" && password != "") {
            $.ajax({
                type : "POST",
                url  : "https://localhost:5001/api/Auth/Login",
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function(response) {
                    Swal.fire({
                        icon: 'success',
                        title: '登入成功'
                    }).then((result) => {
                        location.href = "dashboard?page=user"
                    })

                    localStorage["jwtKey"] = response.jwtKey;
                },
                error: function (error) {
                    Swal.fire({
                        icon: 'error',
                        title: error.responseJSON.msg,
                    })
                }
            })
        }    
    })
} );