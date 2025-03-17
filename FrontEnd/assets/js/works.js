const UrlApi = "http://localhost:5678/api/";
const callData = fetch(`${UrlApi}works`);
const callCat = fetch(`${UrlApi}categories`);
let allWorks = [];

////// GALLERY ///////
const gallery = document.querySelector(".gallery");
// Create gallery elements
function displayWork(work) {
  const card = `
    <figure id="P${work?.id}" >
    <img src="${work?.imageUrl} "crossOrigin="anonymous">
      <figcaption>${work?.title}</figcaption>
    </figure>
  `;
  gallery.insertAdjacentHTML("beforeend", card);
}
// Display array content
function displayAllWorks(data) {
  gallery.innerHTML = "";
  for (let i = 0; i <= data.length - 1; i++) {
    displayWork(data[i]);
  }        
}

///// CATEGORY FILTERS /////
callData.then((resp) => {
  if (resp.ok){
    resp.json().then((data) => {
      displayAllWorks(data);
      getCat(data);
      allWorks = data;   
    });
  }
});

// build filters buttons
function getCat(data){
  const nbSlides = data.length;
  callCat.then((resp) => {
    if (resp.ok) {
      resp.json().then((category) => {
        for (let count = 0; count <= category.length - 1; count++) {
          // create radio INPUT
          const objectInput = document.createElement("input");
          objectInput.type = "radio";
          objectInput.id = category[count].name;
          objectInput.name = "worksFilters"
          // create associated LABEL
          const objectLabel = document.createElement("div");
          objectLabel.className = "btn_option"
          objectLabel.innerHTML = `<label for="${category[count].name}">${category[count]?.name}</label>`;
          // ON CLICK
          objectLabel.onclick = function () {                                 
            // Clear gallery
            gallery.innerHTML = "";
            // Show projects of the selected category
            for (let i = 0; i <= nbSlides; i++) {
              if (data[i]?.category.name === category[count].name) {
                displayWork(data[i]);
              }
            }
          };
          // add INPUT + LABEL elements
          const button = document.getElementById("filterSelect");
          button.appendChild(objectInput);
          button.appendChild(objectLabel);
        }
      });
    }
  });
};
// Select ALL WORKS
const AllBtn = document.getElementById("btn_all");
AllBtn.checked = true;
AllBtn.addEventListener("click", () => {
  displayAllWorks(allWorks);
});