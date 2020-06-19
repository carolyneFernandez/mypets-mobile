function tryConnection() {
    // var login = document.getElementById(txt-email);
    // var password = document.getElementById(txt-password);

    $.ajax({
        type: 'POST',
        url: url + '/api/login',
        data: {
            "email": "val@gmail.com",
            "password": "password"
        },
        dataType: 'json',
        success : function(data, statut){
           console.log(statut);
           console.log(data);
        },
        error : function(data, statut, erreur){

            console.error(data);
        }
      });
    
}
