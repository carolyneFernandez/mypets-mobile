//Pré-remplissage des informations du compte
document.getElementById("nom").defaultValue = currentUser.nom;
document.getElementById("prenom").defaultValue = currentUser.prenom;
document.getElementById("mail").defaultValue = currentUser.email;
document.getElementById("adresse").defaultValue = currentUser.adresse;
document.getElementById("naissance").defaultValue = currentUser.dateNaissance;
if (currentUser.telephone !== null) {
    document.getElementById("telephone").defaultValue = currentUser.telephone;
}
if (currentUser.mobile !== null) {
    document.getElementById("mobile").defaultValue = currentUser.mobile;
}

function Enregistrer() {
    if (document.getElementById("password").value == document.getElementById("password-confirmation").value) {

        let nom = document.getElementById("nom").value;
        let prenom = document.getElementById("prenom").value;
        let mail = document.getElementById("mail").value;
        let adresse = document.getElementById("adresse").value;
        let telephone = document.getElementById("telephone").value;
        let mobile = document.getElementById("mobile").value;
        let naissance;
        let password;
        let avatar;

        if ((document.getElementById("password").value) != "") {
            password = document.getElementById("password").value;
        } else {
            password = currentUser.password;
        }
        if (document.getElementById("image").value == "") {
            avatar = currentUser.avatar;
        } else {
            avatar = document.getElementById("image");
        }
        if(document.getElementById("naissance").value != "") {
            naissance = document.getElementById("naissance").value;
        }
        else {
            naissance = currentUser.dateNaissance;
        }

        let userValues =
        {
            "adresse": adresse,
            "dateNaissance": naissance,
            "telephone": telephone,
            "mobile": mobile,
            "animals":
                currentUser.animals,
            "rdvs":
                currentUser.rdvs,
            "email": mail,
            "roles":
                currentUser.roles,
            "password": password,
            "dateCreation": currentUser.dateCreation,
            "actif": true,
            "derniereConnexion": currentUser.derniereConnexion,
            "nom": nom,
            "prenom": prenom,
            "token": currentUser.token,
            "avatar": avatar,
            "apiToken": currentUser.apiToken
        }

        console.log(userValues);
        $.ajax({
            type: 'PUT',
            url: url + '/api/proprietaires/' + currentUser.id,
            headers: { 
                'Accept': 'application/json',
                'Content-Type': 'application/json' 
            },
            data: JSON.stringify(userValues),
            dataType: 'json',
            async: false,
            success: function (data, statut) {
                getProprio(currentUser.id);
            },
            error: function (data, statut, error) {
                console.log(data.responseText);
            }
        });
    } else {
        alert("erreur : Mot de passe incorrect");
    }
}