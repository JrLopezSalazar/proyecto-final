import { AppError, catchAsync } from "../../errors/index.js"
import { ReviewService } from "../reviews/review.service.js"
import { updateRestaurantvalidation, validateCreateRestaurant } from "./restaurant.schema.js"
import { RestaurantService } from "./restaurant.service.js"


const restaurantService = new RestaurantService()



export const findAllRestaurants = catchAsync(async(req, res, next) => {
    const restaurants = await restaurantService.findAllRestaurants()
    return res.status(200).json(restaurants)
}) 


export const createRestaurant = catchAsync(async(req, res, next) => {

    const {hassError, errorMessages, userData} = validateCreateRestaurant(req.body)

    if(hassError){
        return res.status(422).json({
            status: 'error',
            message: errorMessages
        })
    }
    const restaurant = await restaurantService.createRestaurant(userData)
    return res.status(201).json(restaurant)
}) 


export const findOneRestaurant = catchAsync(async(req, res, next) => {

    const { restaurant } = req;
    return res.status(200).json(restaurant);

}) 
export const updateRestaurant = catchAsync(async(req, res, next) => {
     
    const { hasError, errorMessages, userData} = updateRestaurantvalidation(req.body) 
     
    if(hasError){
        return res.status(404).json({
            error: 'error',
            message: errorMessages
        })
    }
    const {email, address } = req.body
    const {restaurant} = req
    await restaurantService.update(restaurant,{email, address})
    return res.status(200).json(userData)

}) 


export const deleteRestaurant = catchAsync(async(req, res, next) => {
    const { id } = req.params

    const restaurant = await restaurantService.findOne(id)
    
    if(!restaurant){
        return next(new AppError('restaurant not found', 404))
      }
      await restaurantService.delete(restaurant);
      
      return res.status(204).json(null)

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