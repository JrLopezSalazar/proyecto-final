import z from 'zod'
import { extractValidationData } from '../../common/utils/extractErrorData.js'

const restaurantSchema = z.object({
    name: z.string().min(2).max(240),
    email: z.string(),
    address: z.string(),
    name: z.string().min(2).max(240),
    email: z.string(),
    status: z.enum(['active', 'disable'])
})

const createRestaurantSchema = z.object({
    name: z.string().min(2).max(240),
    address: z.string(),
    rating: z.number().min(1).max(5),
})

const updateRestaurantScrema = z.object({
    name: z.string(),
    address: z.string()
})


export const validateRestaurant = (data) => {
    const result = restaurantSchema.safeParse(data);

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

export const validateCreateRestaurant = (data) => {
    const result = createRestaurantSchema.safeParse(data);

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


export const updateRestaurantvalidation = (data) => {
    const result = updateRestaurantScrema.safeParse(data);

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