import { AppError, catchAsync} from "../../errors/index.js"
import { validateCreateOrder } from "./order.schemas.js"
import { OrderService } from "./order.service.js"

const orderService = new OrderService()



export const createOrder = catchAsync(async(req, res, next) => {

    const { quantity, mealId } = req.body

    
    const order = await orderService.findOneOrder(mealId)
    if (!order) {
        return res.status(404).json({ 
            status: 'error',
            error: 'order not found.' });
      }
    
    const total = quantity * order.price

    const newOrder = {
        mealId,
        quantity,
        total,
      };

     return res.status(201).json(newOrder)

    
    // const { hasError, errorMessages, userData } = validateCreateOrder(req.body)

    // if(hasError){
    //     return res.status(422).json({
    //         status: 'error',
    //         message: errorMessages
    //     })
    // }
    // const order = await orderService.create(userData)
    // return res.status(200).json(order)
})


export const getAllOrdersUser = catchAsync(async(req, res, next) => {
        
})


export const updateOrder = catchAsync(async(req, res, next) => {
    const {id } = req.params

    const order = await orderService.findOne(id)
    if(!order){
        return next(new AppError(`Order not found `))
    }

    const orderUpdate = await orderService.updateOrder(order)
    return res.status(200).json(orderUpdate)

})

export const deleteOrder = catchAsync(async(req, res, next) => {
        const {order} = req
        await orderService.deleteOrder(order)
        return res.status(204).json(null)

})