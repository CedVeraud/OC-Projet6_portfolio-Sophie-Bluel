const UrlApi = "http://localhost:5678/api/";
const btn_tous = document.getElementById("btn_tous");
const gallery = document.querySelector(".gallery");

// Show gallery informations
function info(work) {
  // Create a figure element for each work
  const card = `
    <figure id ="P${work?.id}" >
    <img src="${work?.imageUrl} "crossOrigin="anonymous">
      <figcaption>${work?.title}</figcaption>
    </figure>
  `;
  // Add card to the gallery element
  document.querySelector(".gallery").insertAdjacentHTML("beforeend", card);
}

function showGallery() {
  fetch(`${UrlApi}works`).then((resp) => {
    if (resp.ok)                     {
      resp.json().then((data) => {
        // clear gallery
        document.querySelector(".gallery").innerHTML = "";
        // Loop to display all projects
        for (let i = 0; i <= data.length - 1; i++) {
          // Call informations for each work
          info(data[i]);
        }
      });
    }
  });
}

///// CATEGORY FILTERS ////
// Select all works to display
btn_tous.checked = true;
btn_tous.addEventListener("click", showGallery);
// Get the full gallery
fetch(`${UrlApi}works`).then((resp) => {
  if (resp.ok) {
    resp.json().then((data) => {
      // Get the total of projects
      const nbSlides = data.length;
      // Get the full list of categories
      fetch(`${UrlApi}categories`).then((resp) => {
        if (resp.ok) {
          // Create a button for each category
          resp.json().then((category) => {
            // Create an radio input (hidden)
            for (let count = 0; count <= category.length - 1; count++) {
              const object = document.createElement("input");
              object.type = "radio";
              object.id = category[count].name;
              object.name = "worksFilters"
              // Create a label (button)
              const objectLabel = document.createElement("button");
              objectLabel.className = "btn_option"
              objectLabel.innerHTML = `<label for="${category[count]?.name}">${category[count]?.name}</label>`;
              objectLabel.onclick = function () {                                 
                // Clear gallery
                document.querySelector(".gallery").innerHTML = "";
                // Show projects in the selected category
                for (let i = 0; i <= nbSlides; i++) {
                  if (data[i]?.category.name === category[count].name) {
                    info(data[i]);
                  }
                }
              };
              // Display filters buttons
              const button = document.getElementById("filterSelect");
              button.appendChild(object);
              button.appendChild(objectLabel);
            }
          });
        }
      });
    });
  }
});
// 
showGallery(); 