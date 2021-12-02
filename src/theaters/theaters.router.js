const controller = require("./theaters.controller")
const router = require("express").Router()
const  methodNotAllowed =  require("../errors/methodNotAllowed")

router.route("/").get(controller.list).all(methodNotAllowed)

module.exports = router