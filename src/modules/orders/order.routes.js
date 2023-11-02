import express from 'express';
import {createOrder,
    getAllOrdersUser,
    updateOrder,
    deleteOrder} from './order.controller.js' 




export const router = express.Router()

router.route('/')
    .post(createOrder)

router.route('/me')
    .get(getAllOrdersUser)

router.route('/:id')
    .patch(updateOrder)
    .delete(deleteOrder)