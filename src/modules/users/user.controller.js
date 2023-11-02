import { verifyPassword } from "../../config/plugins/encriptedPassword.js";
import generateJWT from "../../config/plugins/generate-jwt.js";
import { AppError, catchAsync } from "../../errors/index.js";
import { loginValidate, updateUserValidation, validateRegister } from "./user.schema.js";
import { UserService } from "./user.services.js";


const userService = new UserService()

export const login = catchAsync(async(req, res, next) => {
    const { hasError, errorMessages, userData } = loginValidate(req.body)

    if(hasError){
        return res.status(422).json({
            status: 'error',
            message: errorMessages
        })
    }

    const user = await userService.findUserByEmail(userData.email)

    if(!user){
        return next( new AppError('this account does not exist', 404))
    }

    const isCorrectPassword = await verifyPassword(userData.password, user.password)

    if(!isCorrectPassword){
        return next(new AppError("Incorrect email or password", 401))
    }

    const token = await generateJWT(user.id)
    return res.status(200).json({
        token,
        user: {
            name: user.name,
            email: user.email
        }
    })
});

export const register = catchAsync(async(req, res, next) => {
    const { hasError, errorMessages, userData } = validateRegister(req.body)

    if(hasError){
        return res.status(422).json({
            status: 'error',
            message: errorMessages
        })
    }
    const user = await userService.createUser(userData)
    
    const token = await generateJWT(user.id)
    return res.status(201).json({
        token,
        user: {
            name: user.name,
            email: user.email
        }
    })
});

export const updateUser = catchAsync(async(req, res, next) => {
    const {hasError, errorMessages, userData} = updateUserValidation(req.body)
    if(hasError){
        return res.status(404).json({
            status: 'error',
            message: errorMessages
        })
    }
    const { email, name } = req.body
    const { user } = req
    await userService.updateUser(user, {email, name})
    return res.status(200).json(userData)

    
});


export const deleteUser = catchAsync(async(req, res, next) => {
    const { id } = req.params

    const user = await userService.findOneUserById(id)
    if(!user){
        return res.status(404).json({
          status: 'error',
          message: `User not found`
        })
      }

      await userService.deleteUser(user) 
    return res.status(200).json(null)
});

export const getAllOrders = catchAsync(async(req, res, next) => {
    const orders = await userService.findAllOrders()
    return res.status(200).json(orders)
})

export const getOneOrderById = catchAsync(async(req, res, next) => {
    const {id }= req.params
    const user = await userService.findOneUserById(id)
    if(!user){
        return next(new AppError(`User not found`, 404))
      }

    return res.json(user)


})



// export const deletectrl = catchAsync(async(req, res, next) => {
//     return res.status(200).json(/* valor a retornar */)
// });