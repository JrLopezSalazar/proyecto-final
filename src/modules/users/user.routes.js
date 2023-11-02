import express from 'express';
import { deleteUser, login, register, updateUser, getAllOrders, getOneOrderById } from './user.controller.js';
import { protect, protectAccountOwner, validExistUser } from './auth.middleware.js';


export const router = express.Router();

router.post('/login', login)
router.post('/register', register)
    //   .get(controllerFile.findAll)
    //   .post(controllerFile.create)

router.route('/:id')
    .patch(protect, protectAccountOwner, updateUser)
    .delete(protect, protectAccountOwner, deleteUser)

router.get('/orders',protect, getAllOrders)

router.get('/orders/:id',protect, validExistUser, getOneOrderById)

    //   .get(controllerFile.findOne)
    //   .patch(controllerFile.update)
    //   .delete(controllerFile.delete)


