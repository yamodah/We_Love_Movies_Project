const knex = require("../db/connection")
const mapProperties = require("../utils/map-properties")
const read = (review_id)=>{
    return knex("reviews")
     .select("*")
     .where({review_id:review_id})
     .first()
 }
const destroy = (review_id)=>{
    return knex("reviews")
        .where({review_id})
        .del()
}
const update = (updatedReview)=>{
    return knex("reviews")
        .select("*")
        .where({review_id:updatedReview.review_id})
        .update(updatedReview)
}
const addCritic = mapProperties({
    // "critic_id":"critic.critic_id",
    "preferred_name":"critic.preferred_name",
    "surname":"critic.surname",
    "organization_name":"critic.organization_name",
    // "created_at":"critic.created_at",
    // "updated_at":"critic.updated_at",
    // "review_id":"critic.review_id",
    // "score":"critic.score",
    // "movie_id":"critic.movie_id"
})
const reformatReview = (reviewId)=>{
    return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("*")
    .where({"r.review_id":reviewId})
    .first()
    .then(addCritic)
}
 module.exports = {
     read,
     delete:destroy,
     update,
     reformatReview
 }