const knex = require("../db/connection")

const list = () => {
    knex("movies").select("*")
}

module.exports = {
    list,
}