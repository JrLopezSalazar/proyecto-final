import { Sequelize } from "sequelize";
import { envs} from '../enviroments/enviroments.js'

const sequelize = new Sequelize(envs.DB_URI, {
    logging: false
})

export async function authenticated(){
    try {
        await sequelize.authenticate()
        console.log('connection ok')
    } catch (error) {
        throw new Error('Error al uutenticar', error)
    }
}
export async function syncUp(){
    try {
        await sequelize.sync()
        console.log('db synced ok!!')
    } catch (error) {
        throw new Error('Error al sincronizar', error)
    }
}

export default sequelize