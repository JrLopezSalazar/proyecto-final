import Meal from './meal.model.js'
import Restaurant from '../restaurants/restaurant.model.js'

export class MealService{



   
    async create(data) {
        return await Meal.create(data)
    }


    

    async findOneMealById(id){
        return Meal.findOne({
            where: {
                id: id,
                status: 'active'
            }
         })
             
    }



    async getAllMeals(){
        return await Meal.findAll({
            where: {
                status: 'active'
              }
        })
    }

    async updateMeal(meal, data){
        return await meal.update(data)
    }

    async delete(meal){
        return await meal.update({status: "deleted"})
    }
}
