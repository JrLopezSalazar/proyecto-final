import z from 'zod'
import { extractValidationData } from '../../common/utils/extractErrorData.js'

const registerUserSchema = z.object({
    name: z.string().min(3, { message: 'name is too short'}),
    email: z.string().email({ message: 'invalid email'}),
    password: z.string().min(8, {message: 'password is too short'})
})
const loginUserSchema = z.object({
    email: z.string().email({ message: 'invalid email'}),
    password: z.string().min(8, {message: 'password is too short'})
})
const updateUserSchema = z.object({
    name: z.string().min(3, { message: 'name is too short'}),
    email: z.string().email({ message: 'invalid email'}),
    
})

export const validateRegister = (data) => {
    const result = registerUserSchema.safeParse(data)

    const {
        hasError, 
        errorMessages, 
        data: userData 
    } = extractValidationData(result)
    return {
        hasError,
        errorMessages,
        userData
    }
}
export const loginValidate = (data) => {
    const result = loginUserSchema.safeParse(data)

    const {
        hasError, 
        errorMessages, 
        data: userData 
    } = extractValidationData(result)
    return {
        hasError,
        errorMessages,
        userData
    }
}
export const updateUserValidation = (data) => {
    const result = updateUserSchema.safeParse(data)

    const {
        hasError, 
        errorMessages, 
        data: userData 
    } = extractValidationData(result)
    return {
        hasError,
        errorMessages,
        userData
    }
}
