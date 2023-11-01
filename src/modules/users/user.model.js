import sequelize from '../../config/database/database.js'
import { DataTypes } from 'sequelize'
import { encryptedPassword } from '../../config/plugins/encriptedPassword.js'

const User = sequelize.define('users', {
    id: {
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    
    role: {
      type: DataTypes.ENUM(
        'normal',
        'admin'
      ),
      allowNull: false,
      defaultValue: 'normal'
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    } 
  },{
    hooks: {
      beforeCreate: async (user) => {
        user.password = await encryptedPassword(user.password)
      },
    }
  })
  
  export default User