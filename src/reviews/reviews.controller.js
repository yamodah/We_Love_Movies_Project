const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./reviews.service");

async function destroy(req, res, next) {
  await service.delete(res.locals.review.review_id);
  res.sendStatus(204);
}

async function update(req, res, next) {
  const { reviewId } = req.params;
  const updatedReview = {
    ...req.body.data,
    review_id: res.locals.review.review_id,
  };
  console.log(typeof updatedReview.review_id);
  await service.update(updatedReview);
  const newData = await service.reformatReview(res.locals.review.review_id);
  res.json({ data: newData });
}

//ID VALIDATION
async function reviewExists(req, res, next) {
  const { reviewId } = req.params;

  const foundReview = await service.read(reviewId);
  if (foundReview) {
    res.locals.review = foundReview;
    return next();
  }
  next({
    status: 404,
    message: "Review cannot be found",
  });
}

module.exports = {
  delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
  update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
};
