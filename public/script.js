async function fetchData() {
  const response = await fetch("/api/movies");
  const data = await response.json();
  const array = data.map((movie) => movie.title);
  console.log(array);
}

fetchData();
