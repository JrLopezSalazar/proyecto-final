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
    async updateUser(user, data){
        return user.create(data)
    }
    // User(){

    // }
    async deleteUser(user){
        return await user.update({status: true})
    }

    async findAllOrders(id){
        return await User.findAll({
            where: {
                id,
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