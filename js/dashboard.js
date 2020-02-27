$(document).ready( function () {
    var page = getPage();
    var ajax_url = "https://localhost:5001/api/";
    var columns = [];

    switch (page) {
        case "user":
            $('#nav_user').addClass('active');
            document.getElementById("page_title").innerHTML = "員工列表";
            document.getElementById("thead_item").innerHTML = "<th>帳號</th><th>姓名</th><th>性別</th><th>手機</th><th>信箱</th>";
            ajax_url = ajax_url + "Users";
            columns = [
                { data: 'account_number' },
                { data: 'user_name' },
                { data: 'gender' },
                { data: 'phone' },
                { data: 'email' },
            ];
            break;

        case "log":
            $('#nav_log').addClass('active');
            document.getElementById("page_title").innerHTML = "打卡記錄";
            document.getElementById("thead_item").innerHTML = "<th>#</th><th>員工</th><th>打卡 IP</th><th>打卡時間</th>";
            ajax_url = ajax_url + "CheckinLogs";
            columns = [
                { data: 'checkin_log_id' },
                { data: 'users.user_name' },
                { data: 'ip' },
                { data: 'create_time' }
            ];
            break;
    }

    $.ajax({
        type : "GET",
        url  : ajax_url,
        contentType: "application/json",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', localStorage["jwtKey"]);
        },
        dataType: "json",
        success: function(response) {
            if (response) {
                $('#myTable').DataTable({
                    data: response,
                    columns: columns
                });
            }
        },
        error: function (error) {
            console.log(error)
        }
    })

    $("#logout").click(function(){
        localStorage.removeItem("jwtKey");
        location.href = "./";
    });
});

function getPage () {
    var getUrlString = location.href;    
    var url = new URL(getUrlString);

    return url.searchParams.get("page")
}