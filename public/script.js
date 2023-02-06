const container = document.querySelector("#container");

async function fetchData() {
  const response = await fetch("/api/movies");
  const data = await response.json();

  container.innerHTML = `
  <table style="width:90%">
    <tr>
        <th>Title</th>
        <th>Year</th>
        <th>Age Rating</th>
        <th>Genre</th>
        <th>Rating</th>
    </tr>
   
    ${data
      .map(
        (movie) =>
          `<tr>
        <td>${movie.title}</td>
        <td>${movie.releaseDate}</td>
        <td>${movie.age}</td>
        <td>${movie.genre}</td>
        <td>${movie.rating * 100}%</td></tr>`
      )
      .join("")};

  </table>
  
  `;
}

fetchData();
