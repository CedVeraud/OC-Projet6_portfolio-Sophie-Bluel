///////////////////////////
/////// ADMIN MODE ///////
/////////////////////////
const token = sessionStorage.getItem("token");

// LOGOUT //
function logOut() {
  sessionStorage.clear();
  alert("Vous êtes déconnecté(e)");
  // reload default page
  logMenu.href = "";
};
// Advice if button "modifier" is not hidden //
function forbidden() {
  alert("Vous devez vous connecter");
};

/////////////////////////////////////
/////// LOGIN --> Admin mode ///////
///////////////////////////////////
const logMenu = document.getElementById("log");
const modifBtn = document.querySelector(".admin_modif-btn");
const editBtn = document.querySelector(".admin_edit-btn");
const editMode = document.getElementById("editMode");

if (token) {
  logMenu.innerText = "logout";
  logMenu.href = "#";
  logMenu.addEventListener("click", logOut);
  document.getElementById("filterSelect").classList.add("hidden");
  editMode.classList.add("bg-black");;
  editBtn.classList.remove("hidden");
  modifBtn.classList.remove("hidden");
  modifBtn.addEventListener("click", (e) => {
      e.preventDefault();
      openModal();
  });
  console.log("connected");
} else {
  modifBtn.href = "";
  modifBtn.addEventListener("click", (e) => {
    e.preventDefault();
    forbidden();
  });
  console.log("disconnected");
};

///////////////////////////////
/////// DISPLAY MODAL ////////
/////////////////////////////
let modalWindow = document.getElementById("modal1");
const modalWrapper = document.querySelector(".modal_wrapper");
const modalCloseBtn = document.querySelector(".close-modal");
const modalGallery = document.querySelector(".modal_gallery");

function openModal() {
  modalWindow.classList.remove("hidden");
  getModalWorks();
};
function closeModal() {
  document.getElementById("addPictureForm").reset();
  resetPicturePreview();
  resetSubmitBtnColor();
  switchModalPage1();
  modalWindow.classList.add("hidden");
};
function stopProp(e) {
  e.stopPropagation();
};
// listen close modal buttons
modalWindow.addEventListener("click", closeModal);
modalCloseBtn.addEventListener("click", closeModal);
modalWrapper.addEventListener("click", stopProp);

/////////////////////////////////////////
/////// Display gallery in MODAL ///////
///////////////////////////////////////
// Create modal_gallery elements
function displayModalWork(work) {
  const MGcard = `
    <figure id ="MP${work?.id}" class="modal-project">
    <button id ="del${work?.id}" class="delete-project">
        <i class="fa-solid fa-trash-can"></i>
    </button>
    <img src="${work?.imageUrl}" crossOrigin="anonymous" alt="${work?.title}">
    </figure>
  `;
  modalGallery.insertAdjacentHTML("beforeend", MGcard);
};
// Display array content
function getModalWorks() {
  modalGallery.innerHTML = "";
  for (let i = 0; i <= allWorks.length - 1; i++) {
    displayModalWork(allWorks[i]);
    // LISTEN DELETE BTN
    let deleteBtn = document.querySelectorAll(".delete-project");
    deleteBtn[i].addEventListener("click", () => {
      deleteProject(allWorks[i].id);
    });    
  }      
};

///////////////////////////////
/////// DELETE project ///////
/////////////////////////////
function deleteProject(i) {
  fetch(`${UrlApi}works/${i}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}`},
  })
  .then (resp => {
    console.log(resp);

    // si statut OK
    if (resp.status === 204) {      
      allWorks = allWorks.filter(function(item) {
        return item.id !== i;
      });
      alert("Le projet a été supprimé");
      getModalWorks(allWorks);
      displayAllWorks(allWorks);
    }
    // sinon alerte
    else {
      alert("Vous devez vous connecter");
    };
  });
};

///////////////////////////////////
/////// switch modal PAGES ///////
/////////////////////////////////
const addBtn = document.querySelector(".btn_add");
const backBtn = document.querySelector(".back-modal");
const modalArticle1 = document.querySelector(".modal_article1");
const modalArticle2 = document.querySelector(".modal_article2");

function switchModalPage1() {
  modalArticle1.classList.remove("hidden");
  backBtn.classList.add("hidden");
  modalArticle2.classList.add("hidden");
}
function switchModalPage2() {
  modalArticle1.classList.add("hidden");
  backBtn.classList.remove("hidden");
  modalArticle2.classList.remove("hidden");
}
addBtn.addEventListener("click", switchModalPage2);
backBtn.addEventListener("click", switchModalPage1); 

////////////////////////////
/////// ADD project ///////
//////////////////////////
let pictureInput;
pictureInput = document.querySelector("#photo");
//preview picture in form
const prevImage = document.querySelector("#picturePreviewImg");
const prevPic = document.querySelector("#picturePreview");
const PicForm = document.querySelector(".modal_form-photo");
// display picture preview
function picturePreview() {
  const [file] = pictureInput.files;
  if (file) {
    prevImage.src = URL.createObjectURL(file);
    prevPic.classList.remove("hidden");
    PicForm.classList.add("hidden");
  }
};
function resetPicturePreview() {
  prevPic.classList.add("hidden");
  PicForm.classList.remove("hidden");
}
pictureInput.addEventListener("change", () => {
  picturePreview();
});
// change submit button color if form is completed
const validateBtn = document.querySelector(".add-work");
const form = document.getElementById("addPictureForm");
form.addEventListener("change", () => {
  changeSubmitBtnColor();
});
function changeSubmitBtnColor(){
  if (document.getElementById("titre").value === "" || document.getElementById("photo").files[0] === undefined || document.getElementById("selectCat").value === "") {
    resetSubmitBtnColor();
  } else {
    validateBtn.classList.add("active");
  }
};
function resetSubmitBtnColor(){
    validateBtn.classList.remove("active");
};

// build options to select category
function selectCategory(cat) {
  for (let count = 0; count <= cat.length - 1; count++) {
    // create radio INPUT
    const objectOption = document.createElement("option");
    objectOption.value = cat[count].id;
    objectOption.innerHTML = cat[count].name;
    // add INPUT + LABEL elements
    const selCat = document.getElementById("selectCat");
    selCat.appendChild(objectOption);
  };
};
/////////////////////////////
/////// Add new work ///////
///////////////////////////
const btnAjouterProjet = document.querySelector(".add-work");
btnAjouterProjet.addEventListener("click", (event) => {
  addWork(event);
});
async function addWork(event) {
  event.preventDefault();
  const title = document.querySelector(".js-title").value;
  const categoryId = document.querySelector(".js-categoryId").value;
  const image = document.querySelector(".js-image").files[0];
  if (title === "" || categoryId === "" || image === undefined) {
    alert("Merci de remplir tous les champs");
    return;
  } else {
    let formData = new FormData();
    formData.append("title", title);
    formData.append("category", categoryId);
    formData.append("image", image);
    await fetch(`${UrlApi}works`, {
      method: "POST",
      headers: {
          Authorization: `Bearer ${token}`,
      },
      body: formData
    }).then((resp) =>{
      if (resp.status === 201) {
        resp.json().then((data) => {
          event.preventDefault();
          addToWorksData(data);
          alert("Projet " + `${title}` + " ajouté avec succès");
          closeModal();
        });
      } else if (resp.status === 400) {
        alert("Merci de remplir tous les champs");
      } else if (resp.status === 500) {
        alert("Erreur serveur");
      } else if (resp.status === 401) {
        alert("Vous n'êtes pas autorisé(e) à ajouter un projet");
        window.location.href = "login.html";
      };
    });
  };
};
// Push new work
function addToWorksData(data) {
  allWorks.push(data);
  displayAllWorks(allWorks);
};