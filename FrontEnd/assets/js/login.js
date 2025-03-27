const UrlApi = "http://localhost:5678/api/";
const error = document.getElementById("error");

document.addEventListener("submit", (e) => {
  e.preventDefault();
  let form = {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };
  // call API
  fetch(`${UrlApi}users/login`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(form)
  }).then((resp) => {
    //if status OK
    if (resp.status === 200) {
      resp.json().then((data) => {
        // set and store item
        sessionStorage.setItem("token", data.token);
        // back to index page
        window.location.replace("index.html");
      });
    } else {
      error.innerText = "Email ou mot de passe incorrect !";
    };
  });
});
