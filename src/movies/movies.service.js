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
    .where({id:movieId})
}
module.exports = {
    list,
    listMoviesInTheaters,
    read
}