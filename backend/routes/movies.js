const express = require("express");
const router = express.Router();

router.get("/movies", async (req, res) => {
  try {
    fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.MOVIE_API_KEY}&language=en-US&page=1&region=GB`
    )
      .then((res) => res.json())
      .then((data) => res.status(200).json(data));
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/hello", (req, res) => {
  res.send("<h1>Hello</h1>");
});

router.get("/genres", (req, res) => {
  try {
    fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.MOVIE_API_KEY}&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => res.status(200).json(data));
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/premieremovies", (req, res) => {
  try {
    fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.MOVIE_API_KEY}&language=en-US&page=1&region=GB`
    )
      .then((res) => res.json())
      .then((data) => res.status(200).json(data));
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/cast", (req, res) => {
  const id = req.headers.id;
  try {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.MOVIE_API_KEY}&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => res.status(200).json(data));
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
