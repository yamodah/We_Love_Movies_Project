const service =  require("./movies.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

//ID VALIDATION
async function movieExists(req,res,next) {
    const {movieId} = req.params
    // console.log("pizza, pizza")
    // console.log(await service.read(movieId))
    const foundMovie = await service.read(movieId)

    if(foundMovie){
        res.locals.movie = foundMovie
        return next()
    }
    next({
        signal:404,
        message: "Movie cannot be found"
    })
}
async function list(req,res,next){
    const {is_showing} = req.query
    if(is_showing){
        const data = await service.listMoviesInTheaters()
        res.json({data})
    }else{
        const data = await service.list()
        res.json({data})
    }

}
 async function read(req,res,next){
     console.log(res.locals.movie)
    res.json({data: await service.read(res.locals.movie.movie_id)})
}

module.exports = {
    list:[asyncErrorBoundary(list)],
    read:[asyncErrorBoundary(movieExists), asyncErrorBoundary(read)]
}