import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  return search.split("=")[1];
  // Place holder for functionality to work in the Stubs
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try {
    const response = await fetch(
      config.backendEndpoint + "/adventures/detail/?adventure=" + adventureId
    );
    const myJson = await response.json();
    return myJson;
  } catch {
    return null;
  }
  // Place holder for functionality to work in the Stubs
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  let h1 = document.getElementById("adventure-name");
  h1.textContent = adventure.name;
  let para = document.getElementById("adventure-subtitle");
  para.textContent = adventure.subtitle;

  let photoGallery = document.getElementById("photo-gallery");
  let images = adventure.images;

  images.forEach((image) => {
    let div = document.createElement("div");
    let img = document.createElement("img");
    img.setAttribute("src", `${image}`);
    img.setAttribute("class", "activity-card-image");
    div.appendChild(img);
    photoGallery.appendChild(div);
  });

  let content = document.getElementById("adventure-content");
  let paragraph = document.createElement("p");
  paragraph.textContent = adventure.content;
  content.appendChild(paragraph);
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  let photoGallery = document.getElementById("photo-gallery");
  let div = document.createElement("div");
  div.setAttribute("id", "carouselExampleIndicators");
  div.setAttribute("class", "carousel slide");
  div.setAttribute("data-bs-ride", "carousel");

  div.innerHTML = `<div class="carousel-indicators">
  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
</div>
<div class="carousel-inner">
  
</div>
<button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
  <span class="visually-hidden">Previous</span>
</button>
<button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
  <span class="carousel-control-next-icon" aria-hidden="true"></span>
  <span class="visually-hidden">Next</span>
</button>`;

  photoGallery.parentNode.replaceChild(div, photoGallery);

  let innerDiv = document.querySelector(".carousel-inner");

  for (let i = 0; i < images.length; i++) {
    if (i == 0) {
      let div = document.createElement("div");
      div.setAttribute("class", "carousel-item active");

      let img = document.createElement("img");
      img.setAttribute("class", "d-block w-100 activity-card-image");
      img.setAttribute("src", `${images[i]}`);

      div.appendChild(img);
      innerDiv.appendChild(div);
    } else {
      let div = document.createElement("div");
      div.setAttribute("class", "carousel-item");

      let img = document.createElement("img");
      img.setAttribute("class", "d-block w-100 activity-card-image");
      img.setAttribute("src", `${images[i]}`);

      div.appendChild(img);
      innerDiv.appendChild(div);
    }
  }
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  if (adventure.available) {
    document.getElementById("reservation-panel-sold-out").style.display =
      "none";
    document.getElementById("reservation-panel-available").style.display =
      "block";
  } else {
    document.getElementById("reservation-panel-available").style.display =
      "none";
    document.getElementById("reservation-panel-sold-out").style.display =
      "block";
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  let costPerHead = adventure.costPerHead;
  let totalCost = costPerHead * persons;

  let totalCostOfReversation = document.getElementById("reservation-cost");
  totalCostOfReversation.innerHTML = totalCost;

  let costPerPerson = document.getElementById("reservation-person-cost");
  costPerPerson.innerHTML = costPerHead;
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  const data = {
    name: "",
    date: "",
    person: "",
    adventure: "",
  };

  data.adventure = adventure.id;

  let form = document.getElementById("myForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    data.name = form.elements["name"].value;
    data.date = form.elements["date"].value;
    data.person = form.elements["person"].value;
    if (!adventure.reserved) {
      alert("Success");
    } else {
      alert("Failed");
    }
    
  fetch(config.backendEndpoint + "/reservations/new", {
    method: "POST", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.log("Error:", error);
    });
  });

}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if (adventure.reserved) {
    document.getElementById("reserved-banner").style.display = "block";
  } else {
    document.getElementById("reserved-banner").style.display = "none";
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
