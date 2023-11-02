import User from "./user.model.js"

export class UserService {

    async createUser(data){
        return await User.create(data)
    }
    async findOneUserById(id){
        return await User.findOne({
            where: {
                id,
                status: true
            }
        })
    }

    async findUserByEmail(email){
        return await User.findOne({
            where: {
                email,
            }
        })
    }


    async updateUser(user, data){
        return user.update(data)
    }
    // User(){

    // }
    async deleteUser(user){
        return await user.update({status: false})
    }

    async findAllOrders(){
        return await User.findAll({
            where: {
                
            status: true}
        })
    }

    async findUserById(id){
        return await User.findOne({
            where: {
                id,
            status: true}
        })
    }
}