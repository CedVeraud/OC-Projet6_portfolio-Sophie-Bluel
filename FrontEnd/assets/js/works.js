const UrlApi = "http://localhost:5678/api/";
const gallery = document.querySelector(".gallery");

// Afficher les informations
function infos(work) {
    // Créer une balise figure pour chaque projet
    const card = `
      <figure id ="P${work?.id}" >
      <img src="${work?.imageUrl} "crossOrigin="anonymous">
        <figcaption>${work?.title}</figcaption>
      </figure>
            `;
    // Ajouter chaque élément à la galerie
    document.querySelector(".gallery").insertAdjacentHTML("beforeend", card);
}

function afficheGalerie() {
   fetch(`${UrlApi}works`).then((resp) => {
    if (resp.ok) {
      resp.json().then((data) => {
        document.querySelector(".gallery").innerHTML = ""; // Effacement de l'élément HTML .gallery
        // Boucle pour afficher tous les projets
        for (let i = 0; i <= data.length - 1; i++) {
          infos(data[i]); // Appel de la fonction info pour afficher les informations de chaque projet
        }
        console.log(data);
      });
    }
  });
}
afficheGalerie();