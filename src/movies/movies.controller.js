const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

//ID VALIDATION
async function movieExists(req, res, next) {
  const { movieId } = req.params;

  const foundMovie = await service.read(movieId);

  if (foundMovie) {
    res.locals.movie = foundMovie;
    return next();
  }
  next({
    status: 404,
    message: "Movie cannot be found",
  });
}
async function list(req, res, next) {
  const { is_showing } = req.query;
  if (is_showing) {
    const data = await service.listMoviesInTheaters();
    res.json({ data });
  } else {
    const data = await service.list();
    res.json({ data });
  }
}
async function read(req, res, next) {
  res.json({ data: await service.read(res.locals.movie.movie_id) });
}
async function listMatchingTheaters(req, res, next) {
  const id = res.locals.movie.movie_id;
  res.json({ data: await service.listMatchingTheaters(id) });
}
async function listMatchingReviews(req, res, next) {
  const id = res.locals.movie.movie_id;
  res.json({ data: await service.listMatchingReviews(id) });
}
module.exports = {
  list: [asyncErrorBoundary(list)],
  read: [asyncErrorBoundary(movieExists), asyncErrorBoundary(read)],
  findTheaters: [
    asyncErrorBoundary(movieExists),
    asyncErrorBoundary(listMatchingTheaters),
  ],
  findReviews: [
    asyncErrorBoundary(movieExists),
    asyncErrorBoundary(listMatchingReviews),
  ],
};
