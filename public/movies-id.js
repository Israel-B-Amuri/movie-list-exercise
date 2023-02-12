const movieId = window.location.pathname.split("/").splice(-1)[0];

fetchMovie();

async function fetchMovie() {
  const movieContainer = document.querySelector("#movie-container");
  const response = await fetch("/api/movies/" + movieId);
  const movie = await response.json();
  console.log(movie);
  console.log(movieId);

  movieContainer.innerHTML = `
  <div id="image-container">
    <img src="../images/${movie.image}" alt="">
  </div>
  <div class="description">
    <h1> ${movie.title}</h1>
    <p> ${movie.description}</p>
    <p><strong>Movie Length:</strong> ${movie.length / 60} minutes</p>
    <p><strong>Movie Rating:</strong> ${movie.rating * 100}%</p>
    <p><strong>Age Rating:</strong> ${movie.age} </p>
    <p><strong>Release Date:</strong> ${movie.releaseDate} </p>
    <p><strong>Genre:</strong> ${movie.genres} </p>
  </div>
  `;
}
