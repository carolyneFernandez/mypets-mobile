var url = "http://192.168.42.112:8030";

function getAnimals() {

    animals = currentUSer.animals;
    
}

function getUsers() {
    $.ajax({

        type: 'GET',
        url: url + '/api/proprietaires',
        data: "",
        dataType: 'json',
        success: function (data, statut) {
            console.log(data);
            const users = data;
        },
        error: function (data, statut, error) {
            console.log(data.responseText);
        }
    });
}