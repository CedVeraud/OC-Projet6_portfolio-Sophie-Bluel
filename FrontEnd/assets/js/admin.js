const token = sessionStorage.getItem("token");

// LOGOUT //
function logOut() {
  sessionStorage.clear();
  alert("Vous êtes déconnecté(e)");
  // reload default page
  logMenu.href = "";
};
// Advice //
function forbidden() {
  alert("Vous devez vous connecter");
};

// LOGIN - Admin mode //
const logMenu = document.getElementById("log");
const modifBtn = document.querySelector(".admin_modif-btn");
const editBtn = document.querySelector(".admin_edit-btn");

if (sessionStorage.getItem("token")) {
  logMenu.innerText = "logout";
  logMenu.href = "#";
  logMenu.addEventListener("click", logOut);
  document.getElementById("filterSelect").classList.add("hidden");
  document.getElementById("editMode").style.backgroundColor = "black";
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

/////// DISPLAY MODALE ///////
const modalWindow = document.getElementById("modal1");
const modalWrapper = document.querySelector(".modal-wrapper");
const modalCloseBtn = document.querySelector(".close-modal");
const modalGallery = document.querySelector(".modal-gallery");

function openModal() {
  modalWindow.classList.remove("hidden");
  getModalWorks();
};
function closeModal() {
  modalWindow.classList.add("hidden");
};
const stopProp = function(e) {
  e.stopPropagation();
};
// listen close modal buttons
modalWindow.addEventListener("click", closeModal);
modalCloseBtn.addEventListener("click", closeModal);
modalWrapper.addEventListener("click", stopProp);

// Create modal-gallery elements
function displayModalWork(work) {
  const MGcard = `
    <figure id ="MP${work?.id}" class="modale-project">
    <button id ="del${work?.id}" class="delete-project">
        <i class="fa-solid fa-trash-can"></i>
    </button>
    <img src="${work?.imageUrl} "crossOrigin="anonymous">
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
      console.log(deleteBtn[i])
      deleteProject(allWorks[i].id);
    });    
  }      
};
// Supprimer le projet
function deleteProject(i) {
  fetch(`http://localhost:5678/api/works/${i}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}`},
  })
  .then (resp => {
    console.log(resp);
    // si statut incorrect
    if (resp.status !== 204) {
      alert("Vous devez vous connecter");
    }
    // si statut ok
    else {
      console.log("projet " + `${i}` + " supprimé");
      // rafraichir la page    
      allWorks = allWorks.filter(function(item) {
        return item.id !== i;
      });
      getModalWorks();
      displayAllWorks(allWorks);
    };
  });
};
