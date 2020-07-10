//A modifier
var url = "http://192.168.43.50:8030";

// l'utilisateur est stocké dans currentUser
var currentUser = JSON.parse(localStorage.getItem('user'));
//Exemple d'utilisation pour affichage dans le HTML
if (document.getElementById("userNom")) {
    document.getElementById("userNom").innerHTML = currentUser.nom;
}
//Exemple d'utilisation pour affichage dans le HTML
if (document.getElementById("animals")) {
    console.log(currentUser);
    this.getUserAnimals(currentUser.id);
}

if (document.getElementById("animal-details")) {
    getAnimal(localStorage.getItem('animal'));

}
/***Edit Animal**/
if (document.getElementById("formEditAnimaux")) {
    editAnimal(localStorage.getItem('animal'));
}

function getAnimalId(id) {
    localStorage.setItem("animal", "/api/animals/" + id);
    window.location = "detail-animal.html";
}

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
function getUserAnimals(id) {

    $.ajax({
        type: 'GET',
        url: url + '/api/proprietaires/' + id,
        dataType: 'json',
        async: false,
        success: function (data, statut) {
            for (var i = 0; i < data.animals.length; i++) {
                getAnimal(data.animals[i]);
            }
        },
        error: function (data, statut, error) {
            console.log(data.responseText);
        }
    });
}


function edit() {
    window.location = "editAnimal.html";
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

            divDetail.addEventListener("click", function () {
                getAnimalId(data["id"]);
            });


            var divDetailImage = document.createElement('div');
            divDetailImage.className = 'col-md-4 col-6 m-md-auto';

            var divDetailTexto = document.createElement('div');
            divDetailTexto.className = 'col-md-4 col-6 p-4 m-md-auto';

            var h3 = document.createElement('h3');
            h3.innerHTML = data["nom"];

            var race = document.createElement('p');
            race.innerHTML = data["race"];

            var puce = document.createElement('p');
            puce.innerHTML = data["puce"] + "  cm";

            var age = document.createElement('p');
            age.innerHTML = data["age"];

            var image = document.createElement("IMG");

            image.setAttribute("src", url + "/uploads/avatars/animaux/" + data["photo"]);
            if (document.getElementById("titleAnimaux")) {
                document.getElementById("titleAnimaux").innerHTML = "Detail de " + data["nom"];

            }

            document.getElementById("home-particulier").appendChild(divDetail);
            divDetail.appendChild(divDetailImage);
            divDetail.appendChild(divDetailTexto);
            divDetailTexto.appendChild(h3);
            divDetailTexto.appendChild(race);
            divDetailTexto.appendChild(puce);
            divDetailTexto.appendChild(age);
            divDetailImage.appendChild(image);

            for (var i = 0; i < data["rdvs"].length; i++) {

                var h3FooterName = document.createElement('h3');
                h3FooterName.className = 'col-md-4 col-4 d-flex justify-content-center';
                h3FooterName.innerHTML = data["nom"];
                document.getElementById("footer").appendChild(h3FooterName);
                getRendeVous(data["rdvs"][i]);
            }

        },
        error: function (data, statut, error) {
            console.log(data.responseText);
        }
    });
}

function getRendeVous(api) {
    $.ajax({
        type: 'GET',
        url: url + api,
        dataType: 'json',
        async: false,
        success: function (data, statut) {
            var divTexte = document.createElement('div');
            divTexte.className = "col-md-4 col-6 d-flex justify-content-center divtexte";

            var valide = document.createElement('div');
            if (data.valide) {
                valide.className = "col-md-4 col-2 valide d-flex justify-content-center divtexte";
                valide.innerHTML = "Validé";
            } else {
                valide.className = "col-md-4 col-2 non-valide d-flex justify-content-center divtexte";
                valide.innerHTML = "Non validé";
            }


            var ul = document.createElement('ul');

            var liDate = document.createElement('li');

            var date = new Date(JSON.parse(JSON.stringify(data["date"])));

            var day = date.getUTCDate();
            var month = date.getUTCMonth() + 1;
            var year = date.getUTCFullYear();
            var hours = date.getUTCHours();
            var minuts = date.getUTCMinutes() != 0 ? date.getUTCMinutes() : "";


            liDate.innerHTML = "le " + day + "/" + month + "/" + year + " à " + hours + "h" + minuts;
            ul.appendChild(liDate);
            divTexte.appendChild(ul);
            document.getElementById("footer").appendChild(divTexte);
            document.getElementById("footer").appendChild(valide);

        },
        error: function (data, statut, error) {

            console.log(data.responseText);
        }
    });
}

/*List tout les animaux*/
function getTypeAnimal() {
    var result;
    $.ajax({
        type: 'GET',
        url: url + '/api/animal_types',
        dataType: 'json',
        async: false,
        success: function (data, statut) {
            result = data;
        },
        error: function (data, statut, error) {
            console.log(data.responseText);
        }
    });
    return result;
}

function getTypeAnimalId(api) {
    var result;
    $.ajax({
        type: 'GET',
        url: url + api,
        dataType: 'json',
        async: false,
        success: function (data, statut) {
            result = data;
        },
        error: function (data, statut, error) {
            console.log(data.responseText);
        }
    });
    return result;
}
function editAnimal(apiAnimal) {
    let valeurIndexAnimaux;

    $.ajax({
        type: 'GET',
        url: url + apiAnimal,
        dataType: 'json',
        async: false,
        success: function (data, statut) {
            //Pré-remplissage des informations du animaux
            var dateNaissance = new Date(JSON.parse(JSON.stringify(data["dateNaissance"])));
            var month = ("0" + (dateNaissance.getUTCMonth() + 1)).slice(-2);
            var day = ("0" + (dateNaissance.getUTCDate())).slice(-2);
            var date = dateNaissance.getUTCFullYear() + "-" + month + "-" + day;

            if (data["dateDeces"]) {
                var dateDece = new Date(JSON.parse(JSON.stringify(data["dateDeces"])));
                var monthDece = ("0" + (dateDece.getUTCMonth() + 1)).slice(-2);
                var dayDece = ("0" + (dateDece.getUTCDate())).slice(-2);
                var dateDece = dateDece.getUTCFullYear() + "-" + monthDece + "-" + dayDece;
            } else {
                var dateDece = "0000-00-00";
            }
            if (data['causeDeces']) {
                document.getElementById("txt-causeDece").value = data['causeDeces'];

            } else {
                document.getElementById("txt-causeDece").value = "";

            }
            document.getElementById("txt-user").value = currentUser.nom;

            document.getElementById("txt-id").value = data['id'];
            document.getElementById("txt-name").value = data['nom'];
            document.getElementById("date-naissance").value = date;
            document.getElementById("txt-race").value = data['race'];
            document.getElementById("txt-puce").value = data['puce'];
            document.getElementById("txt-pere").value = data['infosPere'];
            document.getElementById("txt-mere").value = data['infosMere'];
            document.getElementById("txt-traitements").value = data['traitements'];
            document.getElementById("checkDece").checked = data['decede'];
            document.getElementById("txt-dateDece").value = dateDece;
            let listtypeAnimal = getTypeAnimal();
            let typeAnimaux = document.getElementById("txt-typeAnimaux");
            let typeAnimalId = getTypeAnimalId(data["type"]);

            for (var i = 0; i < listtypeAnimal.length; i++) {
                var typeOption = document.createElement('option');
                typeOption.text = listtypeAnimal[i].nom;
                typeOption.value = "/api/animal_types/" + listtypeAnimal[i].id;
                typeAnimaux.appendChild(typeOption);

                if (JSON.stringify(typeAnimalId) === JSON.stringify(listtypeAnimal[i])) {
                    valeurIndexAnimaux = i;
                }

            }
            typeAnimaux.selectedIndex = valeurIndexAnimaux;

        },
        error: function (data, statut, error) {
            console.log(data.responseText);
        }
    });

}


function Enregistrer() {
    let typeAnimaux = document.getElementById("txt-typeAnimaux").value;
    let nomAnimaux = document.getElementById("txt-name").value;
    let dateNaissance = document.getElementById("date-naissance").value;
    let race = document.getElementById("txt-race").value;
    let puce = document.getElementById("txt-puce").value;
    let infoPere = document.getElementById("txt-pere").value;
    let infoMere = document.getElementById("txt-mere").value;
    let traitement = document.getElementById("txt-traitements").value;
    let decede = document.getElementById("checkDece").checked;
    let dateDece = document.getElementById("txt-dateDece").value;
    let causeDece = document.getElementById("txt-causeDece").value;
    let idAnimaux = document.getElementById("txt-id").value;
    let avatar = document.getElementById("txt-id").value;

    let animauxValues =
    {
        "id": idAnimaux,
        "type": typeAnimaux,
        "nom": nomAnimaux,
        "dateNaissance": dateNaissance,
        "race": race,
        "puce": puce,
        "infosPere": infoPere,
        "infosMere": infoMere,
        "decede": decede,
        "causeDeces": causeDece,
        "dateDeces": dateDece,
        "traitements": traitement
    }
    $.ajax({
        type: 'PUT',
        url: url + '/api/animals/' + idAnimaux,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(animauxValues),
        dataType: 'json',
        async: false,
        success: function (data, statut) {

            window.location = "home-particulier.html";

        },
        error: function (data, statut, error) {
            console.log(data.responseText);
        }
    });


}