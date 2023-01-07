import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try {
    const response = await fetch(config.backendEndpoint + "/reservations/");
    const myJson = await response.json();
    return myJson;
  } catch {
    return null;
  }

  // Place holder for functionality to work in the Stubs
  // return null;
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table
  if (reservations.length === 0) {
    document.getElementById("reservation-table-parent").style.display = "none";
    document.getElementById("no-reservation-banner").style.display = "block";
  } else {
    document.getElementById("reservation-table-parent").style.display = "block";
    document.getElementById("no-reservation-banner").style.display = "none";
  }

  //Conditionally render the no-reservation-banner and reservation-table-parent

  reservations.forEach((reservations) => {
    let tableBodyData = document.getElementById("reservation-table");
    let tr = document.createElement("tr");

    let date = new Date(`${reservations.time}`);

    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    let time = date.toLocaleTimeString("en-IN");
    const event = new Date(Date.UTC(year, month, day));
    const options = { year: "numeric", month: "long", day: "numeric" };

    let bookingDate = event.toLocaleDateString("en-IN", options);
    let bookingTime = time;

    let newDate = new Date(`${reservations.date}`);
    let newYear = newDate.getFullYear();
    let newMonth = newDate.getMonth();
    let newDay = newDate.getDate();

    let finalDate = `${newDay}/${newMonth + 1}/${newYear}`;

    tr.innerHTML = `
      <td>${reservations.id}</td>
      <td>${reservations.name}</td>
      <td>${reservations.adventureName}</td>
      <td>${reservations.person}</td>
      <td>${finalDate}</td>
      <td>${reservations.price}</td>
      <td>${bookingDate + ", " + bookingTime}</td>
      <td><button id=${
        reservations.id
      } class="reservation-visit-button"><a href="/frontend/pages/adventures/detail/?adventure=${
      reservations.adventure
    }">Visit Adventure</a></button></td>
    `;
    tableBodyData.appendChild(tr);
  });

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */
}

export { fetchReservations, addReservationToTable };
