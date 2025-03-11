// LOGOUT //
function logOut() {
    sessionStorage.removeItem("token");
    alert("Vous êtes déconnecté(e)")
    // reload default page
    logMenu.href = "";
};
// Advice //
function forbidden() {
    alert("Vous devez vous connecter")
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
    modifBtn.classList.remove("hidden");
    editBtn.classList.remove("hidden");
    console.log("connected");
} else {
    modifBtn.href = "";
    modifBtn.addEventListener("click", (e) => {
        e.preventDefault()
        forbidden();
    });
    console.log("disconnected");
};

/////// MODALE ///////