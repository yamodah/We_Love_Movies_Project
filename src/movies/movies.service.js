const knex = require("../db/connection")
const mapProperties = require("../utils/map-properties")
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
const addCritic = mapProperties({
    // "critic_id":"critic.critic_id",
    "preferred_name":"critic.preferred_name",
    "surname":"critic.surname",
    "organization_name":"critic.organization_name",
    "created_at":"critic.created_at",
    "updated_at":"critic.updated_at",
})
const listMatchingReviews = (movieId) =>{
    return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("r.*","c.*")
    .where({"r.movie_id":movieId})
    .then((reviewsArr)=>reviewsArr.map(addCritic))
}
module.exports = {
    list,
    listMoviesInTheaters,
    read,
    listMatchingTheaters,
    listMatchingReviews
}