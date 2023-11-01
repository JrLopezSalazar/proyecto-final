import { catchAsync } from "../../errors/index.js"
import { ReviewService } from "../reviews/review.service.js"
import { RestaurantService } from "./restaurant.service.js"

const restaurantService = new RestaurantService()



export const findAllRestaurants = catchAsync(async(req, res, next) => {
    const restaurants = await restaurantService.findAllRestaurants()
    return res.status(200).json(restaurants)
}) 


export const createRestaurant = catchAsync(async(req, res, next) => {
    const { name, address, rating } = req.body
    const restaurant = await restaurantService.createRestaurant({ name, address, rating })
    return res.status(201).json(restaurant)
}) 


export const findOneRestaurant = catchAsync(async(req, res, next) => {

}) 
export const updateRestaurant = catchAsync(async(req, res, next) => {

}) 
export const deleteRestaurant = catchAsync(async(req, res, next) => {

}) 
export const createReviewToRestaurant = catchAsync(async(req, res, next) => {
    const { comment, rating } = req.body
    const {id} = req.params
    const { sessionUser } = req

    const review = await ReviewService.create({
        comment, 
        rating,
        restaurantId: id,
        userId: sessionUser.id
    })

    return res.status(201).json(review)


    
}) 


export const updateReview = catchAsync(async(req, res, next) => {
    const { comment, rating} = req.body
    const { review } = req

    const reviewUpdated = await ReviewService.updateReview(review, { comment, rating })

    return res.status(200).json(reviewUpdated)
}) 


export const deleteReview = catchAsync(async(req, res, next) => {

}) 