// Button Ajouter
const btn = document.querySelector(".btn");
// Formulaire
const form = document.querySelector("#form");
// div de la carte
const infos = document.querySelector(".infos");
// Button Annuler
const annule = document.querySelector("#cancel");
// Button Enregistrer
const modifier = document.querySelector("#submit");
// Button Ajouter de la Formulaire
const ajouter = document.querySelector("#submit-btn");
// id 
let modifId = null;

//pour recuperer les cartes localStorage
let personnes = JSON.parse(localStorage.getItem("personnes")) || [];


function loadData(){
personnes = JSON.parse(localStorage.getItem("personnes")) || [];
infos.innerHTML = ''

    personnes.forEach(personne => {
        const carte = document.createElement("div");
        carte.innerHTML = `
           <div class="carte">
            <img src="${personne.img}" alt="${personne.prenom}" class="w-24 h-24 rounded-full mb-3">
            <h2>${personne.prenom} ${personne.nom}</h2>
            <p>${personne.date}</p>
            <p>${personne.ville}</p>
            <div class="flex gap-2">
                <button class="edit">Modifier</button>
                <button class="delete">Supprimer</button>
            </div>
           </div>`;
            carte.querySelector(".delete").addEventListener("click", () => {
            Supprimer(personne.id);
            loadData();
            carte.style.display = "none";
        });

         carte.querySelector(".edit").addEventListener("click", () => {
            document.querySelector("#nom").value = personne.nom.trim();
            document.querySelector("#prenom").value = personne.prenom.trim();
            document.querySelector("#date").value = personne.date.trim();
            document.querySelector("#ville").value = personne.ville.trim();
            document.querySelector("#img").value = personne.img.trim();

            modifId = personne.id;
            Supprimer(personne.id);

            form.style.display = "block";
            modifier.style.display = "block";
            ajouter.style.display = "none";

        })
infos.appendChild(carte);
        
    });
}
btn.addEventListener('click', () => {
    form.style.display = "block";
    btn.style.display = "none";
})

annule.addEventListener('click', () => {
    form.style.display = "none";
    btn.style.display = "block"
})


form.addEventListener('submit', (event) => {
    event.preventDefault();

    const ajoute = {
        id: Date.now(),
        nom: document.querySelector("#nom").value.trim(),
        prenom: document.querySelector("#prenom").value.trim(),
        date: document.querySelector("#date").value.trim(),
        ville: document.querySelector("#ville").value.trim(),
        img: document.querySelector("#img").value.trim() || "https://via.placeholder.com/150",
    };

     form.style.display = "none";
     form.reset();
   
    personnes.push(ajoute);
    localStorage.setItem("personnes",JSON.stringify(personnes));
    loadData();
    btn.style.display = "flex";
    })

   

    const Supprimer = (id) => {
        personnes = personnes.filter(ajoute => ajoute.id !== id)
        localStorage.setItem("personnes", JSON.stringify(personnes));
        loadData();
    }


loadData();