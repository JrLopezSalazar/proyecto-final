
import Restaurant from "./restaurant.model.js"


export class RestaurantService{

    async findAllRestaurants(){
        return await Restaurant.findAll({
            where: {
                status: 'active'
            }
        })
    }

    async createRestaurant(data){
        return await Restaurant.create(data)
    }

    async findOneRestaurant(id, restaurantId){
        return await Restaurant.findOne({
            where: {
                id: restaurantId  || id,
                status: 'active'
            }
        })
    }

    


    async update(restaurant, data){
        //console.log(data)
        return await restaurant.update(data)
    }

    async delete(restaurant){
        return await restaurant.update({status: false})
    }
    
}

