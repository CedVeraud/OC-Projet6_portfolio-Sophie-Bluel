const UrlApi = "http://localhost:5678/api/";
const error = document.getElementById("error");

document.addEventListener("submit", (e) => {
    e.preventDefault();
    let form = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
    };

    fetch(`${UrlApi}users/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
    }).then((resp) => {
        if (resp.status !== 200) {
            error.innerText = "Email ou mot de passe incorrect !";
        } else {
            resp.json().then((data) => {
            sessionStorage.setItem("token", data.token); 
            window.location.replace("index.html");
        });
        }
    });
});
