# Precious Blood

Lien du site : https://precious-blood.netlify.app/

Site vitrine de **Precious Blood**, marque de vêtements et accessoires basée à Dakar (Sénégal) : maillots, t-shirts, bonnets et crop-tops. Les clients parcourent la collection, choisissent leur taille et passent commande directement sur WhatsApp, avec un message déjà rédigé.

## Fonctionnalités

- **Catalogue généré en JavaScript** à partir d'un simple tableau de produits : ajouter un article revient à ajouter une ligne, sans toucher au HTML.
- **Filtres par catégorie** (Tout, Maillots, T-shirts, Bonnets, Crop-tops), générés automatiquement depuis les catégories.
- **Commande WhatsApp** : un message préparé contient le produit et la taille choisie.
- **Choix de la taille obligatoire** avant de commander, avec message d'erreur visuel.
- **Vue de face / de dos** sur les produits qui disposent des deux photos.
- **Infos pratiques** (livraison, paiement, guide des tailles) dans un accordéon.
- **Bouton WhatsApp flottant** et lien « Commander » dans la barre de navigation.
- **Navigation avec suivi du défilement** (scrollspy Bootstrap) et défilement fluide.
- **Identité visuelle « sang »** : palette noir, os et rouge, typographie Anton / Space Grotesk, séparateur de gouttes en SVG.
- **Responsive** : pensé en priorité pour les téléphones.
- **Référencement et partage** : balises meta, Open Graph, favicon, images au format WebP avec chargement différé.

## Technologies

| Rôle | Outil |
|---|---|
| Structure | HTML5 |
| Style | CSS3 (variables CSS, flexbox, grid, `clamp()`) |
| Interface | [Bootstrap 5.3.8](https://getbootstrap.com/) (thème sombre) |
| Icônes | [Bootstrap Icons 1.11.3](https://icons.getbootstrap.com/) |
| Polices | [Anton](https://fonts.google.com/specimen/Anton) et [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) (Google Fonts) |
| Logique | JavaScript natif (aucun framework, aucune dépendance à installer) |
| Hébergement | [Netlify](https://www.netlify.com/) |

## Structure du projet

```
precious-blood/
├── index.html        # Structure de la page
├── style.css         # Palette, typographie, composants
├── script.js         # Produits, filtres, commande WhatsApp
└── media/
    ├── *.webp        # Photos des produits, hero, logo
    ├── apercu.jpg    # Image d'aperçu pour le partage de lien
    ├── favicon.png
    └── gouttes.svg   # Séparateur en gouttes
```

### Ajouter un produit

Dans `script.js`, ajoute un objet au tableau `produits` :

```js
{
    nom: "T-shirt vert",
    categorie: "tshirts",        // maillots, tshirts, bonnets ou croptops
    prix: 5000,
    image: "media/tshirt-vert.webp",
    imageDos: "media/tshirt-vert-dos.webp"   // facultatif
}
```

La carte, le filtre et le message WhatsApp se mettent à jour automatiquement.

### Ajouter une catégorie ou modifier les tailles

Modifie le tableau `categories` : l'identifiant, le titre affiché et la liste des tailles proposées (laisse `[]` pour un produit sans taille, comme les bonnets).

### Changer les couleurs

Les couleurs de la marque sont définies une seule fois, en haut de `style.css` :

```css
:root {
    --sang: #CC1A26;
    --sang-fonce: #A3141E;
    --os: #F3ECE0;
    --noir: #0D0B0B;
    --gris: #9A9087;
}
```

## Déploiement

Le site est hébergé sur Netlify par simple glisser-déposer du dossier du projet sur [app.netlify.com/drop](https://app.netlify.com/drop). Pour une mise à jour, glisse à nouveau le dossier dans l'onglet **Deploys** du site.

Points d'attention avant de déployer :

- `index.html` doit se trouver à la racine du dossier déposé.
- Les noms de fichiers sont sensibles à la casse sur le serveur : tout est en minuscules.
- Dans `index.html`, les balises `og:image` et `og:url` doivent contenir l'adresse réelle du site.

## Choix techniques

- **Pas de framework** : le projet reste léger, rapide à charger sur mobile, et facile à maintenir sans outil de build.
- **Données séparées de l'affichage** : les produits sont des données (un tableau), l'HTML des cartes est généré, ce qui évite de dupliquer le même bloc pour chaque article.
- **Délégation d'événements** : un seul écouteur de clic gère tous les boutons de produit, y compris ceux créés dynamiquement.
- **Commande via WhatsApp** plutôt qu'un panier en ligne : c'est le canal que les clients utilisent déjà, sans frais ni compte à créer.

## Pistes d'amélioration

- Panier multi-articles regroupés en un seul message WhatsApp
- Suivi des visites (Meta Pixel, TikTok Pixel ou outil de statistiques simple)
- Nom de domaine personnalisé
- Galerie de photos clients

## Auteur

Réalisé par **JOE EMMA** à Dakar.
Instagram : https://www.instagram.com/joestarr221

## Licence

[À choisir] Le code peut être publié sous licence MIT. Les photos, le logo et le nom **Precious Blood** restent la propriété de la marque, tous droits réservés.
