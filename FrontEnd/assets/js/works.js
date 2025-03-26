const UrlApi = "http://localhost:5678/api/";
let allWorks = [];
let allCats = [];

// get ALL WORKS
fetch(`${UrlApi}works`).then((resp) => {
  if (resp.ok){
    resp.json().then((data) => {
      displayAllWorks(data);
      allWorks = data;   
    });
  }
});
// get ALL CATEGORIES
fetch(`${UrlApi}categories`).then((resp) => {
  if (resp.ok){
    resp.json().then((category) => {
      filterCats(category);
      selectCategory(category);
      allCats = category;
    });
  }
});
///////////////////////////////
////// DISPLAY GALLERY ///////
///////////////////////////////
const gallery = document.querySelector(".gallery");
// Create gallery elements
function displayWork(work) {
  const card = `
    <figure id="P${work?.id}" >
    <img src="${work?.imageUrl}" crossOrigin="anonymous" alt="${work?.title}" >
      <figcaption>${work?.title}</figcaption>
    </figure>
  `;
  gallery.insertAdjacentHTML("beforeend", card);
};
// Display array content
function displayAllWorks(data) {
  gallery.innerHTML = "";
  for (let i = 0; i <= data.length - 1; i++) {
    displayWork(data[i]);
  }        
};

/////////////////////////////
///// CATEGORY FILTERS /////
///////////////////////////
// build filters buttons
function filterCats(cat){
  const nbSlides = allWorks.length;
  // get categories data
  for (let count = 0; count <= cat.length - 1; count++) {
    // create radio INPUT
    const objectInput = document.createElement("input");
    objectInput.type = "radio";
    objectInput.id = cat[count].name;
    objectInput.name = "worksFilters"
    // create associated LABEL
    const objectLabel = document.createElement("div");
    objectLabel.className = "btn_option"
    objectLabel.innerHTML = `<label for="${cat[count].name}">${cat[count]?.name}</label>`;
    // ON CLICK
    objectLabel.onclick = function () {                                 
      // Clear gallery
      gallery.innerHTML = "";
      // Show projects of the selected category
      for (let i = 0; i <= nbSlides; i++) {
        if (allWorks[i]?.category.name === allCats[count].name) {
          displayWork(allWorks[i]);
        }
      }
    };
    // add INPUT + LABEL elements
    const button = document.getElementById("filterSelect");
    button.appendChild(objectInput);
    button.appendChild(objectLabel);
  }    
};
// Select ALL WORKS button
const AllBtn = document.getElementById("btn_all");
AllBtn.checked = true;
AllBtn.addEventListener("click", () => {
  displayAllWorks(allWorks);
});