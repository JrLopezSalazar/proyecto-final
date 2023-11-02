import z from 'zod'
import { extractValidationData } from '../../common/utils/extractErrorData.js'


const validateMealSchema = z.object({
  name: z.string(),
  price: z.number(),
  status: z.enum(['active', 'deleted'])
})

const createMealSchema = z.object({
    name: z.string(),
    price: z.number()
})


export const validateCreateMeal = (data) => {
    const result = createMealSchema.safeParse(data);

  const {
    hasError,
    errorMessages,
    data: userData,
  } = extractValidationData(result);

  return {
      hasError,
      errorMessages,
      userData
  }
}

export function validatePartialMeal(data){
  const result =  validateMealSchema.partial().safeParse(data)

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



