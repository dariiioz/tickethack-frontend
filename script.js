const id = localStorage.getItem("id");
const name = localStorage.getItem("name");
const email = localStorage.getItem("email");
const isConnected = localStorage.getItem("isConnected");

if (isConnected && id && name && email) {
    document.querySelector(
        "#divBtnLogin"
    ).innerHTML = `<div class="sm:flex sm:gap-4">
                                <a
                                    id='btnLoginNavbar'
                                    class="rounded-md bg-red-600 px-5 py-2.5 text-sm font-medium text-white shadow hover:bg-red-700"
                                >
                                <button>
                                    Sign Out
                                 </button>   
                                </a>
                            </div>`;
    document.querySelector("#btnLoginNavbar").addEventListener("click", () => {
        localStorage.clear();
        location.reload();
    });
} else {
    console.log("Personne connecté");
}

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
                    resetResultTrip();
                    data.trips.forEach(function (trip) {
                        const date = new Date(trip.date);
                        const year = date
                            .getFullYear()
                            .toString()
                            .padStart(4, "0");
                        const month = (date.getMonth() + 1)
                            .toString()
                            .padStart(2, "0");
                        const day = date.getDate().toString().padStart(2, "0");

                        const formattedDate = `${year}/${month}/${day}`;

                        const button = document.createElement("button");
                        button.className =
                            "inline-flex items-center bg-teal-600 border-0 py-1 px-3 focus:outline-none hover:bg-teal-400 rounded text-base ml-8 h-6 text-white";
                        button.textContent = "Books";
                        button.setAttribute("data-trip-id", trip._id);

                        button.addEventListener("click", (event) => {
                            const tripId =
                                event.target.getAttribute("data-trip-id");
                            console.log("Trip to book:", tripId);
                            const isConnected =
                                localStorage.getItem("isConnected");
                            const userId = localStorage.getItem("id");
                            //if user is connected
                            if (isConnected && userId) {
                                const url = `http://localhost:3000/carts/addTripToCart/${userId}`;
                                fetch(url, {
                                    method: "PUT",
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({
                                        tripId: tripId,
                                    }),
                                })
                                    .then((response) => {
                                        return response.json();
                                    })
                                    .then((data) => {
                                        if (data.result === true) {
                                            window.location.assign(
                                                "/cart.html"
                                            );
                                        } else {
                                            alert(`Une erreur s'est produite.`);
                                        }
                                    });
                            } else {
                                alert("You need to connect for book a trip.");
                            }
                        });

                        const container = document.createElement("div");
                        container.className =
                            "bg-slate-100 rounded-lg mt-2 pt-2 pb-2 flex items-center align-center pl-4";
                        container.innerHTML = `
        <p>${trip.departure} > ${trip.arrival} - ${formattedDate} - ${trip.price}€</p>
    `;

                        container.appendChild(button);

                        document
                            .querySelector("#resultTrips")
                            .appendChild(container);
                    });
                } else {
                    document.querySelector(
                        "#resultTrips"
                    ).innerHTML = `<img src="./images/notfound.png" class="w-64 mx-auto" />
                    <h2 class="text-gray-900 text-lg mb-1 text-center">
                        No trips found for this city.
                    </h2>`;
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

function resetResultTrip() {
    document.querySelector("#resultTrips").innerHTML = ``;
}
