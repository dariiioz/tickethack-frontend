//Connexion html

document.querySelector("#btnRegister").addEventListener("click", () => {
    //reset error
    document.querySelector(".errorMsgRegister").textContent = "";

    //get value from input
    const inputNameRegister = document.querySelector("#nameRegister");
    const inputEmailRegister = document.querySelector("#emailRegister");
    const inputPasswordRegister = document.querySelector("#passwordRegister");
    //check if inputs are valid
    if (
        inputEmailRegister.value &&
        inputNameRegister.value &&
        inputPasswordRegister.value
    ) {
        let name = inputNameRegister.value;
        let email = inputEmailRegister.value;
        let password = inputPasswordRegister.value;
        fetch("http://localhost:3000/users/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
            }),
        })
            .then((data) => {
                return data.json();
            })
            .then((data) => {
                if (data.result === true) {
                    alert("Sucess register. Please connect");
                } else {
                    document.querySelector(
                        ".errorMsgRegister"
                    ).textContent = `${data.error}`;
                }
            });
        //reset form
        resetFormRegister();
    } else {
        document.querySelector(".errorMsgRegister").textContent =
            "All inputs are required to register";
        resetFormRegister();
    }
});

function resetFormLogin() {
    document.querySelector("#emailLogin").value = "";
    document.querySelector("#passwordLogin").value = "";
}

function resetFormRegister() {
    document.querySelector("#emailRegister").value = "";
    document.querySelector("#passwordRegister").value = "";
    document.querySelector("#nameRegister").value = "";
}

document.querySelector("#btnLogin").addEventListener("click", () => {
    //reset error
    document.querySelector(".errorMsgLogin").textContent = "";

    //get value from input

    const inputEmailLogin = document.querySelector("#emailLogin");
    const inputPasswordLogin = document.querySelector("#passwordLogin");
    //check if inputs are valid
    if (inputEmailLogin.value && inputPasswordLogin.value) {
        let email = inputEmailLogin.value;
        let password = inputPasswordLogin.value;

        //console.log(email, password);
        fetch("http://localhost:3000/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        })
            .then((data) => {
                return data.json();
            })
            .then((data) => {
                if (data.result === true) {
                    //console.log(data.user);
                    localStorage.setItem("id", data.user._id);
                    localStorage.setItem("email", data.user.email);
                    localStorage.setItem("name", data.user.name);
                    localStorage.setItem("isConnected", true);
                    window.location.assign("/index.html");
                } else {
                    document.querySelector(
                        ".errorMsgLogin"
                    ).textContent = `${data.error}`;
                }
            });
        //reset form
        resetFormLogin();
    } else {
        document.querySelector(".errorMsgLogin").textContent =
            "All inputs are required to register";
        resetFormLogin();
    }
});
