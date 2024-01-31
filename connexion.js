//Connexion html

document.querySelector("#btnRegister").addEventListener("click", () => {
    //reset error
    document.querySelector(".errorMsgRegister").textContent = "";

    //get value from input
    const inputNameRegister = document.querySelector("#nameRegister").value;
    const inputEmailRegister = document.querySelector("#emailRegister").value;
    const inputPasswordRegister =
        document.querySelector("#passwordRegister").value;
    //check if inputs are valid
    if (inputEmailRegister && inputNameRegister && inputPasswordRegister) {
        fetch("http://localhost:3000/users/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: inputNameRegister.value,
                email: inputEmailRegister.value,
                password: inputPasswordRegister.value,
            }),
        })
            .then((data) => {
                return data.json();
            })
            .then((data) => {
                if (data.result) {
                    alert("Sucess register. Please connect");
                } else {
                    document.querySelector(".errorMsgRegister").textContent =
                        "Une erreur s'est produite";
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

function resetFormRegister() {
    document.querySelector("#nameRegister").value = "";
    document.querySelector("#emailRegister").value = "";
    document.querySelector("#passwordRegister").value = "";
}
