import { extractValidationData } from "../../common/utils/extractErrorData.js"
import { catchAsync } from "../../errors/index.js"
import { validateCreateMeal, validatePartialMeal } from "./meal.schema.js"
import { MealService } from "./meal.service.js"

const mealService = new MealService




export const createMealToRestaurant = catchAsync(async(req, res, next) => {


    // const { hasError, errorMessages, userData } = validateCreateMeal(req.body)
    // const {id } = req.params

    // if(hasError){
    //     return res.status(422).json({
    //       status: 'error',
    //       message: errorMessages
    //     })
    //   }

    //   const meal = await mealService.create(userData, id)
    //   return res.status(201).json(meal)

    const { name, price } = req.body
    const {id} = req.params
   

    const meal = await mealService.create({
        name, 
        price,
        restaurantId: id,
        
    })

    return res.status(201).json(meal) 
}) 

export const findAllMeals = catchAsync(async(req, res, next) => {
  const meals = await mealService.getAllMeals();
  return res.status(200).json(meals);
})

export const findOneMeal = catchAsync(async(req, res , next) => {

  const {id } = req.params

  const meal = await mealService.findOneMealById(id)
  if (!meal) {
    return next(new AppError(`Can't find meal with id: ${id}`, 404));
  }

  return res.status(200).json(meal);

})
export const updateMeal = catchAsync(async(req, res , next) => {

  const {hasError, errorMessages, userData} = validatePartialMeal(req.body)

    if(hasError){
      return res.status(422).json({
        status: 'error',
        message: errorMessages
    })
  }
    const {id} = req.params

    const meal = await mealService.findOneMealById(id)
    if(!meal){
      return res.status(404).json({
        status: 'error',
        message: `meal with id ${ id } not found`
      })
    }
    const updatedMeal = await mealService.updateMeal(meal, userData)
    return res.json(updatedMeal)

})

export const deleteMeal = catchAsync(async(req, res , next) => {
      const {id} = req.params

      const meal = await mealService.findOneMealById(id)

      if(!meal){
        return res.status(404).json({
          status: 'error',
          message: `meal with id ${ id } not found`
        })
      }

      await mealService.delete(meal)
      return res.status(204).json(null)

})