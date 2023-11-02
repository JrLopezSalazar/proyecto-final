import Order from "./order.model.js"
import Meal from "../meals/meal.model.js"


export class OrderService{



    async create(data){
        return await Order.create(data)
    }
    async findOneOrder(id){
        return Meal.findOne({
            where: {
                id: id,
            
            }
         })      
    }

    async findOne(id){
        return Order.findOne({
            where: {
                id: id,
            
            }
        })
    }


    async getAllOrdersUser(){

        return await Order.findAll({
            where: {
                status: 'active'
              }
        })
    }


    async updateOrder(order){
        return await order.update({status: 'completed'})
    }


    async deleteOrder(order){
        return await order.update({status: "cancelled"})
    }
}