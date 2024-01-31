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
    const url = `http://localhost:3000/bookings/getBookings/${id}`;
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            if (data.book.bookings.length > 0) {
                //console.log(data.book.bookings);
                document.querySelector(
                    "#bookingSection"
                ).innerHTML = `<h2 class="text-4xl font-medium text-center mb-8 underline"> My bookings </h2>`;
                data.book.bookings.forEach(function (trip) {
                    const date = new Date(trip.date);
                    const year = date.getFullYear().toString().padStart(4, "0");
                    const month = (date.getMonth() + 1)
                        .toString()
                        .padStart(2, "0");
                    const day = date.getDate().toString().padStart(2, "0");

                    const formattedDate = `${year}/${month}/${day}`;

                    //calcul time before departure
                    const now = new Date();
                    const timeDifference = date - now;
                    let timeLeft;
                    let classBgInfos = "rounded-lg p-2 ";
                    if (timeDifference > 0) {
                        const hours = Math.floor(
                            timeDifference / (1000 * 60 * 60)
                        );
                        const minutes = Math.floor(
                            (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
                        );

                        timeLeft = `Departure in ${hours}h${minutes}min`;
                        classBgInfos += "bg-teal-600/60";
                        //console.log(timeLeft);
                    } else {
                        timeLeft = "Too late";
                        classBgInfos += "bg-red-200/60";
                    }
                    const { arrival, departure, price } = trip;
                    document.querySelector("#bookingSection").innerHTML += `
                    <div class="flex justify-between items-center bg-white p-3 mb-2 mr-[25rem] ml-[25rem] rounded-lg font-medium">
                      <p>
                          ${departure} > ${arrival} - ${formattedDate} - ${price}€
                      </p>
                      <div class="flex flex-col items-end">
                          <p class="${classBgInfos}">
                              ${timeLeft}
                          </p>
                      </div>
</div>
`;
                });
            } else {
                document.querySelector(
                    "#bookingSection"
                ).innerHTML = `<div class="grid pt-12 place-content-center px-4">
                <div class="text-center">
                    <p
                        class="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl"
                    >
                        You don't have any bookings !
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
