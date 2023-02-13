const container = document.querySelector("#container");
const filterByYearButton = document.querySelector("#byYear");
const ageRatingButton = document.querySelector("#ageRatingButton");
//Calling functions
fetchData();
filterGenres();

ageRatingButton.addEventListener("click", filterRating);
async function fetchData() {
  const response = await fetch("/api/movies");
  const data = await response.json();

  displayData(data);

  async function filterAgeRating() {
    const ageResponse = await fetch("/api/age-ratings");
    const ageData = await ageResponse.json();
    const ageRating = ageData.map((age) => age.split("-").slice(-1));
    console.log(ageRating[4]);
    const filtered = data.filter((movie) => movie.age === "K-" + ageRating[3]);

    console.log(filtered);
  }
  filterAgeRating();
}

//filter by rating (To be continued)
async function filterRating() {
  const moviesResponse = await fetch("/api/movies");
  const moviesData = await moviesResponse.json();
  const minimumRating = document.querySelector("#minimum-rating");
  const maximumRating = document.querySelector("#maximum-rating");
  const filtered = moviesData.filter(
    (movie) =>
      movie.rating * 100 > minimumRating.value &&
      movie.rating * 100 < maximumRating.value
  );
  displayData(filtered);
}

// filter by genres

async function filterGenres() {
  const genreResponse = await fetch("/api/genres");
  const genreData = await genreResponse.json();
  const select = document.querySelector("select");
  const moviesResponse = await fetch("/api/movies");
  const moviesData = await moviesResponse.json();

  select.innerHTML += `
  ${genreData
    .map(
      (genre) => `
   <option value="${genre}">${genre}</option>`
    )
    .join("")}
`;

  select.addEventListener("change", () => {
    const choice = select.options[select.selectedIndex].value;
    const filteredMovies = moviesData.filter((movie) =>
      choice === "All"
        ? fetchData()
        : movie.genre[0] === choice ||
          movie.genre[1] === choice ||
          movie.genre[2] === choice ||
          movie.genre[3] === choice ||
          movie.genre[4] === choice
        ? movie
        : null
    );
    displayData(filteredMovies);
  });
}

//filter by year
filterByYearButton.addEventListener("click", async () => {
  const response = await fetch("/api/movies");
  const data = await response.json();
  const minimumYear = document.querySelector("#minimum");
  const maximumYear = document.querySelector("#maximum");
  const filteredMovies = data.filter(
    (movie) =>
      movie.releaseDate.split("-")[0] >= minimumYear.value &&
      movie.releaseDate.split("-")[0] <= maximumYear.value
  );

  displayData(filteredMovies);
});

//Displaying data on document

function displayData(array) {
  container.innerHTML = `
  <table ">
    <tr>
        <th>Title</th>
        <th>Year</th>
        <th>Age Rating</th>
        <th>Genre</th>
        <th>Rating</th>
    </tr>
   
    ${array
      .map(
        (movie) =>
          `<tr onclick="window.location='/movies/${movie.id}'">
            <td class="table-data">${movie.title}</td>
            <td class="table-data">${movie.releaseDate.split("-")[0]}</td>
            <td class="table-data">${movie.age}</td>
            <td class="table-data">${movie.genre}</td>
            <td class="table-data">${movie.rating * 100}%</td>
          </tr>`
      )
      .join("")}

  </table>
  `;
}
