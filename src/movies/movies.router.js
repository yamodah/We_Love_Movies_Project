const controller = require("./movies.controller")
const router = require("express").Router()

router
    .route("/:movieId")
    .get(controller.read)
    