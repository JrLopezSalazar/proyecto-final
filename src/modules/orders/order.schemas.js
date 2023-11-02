import z from 'zod'
import { extractValidationData} from "../../common/utils/extractErrorData.js"

export const createOrderSchema = z.object({
    quantity: z.number(),
    mealId: z.number()
})


export function validateCreateOrder(data){
    const result = createOrderSchema.safeParse(data)
    
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
  