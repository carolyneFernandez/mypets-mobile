if (document.getElementById("formRendevous")) {
    generateRDVForm();
}

function getAnimal_generic(api) {
    $.ajax({
        type: 'GET',
        url: url + api,
        dataType: 'json',
        async: false,
        success: function (data, statut) {
            return data;
        },
        error: function (data, statut, error) {
            console.log(data.responseText);
        }
    });
}


function generateRDVForm() {
    let Animals = currentUser.animals;
    let Animaux = document.getElementById("txt-animal");
    let Vetos = document.getElementById("s-veterinaire");

    for (var i = 0; i < Animals.length; i++) {
        var animal;
        $.ajax({
            type: 'GET',
            url: url + Animals[i],
            dataType: 'json',
            async: false,
            success: function (data, statut) {
                animal = data;
                return animal;
            },
            error: function (data, statut, error) {
                console.log(data.responseText);
            }
        });
        let veto;
        $.ajax({
            type: 'GET',
            url: url + animal.veterinaireHabituel,
            dataType: 'json',
            async: false,
            success: function (data, statut) {
                veto = data;
                return veto;
            },
            error: function (data, statut, error) {
                console.log(data.responseText);
            }
        });
        // Animaux
        var typeOption = document.createElement('option');
        typeOption.text = animal.nom;
        typeOption.value = animal.id;
        Animaux.appendChild(typeOption);
        // Vétérinaire
        var typeOption2 = document.createElement('option');
        typeOption2.text = veto.nom;
        typeOption2.value = veto.id;
        Vetos.appendChild(typeOption2);

    }
}

function EnregistrerRDV() {
    var animal;
    $.ajax({
        type: 'GET',
        url: url + '/api/animals/'+ document.getElementById('txt-animal').value,
        dataType: 'json',
        async: false,
        success: function (data, statut) {
            animal = data;
            return animal;
        },
        error: function (data, statut, error) {
            console.log(data.responseText);
        }
    });
    let rdv = {
        "veterinaire": animal.veterinaireHabituel,
        "animal": '/api/animals/' + document.getElementById('txt-animal').value,
        "date": new Date(JSON.parse(JSON.stringify(document.getElementById('dateRendezvous').value))),
        "observations": document.getElementById('txt-note').value,
        "domicile": false,
        "urgence": false,
        "consultation": "",
        "completed": true,
        "proprietaire": '/api/proprietaires/'+ currentUser.id,
        "valide": false,
        "author": '/api/proprietaires/'+ currentUser.id,
        "clinique": animal.veterinaireHabituel.clinique
    }

    $.ajax({
        type: 'POST',
        url: url + '/api/rdvs',
        headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json' 
        },
        data: JSON.stringify(rdv),
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