const movieId = window.location.pathname.split("/").splice(-1)[0];

fetchMovie();

async function fetchMovie() {
  const movieContainer = document.querySelector("#movie-container");
  const response = await fetch("/api/movies/" + movieId);
  const data = await response.json();
  console.log(data);
  console.log(movieId);

  movieContainer.innerHTML = `
  <h1>${data.title}</h1>
  
  `;
}
