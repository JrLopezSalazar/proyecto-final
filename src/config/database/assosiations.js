import Meal from "../../modules/meals/meal.model.js"
import Order from "../../modules/orders/order.model.js"
import Restaurant from "../../modules/restaurants/restaurant.model.js"
import Review from "../../modules/reviews/review.model.js"
import User from "../../modules/users/user.model.js"




export const initModel = () => {
    
    User.hasMany(Review)
    Review.belongsTo(User)

    Restaurant.hasMany(Review)
    Review.belongsTo(Restaurant)
    Restaurant.hasMany(Meal, {foreignKey: 'restaurantId'})
    Meal.belongsTo(Restaurant)

    Meal.hasOne(Order, {foreignKey: 'mealId'});
    Order.belongsTo(Meal)
    Order.hasOne(Meal)
    Meal.belongsTo(Order)


    User.hasMany(Order, {foreignKey: 'userId'})
    Order.belongsTo(User)

    

}