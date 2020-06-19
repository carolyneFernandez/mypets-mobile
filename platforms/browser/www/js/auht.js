function tryConnection() {
    // var login = document.getElementById(txt-email);
    // var password = document.getElementById(txt-password);

    let credentials = {
        "email": "flodu141@gmail.com",
        "password": "password"
    }

    $.ajax({
        type: 'POST',
        url: url + '/api/login',
        data: JSON.stringify(credentials),
        dataType: 'json',
        success: function (data, statut) {
            const token = data.token;
            console.log(token);
        },
        error: function (data, statut, error) {
            console.log(data.responseText);
        }
    });
    
}
