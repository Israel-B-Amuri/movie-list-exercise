const container = document.querySelector("#container");
const filterByYearButton = document.querySelector("#byYear");

//Calling functions
fetchData();
filterGenres();

async function fetchData() {
  const response = await fetch("/api/movies");
  const data = await response.json();
  const ageRatingButton = document.querySelector("#ageRatingButton");

  displayData(data);
  ageRatingButton.addEventListener("click", filterAgeRating);

  async function filterAgeRating() {
    const ageResponse = await fetch("/api/age-ratings");
    const ageData = await ageResponse.json();

    const filteredMovies = data.filter(
      (movie) => minimumAgeRating.value == movie.age //&&
      //movie.age == maximumAgeRating.value
    );

    console.log(filteredMovies);
  }
}

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
        : choice === movie.genre[0] ||
          choice === movie.genre[1] ||
          choice === movie.genre[2] ||
          choice === movie.genre[3] ||
          choice === movie.genre[4]
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
          `<tr>
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
