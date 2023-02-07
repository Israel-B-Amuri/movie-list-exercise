const container = document.querySelector("#container");
const filterByYearButton = document.querySelector("#byYear");

//Calling functions
fetchData();

async function fetchData(array) {
  const response = await fetch("/api/movies");
  const data = await response.json();
  displayData(data);
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
  <table style="width:80%">
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
