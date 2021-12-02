const asyncErrorBoundary =  require("../errors/asyncErrorBoundary")
const service =  require("./reviews.service")

async function destroy(req,res,next){
    await service.delete(res.locals.movie.movie_id)
    res.sendStatus(204)
}

module.exports={
    delete:destroy
}