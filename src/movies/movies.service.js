const knex = require("../db/connection")

const list = () => {
    return knex("movies").select("*")
}
const listMoviesInTheaters = ()=>{
   return knex("movies as m")
    .join("movie_theaters as mt", "mt.movie_id", "m.movie_id")
    .select("*")
    .where({"mt.is_showing":true})
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
        .join("")
}
module.exports = {
    list,
    listMoviesInTheaters,
    read
}