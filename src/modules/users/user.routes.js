import express from 'express';
import { deleteUser, login, register, updateUser, getAllOrders, getOneOrderById } from './user.controller.js';


export const router = express.Router();

router.post('/login', login)
router.post('/register', register)
    //   .get(controllerFile.findAll)
    //   .post(controllerFile.create)

router.route('/:id')
    .patch(updateUser)
    .delete(deleteUser)

router.get('./orders', getAllOrders)

router.get('./orders/:id', getOneOrderById)

    //   .get(controllerFile.findOne)
    //   .patch(controllerFile.update)
    //   .delete(controllerFile.delete)


