//A modifier
var url = "http://192.168.1.79:8030";

// l'utilisateur est stocké dans currentUser
var currentUser = JSON.parse(localStorage.getItem('user'));

//Exemple d'utilisation pour affichage dans le HTML 
if (document.getElementById("userNom")) {
    document.getElementById("userNom").innerHTML = currentUser.nom;
}
//Exemple d'utilisation pour affichage dans le HTML
if (document.getElementById("animals")) {
    this.getUserAnimals(currentUser.id)
}
if (document.getElementById("animal-details")) {
    getAnimal(localStorage.getItem('animal'));

}
function getAnimalId(id){
    localStorage.setItem("animal", "/api/animals/"+id);

    window.location="../detail-animal.html";
}

function getProprio(id) {

    $.ajax({
        type: 'GET',
        url: url + '/api/proprietaires/' + id,
        dataType: 'json',
        async: false,
        success: function (data, statut) {
            localStorage.setItem("animals", JSON.stringify(data));
        },
        error: function (data, statut, error) {
            console.log(data.responseText);
        }
    });
}
function getUserAnimals(id) {

    $.ajax({
        type: 'GET',
        url: url + '/api/proprietaires/' + id,
        dataType: 'json',
        async: false,
        success: function (data, statut) {
             for(var i= 0; i < data.animals.length; i++) {
                  getAnimal(data.animals[i]);
              }
        },
        error: function (data, statut, error) {
            console.log(data.responseText);
        }
    });
}

function edit(){
    window.location="../editAnimaux.html";
}
function getAnimal(api) {
    $.ajax({
        type: 'GET',
        url: url + api,
        dataType: 'json',
        async: false,
        success: function (data, statut) {

            var divDetail = document.createElement('div');
            divDetail.className = 'row pb-4 detail';

            divDetail.addEventListener("click", function(){
                getAnimalId(data["id"]);
            });


            var divDetailImage = document.createElement('div');
            divDetailImage.className = 'col-md-4 col-6 m-md-auto';

            var divDetailTexto = document.createElement('div');
            divDetailTexto.className = 'col-md-4 col-6 p-4 m-md-auto';

            var h3 = document.createElement('h3');
            h3.innerHTML=data["nom"];

            var race = document.createElement('p');
            race.innerHTML=data["race"];

            var puce = document.createElement('p');
            puce.innerHTML=data["puce"]+"  cm";

            var age = document.createElement('p');
            age.innerHTML=data["age"];

            var image = document.createElement("IMG");

            image.setAttribute("src",url+"/uploads/avatars/animaux/"+ data["photo"]);
            if(document.getElementById("titleAnimaux")){
                document.getElementById("titleAnimaux").innerHTML="Detail de "+data["nom"];

            }

            document.getElementById("home-particulier").appendChild(divDetail);
            divDetail.appendChild(divDetailImage);
            divDetail.appendChild(divDetailTexto);
            divDetailTexto.appendChild(h3);
            divDetailTexto.appendChild(race);
            divDetailTexto.appendChild(puce);
            divDetailTexto.appendChild(age);
            divDetailImage.appendChild(image);

            for(var i= 0; i < data["rdvs"].length; i++) {

                var h3FooterName= document.createElement('h3');
                h3FooterName.className = 'col-md-6 col-4 d-flex justify-content-center';
                h3FooterName.innerHTML=data["nom"];
                document.getElementById("footer").appendChild(h3FooterName);
                getRendeVous(data["rdvs"][i]);
            }

        },
        error: function (data, statut, error) {
            console.log(data.responseText);
        }
    });
}

function getRendeVous(api){
    $.ajax({
        type: 'GET',
        url: url + api,
        dataType: 'json',
        async: false,
        success: function (data, statut) {
            var divTexte = document.createElement('div');
            divTexte.className="col-md-6 col-8 d-flex justify-content-center divtexte";

            var ul =document.createElement('ul');

            var liDate =document.createElement('li');

            var date = new Date(JSON.parse(JSON.stringify(data["date"])));

            var day=date.getUTCDate();
            var month= date.getUTCMonth();
            var year=date.getUTCFullYear();
            var hours=date.getUTCHours();
            var minuts =date.getUTCMinutes() !=0?date.getUTCMinutes():"";


            liDate.innerHTML="le "+ day+ "/"+month+"/"+year+" à "+hours +"h"+ minuts;
             ul.appendChild(liDate);
             divTexte.appendChild(ul);
            document.getElementById("footer").appendChild(divTexte);


        },
        error: function (data, statut, error) {

            console.log(data.responseText);
        }
    });
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


function getClinique(api){
    console.log(url + api);
    $.ajax({
        type: 'GET',
        url: url + api,
        dataType: 'json',
        async: false,
        success: function (data, statut) {


            // console.log(data);


        },
        error: function (data, statut, error) {
            //   console.log(data.responseText);
        }
    });
}



