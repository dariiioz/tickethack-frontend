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
            Sign Out
        </a>
    </div>`;
    document.querySelector("#btnLoginNavbar").addEventListener("click", () => {
        localStorage.clear();
        location.reload();
    });
    const url = `http://localhost:3000/carts/getCart/${id}`;
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);

            if (data.cart.items.length > 0) {
                console.log(data.cart.items);

                //reset
                const container = document.querySelector("#cartSection");
                container.innerHTML = `<h2 class='text-4xl font-medium text-center mb-8 underline'> My cart </h2>`;

                let totalCart = 0;
                data.cart.items.forEach(function (trip) {
                    const date = new Date(trip.date);
                    const year = date.getFullYear().toString().padStart(4, "0");
                    const month = (date.getMonth() + 1)
                        .toString()
                        .padStart(2, "0");
                    const day = date.getDate().toString().padStart(2, "0");

                    const formattedDate = `${year}/${month}/${day}`;
                    const { arrival, departure, price } = trip;
                    const idTrip = trip._id;
                    totalCart += price;

                    const tripDiv = document.createElement("div");
                    tripDiv.className =
                        "flex justify-between items-center bg-white p-3 mb-2 mr-[10rem] ml-[10rem] rounded-lg";

                    tripDiv.innerHTML = `
        <p>${departure} > ${arrival} - ${formattedDate} - ${price}€</p>
        <button id='btnDeleteTrip' data-trip-id="${idTrip}" class="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 focus:outline-none focus:ring focus:ring-blue-200">
            Delete trips
        </button>
    `;

                    container.appendChild(tripDiv);
                    // tripDiv
                    //     .querySelector("button")
                    //     .addEventListener("click", (event) => {
                    //         console.log("click delete");
                    //         const tripId =
                    //             event.currentTarget.getAttribute(
                    //                 "data-trip-id"
                    //             );
                    //         console.log(`ID du trip: ${tripId}`);
                    //     });
                });

                //add purchase line
                container.innerHTML += `
                <div class="flex justify-between items-center p-3 mb-2 mr-[10rem] ml-[10rem] rounded-lg bg-teal-600 text-white">
                  <p class='font-medium'>Total price : ${totalCart}€</p>
                        <button id="purchaseBtn" class="bg-white  py-2 px-4 rounded hover:bg-slate-200 focus:outline-none focus:ring focus:ring-teal-200 text-teal-700">
                            Purchase
                        </button>
                </div>`;
                addEventOnAllDeleteBtn();
                document
                    .querySelector("#purchaseBtn")
                    .addEventListener("click", () => {
                        const url = `http://localhost:3000/carts/purchase/${id}`;
                        fetch(url, {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json",
                            },
                        })
                            .then((data) => {
                                return data.json();
                            })
                            .then((data) => {
                                if (data.result === true) {
                                    window.location.assign("./booking.html");
                                } else {
                                    alert("An error has occured");
                                }
                            });
                    });
            } else {
                document.querySelector(
                    "#cartSection"
                ).innerHTML = `<div class="grid h-screen place-content-center px-4">
                    <div class="text-center">
                        <p
                            class="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl"
                        >
                            Cart empty please add a book to cart.
                        </p>

                        <a
                            href="./index.html"
                            class="mt-6 inline-block rounded bg-teal-600 px-5 py-3 text-sm font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring"
                        >
                            Get a book
                        </a>
                    </div>
                </div>`;
            }
        });
} else {
    console.log("Personne connecté");
}

function addEventOnAllDeleteBtn() {
    //const allButtons = document.querySelectorAll("#btnDeleteTrip");
    for (
        let i = 0;
        i < document.querySelectorAll("#btnDeleteTrip").length;
        i++
    ) {
        document
            .querySelectorAll("#btnDeleteTrip")
            [i].addEventListener("click", () => {
                const tripId = document
                    .querySelectorAll("#btnDeleteTrip")
                    [i].getAttribute("data-trip-id");
                const url = `http://localhost:3000/carts/removeTripFromCart/${id}`;
                fetch(url, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ tripId: tripId }),
                })
                    .then((data) => {
                        return data.json();
                    })
                    .then((data) => {
                        if (data.result === true) {
                            location.reload();
                        } else {
                            alert("An error has occured");
                        }
                    });
            });
    }
}
