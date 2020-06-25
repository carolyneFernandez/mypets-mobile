function tryConnection() {
    var login = document.getElementById("txt-email").value;
    var password = document.getElementById("txt-password").value;

    let credentials = {
        "email": login,
        "password": password
    }

    $.ajax({

        type: 'POST',
        url: url + '/api/login',
        data: JSON.stringify(credentials),
        dataType: 'json',
        success: function (data, statut) {
            const token = data.token;
            getProprio(data.id);

            window.location = "home.html";
        },
        error: function (data, statut, error) {
            console.log(data.responseText);

        }
    });

}
