const NUMERO_WHATSAPP = "221764478294";

const categories = [
    { id: "maillots", titre: "MAILLOTS",  tailles: ["S", "M", "L", "XL"] },
    { id: "tshirts",  titre: "T-SHIRTS",  tailles: ["S", "M", "L", "XL"] },
    { id: "bonnets",  titre: "BONNETS",   tailles: [] },
    { id: "croptops", titre: "CROP-TOPS", tailles: ["S", "M", "L"] }
];

const produits = [
    { nom: "Maillot rouge", categorie: "maillots", prix: 5000, image: "media/maillot-rouge.jpeg" },
    { nom: "Maillot noir",  categorie: "maillots", prix: 5000, image: "media/maillot-noir.jpeg" },

    { nom: "T-shirt blanc", categorie: "tshirts", prix: 6000, image: "media/tshirt-blanc.jpeg", imageDos: "media/tshirt-blanc-dos.jpeg" },
    { nom: "T-shirt noir",  categorie: "tshirts", prix: 6000, image: "media/tshirt-noir.jpeg",  imageDos: "media/tshirt-noir-dos.jpeg" },
    { nom: "T-shirt rose",  categorie: "tshirts", prix: 6000, image: "media/tshirt-rose.jpeg",  imageDos: "media/tshirt-rose-dos.jpeg" },
    { nom: "T-shirt bleu",  categorie: "tshirts", prix: 6000, image: "media/tshirt-bleu.jpeg" },

    { nom: "Bonnet noir (logo blanc)",  categorie: "bonnets", prix: 5000, image: "media/bonnet-noir-logo-blanc.jpeg" },
    { nom: "Bonnet noir (logo rose)",   categorie: "bonnets", prix: 5000, image: "media/bonnet-noir-logo-rose.jpeg" },
    { nom: "Bonnet noir (logo bleu)",   categorie: "bonnets", prix: 5000, image: "media/bonnet-noir-logo-bleu.jpeg" },
    { nom: "Bonnet blanc (logo noir)",  categorie: "bonnets", prix: 5000, image: "media/bonnet-blanc-logo-noir.jpeg" },
    { nom: "Bonnet blanc (logo bleu)",  categorie: "bonnets", prix: 5000, image: "media/bonnet-blanc-logo-bleu.jpeg" },
    { nom: "Bonnet blanc (logo rose)",  categorie: "bonnets", prix: 5000, image: "media/bonnet-blanc-logo-rose.jpeg" },

    { nom: "Crop-top rouge", categorie: "croptops", prix: 5000, image: "media/croptop-rouge.jpeg" },
    { nom: "Crop-top noir",  categorie: "croptops", prix: 5000, image: "media/croptop-noir.jpeg" }
];

function formaterPrix(prix) {
    return prix.toLocaleString("fr-FR") + " FCFA";
}

function construireLienWhatsApp(nom, taille) {
    let message = `Bonjour, je souhaite commander : ${nom}`;
    if (taille) {
        message += ` (taille ${taille})`;
    }
    return `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(message)}`;
}

function creerCarte(produit, categorie) {
    const options = categorie.tailles
        .map(t => `<option value="${t}">${t}</option>`)
        .join("");

    const selecteur = categorie.tailles.length > 0
        ? `<select class="form-select form-select-sm mb-2 choix-taille" aria-label="Taille">
               <option value="">Choisir la taille</option>
               ${options}
           </select>`
        : "";
        
        const boutonDos = produit.imageDos
        ? `<button type="button" class="btn btn-outline-light btn-sm mb-2 btn-tourner" data-face="face">Voir le dos</button>`
        : "";

    return `
        <div class="col-6 col-md-3 col-lg-4">
            <div class="card h-100 carte-produit">
                                <img src="${produit.image}" class="card-img-top img-produit"
                     alt="${produit.nom} Precious Blood" loading="lazy"
                     data-image-face="${produit.image}"
                     data-image-dos="${produit.imageDos || ""}">
                <div class="card-body d-flex flex-column">
                    <h3 class="h6 card-title">${produit.nom}</h3>
                    <p class="prix">${formaterPrix(produit.prix)}</p>
                    ${boutonDos}
                    ${selecteur}
                    <button type="button" class="btn btn-success mt-auto btn-commander"
                            data-nom="${produit.nom}">
                        Commander sur WhatsApp
                    </button>
                </div>
            </div>
        </div>`;
}

function afficherProduits() {
    const conteneur = document.getElementById("liste-produits");

    conteneur.innerHTML = categories.map(categorie => {
        const cartes = produits
            .filter(p => p.categorie === categorie.id)
            .map(p => creerCarte(p, categorie))
            .join("");

        return `
            <section class="mb-5" id="${categorie.id}">
                <h2 class="product-title">${categorie.titre}</h2>
                <div class="row g-3 justify-content-center">${cartes}</div>
            </section>`;
    }).join("");
}

const listeProduits = document.getElementById("liste-produits");

listeProduits.addEventListener("click", (event) => {

        const boutonTourner = event.target.closest(".btn-tourner");
    if (boutonTourner) {
        const image = boutonTourner.closest(".carte-produit").querySelector(".img-produit");
        const surLeDos = boutonTourner.dataset.face === "dos";

        image.src = surLeDos ? image.dataset.imageFace : image.dataset.imageDos;
        boutonTourner.dataset.face = surLeDos ? "face" : "dos";
        boutonTourner.textContent = surLeDos ? "Voir le dos" : "Voir la face";
        return;
    }

    const bouton = event.target.closest(".btn-commander");
    if (!bouton) return;

    const carte = bouton.closest(".carte-produit");
    const select = carte.querySelector(".choix-taille");
    let taille = "";

    if (select) {
        if (!select.value) {
            select.classList.add("is-invalid");
            return;
        }
        taille = select.value;
    }

    window.open(construireLienWhatsApp(bouton.dataset.nom, taille), "_blank", "noopener");
});

listeProduits.addEventListener("change", (event) => {
    if (event.target.classList.contains("choix-taille")) {
        event.target.classList.remove("is-invalid");
    }
});

const messageQuestion = "Bonjour, j'ai une question sur vos produits";
const lienQuestion = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(messageQuestion)}`;

document.querySelectorAll("#btn-whatsapp-flottant, #lien-whatsapp-footer, #lien-whatsapp-nav").forEach(lien => {
    lien.href = lienQuestion;
});

function afficherFiltres() {
    const conteneur = document.getElementById("filtres");
    const boutons = [
        { id: "tout", titre: "TOUT" },
        ...categories.map(c => ({ id: c.id, titre: c.titre }))
    ];

    conteneur.innerHTML = boutons.map((b, i) => `
        <button type="button" class="btn btn-filtre ${i === 0 ? "actif" : ""}"
                data-filtre="${b.id}" aria-pressed="${i === 0}">
            ${b.titre}
        </button>`).join("");
}

function appliquerFiltre(idFiltre) {
    document.querySelectorAll("#liste-produits section").forEach(section => {
        section.hidden = idFiltre !== "tout" && section.id !== idFiltre;
    });

    document.querySelectorAll(".btn-filtre").forEach(bouton => {
        const actif = bouton.dataset.filtre === idFiltre;
        bouton.classList.toggle("actif", actif);
        bouton.setAttribute("aria-pressed", actif);
    });
}

document.getElementById("filtres").addEventListener("click", (event) => {
    const bouton = event.target.closest(".btn-filtre");
    if (bouton) {
        appliquerFiltre(bouton.dataset.filtre);
    }
});

afficherProduits();
afficherFiltres();