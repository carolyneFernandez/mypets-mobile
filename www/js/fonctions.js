//A modifier
var url = "http://192.168.1.79:8030";

// l'utilisateur est stocké dans currentUser
var currentUser = JSON.parse(localStorage.getItem('user'));

//Exemple d'utilisation pour affichage dans le HTML 
if (document.getElementById("userNom")) {
    document.getElementById("userNom").innerHTML = currentUser.nom;
}

// function getUsers() {
//     $.ajax({

//         type: 'GET',
//         url: url + '/api/proprietaires',
//         data: "",
//         dataType: 'json',
//         success: function (data, statut) {
//             console.log(data);
//             var users = data;
//         },
//         error: function (data, statut, error) {
//             console.log(data.responseText);
//         }
//     });
// }

function getProprio(id) {
    $.ajax({
        type: 'GET',
        url: url + '/api/proprietaires/' + id,
        dataType: 'json',
        async: false,
        success: function (data, statut) {
            localStorage.setItem("user", JSON.stringify(data));
        },
        error: function (data, statut, error) {
            console.log(data.responseText);
        }
    });
}