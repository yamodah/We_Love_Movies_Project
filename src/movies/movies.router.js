const controller = require("./movies.controller")
const router = require("express").Router()
const  methodNotAllowed =  require("../errors/methodNotAllowed")
router
    .route("/:movieId/theaters")
    .get(controller.findTheaters)
    .all(methodNotAllowed)

router
    .route("/:movieId")
    .get(controller.read)
    .all(methodNotAllowed);

router
    .route("/")
    .get(controller.list)
    .all(methodNotAllowed)
    
module.exports = router