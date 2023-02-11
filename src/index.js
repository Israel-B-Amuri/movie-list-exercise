const { response } = require("express");
const express = require("express");
const { request } = require("http");
const path = require("path");
const movies = require("./data/movies.json");
const genres = require("./data/genres.json");
const ageRatings = require("./data/age-ratings.json");
const port = process.env.PORT || 3000;

const app = express();

app.use(express.static(path.join("public")));

app.get("/api/movies", (request, response) => {
  response.status(200).json(
    movies.map((movie) => ({
      id: movie.id,
      title: movie.title,
      age: movie.age,
      genre: movie.genres,
      releaseDate: movie.releaseDate,
      rating: movie.rating,
    }))
  );
});

//sending movie html file to movie route
app.get("/movies/id:id", (request, response) => {
  response.status(200).sendFile("public/movies-id.html");
});

//creating movie route

app.get("/movies/:id", (request, response) => {
  const movie = movies.find((movie) => movie.id == request.params.id);
  if (!movie) {
    return response
      .status(200)
      .json({ error: `movie with id ${request.params.id} not found` });
  }
  response.status(200).json(movie);
});

app.get("/api/genres", (request, response) => {
  response.status(200).send(genres);
});

app.get("/api/age-ratings", (request, response) => {
  response.status(200).send(ageRatings);
});

app.listen(port, (error) => {
  if (error) {
    console.log(error);
    return;
  }
  console.log(`Server is running at http://localhost:${port}`);
});
