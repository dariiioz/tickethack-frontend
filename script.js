document.querySelector("#btnSearchDate").addEventListener("click", () => {
    document.querySelector(".errorMsg").textContent = "";
    const inputArrival = document.querySelector("#arrival");
    const inputDeparture = document.querySelector("#departure");
    const inputDate = document.querySelector("#dateInput");

    if (inputArrival.value && inputDeparture.value && inputDate.value) {
        fetch("http://localhost:3000/trips/withFilters", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                arrival: inputArrival.value,
                departure: inputDeparture.value,
                date: inputDate.value,
            }),
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if (data.trips.length != 0) {
                    console.log(data);
                } else {
                    console.log("Pas de données");
                }
            })
            .catch((error) => {
                console.error("Fetch error:", error);
            });
    } else {
        document.querySelector(".errorMsg").textContent =
            "All inputs are required";
    }
});
