const knex = require("../db/connection")

const list = () => {
    return knex("movies").select("*")
}
const listMoviesInTheaters = ()=>{
   return knex("movies as m")
    .join("movies_theaters as mt", "mt.movie_id", "m.movie_id")
    .distinct("m.*")
    .where({"mt.is_showing":true})
    .orderBy("mt.movie_id")
}

const read = (movieId)=>{
   return knex("movies")
    .select("*")
    .where({movie_id:movieId})
    .first()
}

const listMatchingTheaters = (movieId)=>{
    return knex("theaters as t")
        .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
        .select("*")
        .where({"mt.movie_id":movieId})
}

const listMatchingReviews = (movieId) =>{
    return knex("theaters as t")
    .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
    .join()
    .select("*")
    .where({"mt.movie_id":movieId})
}
module.exports = {
    list,
    listMoviesInTheaters,
    read,
    listMatchingTheaters
}