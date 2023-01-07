import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  try {
    let cities = await fetchCities();
    cities.forEach((key) => {
      addCityToDOM(key.id, key.city, key.description, key.image);
    });
  } catch (err) {
    throw new Error(err);
  }
  //Updates the DOM with the cities
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try {
    let cities = await fetch(config.backendEndpoint + "/cities");
    return cities.json();
  } catch {
    return null;
  }
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let div = document.createElement("div");
  div.setAttribute("class", "col-12 col-sm-6 col-lg-3 mb-4");
  div.innerHTML = `
    <a id="${id}" href="pages/adventures/?city=${id}">
      <div class="tile">
        <img src="${image}" alt=""/>
        <div class="tile-text text-center">
          <h5>${city}</h5>
          <p>${description}</p>
        </div>
      </div>
    </a>`;

  let divIdData = document.getElementById("data");
  divIdData.appendChild(div);
}

export { init, fetchCities, addCityToDOM };
